import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { MailService } from './mail.service';
import { Throttle } from '@nestjs/throttler';
import { RequestQuoteDto } from './dto/request-quote.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Throttle({default:{limit: 5, ttl: 300}})
  @Post('contact')
  sendContactEmail(@Body() createMailDto: CreateMailDto) {
    return this.mailService.sendContactEmail(createMailDto);
  }

  @Throttle({default:{limit: 5, ttl: 300}})
  @Post('request-quote')
  async requestQuote(@Body() requestQuoteDto: RequestQuoteDto) {
    return this.mailService.requestQuote(requestQuoteDto);
  }

  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }
}
