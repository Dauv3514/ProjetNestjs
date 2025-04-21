import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesDto } from '../models/messages.models';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  getMessages() {
    const data = this.messagesService.getMessages();
    return data;
  }

  @Get(':id')
  getMessage(@Param('id') id: string) {
    console.log(typeof id);
    const data = this.messagesService.getMessage(id);
    return data;
  }

  @Post()
  postMessage(@Body('body') body: MessagesDto) {
    const data = this.messagesService.postMessage(body);
    return data;
  }
}
