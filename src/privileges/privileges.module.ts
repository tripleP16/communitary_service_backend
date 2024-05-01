import { Module } from '@nestjs/common';
import { Actions, ActionsSchema } from './entities/actions.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Privileges, PrivilegesSchema } from './entities/privileges.entity';
import { ActionsRepository } from './repositories/actions.repository';
import { PrivilegesRepository } from './repositories/privileges.repository';
import { PrivilegesController } from './controllers/privileges.controller';
import { PrivilegesService } from './services/privileges.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Actions.name, schema: ActionsSchema }]),
    MongooseModule.forFeature([
      { name: Privileges.name, schema: PrivilegesSchema },
    ]),
  ],
  providers: [ActionsRepository, PrivilegesRepository, PrivilegesService],
  exports: [ActionsRepository, PrivilegesRepository],
  controllers: [PrivilegesController],
})
export class PrivilegesModule {}
