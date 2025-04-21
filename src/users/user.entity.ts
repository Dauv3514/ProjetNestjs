import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  userName: string;

  @Column()
  userPassword: string;
}
