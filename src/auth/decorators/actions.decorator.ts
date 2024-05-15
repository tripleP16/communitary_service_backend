import { SetMetadata } from '@nestjs/common';

export const Actions = (action: string) => SetMetadata('action', action);
