import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class UploadService implements OnModuleInit {
    private config;
    private client;
    private bucket;
    private publicUrl;
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    uploadImage(file: Express.Multer.File): Promise<string>;
}
