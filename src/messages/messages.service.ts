import { Injectable } from '@nestjs/common';
import { MessagesDto } from '../models/messages.models';

@Injectable()
export class MessagesService {
  getMessages(): string {
    console.log('oui');
    return `ret`;
  }
  getMessage(id: number): string {
    console.log('oui');
    return `poulet ${id}`;
  }
  postMessage(body: MessagesDto): string {
    const { userId, userName, title, content } = body;
    return `ce message a été posté : ${content}`;
  }
}
