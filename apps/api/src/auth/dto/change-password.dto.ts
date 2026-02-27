import { createZodDto } from 'nestjs-zod';
import { ChangePasswordSchema } from '@workspace/shared-schema';

export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) {}
