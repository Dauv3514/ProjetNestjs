import { IsNotEmpty, IsString } from 'class-validator';

export class AuthBodyDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  userName: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  userPassword: string;
}
