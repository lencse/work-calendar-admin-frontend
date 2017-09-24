import config from '../Config/config'
import { Deserializer, Serializer } from 'ts-jsonapi'
import { assign } from 'lodash'

export default class Http {

    public get(path: string): Promise<any> {
        return this.fetch(path)
    }

    public post(path: string, data?: any): Promise<any> {
        const params = { method: 'POST' }
        if (data) {
            assign(params, { body: JSON.stringify(data) })
        }
        return this.fetch(path, params)
    }

    public put(path: string, data: any): Promise<any> {
        return this.fetch(path, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
    }

    public delete(path: string): Promise<any> {
        return this.fetch(path, {
            method: 'DELETE'
        })
    }

    private fetch(path: string, params?: any) {
        return fetch(`${config.apiUrl}${path}`, params).then((resp) => {
            if (resp.status === 204) {
                return Promise.resolve(null)
            }
            return resp.json().then((answer) => {
                return Promise.resolve(answer)
            })
        })
    }

}
