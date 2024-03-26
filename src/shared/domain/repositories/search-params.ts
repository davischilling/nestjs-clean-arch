import { SearchProps, SortDirection } from './searchable-repository.interface'

export class SearchParams {
  protected _page: number
  protected _perPage: number
  protected _sort: string | null
  protected _sortDirection: SortDirection | null
  protected _filter: string | null

  constructor(props: SearchProps = {}) {
    this.page = this.pageValdiation(props.page)
    this.perPage = this.perPageValdiation(props.perPage)
    this.sort = this.sortAndFilterValdiation(props.sort)
    this.sortDirection = this.sortDirectionValdiation(props.sortDirection)
    this.filter = this.sortAndFilterValdiation(props.filter)
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
    this._sort = this.sortAndFilterValdiation(sort)
  }

  get sortDirection(): SortDirection | null {
    return this._sortDirection
  }

  private set sortDirection(sortDirection: SortDirection | null) {
    this._sortDirection = this.sortDirectionValdiation(sortDirection)
  }

  get filter(): string | null {
    return this._filter
  }

  private set filter(filter: string | null) {
    this._filter = this.sortAndFilterValdiation(filter)
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

  private sortAndFilterValdiation(value: string | null): string | null {
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
