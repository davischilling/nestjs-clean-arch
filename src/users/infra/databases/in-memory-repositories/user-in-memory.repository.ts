import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not_found-error'
import { SearchableInMemoryRepository } from '@/shared/domain/repositories/searchable-in-memory-repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '@/users/domain/repositories/user-in-memory-repository.interface'

type ValueTypes = 'username' | 'email'

export class UserInMemoryRepository
  extends SearchableInMemoryRepository<UserEntity>
  implements UserRepository.InMemoryInterface
{
  constructor() {
    super()
  }

  sortableFields: string[] = ['username', 'createdAt']

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

  protected async applyFilter(
    items: UserEntity[],
    filter: UserRepository.Filter,
  ): Promise<UserEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter((item) => {
      return item.username
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase())
    })
  }

  protected async applySort(
    items: UserEntity[],
    sort: string | null,
    sortDirection: string | null,
  ): Promise<UserEntity[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDirection)
  }
}
