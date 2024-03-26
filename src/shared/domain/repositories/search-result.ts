import { Entity } from '../entities/entity'
import {
  SearchResultProps,
  SortDirection,
} from './searchable-repository.interface'

export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[]
  readonly total: number
  readonly currentPage: number
  readonly perPage: number
  readonly sort: string | null
  readonly sortDirection: SortDirection | null
  readonly filter: Filter | null
  readonly lastPage: number

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.currentPage = props.currentPage
    this.perPage = props.perPage
    this.sort = props.sort ?? null
    this.sortDirection = props.sortDirection ?? null
    this.filter = props.filter ?? null
    this.lastPage = Math.ceil(this.total / this.perPage)
  }

  toJSON(forceEntity: boolean = false) {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDirection: this.sortDirection,
      filter: this.filter,
    }
  }
}
