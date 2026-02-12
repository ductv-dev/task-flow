import { 
  Controller, Get, Post, Body, Patch, Param, Delete, 
  UseGuards, Request 
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard) // <--- BẮT BUỘC: Bảo vệ toàn bộ API Task
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    // req.user được lấy từ JWT Token sau khi đăng nhập
    return this.taskService.create(req.user.sub, createTaskDto); // .sub là ID user
  }

  @Get()
  findAll(@Request() req) {
    return this.taskService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.taskService.findOne(id, req.user.sub);
  }

  @Patch(':id')
  update(
    @Request() req, 
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update(id, req.user.sub, updateTaskDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.taskService.remove(id, req.user.sub);
  }
}