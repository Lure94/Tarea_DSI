import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ required: true, example: 1, description: 'ID of Tenant' })
  @IsNumber()
  tenantId!: number;

  @ApiProperty({ description: 'the phone of the user' })
  @IsString()
  @IsNotEmpty()
  telephone!: string;
}
