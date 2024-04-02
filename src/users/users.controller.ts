import { Controller, Get } from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Controller('users')
export class UsersController {
  @Get('/profile')
  getProfile(@User() user: DecodedIdToken) {
    return user;
  }
}
