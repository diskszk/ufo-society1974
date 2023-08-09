import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './access/count'
import type { Methods as Methods1 } from './access/count/increment'
import type { Methods as Methods2 } from './albums'
import type { Methods as Methods3 } from './albums/_albumId@string'
import type { Methods as Methods4 } from './albums/_albumId@string/songs'
import type { Methods as Methods5 } from './albums/_albumId@string/songs/_songId@string'
import type { Methods as Methods6 } from './albums/_albumId@string/unpublish'
import type { Methods as Methods7 } from './draft-albums'
import type { Methods as Methods8 } from './draft-albums/_albumId@string'
import type { Methods as Methods9 } from './draft-albums/_albumId@string/publish'
import type { Methods as Methods10 } from './users'
import type { Methods as Methods11 } from './users/_userId@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/access/count'
  const PATH1 = '/access/count/increment'
  const PATH2 = '/albums'
  const PATH3 = '/songs'
  const PATH4 = '/unpublish'
  const PATH5 = '/draft-albums'
  const PATH6 = '/publish'
  const PATH7 = '/users'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    access: {
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
    },
    albums: {
      _albumId: (val1: string) => {
        const prefix1 = `${PATH2}/${val1}`

        return {
          songs: {
            _songId: (val3: string) => {
              const prefix3 = `${prefix1}${PATH3}/${val3}`

              return {
                /**
                 * @returns IDと一致する楽曲を1件取得する
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, prefix3, GET, option).json(),
                /**
                 * @returns IDと一致する楽曲を1件取得する
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
                delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods5['delete']['status']>(prefix, prefix3, DELETE, option).send(),
                $delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods5['delete']['status']>(prefix, prefix3, DELETE, option).send().then(r => r.body),
                put: (option: { body: Methods5['put']['reqBody'], config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods5['put']['status']>(prefix, prefix3, PUT, option).send(),
                $put: (option: { body: Methods5['put']['reqBody'], config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods5['put']['status']>(prefix, prefix3, PUT, option).send().then(r => r.body),
                $path: () => `${prefix}${prefix3}`
              }
            },
            post: (option: { body: Methods4['post']['reqBody'], config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods4['post']['status']>(prefix, `${prefix1}${PATH3}`, POST, option).send(),
            $post: (option: { body: Methods4['post']['reqBody'], config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods4['post']['status']>(prefix, `${prefix1}${PATH3}`, POST, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH3}`
          },
          unpublish: {
            post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods6['post']['status']>(prefix, `${prefix1}${PATH4}`, POST, option).send(),
            $post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods6['post']['status']>(prefix, `${prefix1}${PATH4}`, POST, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH4}`
          },
          /**
           * @returns IDと一致する公開中のアルバムを1件取得する。
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns IDと一致する公開中のアルバムを1件取得する。
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          put: (option: { body: Methods3['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods3['put']['status']>(prefix, prefix1, PUT, option).send(),
          $put: (option: { body: Methods3['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods3['put']['status']>(prefix, prefix1, PUT, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 公開中のアルバムを全件取得する。
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json(),
      /**
       * @returns 公開中のアルバムを全件取得する。
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    },
    draft_albums: {
      _albumId: (val1: string) => {
        const prefix1 = `${PATH5}/${val1}`

        return {
          publish: {
            post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods9['post']['status']>(prefix, `${prefix1}${PATH6}`, POST, option).send(),
            $post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods9['post']['status']>(prefix, `${prefix1}${PATH6}`, POST, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH6}`
          },
          /**
           * @returns IDと一致する下書き中のアルバムを1件取得する。
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns IDと一致する下書き中のアルバムを1件取得する。
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          put: (option: { body: Methods8['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods8['put']['status']>(prefix, prefix1, PUT, option).send(),
          $put: (option: { body: Methods8['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods8['put']['status']>(prefix, prefix1, PUT, option).send().then(r => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods8['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods8['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 下書き中のアルバムを全件取得する。
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, PATH5, GET, option).json(),
      /**
       * @returns 下書き中のアルバムを全件取得する。
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, PATH5, GET, option).json().then(r => r.body),
      post: (option: { body: Methods7['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods7['post']['status']>(prefix, PATH5, POST, option).send(),
      $post: (option: { body: Methods7['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods7['post']['status']>(prefix, PATH5, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH5}`
    },
    users: {
      _userId: (val1: string) => {
        const prefix1 = `${PATH7}/${val1}`

        return {
          /**
           * @returns ユーザーIDと一致するユーザーを1件取得する
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns ユーザーIDと一致するユーザーを1件取得する
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          put: (option: { body: Methods11['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods11['put']['status']>(prefix, prefix1, PUT, option).send(),
          $put: (option: { body: Methods11['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods11['put']['status']>(prefix, prefix1, PUT, option).send().then(r => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods11['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods11['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns ユーザーを全件取得する
       */
      get: (option: { query: Methods10['get']['query'], config?: T | undefined }) =>
        fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, PATH7, GET, option).json(),
      /**
       * @returns ユーザーを全件取得する
       */
      $get: (option: { query: Methods10['get']['query'], config?: T | undefined }) =>
        fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, PATH7, GET, option).json().then(r => r.body),
      post: (option: { body: Methods10['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods10['post']['status']>(prefix, PATH7, POST, option).send(),
      $post: (option: { body: Methods10['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods10['post']['status']>(prefix, PATH7, POST, option).send().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods10['get']['query'] } | undefined) =>
        `${prefix}${PATH7}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
