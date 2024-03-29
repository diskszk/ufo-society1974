import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './_albumId@string'
import type { Methods as Methods2 } from './_albumId@string/publish'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/draft-albums'
  const PATH1 = '/publish'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    _albumId: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        publish: {
          post: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods2['post']['status']>(prefix, `${prefix0}${PATH1}`, POST, option).send(),
          $post: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods2['post']['status']>(prefix, `${prefix0}${PATH1}`, POST, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix0}${PATH1}`
        },
        /**
         * @returns IDと一致する下書き中のアルバムを1件取得する。
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option).json(),
        /**
         * @returns IDと一致する下書き中のアルバムを1件取得する。
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option).json().then(r => r.body),
        put: (option: { body: Methods1['put']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods1['put']['status']>(prefix, prefix0, PUT, option).send(),
        $put: (option: { body: Methods1['put']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods1['put']['status']>(prefix, prefix0, PUT, option).send().then(r => r.body),
        delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix0, DELETE, option).send(),
        $delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix0, DELETE, option).send().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
    },
    /**
     * @returns 下書き中のアルバムを全件取得する。
     */
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
    /**
     * @returns 下書き中のアルバムを全件取得する。
     */
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
    post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
      fetch<void, BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).send(),
    $post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
      fetch<void, BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).send().then(r => r.body),
    $path: () => `${prefix}${PATH0}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
