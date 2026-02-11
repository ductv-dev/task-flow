import { createZodDto } from 'nestjs-zod';
import { LoginSchema } from '@workspace/shared-schema';

export class LoginDto extends createZodDto(LoginSchema) {}
