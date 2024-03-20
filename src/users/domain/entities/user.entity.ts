import { Entity } from '@/shared/domain/entities/entity'
import { UserValidatorFactory } from '../validators/user.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type UserProps = {
  username: string
  email: string
  password: string
  createdAt?: Date
}

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props)
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  get username(): string {
    return this.props.username
  }

  updateUsername(username: string): void {
    UserEntity.validate({ ...this.props, username })
    this.username = username
  }

  private set username(username: string) {
    this.props.username = username
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  updatePassword(password: string): void {
    UserEntity.validate({ ...this.props, password })
    this.password = password
  }

  private set password(password: string) {
    this.props.password = password
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
