import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsBoolean } from 'class-validator';
import { User } from '../model/user.entity';

export class UserDTO implements Readonly<UserDTO> {
  @ApiProperty({ type: String, required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  username: string;

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  paidReceipt?: string;

  public static from(dto: Partial<UserDTO>) {
    const us = new UserDTO();
    us.id = dto.id;
    us.username = dto.username;
    us.isPaid = dto.isPaid;
    us.paidReceipt = dto.paidReceipt;
    return us;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      username: entity.username,
      isPaid: entity.isPaid,
      paidReceipt: entity.paidReceipt,
    });
  }

  public toEntity(user: User = null) {
    const us = new User();
    us.id = this.id;
    us.username = this.username;
    us.isPaid = this.isPaid;
    us.paidReceipt = this.paidReceipt;
    us.createDateTime = new Date();
    us.createdBy = user ? user.id : null;
    us.lastChangedBy = user ? user.id : null;
    return us;
  }
}
