import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseAuthGuard } from './common/guards/firebase-auth.guard';

@Module({
  imports: [FirebaseModule, AuthModule, UsersModule],
  providers: [{ provide: APP_GUARD, useClass: FirebaseAuthGuard }],
})
export class AppModule {}
