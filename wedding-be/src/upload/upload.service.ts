import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { v4 as uuidv4 } from 'uuid';

function publicReadPolicy(bucket: string) {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: { AWS: ['*'] },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucket}/*`],
      },
    ],
  };
}

@Injectable()
export class UploadService implements OnModuleInit {
  private client: Minio.Client;
  private bucket: string;
  private publicUrl: string;

  constructor(private config: ConfigService) {
    this.bucket = config.get<string>('MINIO_BUCKET')!;
    this.publicUrl = config.get<string>('MINIO_PUBLIC_URL')!;
    this.client = new Minio.Client({
      endPoint: config.get<string>('MINIO_ENDPOINT')!,
      port: Number(config.get<string>('MINIO_PORT')),
      useSSL: config.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: config.get<string>('MINIO_ACCESS_KEY')!,
      secretKey: config.get<string>('MINIO_SECRET_KEY')!,
    });
  }

  async onModuleInit() {
    const exists = await this.client.bucketExists(this.bucket);
    if (!exists) {
      await this.client.makeBucket(this.bucket);
      await this.client.setBucketPolicy(
        this.bucket,
        JSON.stringify(publicReadPolicy(this.bucket)),
      );
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const ext = file.originalname.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    await this.client.putObject(
      this.bucket,
      filename,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype },
    );
    return `${this.publicUrl}/${this.bucket}/${filename}`;
  }
}
