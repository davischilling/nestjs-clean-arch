import { UserDataBuilder } from '../helper/user-data-builder'
import {
  UserValidationRules,
  UserValidator,
  UserValidatorFactory,
} from '@/users/domain/validators/user.validator'

describe('UserValidator unit tests', () => {
  let sut: UserValidator

  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })

  describe('invalid cases for username field', () => {
    it('Should not accept null', () => {
      const invalid = sut.validate(null)

      expect(invalid).toBeFalsy()
      expect(sut.errors['username']).toStrictEqual([
        'username should not be empty',
        'username must be a string',
        'username must be shorter than or equal to 255 characters',
      ])
    })

    it('Should not accept empty string', () => {
      const invalid = sut.validate({
        ...UserDataBuilder({}),
        username: '' as any,
      })

      expect(invalid).toBeFalsy()
      expect(sut.errors['username']).toStrictEqual([
        'username should not be empty',
      ])
    })

    it('Should not accept string longer than 255 characters', () => {
      const invalid = sut.validate({
        ...UserDataBuilder({}),
        username: 'a'.repeat(256),
      })

      expect(invalid).toBeFalsy()
      expect(sut.errors['username']).toStrictEqual([
        'username must be shorter than or equal to 255 characters',
      ])
    })

    it('Should not accept non-string value', () => {
      const userProps = {
        ...UserDataBuilder({}),
        username: 123 as any,
      }
      const invalid = sut.validate(userProps)

      expect(invalid).toBeFalsy()
      expect(sut.errors['username']).toStrictEqual([
        'username must be a string',
        'username must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('invalid cases for email field', () => {
    it('Should not accept null', () => {
      const invalid = sut.validate(null)

      expect(invalid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])
    })

    it('Should not accept empty string', () => {
      const invalid = sut.validate({
        ...UserDataBuilder({}),
        email: '' as any,
      })

      expect(invalid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
      ])
    })

    it('Should not accept string longer than 255 characters', () => {
      const invalid = sut.validate({
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      })

      expect(invalid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])
    })

    it('Should not accept non-string value', () => {
      const userProps = {
        ...UserDataBuilder({}),
        email: 123 as any,
      }
      const invalid = sut.validate(userProps)

      expect(invalid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('invalid cases for password field', () => {
    it('Should not accept null', () => {
      const invalid = sut.validate(null)

      expect(invalid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password is not strong enough',
        'password should not be empty',
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])
    })

    it('Should not accept empty string', () => {
      const invalid = sut.validate({
        ...UserDataBuilder({}),
        password: '' as any,
      })

      expect(invalid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password is not strong enough',
        'password should not be empty',
      ])
    })

    it('Should not accept string longer than 100 characters', () => {
      const invalid = sut.validate({
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      })

      expect(invalid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password is not strong enough',
        'password must be shorter than or equal to 100 characters',
      ])
    })

    it('Should not accept non-string value', () => {
      const userProps = {
        ...UserDataBuilder({}),
        password: 123 as any,
      }
      const invalid = sut.validate(userProps)

      expect(invalid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password is not strong enough',
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])
    })
  })

  describe('invalid cases for createdAt field', () => {
    it('Should not accept a number', () => {
      const userProps = {
        ...UserDataBuilder({}),
        createdAt: 10,
      } as any
      const invalid = sut.validate(userProps)

      expect(invalid).toBeFalsy()
      expect(sut.errors['createdAt']).toStrictEqual([
        'createdAt must be a Date instance',
      ])
    })

    it('Should not accept a string', () => {
      const invalid = sut.validate({
        ...UserDataBuilder({}),
        createdAt: 'invalid' as any,
      })

      expect(invalid).toBeFalsy()
      expect(sut.errors['createdAt']).toStrictEqual([
        'createdAt must be a Date instance',
      ])
    })
  })

  it('valid case for user validator class', () => {
    const userProps = UserDataBuilder({})
    const valid = sut.validate(userProps)

    expect(valid).toBeTruthy()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toStrictEqual(new UserValidationRules(userProps))
  })
})
