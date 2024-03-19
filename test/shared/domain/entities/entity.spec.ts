import { Entity } from '@/shared/domain/entities/entity'
import { validate as uuidValidate } from 'uuid'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Abstract Entity unit tests', () => {
  let sut: StubEntity
  let props: StubProps

  beforeEach(() => {
    props = {
      prop1: 'prop1',
      prop2: 1,
    }
    sut = new StubEntity(props)
  })

  it('Constructor method should set props and id', () => {
    expect(sut).toBeInstanceOf(StubEntity)
    expect(sut.props).toStrictEqual(props)
    expect(uuidValidate(sut.id)).toBe(true)
    expect(sut.id).toBeDefined()
  })

  it('should not accept an invalid uuid', () => {
    const id = 'invalid-uuid'

    expect(() => new StubEntity(props, id)).toThrow('Id is not valid')
  })

  it('should accept a valid uuid', () => {
    const id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    sut = new StubEntity(props, id)

    expect(sut).toBeInstanceOf(StubEntity)
    expect(sut.props).toStrictEqual(props)
    expect(sut.id).toBe(id)
  })

  it('should convert an entity to a javascript object', () => {
    const id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    const sut = new StubEntity(props, id)

    expect(sut.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})
