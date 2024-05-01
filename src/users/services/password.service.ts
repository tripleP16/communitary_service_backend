import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async generatePassword(): Promise<string> {
    const password = this.generateRandomString();
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  generateRandomString(length: number = 6): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&%^#$-+={}|';
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join('');
  }
}
