import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './access/count'
import type { Methods as Methods1 } from './access/count/increment'
import type { Methods as Methods2 } from './albums'
import type { Methods as Methods3 } from './albums/_albumId@string'
import type { Methods as Methods4 } from './albums/_albumId@string/songs'
import type { Methods as Methods5 } from './albums/_albumId@string/songs/_songId@string'
import type { Methods as Methods6 } from './albums/_albumId@string/summaries'
import type { Methods as Methods7 } from './albums/_albumId@string/unpublish'
import type { Methods as Methods8 } from './draft-albums'
import type { Methods as Methods9 } from './draft-albums/_albumId@string'
import type { Methods as Methods10 } from './draft-albums/_albumId@string/publish'
import type { Methods as Methods11 } from './users'
import type { Methods as Methods12 } from './users/_userId@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/access/count'
  const PATH1 = '/access/count/increment'
  const PATH2 = '/albums'
  const PATH3 = '/songs'
  const PATH4 = '/summaries'
  const PATH5 = '/unpublish'
  const PATH6 = '/draft-albums'
  const PATH7 = '/publish'
  const PATH8 = '/users'
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
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).send(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).send().then(r => r.body),
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
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods5['get']['status']>(prefix, prefix3, GET, option).send(),
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods5['get']['status']>(prefix, prefix3, GET, option).send().then(r => r.body),
                delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods5['delete']['status']>(prefix, prefix3, DELETE, option).send(),
                $delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods5['delete']['status']>(prefix, prefix3, DELETE, option).send().then(r => r.body),
                $path: () => `${prefix}${prefix3}`
              }
            },
            post: (option: { body: Methods4['post']['reqBody'], config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods4['post']['status']>(prefix, `${prefix1}${PATH3}`, POST, option).send(),
            $post: (option: { body: Methods4['post']['reqBody'], config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods4['post']['status']>(prefix, `${prefix1}${PATH3}`, POST, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH3}`
          },
          summaries: {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods6['get']['status']>(prefix, `${prefix1}${PATH4}`, GET, option).send(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods6['get']['status']>(prefix, `${prefix1}${PATH4}`, GET, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH4}`
          },
          unpublish: {
            post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods7['post']['status']>(prefix, `${prefix1}${PATH5}`, POST, option).send(),
            $post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods7['post']['status']>(prefix, `${prefix1}${PATH5}`, POST, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH5}`
          },
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods3['get']['status']>(prefix, prefix1, GET, option).send(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods3['get']['status']>(prefix, prefix1, GET, option).send().then(r => r.body),
          put: (option: { body: Methods3['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods3['put']['status']>(prefix, prefix1, PUT, option).send(),
          $put: (option: { body: Methods3['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods3['put']['status']>(prefix, prefix1, PUT, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).send(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    },
    draft_albums: {
      _albumId: (val1: string) => {
        const prefix1 = `${PATH6}/${val1}`

        return {
          publish: {
            post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods10['post']['status']>(prefix, `${prefix1}${PATH7}`, POST, option).send(),
            $post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods10['post']['status']>(prefix, `${prefix1}${PATH7}`, POST, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH7}`
          },
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods9['get']['status']>(prefix, prefix1, GET, option).send(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods9['get']['status']>(prefix, prefix1, GET, option).send().then(r => r.body),
          put: (option: { body: Methods9['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods9['put']['status']>(prefix, prefix1, PUT, option).send(),
          $put: (option: { body: Methods9['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods9['put']['status']>(prefix, prefix1, PUT, option).send().then(r => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods9['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods9['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods8['get']['status']>(prefix, PATH6, GET, option).send(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods8['get']['status']>(prefix, PATH6, GET, option).send().then(r => r.body),
      post: (option: { body: Methods8['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods8['post']['status']>(prefix, PATH6, POST, option).send(),
      $post: (option: { body: Methods8['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods8['post']['status']>(prefix, PATH6, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH6}`
    },
    users: {
      _userId: (val1: string) => {
        const prefix1 = `${PATH8}/${val1}`

        return {
          /**
           * @returns ユーザーIDと一致するユーザーを1件取得する
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods12['get']['resBody'], BasicHeaders, Methods12['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns ユーザーIDと一致するユーザーを1件取得する
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods12['get']['resBody'], BasicHeaders, Methods12['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          put: (option: { body: Methods12['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods12['put']['status']>(prefix, prefix1, PUT, option).send(),
          $put: (option: { body: Methods12['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods12['put']['status']>(prefix, prefix1, PUT, option).send().then(r => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods12['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods12['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns ユーザーを全件取得する
       */
      get: (option: { query: Methods11['get']['query'], config?: T | undefined }) =>
        fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, PATH8, GET, option).json(),
      /**
       * @returns ユーザーを全件取得する
       */
      $get: (option: { query: Methods11['get']['query'], config?: T | undefined }) =>
        fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, PATH8, GET, option).json().then(r => r.body),
      post: (option: { body: Methods11['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods11['post']['status']>(prefix, PATH8, POST, option).send(),
      $post: (option: { body: Methods11['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods11['post']['status']>(prefix, PATH8, POST, option).send().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods11['get']['query'] } | undefined) =>
        `${prefix}${PATH8}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
