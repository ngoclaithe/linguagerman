import { Injectable, NotFoundException, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class StreamingService {
  private readonly secretKey =
    process.env.JWT_SECRET || 'your-default-secret-key';
  private readonly storagePath = path.join(process.cwd(), 'storage', 'hls');

  constructor(private prisma: PrismaService) {
    
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
  }

  generateSignedUrl(videoId: string) {
    const expires = Math.floor(Date.now() / 1000) + 2 * 60 * 60; 
    const data = `${videoId}:${expires}`;
    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(data)
      .digest('hex');

    return { signature, expires };
  }

  private verifySignature(
    videoId: string,
    signature: string,
    expires: string,
  ): boolean {
    
    const now = Math.floor(Date.now() / 1000);
    if (parseInt(expires) < now) {
      return false;
    }

    
    const data = `${videoId}:${expires}`;
    const expectedSignature = crypto
      .createHmac('sha256', this.secretKey)
      .update(data)
      .digest('hex');

    return signature === expectedSignature;
  }

  

  async convertToHls(videoId: string, inputFilePath: string) {
    const outputDir = path.join(this.storagePath, videoId);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const keyFile = path.join(outputDir, 'video.key');
    const keyInfoFile = path.join(outputDir, 'video.keyinfo');
    const m3u8File = path.join(outputDir, 'index.m3u8');

    
    const key = crypto.randomBytes(16);
    fs.writeFileSync(keyFile, key);

    
    
    const keyUrl = `/api/v1/streaming/hls/${videoId}/key`;
    fs.writeFileSync(keyInfoFile, `${keyUrl}\n${keyFile}`);

    
    
    
    const ffmpegCmd = `ffmpeg -i "${inputFilePath}" -c:v libx264 -c:a aac -b:v 1M -strict -2 -hls_time 10 -hls_list_size 0 -hls_key_info_file "${keyInfoFile}" -hls_segment_filename "${path.join(outputDir, 'segment_%03d.ts')}" "${m3u8File}"`;

    console.log(`[StreamingService] Starting HLS conversion for ${videoId}...`);
    try {
      await execAsync(ffmpegCmd);
      console.log(`[StreamingService] HLS conversion finished for ${videoId}`);
      return true;
    } catch (error) {
      console.error(`[StreamingService] FFmpeg error for ${videoId}:`, error);
      throw error;
    }
  }

  async getHlsPlaylist(
    videoId: string,
    sig: string,
    expires: string,
    @Res() res: any,
  ) {
    if (!this.verifySignature(videoId, sig, expires)) {
      return res.status(403).send('Link đã hết hạn');
    }

    const playlistPath = path.join(this.storagePath, videoId, 'index.m3u8');
    if (!fs.existsSync(playlistPath)) {
      return res.status(404).send('Playlist not found');
    }

    
    let content = fs.readFileSync(playlistPath, 'utf8');

    
    const queryParams = `sig=${sig}&expires=${expires}`;

    
    content = content.replace(
      /segment_(\d+)\.ts/g,
      `segment_$1.ts?${queryParams}`,
    );

    
    content = content.replace(
      /URI="(.*)\/key"/g,
      `URI="$1/key?${queryParams}"`,
    );

    res.set('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(content);
  }

  async getHlsSegment(
    videoId: string,
    segment: string,
    sig: string,
    expires: string,
    @Res() res: any,
  ) {
    if (!this.verifySignature(videoId, sig, expires)) {
      return res.status(403).send('Link đã hết hạn');
    }

    const segmentPath = path.join(this.storagePath, videoId, segment);
    if (!fs.existsSync(segmentPath)) {
      return res.status(404).send('Segment not found');
    }

    res.sendFile(segmentPath);
  }

  async getHlsKey(
    videoId: string,
    sig: string,
    expires: string,
    @Res() res: any,
  ) {
    if (!this.verifySignature(videoId, sig, expires)) {
      return res.status(403).send('Link đã hết hạn');
    }

    const keyPath = path.join(this.storagePath, videoId, 'video.key');
    if (!fs.existsSync(keyPath)) {
      return res.status(404).send('Key not found');
    }

    res.set('Content-Type', 'application/octet-stream');
    res.sendFile(keyPath);
  }

  

  async deleteHlsResults(videoId: string) {
    const outputDir = path.join(this.storagePath, videoId);
    if (fs.existsSync(outputDir)) {
      console.log(`[StreamingService] Deleting HLS directory: ${outputDir}`);
      fs.rmSync(outputDir, { recursive: true, force: true });
    }
  }

  deleteFile(relativeOrAbsolutePath: string) {
    let fullPath: string;
    if (relativeOrAbsolutePath.startsWith('/uploads')) {
      fullPath = path.join(process.cwd(), 'public', relativeOrAbsolutePath);
    } else if (path.isAbsolute(relativeOrAbsolutePath)) {
      fullPath = relativeOrAbsolutePath;
    } else {
      fullPath = path.join(process.cwd(), relativeOrAbsolutePath);
    }

    if (fs.existsSync(fullPath)) {
      console.log(`[StreamingService] Deleting physical file: ${fullPath}`);
      fs.unlinkSync(fullPath);
    }
  }

  async streamVideo(
    videoId: string,
    range: string,
    @Res() res: any,
    query: any,
  ) {
    const { sig, expires } = query;

    
    if (!sig || !expires || !this.verifySignature(videoId, sig, expires)) {
      console.error(
        `[StreamingService] Invalid or expired signature for video: ${videoId}`,
      );
      res
        .status(403)
        .send(
          'Link truy cập video đã hết hạn hoặc không hợp lệ. Vui lòng tải lại trang.',
        );
      return;
    }

    console.log(
      `[StreamingService] Request for videoId: ${videoId} | Range: ${range}`,
    );
    console.log(
      `[StreamingService] Request for videoId: ${videoId} | Range: ${range}`,
    );
    
    const video = await (this.prisma as any).lessonVideo.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    
    let filePath: string;
    if (video.videoUrl.startsWith('/uploads')) {
      filePath = path.join(process.cwd(), 'public', video.videoUrl);
    } else {
      
      filePath = path.join(process.cwd(), video.videoUrl);
    }

    if (!fs.existsSync(filePath)) {
      console.error(`File physically not found: ${filePath}`);
      throw new NotFoundException('Video file missing on server');
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res
          .status(416)
          .send(
            'Requested range not satisfiable\n' + start + ' >= ' + fileSize,
          );
        return;
      }

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      console.log(
        `[StreamingService] Serving partial content: ${start}-${end}/${fileSize}`,
      );
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      console.log(`[StreamingService] Serving full file: ${fileSize} bytes`);
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  }
}
