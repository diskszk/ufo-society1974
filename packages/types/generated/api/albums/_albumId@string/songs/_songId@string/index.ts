/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    status: 200
    /** IDと一致する楽曲を1件取得する */
    resBody: Types.Song
  }

  delete: {
    status: 204
  }

  put: {
    status: 204
    reqBody: Types.UpdateSongDTO
  }
}
