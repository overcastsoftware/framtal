import { Module } from '@nestjs/common';
import { LoginResolver } from './login.resolver';

@Module({
  providers: [LoginResolver],
})
export class LoginModule {}