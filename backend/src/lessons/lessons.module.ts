import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StreamingModule } from '../streaming/streaming.module';

@Module({
  imports: [PrismaModule, StreamingModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
