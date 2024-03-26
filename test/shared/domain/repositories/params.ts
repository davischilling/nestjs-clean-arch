import {
  SearchProps,
  SearchResultProps,
} from '@/shared/domain/repositories/searchable-repository.interface'

export type ExpectedSearchParams = {
  values: SearchProps
  expected: SearchProps
}

export type ExpectedSearchResult = {
  values: SearchResultProps<any>
  expected: SearchResultProps<any>
}

export const expectedSearchParams: Array<ExpectedSearchParams> = [
  {
    values: {},
    expected: {
      page: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    },
  },
  {
    values: {
      page: null,
      perPage: null,
      sort: null,
      sortDirection: null,
      filter: null,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    },
  },
  {
    values: {
      page: undefined,
      perPage: undefined,
      sort: undefined,
      sortDirection: undefined,
      filter: undefined,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    },
  },
  {
    values: {
      page: '' as any,
      perPage: '' as any,
      sort: '' as any,
      sortDirection: '' as any,
      filter: '' as any,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    },
  },
  {
    values: {
      page: 'test' as any,
      perPage: 'test' as any,
      sort: 'test' as any,
      sortDirection: 'test' as any,
      filter: 'test' as any,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: 'test',
      sortDirection: 'desc',
      filter: 'test',
    },
  },
  {
    values: {
      page: 0 as any,
      perPage: 0 as any,
      sort: 0 as any,
      sortDirection: 0 as any,
      filter: 0 as any,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    },
  },
  {
    values: {
      page: -1 as any,
      perPage: -1 as any,
      sort: -1 as any,
      sortDirection: -1 as any,
      filter: -1 as any,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: '-1',
      sortDirection: 'desc',
      filter: '-1',
    },
  },
  {
    values: {
      page: 5.5 as any,
      perPage: 5.5 as any,
      sort: 5.5 as any,
      sortDirection: 5.5 as any,
      filter: 5.5 as any,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: '5.5',
      sortDirection: 'desc',
      filter: '5.5',
    },
  },
  {
    values: {
      page: true as any,
      perPage: true as any,
      sort: true as any,
      sortDirection: true as any,
      filter: true as any,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: 'true',
      sortDirection: 'desc',
      filter: 'true',
    },
  },
  {
    values: {
      page: false as any,
      perPage: false as any,
      sort: false as any,
      sortDirection: false as any,
      filter: false as any,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: 'false',
      sortDirection: 'desc',
      filter: 'false',
    },
  },
  {
    values: {
      page: {} as any,
      perPage: {} as any,
      sort: {} as any,
      sortDirection: {} as any,
      filter: {} as any,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: '[object Object]',
      sortDirection: 'desc',
      filter: '[object Object]',
    },
  },
  {
    values: {
      page: [] as any,
      perPage: [] as any,
      sort: [] as any,
      sortDirection: [] as any,
      filter: [] as any,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    },
  },
  {
    values: {
      page: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    },
    expected: {
      page: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    },
  },
  {
    values: {
      page: 2,
      perPage: 30,
      sort: 'test',
      sortDirection: 'ASC' as any,
      filter: 'test',
    },
    expected: {
      page: 2,
      perPage: 30,
      sort: 'test',
      sortDirection: 'asc',
      filter: 'test',
    },
  },
  {
    values: {
      page: 2,
      perPage: 30,
      sort: 'test',
      sortDirection: 'DESC' as any,
      filter: 'test',
    },
    expected: {
      page: 2,
      perPage: 30,
      sort: 'test',
      sortDirection: 'desc',
      filter: 'test',
    },
  },
]

export const expectedSearchResult: Array<ExpectedSearchResult> = [
  {
    values: {
      items: [],
      total: 0,
      currentPage: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    },
    expected: {
      items: [],
      total: 0,
      currentPage: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
      lastPage: 0,
    } as any,
  },
  {
    values: {
      items: ['test1', 'test2', 'test3'],
      total: 3,
      currentPage: 1,
      perPage: 10,
      sort: 'name',
      sortDirection: 'asc',
      filter: 'test1',
    },
    expected: {
      items: ['test1', 'test2', 'test3'],
      total: 3,
      currentPage: 1,
      perPage: 10,
      sort: 'name',
      sortDirection: 'asc',
      filter: 'test1',
      lastPage: 1,
    } as any,
  },
  {
    values: {
      items: ['test1', 'test2', 'test3'],
      total: 54,
      currentPage: 1,
      perPage: 10,
      sort: 'name',
      sortDirection: 'asc',
      filter: 'test1',
    } as any,
    expected: {
      items: ['test1', 'test2', 'test3'],
      total: 54,
      currentPage: 1,
      perPage: 10,
      sort: 'name',
      sortDirection: 'asc',
      filter: 'test1',
      lastPage: 6,
    } as any,
  },
  // {
  //   values: {
  //     items: [],
  //     total: 0,
  //     currentPage: 1,
  //     perPage: 15,
  //     sort: null,
  //     sortDirection: null,
  //     filter: null,
  //   },
  //   expected: {
  //     items: [],
  //     total: 0,
  //     currentPage: 1,
  //     perPage: 15,
  //     sort: null,
  //     sortDirection: null,
  //     filter: null,
  //   },
  // },
  // {
  //   values: {
  //     items: [],
  //     total: 0,
  //     currentPage: 1,
  //     perPage: 15,
  //     sort: null,
  //     sortDirection: null,
  //     filter: null,
  //   },
  //   expected: {
  //     items: [],
  //     total: 0,
  //     currentPage: 1,
  //     perPage: 15,
  //     sort: null,
  //     sortDirection: null,
  //     filter: null,
  //   },
  // },
  // {
  //   values: {
  //     items: [],
  //     total: 0,
  //     currentPage: 1,
  //     perPage: 15,
  //     sort: null,
  //     sortDirection: null,
  //     filter: null,
  //   },
  //   expected: {
  //     items: [],
  //     total: 0,
  //     currentPage: 1,
  //     perPage: 15,
  //     sort: null,
  //     sortDirection: null,
  //     filter: null,
  //   },
  // },
]
