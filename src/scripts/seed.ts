import * as _ from 'lodash';
import wcBetDatasource from '../config/typeorm.config';
import { UserService } from 'src/user/user.service';
import { User } from 'src/model/user.entity';
import { UserDTO } from 'src/user/user.dto';

async function run() {
  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const connection = await wcBetDatasource.initialize();
  const userService = new UserService(connection.getRepository(User));

  const work = _.range(1, 10)
    .map((n) =>
      UserDTO.from({
        username: `seed${seedId}-${n}`,
        isPaid: true,
        paidReceipt: `paid-receipt-${n}`,
      }),
    )
    .map((dto) =>
      userService
        .create(dto, 'seed-user')
        .then((r) => (console.log('done ->', r.username), r)),
    );
  return await Promise.all(work);
}

run()
  .then((_) => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
