/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  get: {
    query: {
      email: string
    }

    status: 200
    /** ユーザーを全件取得する */
    resBody: Types.User[]
  }

  post: {
    status: 201
    reqBody: Types.CreateUserDTO
  }
}
