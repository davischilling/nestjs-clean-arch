import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { UserProps } from '../entities/user.entity'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'

export class UserValidationRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  username: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsDate()
  @IsOptional()
  createdAt?: Date

  constructor(data: UserProps) {
    Object.assign(this, data)
  }
}

export class UserValidator extends ClassValidatorFields<UserValidationRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserValidationRules(data ?? ({} as UserProps)))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}
