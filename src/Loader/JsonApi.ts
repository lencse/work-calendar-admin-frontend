import { Deserializer } from 'ts-jsonapi/lib'

export const deserializer = new Deserializer({ keyForAttribute: 'camelCase' })

