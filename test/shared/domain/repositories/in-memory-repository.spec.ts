import { Entity } from '@/shared/domain/entities/entity'
import { NotFoundError } from '@/shared/domain/errors/not_found-error'
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory-repository'

class StubEntity extends Entity {
  name: string
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {
  constructor() {
    super()
  }
}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  describe('insert method', () => {
    it('should insert an entity', async () => {
      const entity = new StubEntity({ name: 'stub' })
      await sut.insert(entity)
      expect(sut['items']).toHaveLength(1)
      expect(sut['items'][0]).toBe(entity)
    })
  })

  describe('findById method', () => {
    it('should throw an error if entity is not found', async () => {
      try {
        await sut.findById('id')
      } catch (error) {
        expect(error.message).toBe('Entity not found')
        expect(error.name).toBe('NotFoundError')
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })

    it('should find an entity by id', async () => {
      const entity = new StubEntity({ name: 'stub' })
      await sut.insert(entity)
      const result = await sut.findById(entity.id)
      expect(result).toBe(entity)
    })
  })

  describe('findAll method', () => {
    it('should return an empty array if there are no entities', async () => {
      const result = await sut.findAll()
      expect(result).toHaveLength(0)
      expect(result).toEqual([])
    })

    it('should find all entities', async () => {
      const entity1 = new StubEntity({ name: 'stub1' })
      const entity2 = new StubEntity({ name: 'stub2' })
      await sut.insert(entity1)
      await sut.insert(entity2)
      const result = await sut.findAll()
      expect(result).toHaveLength(2)
      expect(result).toContain(entity1)
      expect(result).toContain(entity2)
    })
  })

  describe('update method', () => {
    it('should throw an error if entity is not found', async () => {
      const entity = new StubEntity({ name: 'stub' })
      try {
        await sut.update(entity)
      } catch (error) {
        expect(error.message).toBe('Entity not found')
        expect(error.name).toBe('NotFoundError')
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })

    it('should update an entity', async () => {
      const entity = new StubEntity({ name: 'stub' })
      await sut.insert(entity)
      entity.name = 'updated'
      await sut.update(entity)
      const result = await sut.findById(entity.id)
      expect(result.name).toBe('updated')
    })
  })

  describe('delete method', () => {
    it('should throw an error if entity is not found', async () => {
      try {
        await sut.delete('id')
      } catch (error) {
        expect(error.message).toBe('Entity not found')
        expect(error.name).toBe('NotFoundError')
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })

    it('should delete an entity', async () => {
      const entity = new StubEntity({ name: 'stub' })
      await sut.insert(entity)
      await sut.delete(entity.id)
      const result = await sut.findAll()
      expect(result).toHaveLength(0)
    })
  })
})
