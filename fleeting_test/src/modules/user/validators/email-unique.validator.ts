import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private loginRepository: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const emailUserExist = await this.loginRepository.existEmail(value);
    return !emailUserExist;
  }
}

export const UniqueEmail = (optionValidations: ValidationOptions) => {
  return (object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: optionValidations,
      constraints: [],
      validator: EmailUniqueValidator,
    });
  };
};
