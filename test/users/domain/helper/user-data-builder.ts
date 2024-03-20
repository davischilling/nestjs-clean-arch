import { faker } from '@faker-js/faker'
import { UserProps } from '@/users/domain/entities/user.entity'

type Props = {
  username?: string
  email?: string
  password?: string
  createdAt?: Date
}

export function UserDataBuilder(props: Props): UserProps {
  return {
    username: props.username ?? faker.person.fullName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? `${faker.internet.password()}.10`,
    createdAt: props.createdAt ?? new Date(),
  }
}
