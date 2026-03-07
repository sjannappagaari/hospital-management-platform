// backend/src/app.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Welcome to Hospital Management API',
      version: '1.0.0',
      documentation: '/api/docs',
    };
  }
}
