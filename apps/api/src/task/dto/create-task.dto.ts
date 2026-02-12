import { createZodDto } from "nestjs-zod"
import { CreateTaskSchema } from "@workspace/shared-schema"

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}
