import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';

export class ChatGermanDto {
  @IsString()
  @IsNotEmpty()
  userInput: string;

  @IsArray()
  @IsString({ each: true })
  conversationLog: string[];

  @IsString()
  @IsOptional()
  topic?: string = 'Beruf';

  @IsString()
  @IsOptional()
  level?: string = 'A1';
}
