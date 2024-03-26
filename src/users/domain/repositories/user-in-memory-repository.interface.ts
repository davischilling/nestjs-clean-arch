import { SearchableRepositoryInterface } from '@/shared/domain/repositories/searchable-repository.interface'
import { UserEntity } from '../entities/user.entity'

export interface UserInMemoryRepositoryInterface
  extends SearchableRepositoryInterface<UserEntity, any, any> {
  findByUsername(username: string): Promise<UserEntity>
  emailExists(email: string): Promise<void>
  findByEmail(email: string): Promise<UserEntity>
}
