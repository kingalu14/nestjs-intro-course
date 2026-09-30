import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello From Nest!';
  }
  getHi(): string {
    return 'Hi From Nest!';
  }
}
