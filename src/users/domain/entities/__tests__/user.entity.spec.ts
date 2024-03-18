import { faker } from '@faker-js/faker'
import { UserEntity, UserProps } from '../user.entity'

describe('UserEntity unit tests', () => {
  let sut: UserEntity
  let props: UserProps

  beforeEach(() => {
    props = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    sut = new UserEntity(props)
  })

  it('Constructor method should create a new UserEntity', () => {
    expect(sut).toBeInstanceOf(UserEntity)
    expect(sut.props).toEqual(props)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('username getter should return the username', () => {
    expect(sut.props.username).toBeDefined()
    expect(sut.props.username).toBe(props.username)
    expect(typeof sut.props.username).toBe('string')
  })

  it('email getter should return the email', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toBe(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  it('password getter should return the password', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toBe(props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('createdAt getter should return the createdAt date', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })
})
