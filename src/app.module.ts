import { Module } from '@nestjs/common';
import { UserModule } from './http/modules/user/user.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
