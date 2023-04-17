import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './events/create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
  ) {} //injecting the 'COMMUNICATION' microservice

  getHello(): string {
    return 'Hello World!';
  }

  createUser(dto: CreateUserDto) {
    this.users.push(dto);
    //emitting the event 'user_created'
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(dto.email),
    );
  }
}
