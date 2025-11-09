import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMailDto } from './dto/create-mail.dto';
import { RequestQuoteDto } from './dto/request-quote.dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter;

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
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      connectionTimeout: 60000, // 1 minuto
      greetingTimeout: 30000, // 30 segundos
      socketTimeout: 60000, // 1 minuto
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
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent successfully:', info.messageId);
      this.logger.log('END sendContactEmail');
      return {message:'Email sent successfully'};
    } catch (error) {
      this.logger.error('Error sending email:', error.message);
      this.logger.error('Error code:', error.code);
      this.logger.error('Error response:', error.response);
      
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNECTION') {
        throw new Error('Connection timeout - please try again later');
      }
      throw new Error(`Error sending email: ${error.message}`);
    }
  }
  
  async requestQuote(requestQuoteDto: RequestQuoteDto) {
    this.logger.log('START requestQuote');
    const { fullName, phone, email, projectType, message } = requestQuoteDto;
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: this.configService.get<string>('EMAIL_USER'),
      subject: 'Escobar Construcciones - Solicitud de Cotización',
      text: `Nombre: ${fullName}\nTeléfono: ${phone}\nEmail: ${email}\nTipo de Proyecto: ${projectType}\nMensaje: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; border-radius: 10px;">
          <h2 style="color: #333;">Escobar Construcciones - Solicitud de Cotización</h2>
          <p><strong>Nombre completo:</strong> ${fullName}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Tipo de Proyecto:</strong> ${projectType}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #fff; padding: 10px; border-radius: 5px; border-left: 4px solid #007BFF;">
            <p>${message}</p>
          </div>
          <hr />
          <p style="font-size: 12px; color: #777;">Este mensaje fue enviado desde el formulario de solicitud de cotización de Escobar Construcciones.</p>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log('Quote request sent successfully:', info.messageId);
      this.logger.log('END requestQuote');
      return { message: 'Solicitud de cotización enviada correctamente' };
    } catch (error) {
      this.logger.error('Error enviando solicitud de cotización:', error.message);
      this.logger.error('Error code:', error.code);
      this.logger.error('Error response:', error.response);
      
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNECTION') {
        throw new Error('Connection timeout - please try again later');
      }
      throw new Error(`Error enviando solicitud de cotización: ${error.message}`);
    }
  }
}
