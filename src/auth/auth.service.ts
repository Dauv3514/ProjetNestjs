import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthBodyDto } from './authBodyDto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async login(authBody: AuthBodyDto) {
    const { userName, userPassword } = authBody;
    const existingUser = await this.userService.getUser(userName);
    if (!existingUser) throw new NotFoundException('Utilisateur non trouvé');
    const isPasswordValid = await this.isPasswordValid(
      userPassword,
      existingUser.userPassword,
    );
    if (!isPasswordValid) throw new NotFoundException('Mot de passe incorrect');
    console.log('existingUser', existingUser);
    return { userId: existingUser.userId, userName: existingUser.userName };
  }
  private async isPasswordValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  }
}
