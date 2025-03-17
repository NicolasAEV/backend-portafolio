import { Module } from '@nestjs/common';

import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';

@Module({
  imports: [MailModule,
    // What is configModule doing here?
    // ConfigModule is imported to AppModule to make the ConfigService available to the entire application. This allows the ConfigService to be injected into any service or controller.
    // ConfigModule.forRoot() is called with an options object that has isGlobal set to true. This makes the ConfigModule available to the entire application.
    // The ConfigModule is used to load environment variables from the .env file and make them available to the application.
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ThrottlerModule.forRoot({
    //   throttlers: [
    //     {
    //       ttl: 300,
    //       limit: 5,
    //     },
    //   ],
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
