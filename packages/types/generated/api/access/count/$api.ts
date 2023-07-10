import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './increment'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/access/count'
  const PATH1 = '/access/count/increment'
  const GET = 'GET'
  const PUT = 'PUT'

  return {
    increment: {
      put: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods1['put']['status']>(prefix, PATH1, PUT, option).send(),
      $put: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods1['put']['status']>(prefix, PATH1, PUT, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH1}`
    },
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<void, BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).send(),
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<void, BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).send().then(r => r.body),
    $path: () => `${prefix}${PATH0}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
