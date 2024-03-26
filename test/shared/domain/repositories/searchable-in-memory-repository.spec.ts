import { Entity } from '@/shared/domain/entities/entity'
import { SearchParams } from '@/shared/domain/repositories/search-params'
import { SearchableInMemoryRepository } from '@/shared/domain/repositories/searchable-in-memory-repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends SearchableInMemoryRepository<StubEntity> {
  sortableFields: string[] = ['name']
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter((item) =>
      item.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    )
  }
  constructor() {
    super()
  }
}

const insertEntities = async (
  entities: StubEntity[],
  sut: StubInMemorySearchableRepository,
): Promise<void> => {
  for (const entity of entities) {
    await sut.insert(entity)
  }
}

describe('SearchableInMemoryRepository unit tests', () => {
  let sut: StubInMemorySearchableRepository

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository()
  })

  describe('applyFilter method', () => {
    it('should return all items if filter is null', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
      ]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      const filteredItems = await sut['applyFilter'](items, null)
      expect(filteredItems).toHaveLength(2)
      expect(filteredItems).toStrictEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })

    it('should return filtered items', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
      ]
      const filteredItems = await sut['applyFilter'](items, 'stub1')
      expect(filteredItems).toHaveLength(1)
      expect(filteredItems[0].props.name).toBe('stub1')
    })

    it('should return filtered items case insensitive', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
      ]
      const filteredItems = await sut['applyFilter'](items, 'StUb1')
      expect(filteredItems).toHaveLength(1)
      expect(filteredItems[0].props.name).toBe('stub1')
    })

    it('should return all items if filter is not found', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
      ]
      const filteredItems = await sut['applyFilter'](items, 'stub3')
      expect(filteredItems).toHaveLength(0)
    })

    it('should return all items if filter is empty', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
      ]
      const filteredItems = await sut['applyFilter'](items, '')
      expect(filteredItems).toHaveLength(2)
    })
  })

  describe('applySort method', () => {
    it('should return the items if sort is null', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
      ]
      const spySortMethod = jest.spyOn(items, 'sort')
      const sortedItems = await sut['applySort'](items, null, null)
      expect(sortedItems).toHaveLength(2)
      expect(sortedItems).toStrictEqual(items)
      expect(spySortMethod).not.toHaveBeenCalled()
    })

    it('should return the items if sort is not in sortableFields', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
      ]
      const spySortMethod = jest.spyOn(items, 'sort')
      const sortedItems = await sut['applySort'](items, 'price', 'asc')
      expect(sortedItems).toHaveLength(2)
      expect(sortedItems).toStrictEqual(items)
      expect(spySortMethod).not.toHaveBeenCalled()
    })

    it('should return the items sorted by name in ascending order', async () => {
      const items = [
        new StubEntity({ name: 'stub2', price: 20 }),
        new StubEntity({ name: 'stub1', price: 10 }),
      ]
      const sortedItems = await sut['applySort'](items, 'name', 'asc')
      expect(sortedItems).toHaveLength(2)
      expect(sortedItems[0].props.name).toBe('stub1')
      expect(sortedItems[1].props.name).toBe('stub2')
    })

    it('should return the items sorted by name in descending order', async () => {
      const items = [
        new StubEntity({ name: 'stub2', price: 20 }),
        new StubEntity({ name: 'stub1', price: 10 }),
      ]
      const sortedItems = await sut['applySort'](items, 'name', 'desc')
      expect(sortedItems).toHaveLength(2)
      expect(sortedItems[0].props.name).toBe('stub2')
      expect(sortedItems[1].props.name).toBe('stub1')
    })
  })

  describe('applyPagination method', () => {
    it('should return the items paginated', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
        new StubEntity({ name: 'stub3', price: 30 }),
      ]
      const paginatedItems = await sut['applyPagination'](items, 2, 1)
      expect(paginatedItems).toHaveLength(1)
      expect(paginatedItems[0].props.name).toBe('stub2')
    })

    it('should return the items paginated with multiple items', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
        new StubEntity({ name: 'stub3', price: 30 }),
      ]
      const paginatedItems = await sut['applyPagination'](items, 1, 2)
      expect(paginatedItems).toHaveLength(2)
      expect(paginatedItems[0].props.name).toBe('stub1')
      expect(paginatedItems[1].props.name).toBe('stub2')
    })
  })

  describe('search method', () => {
    it('should return the items paginated, sorted and filtered', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
        new StubEntity({ name: 'stub3', price: 30 }),
      ]
      await insertEntities(items, sut)
      const searchParams: SearchParams = new SearchParams({
        page: 1,
        perPage: 1,
        sort: 'name',
        sortDirection: 'asc',
        filter: 'stub1',
      })
      const searchResult = await sut.search(searchParams)
      expect(searchResult.items).toHaveLength(1)
      expect(searchResult.items[0].props.name).toBe('stub1')
      expect(searchResult.total).toBe(1)
      expect(searchResult.currentPage).toBe(1)
      expect(searchResult.perPage).toBe(1)
      expect(searchResult.sort).toBe('name')
      expect(searchResult.sortDirection).toBe('asc')
      expect(searchResult.filter).toBe('stub1')
    })

    it('should return the items paginated, sorted and filtered case insensitive', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
        new StubEntity({ name: 'stub3', price: 30 }),
      ]
      await insertEntities(items, sut)
      const searchParams: SearchParams = new SearchParams({
        page: 1,
        perPage: 1,
        sort: 'name',
        sortDirection: 'asc',
        filter: 'StUb1',
      })
      const searchResult = await sut.search(searchParams)
      expect(searchResult.items).toHaveLength(1)
      expect(searchResult.items[0].props.name).toBe('stub1')
      expect(searchResult.total).toBe(1)
      expect(searchResult.currentPage).toBe(1)
      expect(searchResult.perPage).toBe(1)
      expect(searchResult.sort).toBe('name')
      expect(searchResult.sortDirection).toBe('asc')
      expect(searchResult.filter).toBe('StUb1')
    })

    it('should return the items paginated and sorted if filter is empty', async () => {
      const items = [
        new StubEntity({ name: 'stub1', price: 10 }),
        new StubEntity({ name: 'stub2', price: 20 }),
        new StubEntity({ name: 'stub3', price: 30 }),
      ]
      await insertEntities(items, sut)
      const searchParams: SearchParams = new SearchParams({
        page: 1,
        perPage: 1,
        sort: 'name',
        sortDirection: 'asc',
        filter: '',
      })
      const searchResult = await sut.search(searchParams)
      expect(searchResult.items).toHaveLength(1)
      expect(searchResult.items[0].props.name).toBe('stub1')
      expect(searchResult.total).toBe(3)
      expect(searchResult.currentPage).toBe(1)
      expect(searchResult.perPage).toBe(1)
      expect(searchResult.sort).toBe('name')
      expect(searchResult.sortDirection).toBe('asc')
      expect(searchResult.filter).toBe(null)
    })
  })
})
