import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../todo/entities/todo.entity';
import { Between, ILike, Repository } from 'typeorm';
import { UpdateTodoDto } from '../todo/dto/update-todo.dto';
import { PageFilter } from '../todo/dto/filters.dto';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findFilterTitle(page: PageFilter) {
    const { limit, skip, title, status, startDate, endDate } = page;
    const where = {
      ...(title ? { title: ILike(`%${title}%`) } : {}),
      ...(status ? { status: ILike(`%${status}%`) } : {}),
      ...(endDate ? { createdAt: Between(startDate, endDate) } : {}),
    };
    return await this.todoRepository.findAndCount({
      where: where,
      take: limit,
      skip: (skip - 1) * limit,
    });
  }

  async create(todoEntity: TodoEntity) {
    await this.todoRepository.save(todoEntity);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update(id, updateTodoDto);
  }

  async delete(id: string) {
    const deleteResponse = await this.todoRepository.softDelete(id);
    return deleteResponse;
  }
}
