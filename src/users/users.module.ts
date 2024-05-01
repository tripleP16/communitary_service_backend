import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { PrivilegesModule } from 'src/privileges/privileges.module';
import { UsersService } from './services/users.service';
import { Users, UsersSchema } from './entities/users.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './repositories/users.repository';
import { PasswordService } from './services/password.service';

@Module({
  controllers: [UsersController],
  imports: [
    PrivilegesModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers: [UsersService, UsersRepository, PasswordService],
})
export class UsersModule {}
