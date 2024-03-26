import { SearchableRepositoryInterface } from '@/shared/domain/repositories/searchable-repository.interface'
import { UserEntity } from '../entities/user.entity'
import { SearchParams as DefaultParams } from '@/shared/domain/repositories/search-params'
import { SearchResult as DefaultResult } from '@/shared/domain/repositories/search-result'

export namespace UserRepository {
  export type Filter = string

  export class SearchParams extends DefaultParams<Filter> {}

  export class SearchResult extends DefaultResult<UserEntity, Filter> {}

  export interface InMemoryInterface
    extends SearchableRepositoryInterface<
      UserEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    findByUsername(username: string): Promise<UserEntity>
    emailExists(email: string): Promise<void>
    findByEmail(email: string): Promise<UserEntity>
  }
}
