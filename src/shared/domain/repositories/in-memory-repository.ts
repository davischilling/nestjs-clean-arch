import { Entity } from '../entities/entity'
import { NotFoundError } from '../errors/not_found-error'
import { RepositoryInterface } from './repository.interface'

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  protected items: E[] = []

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async findById(id: string): Promise<E> {
    return this._get(id)
  }

  async findAll(): Promise<E[]> {
    return this.items
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id)
    const index = this.items.findIndex((e) => e.id === entity.id)
    this.items[index] = entity
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    this.items = this.items.filter((entity) => entity.id !== id)
  }

  protected async _get(id: string): Promise<E> {
    const entity = this.items.find((entity) => entity.id === id)
    if (!entity) throw new NotFoundError('Entity not found')
    return entity
  }
}
