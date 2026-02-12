import { createZodDto } from "nestjs-zod"
import { UpdateTaskSchema } from "@workspace/shared-schema"

export class UpdateTaskDto extends createZodDto(UpdateTaskSchema) {}
