/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
    /** ユーザーIDと一致するユーザーを1件取得する */
    resBody: Types.User
  }

  put: {
    status: 204
    reqBody: Types.UpdateUserDTO
  }

  delete: {
    status: 204
  }
}
