import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { PrivilegesModule } from 'src/privileges/privileges.module';
import { UsersController } from './controllers/users.controller';
import { Users, UsersSchema } from './entities/users.entity';
import { UsersRepository } from './repositories/users.repository';
import { PasswordService } from './services/password.service';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController],
  imports: [
    PrivilegesModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MailModule,
  ],
  providers: [UsersService, UsersRepository, PasswordService],
  exports: [UsersRepository, PasswordService],
})
export class UsersModule {}
