import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'
import * as classValidatorLib from 'class-validator'

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string
}> {}

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize errors and validatedData as null', () => {
    const sut = new StubClassValidatorFields()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toBeNull()
  })

  it('Should validate with errors', () => {
    const validateSyncSpy = jest
      .spyOn(classValidatorLib, 'validateSync')
      .mockReturnValue([
        {
          property: 'field',
          constraints: {
            isRequired: 'test error',
          },
        },
      ])

    const sut = new StubClassValidatorFields()
    const invalid = sut.validate(null)

    expect(invalid).toBeFalsy()
    expect(validateSyncSpy).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.errors).toStrictEqual({
      field: ['test error'],
    })
  })

  it('Should validate with success', () => {
    const validateSyncSpy = jest
      .spyOn(classValidatorLib, 'validateSync')
      .mockReturnValue([])

    const sut = new StubClassValidatorFields()
    const valid = sut.validate({ field: 'test' })

    expect(valid).toBeTruthy()
    expect(validateSyncSpy).toHaveBeenCalled()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toStrictEqual({ field: 'test' })
  })
})
