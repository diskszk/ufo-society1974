/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
    /** IDと一致する公開中のアルバムを1件取得する。 */
    resBody: Types.Album
  }

  put: {
    status: 204
    reqBody: Types.UpdateAlbumDTO
  }
}
