import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from './count'
import type { Methods as Methods1 } from './count/increment'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/access/count'
  const PATH1 = '/access/count/increment'
  const GET = 'GET'
  const PUT = 'PUT'

  return {
    count: {
      increment: {
        put: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods1['put']['status']>(prefix, PATH1, PUT, option).send(),
        $put: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods1['put']['status']>(prefix, PATH1, PUT, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      },
      /**
       * @returns 現在のアクセス数を取得する。
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
      /**
       * @returns 現在のアクセス数を取得する。
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
