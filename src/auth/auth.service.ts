import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthBodyDto } from './authBodyDto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(authBody: AuthBodyDto) {
    const { userName, userPassword } = authBody;
    const existingUser = await this.userService.getUser(userName);
    if (!existingUser) throw new UnauthorizedException('Utilisateur non trouvé');
    const isPasswordValid = await this.isPasswordValid(
      userPassword,
      existingUser.userPassword,
    );
    if (!isPasswordValid) throw new NotFoundException('Mot de passe incorrect');
    console.log('existingUser', existingUser);
    return this.authentificateUser({ userId: existingUser.userId });
  }
  // Fonction pour vérifier un mot de passe avec le hash
  private async isPasswordValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  }
  // fonction qui gère le JWT
  private async authentificateUser({
    userId,
  }: {
    userId: string;
  }): Promise<{ access_token: string }> {
    const payload = { userId };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
