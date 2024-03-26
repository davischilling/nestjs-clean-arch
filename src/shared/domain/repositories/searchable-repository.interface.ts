import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository.interface'
import { SearchParams } from './search-params'
import { SearchResult } from './search-result'

export type SortDirection = 'asc' | 'desc'
export type SearchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDirection?: SortDirection | null
  filter?: Filter | null
}

export type SearchResultProps<E extends Entity, Filter = string> = {
  items: E[]
  total: number
  currentPage: number
  perPage: number
  sort: string | null
  sortDirection: SortDirection | null
  filter: Filter | null
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  sortableFields: string[]
  search(props: SearchInput): Promise<SearchOutput>
}
