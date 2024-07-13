import { Module } from '@nestjs/common';
import { CodeController } from './controllers/code.controller';
import { UsersModule } from '../users/users.module';
import { CodeEntity, CodeSchema } from './entities/code.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ForgotPasswordService } from './services/forgot.password.service';
import { CodeRepository } from './repositories/code.repository';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CodeController],
  imports: [
    UsersModule,
    MailModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: CodeEntity.name,
        schema: CodeSchema,
      },
    ]),
  ],
  providers: [ForgotPasswordService, CodeRepository],
  exports: [],
})
export class ForgotPasswordModule {}
