import { NotFoundError } from '@/shared/domain/errors/not_found-error'
import { UserEntity, UserProps } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '../../../domain/helper/user-data-builder'
import { UserInMemoryRepository } from '@/users/infra/databases/in-memory-repositories/user-in-memory.repository'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository
  let props: UserProps
  let entity: UserEntity

  beforeEach(() => {
    props = UserDataBuilder({})
    entity = new UserEntity(props)
    sut = new UserInMemoryRepository()
  })

  describe('findByUsername method', () => {
    it('should throw an error if user is not found', async () => {
      try {
        await sut.findByUsername('username')
      } catch (error) {
        expect(error.message).toBe('User not found')
        expect(error.name).toBe('NotFoundError')
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })

    it('should find a user by username', async () => {
      await sut.insert(entity)
      const result = await sut.findByUsername(entity.username)
      expect(result).toBe(entity)
    })
  })

  describe('emailExists method', () => {
    it('should throw an error if email already exists', async () => {
      await sut.insert(entity)
      try {
        await sut.emailExists(entity.email)
      } catch (error) {
        expect(error.message).toBe('Email already exists')
        expect(error.name).toBe('ConflictError')
        expect(error).toBeInstanceOf(ConflictError)
      }
    })

    it('should not throw an error if email does not exist', async () => {
      await sut.emailExists(entity.email)
    })
  })

  describe('findByEmail method', () => {
    it('should throw an error if user is not found', async () => {
      try {
        await sut.findByEmail('email')
      } catch (error) {
        expect(error.message).toBe('User not found')
        expect(error.name).toBe('NotFoundError')
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })

    it('should find a user by email', async () => {
      await sut.insert(entity)
      const result = await sut.findByEmail(entity.email)
      expect(result).toBe(entity)
    })
  })

  describe('applyFilter method', () => {
    it('should return all items if filter is null', async () => {
      const items = [
        new UserEntity(UserDataBuilder({})),
        new UserEntity(UserDataBuilder({})),
      ]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      const filteredItems = await sut['applyFilter'](items, null)
      expect(filteredItems).toHaveLength(2)
      expect(filteredItems).toStrictEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })

    it('should return filtered items', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ username: 'test1' })),
        new UserEntity(UserDataBuilder({ username: 'test2' })),
      ]
      const filteredItems = await sut['applyFilter'](items, 'test1')
      expect(filteredItems).toHaveLength(1)
      expect(filteredItems[0].props.username).toBe('test1')
    })

    it('should return filtered items case insensitive', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ username: 'username1' })),
        new UserEntity(UserDataBuilder({ username: 'username2' })),
      ]
      const filteredItems = await sut['applyFilter'](items, 'UsErNaMe1')
      expect(filteredItems).toHaveLength(1)
      expect(filteredItems[0].props.username).toBe('username1')
    })

    it('should return no items if filter is not found', async () => {
      const items = [
        new UserEntity(UserDataBuilder({})),
        new UserEntity(UserDataBuilder({})),
      ]
      const filteredItems = await sut['applyFilter'](items, 'username3')
      expect(filteredItems).toHaveLength(0)
    })

    it('should return all items if filter is empty', async () => {
      const items = [
        new UserEntity(UserDataBuilder({})),
        new UserEntity(UserDataBuilder({})),
      ]
      const filteredItems = await sut['applyFilter'](items, '')
      expect(filteredItems).toHaveLength(2)
    })
  })

  describe('applySort method', () => {
    it('should return all items if sort is null', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ username: 'test1' })),
        new UserEntity(UserDataBuilder({ username: 'test2' })),
      ]
      const sortedItems = await sut['applySort'](items, null, null)
      expect(sortedItems).toStrictEqual(items)
    })

    it('should return all items if sort is not in sortableFields', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ username: 'test1' })),
        new UserEntity(UserDataBuilder({ username: 'test2' })),
      ]
      const sortedItems = await sut['applySort'](items, 'email', 'asc')
      expect(sortedItems).toStrictEqual(items)
    })

    it('should sort the items by username in ascending order', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ username: 'test2' })),
        new UserEntity(UserDataBuilder({ username: 'test1' })),
      ]
      const sortedItems = await sut['applySort'](items, 'username', 'asc')
      expect(sortedItems[0].props.username).toBe('test1')
      expect(sortedItems[1].props.username).toBe('test2')
    })

    it('should sort the items by username in descending order', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ username: 'test1' })),
        new UserEntity(UserDataBuilder({ username: 'test2' })),
      ]
      const sortedItems = await sut['applySort'](items, 'username', 'desc')
      expect(sortedItems[0].props.username).toBe('test2')
      expect(sortedItems[1].props.username).toBe('test1')
    })
  })
})
