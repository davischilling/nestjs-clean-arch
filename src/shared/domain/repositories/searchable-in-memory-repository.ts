import { Entity } from '../entities/entity'
import { InMemoryRepository } from './in-memory-repository'
import { SearchParams } from './search-params'
import { SearchResult } from './search-result'
import { SearchableRepositoryInterface } from './searchable-repository.interface'

export abstract class SearchableInMemoryRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  sortableFields: string[] = []

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const { page, perPage, sort, sortDirection, filter } = props
    const filteredItems = await this.applyFilter(this.items, filter)
    const sortedItems = await this.applySort(filteredItems, sort, sortDirection)
    const paginatedItems = await this.applyPagination(
      sortedItems,
      page,
      perPage,
    )
    const total = filteredItems.length

    return new SearchResult({
      items: paginatedItems,
      total,
      currentPage: page,
      perPage,
      sort,
      sortDirection,
      filter,
    })
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>

  protected async applySort(
    items: E[],
    sort: string | null,
    sortDirection: string | null,
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sortDirection === 'asc' ? -1 : 1
      }

      if (a.props[sort] > b.props[sort]) {
        return sortDirection === 'asc' ? 1 : -1
      }

      return 0
    })
  }

  protected async applyPagination(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ): Promise<E[]> {
    const start = (page - 1) * perPage
    const end = start + perPage

    return items.slice(start, end)
  }
}
