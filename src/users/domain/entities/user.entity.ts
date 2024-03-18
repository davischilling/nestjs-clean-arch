import { Entity } from '@/shared/domain/entities/entity'

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
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  get username(): string {
    return this.props.username
  }

  updateUsername(username: string): void {
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
    this.password = password
  }

  private set password(password: string) {
    this.props.password = password
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}
