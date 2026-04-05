import {
  Controller,
  Get,
  Param,
  Headers,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { StreamingAuthGuard } from './streaming-auth.guard';

@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Get('video/:id')
  @UseGuards(StreamingAuthGuard)
  async streamVideo(
    @Param('id') id: string,
    @Headers('range') range: string,
    @Res() res: any,
    @Request() req: any,
  ) {
    return this.streamingService.streamVideo(id, range, res, req.query);
  }

  @Get('hls/:id/index.m3u8')
  @UseGuards(StreamingAuthGuard)
  async getHlsPlaylist(
    @Param('id') id: string,
    @Request() req: any,
    @Res() res: any,
  ) {
    const { sig, expires } = req.query;
    return this.streamingService.getHlsPlaylist(id, sig, expires, res);
  }

  @Get('hls/:id/key')
  @UseGuards(StreamingAuthGuard)
  async getHlsKey(
    @Param('id') id: string,
    @Request() req: any,
    @Res() res: any,
  ) {
    const { sig, expires } = req.query;
    return this.streamingService.getHlsKey(id, sig, expires, res);
  }

  @Get('hls/:id/:segment')
  @UseGuards(StreamingAuthGuard)
  async getHlsSegment(
    @Param('id') id: string,
    @Param('segment') segment: string,
    @Request() req: any,
    @Res() res: any,
  ) {
    const { sig, expires } = req.query;
    return this.streamingService.getHlsSegment(id, segment, sig, expires, res);
  }
}
