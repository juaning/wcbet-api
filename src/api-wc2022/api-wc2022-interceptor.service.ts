import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable, tap, lastValueFrom } from 'rxjs';

@Injectable()
export class HttpServiceInterceptor implements NestInterceptor {
  constructor(private httpService: HttpService) {}
  private async getAccessToken(): Promise<string> {
    // Add code to request access token
    return lastValueFrom(
      this.httpService
        .post(
          '/user/login',
          {
            email: process.env.API_WC_EMAIL,
            password: process.env.API_WC_PASS,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(
          map((resp) => resp.data),
          map((resp) => resp.data.token),
        ),
    );
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const axiosRef = this.httpService.axiosRef;

    // Add base URL
    axiosRef.defaults.baseURL = process.env.API_WC_URL;
    // Add default headers
    axiosRef.defaults.headers.common['content-type'] = 'application/json';

    // Interceptor to get/refresh access token
    axiosRef.interceptors.response.use(
      (response) => response,
      async (err) => {
        const originalRequest = err.config;
        if (
          (err.response.status === 401 || err.response.status === 403) &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          const accessToken = await this.getAccessToken();
          axiosRef.defaults.headers.common[
            'authorization'
          ] = `Bearer ${accessToken}`;
          return axiosRef(originalRequest);
        }
        return Promise.reject(err);
      },
    );
    return next.handle().pipe();
  }
}
