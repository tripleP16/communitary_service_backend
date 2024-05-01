import { Module } from '@nestjs/common';
import { Actions, ActionsSchema } from './entities/actions.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Privileges, PrivilegesSchema } from './entities/privileges.entity';
import { ActionsRepository } from './repositories/actions.repository';
import { PrivilegesRepository } from './repositories/privileges.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Actions.name, schema: ActionsSchema }]),
    MongooseModule.forFeature([
      { name: Privileges.name, schema: PrivilegesSchema },
    ]),
  ],
  providers: [ActionsRepository, PrivilegesRepository],
  exports: [ActionsRepository, PrivilegesRepository],
})
export class PrivilegesModule {}
