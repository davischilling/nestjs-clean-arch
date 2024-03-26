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
})
