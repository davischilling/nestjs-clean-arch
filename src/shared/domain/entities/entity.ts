import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

export abstract class Entity<Props = any> {
  private readonly _id: string
  public readonly props: Props

  constructor(props: Props, id?: string) {
    this.idValidation(id)
    this._id = id || uuidv4()
    this.props = props
  }

  get id() {
    return this._id
  }

  idValidation(id: string) {
    if (id && !uuidValidate(id)) {
      throw new Error('Id is not valid')
    }
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>
  }
}
