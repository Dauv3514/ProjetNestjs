import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find(); // récupère tous les utilisateurs
  }
  async getUser(userName: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ userName });
  }
  async createUser(user: User): Promise<string> {
    const userHashedPassword = await this.hashPassword(user.userPassword);
    try {
      await this.userRepository.save({
        ...user,
        userPassword: userHashedPassword, // insère un utilisateur avec un mot de passe crypté
      }); // Insère un utilisateur
      return `l'utilisateur ${user.userName} a été créé avec succès`;
    } catch (err) {
      console.log('error', err);
      throw new Error('Error creating user');
    }
  }
  private async hashPassword(password: string) {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }
}
