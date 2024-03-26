import { SearchResult } from '@/shared/domain/repositories/search-result'
import { expectedSearchResult } from './params'

describe('SearchResult unit tests', () => {
  let sut: SearchResult<any>

  it('should create a valid instance of SearchResult with the values', () => {
    expectedSearchResult.forEach(({ values, expected }) => {
      sut = new SearchResult(values)
      expect(sut.items).toEqual(expected.items)
      expect(sut.total).toBe(expected.total)
      expect(sut.currentPage).toBe(expected.currentPage)
      expect(sut.perPage).toBe(expected.perPage)
      expect(sut.sort).toBe(expected.sort)
      expect(sut.sortDirection).toBe(expected.sortDirection)
      expect(sut.filter).toBe(expected.filter)
      expect(sut.lastPage).toBe((expected as any).lastPage)
    })
  })
})
