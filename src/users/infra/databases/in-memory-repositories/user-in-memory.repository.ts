import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not_found-error'
import { SearchableInMemoryRepository } from '@/shared/domain/repositories/searchable-in-memory-repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserInMemoryRepositoryInterface } from '@/users/domain/repositories/user-in-memory-repository.interface'

type ValueTypes = 'username' | 'email'

export class UserInMemoryRepository
  extends SearchableInMemoryRepository<UserEntity>
  implements UserInMemoryRepositoryInterface
{
  constructor() {
    super()
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this._getUser('username', username)
  }

  async emailExists(email: string): Promise<void> {
    const user = this.items.find((user) => user.email === email)
    if (user) throw new ConflictError('Email already exists')
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this._getUser('email', email)
  }

  protected async _getUser(
    valueType: ValueTypes,
    value: string,
  ): Promise<UserEntity> {
    const user = this.items.find((user) => user[valueType] === value)
    if (!user) throw new NotFoundError('User not found')
    return user
  }
}
