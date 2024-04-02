import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';

@Module({
  imports: [PassportModule],
  providers: [FirebaseAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
