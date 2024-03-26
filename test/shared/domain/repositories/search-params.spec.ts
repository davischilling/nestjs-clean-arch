import { SearchParams } from '@/shared/domain/repositories/search-params'
import { expectedSearchParams } from './params'

describe('SearchParams unit tests', () => {
  let sut: SearchParams

  it('should create a valid instance of SearchParams with the values', () => {
    expectedSearchParams.forEach(({ values, expected }) => {
      sut = new SearchParams(values)
      expect(sut.page).toBe(expected.page)
      expect(sut.perPage).toBe(expected.perPage)
      expect(sut.sort).toBe(expected.sort)
      expect(sut.sortDirection).toBe(expected.sortDirection)
      expect(sut.filter).toBe(expected.filter)
    })
  })
})
