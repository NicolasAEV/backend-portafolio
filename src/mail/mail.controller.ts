import { Body, Controller, Post } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { MailService } from './mail.service';
import { Throttle } from '@nestjs/throttler';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Throttle({default:{limit: 5, ttl: 300}})
  @Post('contact')
  sendContactEmail(@Body() createMailDto: CreateMailDto) {
    return this.mailService.sendContactEmail(createMailDto);
  }
}
