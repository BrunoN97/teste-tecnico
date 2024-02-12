import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { v4 as uuid } from 'uuid';
import { TodoRepository } from '../repository/todo.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly todoRepository: TodoRepository,
  ) {}

  async listUsers() {
    const usersSaved = await this.userRepository.findUser();
    const usersList = usersSaved.map(
      (user) => new ListUserDTO(user.id, user.name, user.email),
    );
    return usersList;
  }

  async findByEmail(email: string) {
    const checkEmail = await this.userRepository.findByEmail(email);

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

  async createUsers({ password, ...dataUser }: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.name = dataUser.name;
    userEntity.email = dataUser.email;
    userEntity.password = password;
    await this.userRepository.create(userEntity);
  }

  async updateUser(id: string, userDTO: UpdateUserDTO) {
    await this.userRepository.update(id, userDTO);
  }

  async deleteUsers(id: string) {
    await this.deleteCascade(id);
    const deleteResponse = await this.userRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new Error(id);
    }
  }

  async findFilter(email: string) {
    return await this.userRepository.findFilter(email);
  }

  async deleteCascade(id: string) {
    const listToDos = this.userRepository.findToDosForUser(id);
    (await listToDos).map((user) => {
      user.todo.map((todo) => {
        this.todoRepository.delete(todo.id);
      });
    });
  }

  async findTodosByUser(id: string) {
    return await this.userRepository.findToDosForUser(id);
  }
}
