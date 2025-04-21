import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find(); // récupère tous les utilisateurs
  }
  async createUser(user: User): Promise<string> {
    try {
      await this.userRepository.save(user); // Insère un utilisateur
      return `l'utilisateur ${user.userName} a été créé avec succès`;
    } catch (err) {
      console.log('error', err);
      throw new Error('Error creating user');
    }
  }
}
