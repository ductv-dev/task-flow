import { createZodDto } from 'nestjs-zod';
import { RegisterSchema } from '@workspace/shared-schema';

export class RergisterDto extends createZodDto(RegisterSchema) {}
