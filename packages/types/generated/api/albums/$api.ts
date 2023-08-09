import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './_albumId@string'
import type { Methods as Methods2 } from './_albumId@string/songs'
import type { Methods as Methods3 } from './_albumId@string/songs/_songId@string'
import type { Methods as Methods4 } from './_albumId@string/unpublish'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/albums'
  const PATH1 = '/songs'
  const PATH2 = '/unpublish'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    _albumId: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        songs: {
          _songId: (val2: string) => {
            const prefix2 = `${prefix0}${PATH1}/${val2}`

            return {
              /**
               * @returns IDと一致する楽曲を1件取得する
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix2, GET, option).json(),
              /**
               * @returns IDと一致する楽曲を1件取得する
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix2, DELETE, option).send(),
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix2, DELETE, option).send().then(r => r.body),
              put: (option: { body: Methods3['put']['reqBody'], config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods3['put']['status']>(prefix, prefix2, PUT, option).send(),
              $put: (option: { body: Methods3['put']['reqBody'], config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods3['put']['status']>(prefix, prefix2, PUT, option).send().then(r => r.body),
              $path: () => `${prefix}${prefix2}`
            }
          },
          post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods2['post']['status']>(prefix, `${prefix0}${PATH1}`, POST, option).send(),
          $post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods2['post']['status']>(prefix, `${prefix0}${PATH1}`, POST, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix0}${PATH1}`
        },
        unpublish: {
          post: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods4['post']['status']>(prefix, `${prefix0}${PATH2}`, POST, option).send(),
          $post: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods4['post']['status']>(prefix, `${prefix0}${PATH2}`, POST, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix0}${PATH2}`
        },
        /**
         * @returns IDと一致する公開中のアルバムを1件取得する。
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option).json(),
        /**
         * @returns IDと一致する公開中のアルバムを1件取得する。
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option).json().then(r => r.body),
        put: (option: { body: Methods1['put']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods1['put']['status']>(prefix, prefix0, PUT, option).send(),
        $put: (option: { body: Methods1['put']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods1['put']['status']>(prefix, prefix0, PUT, option).send().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
    },
    /**
     * @returns 公開中のアルバムを全件取得する。
     */
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
    /**
     * @returns 公開中のアルバムを全件取得する。
     */
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
    $path: () => `${prefix}${PATH0}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
