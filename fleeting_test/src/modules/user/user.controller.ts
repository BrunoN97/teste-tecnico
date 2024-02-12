import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { HashPasswordPipe } from 'src/pipe/hash-password.pipe';

@Controller('/users')
export class UserController {
  constructor(private loginService: UserService) {}

  @UseGuards(AuthenticationGuard)
  @Get()
  async listUsers() {
    return await this.loginService.listUsers();
  }

  @Post()
  async createUsers(@Body(HashPasswordPipe) createDTO: CreateUserDTO) {
    return await this.loginService.createUsers(createDTO);
  }

  @UseGuards(AuthenticationGuard)
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body(HashPasswordPipe) newDatas: UpdateUserDTO,
  ) {
    await this.loginService.updateUser(id, newDatas);
    return { message: `Usuário atualizado com sucesso` };
  }

  @UseGuards(AuthenticationGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.loginService.deleteUsers(id);
    return { message: 'Usuário deletado com sucesso' };
  }

  @UseGuards(AuthenticationGuard)
  @Get('/filter')
  async findFilter(@Query('email') email: string) {
    return await this.loginService.findFilter(email);
  }
  @UseGuards(AuthenticationGuard)
  @Get('/filter/:id')
  async findFilterID(@Param('id') id: string) {
    return await this.loginService.findTodosByUser(id);
  }
}
