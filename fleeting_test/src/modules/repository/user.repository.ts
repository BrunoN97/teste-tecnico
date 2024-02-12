import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from '../user/dto/updateUser.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUser() {
    return await this.userRepository.find();
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async create(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async update(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async delete(id: string) {
    return await this.userRepository.softDelete(id);
  }

  async findToDosForUser(id: string) {
    return await this.userRepository.find({
      where: {
        id: id,
      },
      relations: ['todo'],
    });
  }

  async existEmail(email: string) {
    const existUser = await this.userRepository.find({
      where: { email },
    });
    const exist = existUser.length !== 0 ? true : false;
    return exist;
  }

  async findFilter(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
