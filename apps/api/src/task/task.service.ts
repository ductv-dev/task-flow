import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  create(userId: string, createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        completed: false,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(userId: string, id: string) {
    return this.prisma.task.findUnique({
      where: {
        id,
        userId,
      },
    });
  }

  update(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id,
        userId,
      },
      data: updateTaskDto,
    });
  }

  remove(userId: string, id: string) {
    return this.prisma.task.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
