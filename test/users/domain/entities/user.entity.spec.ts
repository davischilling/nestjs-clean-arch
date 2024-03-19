import { UserEntity, UserProps } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '../helper/user-data-builder'

describe('UserEntity unit tests', () => {
  let sut: UserEntity
  let props: UserProps

  beforeEach(() => {
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Constructor method should create a new UserEntity', () => {
    expect(sut).toBeInstanceOf(UserEntity)
    expect(sut.props).toEqual(props)
    expect(sut.createdAt).toBeInstanceOf(Date)
  })

  it('username getter should return the username', () => {
    expect(sut.username).toBeDefined()
    expect(sut.username).toBe(props.username)
    expect(typeof sut.username).toBe('string')
  })

  it('username setter should update the username', () => {
    const newUsername = 'new-username'
    const updateUsernameSpy = jest.spyOn(sut, 'updateUsername')

    sut.updateUsername(newUsername)

    expect(updateUsernameSpy).toHaveBeenCalledTimes(1)
    expect(updateUsernameSpy).toHaveBeenCalledWith(newUsername)
    expect(sut.username).toBe(newUsername)
  })

  it('email getter should return the email', () => {
    expect(sut.email).toBeDefined()
    expect(sut.email).toBe(props.email)
    expect(typeof sut.email).toBe('string')
  })

  it('password getter should return the password', () => {
    expect(sut.password).toBeDefined()
    expect(sut.password).toBe(props.password)
    expect(typeof sut.password).toBe('string')
  })

  it('password setter should update the password', () => {
    const newPassword = 'new-password'
    const updatePasswordSpy = jest.spyOn(sut, 'updatePassword')

    sut.updatePassword(newPassword)

    expect(updatePasswordSpy).toHaveBeenCalledTimes(1)
    expect(updatePasswordSpy).toHaveBeenCalledWith(newPassword)
    expect(sut.password).toBe(newPassword)
  })

  it('createdAt getter should return the createdAt date', () => {
    expect(sut.createdAt).toBeDefined()
    expect(sut.createdAt).toBeInstanceOf(Date)
  })
})
