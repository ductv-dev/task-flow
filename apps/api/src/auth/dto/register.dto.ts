import { createZodDto } from 'nestjs-zod';
import { RegisterSchema } from '@workspace/shared-schema';

export class RegisterDto extends createZodDto(RegisterSchema) {}
