import { SearchProps, SortDirection } from './searchable-repository.interface'

export class SearchParams<Filter = string> {
  protected _page: number
  protected _perPage: number
  protected _sort: string | null
  protected _sortDirection: SortDirection | null
  protected _filter: Filter | null

  constructor(props: SearchProps<Filter> = {}) {
    this.page = this.pageValdiation(props.page)
    this.perPage = this.perPageValdiation(props.perPage)
    this.sort = this.sortAndFilterValdiation(props.sort) as string
    this.sortDirection = this.sortDirectionValdiation(props.sortDirection)
    this.filter = this.sortAndFilterValdiation(props.filter) as Filter
  }

  get page(): number {
    return this._page
  }

  private set page(page: number) {
    this._page = this.pageValdiation(page)
  }

  get perPage(): number {
    return this._perPage
  }

  private set perPage(perPage: number) {
    this._perPage = this.perPageValdiation(perPage)
  }

  get sort(): string | null {
    return this._sort
  }

  private set sort(sort: string | null) {
    this._sort = this.sortAndFilterValdiation(sort) as string
  }

  get sortDirection(): SortDirection | null {
    return this._sortDirection
  }

  private set sortDirection(sortDirection: SortDirection | null) {
    this._sortDirection = this.sortDirectionValdiation(sortDirection)
  }

  get filter(): Filter | null {
    return this._filter
  }

  private set filter(filter: Filter | null) {
    this._filter = this.sortAndFilterValdiation(filter) as Filter
  }

  private pageValdiation(page: number): number {
    if (!Number.isNaN(page) && parseInt(page as any) == page && page >= 1) {
      return page
    }
    return 1
  }

  private perPageValdiation(perPage: number): number {
    if (
      !Number.isNaN(perPage) &&
      parseInt(perPage as any) == perPage &&
      perPage >= 1
    ) {
      return perPage
    }
    return 15
  }

  private sortAndFilterValdiation(
    value: Filter | string | null,
  ): Filter | string | null {
    return (value == null || value == undefined || value == '') &&
      value !== (false as any)
      ? null
      : `${value}`
  }

  private sortDirectionValdiation(
    sortDirection: SortDirection | null,
  ): SortDirection | null {
    if (!this.sort) {
      return null
    } else {
      const dir = `${sortDirection}`.toLowerCase()
      return dir != 'asc' && dir != 'desc' ? 'desc' : dir
    }
  }
}
