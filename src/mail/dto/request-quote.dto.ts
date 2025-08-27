import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestQuoteDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  projectType: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
