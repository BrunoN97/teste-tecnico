import { Injectable } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { TodoRepository } from '../repository/todo.repository';
import { PageFilter } from './dto/filters.dto';
import { v4 as uuid } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository2: TodoRepository) {}

  async findFilterTitle(page: PageFilter) {
    return await this.todoRepository2.findFilterTitle(page);
  }

  async create(createTodoDto: CreateTodoDto) {
    const todoEntity = new TodoEntity();

    todoEntity.id = uuid();
    todoEntity.fk_user = createTodoDto.loginId;
    todoEntity.title = createTodoDto.title;
    todoEntity.description = createTodoDto.description;
    todoEntity.status = createTodoDto.status;
    await this.todoRepository2.create(todoEntity);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository2.update(id, updateTodoDto);
  }

  async delete(id: string) {
    const deleteResponse = await this.todoRepository2.delete(id);
    if (!deleteResponse.affected) {
      throw new Error(id);
    }
  }
}
