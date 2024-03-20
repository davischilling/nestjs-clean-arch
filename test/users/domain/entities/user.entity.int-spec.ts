import { UserEntity, UserProps } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '../helper/user-data-builder'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'
import { faker } from '@faker-js/faker'

describe('UserEntity integration tests', () => {
  let sut: UserEntity
  let props: UserProps

  beforeEach(() => {
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })

  describe('Constructor method', () => {
    it('should throw an error if invalid username is provided', () => {
      const invalidUsernames = [null, '', 'a'.repeat(256)]
      invalidUsernames.forEach((username) => {
        props.username = username
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
    })

    it('should throw an error if invalid email is provided', () => {
      const invalidEmails = [null, '', 'invalid-email', 'a'.repeat(256)]
      invalidEmails.forEach((email) => {
        props.email = email
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
    })

    it('should throw an error if invalid password is provided', () => {
      const invalidPasswords = [
        null,
        '',
        10 as any,
        'weak-password',
        'a'.repeat(101),
      ]
      invalidPasswords.forEach((password) => {
        props.password = password
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
    })

    it('should throw an error if invalid createdAt is provided', () => {
      const invalidCreatedAt = [10, 'invalid-date']
      invalidCreatedAt.forEach((createdAt) => {
        props.createdAt = createdAt as any
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
    })

    it('should create a new user with valid data', () => {
      expect(() => new UserEntity(props)).not.toThrow()
    })
  })

  describe('Update method', () => {
    it('should throw an error if invalid username is provided', () => {
      const invalidUsernames = [null, '', 10 as any, 'a'.repeat(256)]
      invalidUsernames.forEach((username) => {
        expect(() => sut.updateUsername(username)).toThrow(
          EntityValidationError,
        )
      })
    })

    it('should throw an error if invalid password is provided', () => {
      const invalidPasswords = [
        null,
        '',
        10 as any,
        'weak-password',
        'a'.repeat(101),
      ]
      invalidPasswords.forEach((password) => {
        expect(() => sut.updatePassword(password)).toThrow(
          EntityValidationError,
        )
      })
    })

    it('should update correctly if valid username is provided', () => {
      const username = 'new-username'
      sut.updateUsername(username)
      expect(sut.username).toBe(username)
    })

    it('should update correctly if valid password is provided', () => {
      const password = `${faker.internet.password()}.10`
      sut.updatePassword(password)
      expect(sut.password).toBe(password)
    })
  })
})
