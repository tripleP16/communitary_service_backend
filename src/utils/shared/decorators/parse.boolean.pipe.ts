import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform<string, boolean> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata): boolean {
    if (value === undefined) {
      throw new BadRequestException('Boolean value is required');
    }

    value = value.toString().toLowerCase();

    if (value === 'true' || value === '1' || value === 'yes') {
      return true;
    }

    if (value === 'false' || value === '0' || value === 'no') {
      return false;
    }

    throw new BadRequestException('Invalid boolean value');
  }
}
