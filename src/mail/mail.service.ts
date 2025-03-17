import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const emailUser = this.configService.get<string>('EMAIL_USER');
    const emailPassword = this.configService.get<string>('EMAIL_PASSWORD');

    if (!emailUser || !emailPassword) {
      throw new Error(
        'Missing EMAIL_USER or EMAIL_PASSWORD in environment variables',
      );
    }
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  }

  // Tu función para enviar correos
  async sendContactEmail(createMailDto: CreateMailDto) {
    this.logger.log('START sendContactEmail');
    const { name, email, message } = createMailDto;
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: this.configService.get<string>('EMAIL_USER'),
      subject: '📩 Nuevo mensaje de contacto',
      text: `Name: ${name}, Email: ${email}, Message: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; border-radius: 10px;">
          <h2 style="color: #333;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #fff; padding: 10px; border-radius: 5px; border-left: 4px solid #007BFF;">
            <p>${message}</p>
          </div>
          <hr />
          <p style="font-size: 12px; color: #777;">Este mensaje fue enviado desde el formulario de contacto de tu portafolio.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log('END sendContactEmail');
      return {message:'Email sent successfully'};
    } catch (error) {
      this.logger.error('Error sending email:', error.message);
      throw new Error('Error sending email');
    }
  }
}
