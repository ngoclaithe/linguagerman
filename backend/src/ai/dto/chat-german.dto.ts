import { IsString, IsArray, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ChatMessageDto {
  @IsString()
  role: 'user' | 'assistant';

  @IsString()
  content: string;
}

export class ChatGermanDto {
  @IsString()
  @IsNotEmpty()
  userInput: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  @IsOptional()
  history?: ChatMessageDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  conversationLog?: string[];

  @IsString()
  @IsOptional()
  topic?: string = 'Beruf';

  @IsString()
  @IsOptional()
  level?: string = 'A1';
}
