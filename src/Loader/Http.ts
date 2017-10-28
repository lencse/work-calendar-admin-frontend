import config from '../Config/config'
import { assign } from 'lodash'

export class Http {

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
        params = params || {}
        params = assign(params, { credentials: 'include' })
        console.log(params)
        return fetch(
            `${config.apiUrl}/api${path}`,
            params
        ).then((resp) => {
            if (resp.status === 204) {
                return Promise.resolve(null)
            }
            if (resp.status === 403) {
                window.location.href = `${config.apiUrl}/auth/auth`
            }
            return resp.json().then((answer) => {
                return Promise.resolve(answer)
            })
        })
    }

}

const http = new Http()

export default http
