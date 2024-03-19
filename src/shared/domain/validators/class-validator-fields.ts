import { validateSync } from 'class-validator'
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface'

export abstract class ClassValidatorFields<ValidatedProps>
  implements ValidatorFieldsInterface<ValidatedProps>
{
  errors: FieldsErrors = null
  validatedData: ValidatedProps = null
  validate(data: any): boolean {
    const errors = validateSync(data)
    if (errors.length) {
      this.errors = {}
      errors.forEach((error) => {
        const field = error.property
        const message = Object.values(error.constraints)
        this.errors[field] = message
      })
    } else {
      this.validatedData = data
    }
    return !errors.length
  }
}
