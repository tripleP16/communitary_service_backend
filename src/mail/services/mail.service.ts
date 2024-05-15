import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import * as path from 'path';
import * as pug from 'pug';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('MAIL_TRANSPORT') private readonly mailer: Transporter,
  ) {}

  async sendPasswordEmail(to: string, subject: string, password: string) {
    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'emails',
      'password.pug',
    );
    const html = pug.renderFile(templatePath, { password });
    const mailOptions = {
      from: this.configService.get('SMTP_USER'), // sender address
      to: to, // list of receivers
      subject: subject,
      html: html, // Subject line/ HTML body content
    };

    try {
      return await this.mailer.sendMail(mailOptions);
    } catch (e) {
      throw new ServiceUnavailableException(
        'Error while sending email, please try again later',
      );
    }
  }
}
