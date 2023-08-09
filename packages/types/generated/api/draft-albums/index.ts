/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  get: {
    status: 200
    /** 下書き中のアルバムを全件取得する。 */
    resBody: Types.Album[]
  }

  post: {
    status: 201
    reqBody: Types.CreateAlbumDTO
  }
}
