import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { PageFilter } from './dto/filters.dto';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findFilterTitle(@Query() page: PageFilter) {
    return await this.todoService.findFilterTitle(page);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(createTodoDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.todoService.delete(id);
  }
}
