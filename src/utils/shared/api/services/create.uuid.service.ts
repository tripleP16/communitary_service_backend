import { v4 as uuidv4 } from 'uuid';

export class CreateUUIDService {
  static getUUID(): string {
    return uuidv4();
  }
}
