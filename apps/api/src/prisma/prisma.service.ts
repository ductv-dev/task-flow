// src/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg'; // Import the driver adapter
import * as pg from 'pg'; // Import the pg driver
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Instantiate the driver adapter and pass it to the PrismaClient constructor
    const connectionString = process.env.DATABASE_URL;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const adapter = new PrismaPg(new pg.Pool({ connectionString }));
    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  // Optional: Add an onModuleDestroy hook for graceful disconnection
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
