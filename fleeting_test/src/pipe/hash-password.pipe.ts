import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/modules/user/dto/createUser.dto';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}
  async transform(createDTO: CreateUserDTO) {
    const sal = this.configService.get<string>('SAL_SENHA');

    const passwordHashed = await bcrypt.hash(createDTO.password, sal!);
    createDTO.password = passwordHashed;

    return createDTO;
  }
}
