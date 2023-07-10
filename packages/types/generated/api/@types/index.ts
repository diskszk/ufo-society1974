/* eslint-disable */
export type User = {
  uid: string
  email: string
  role: string
  username: string
  isDeleted: boolean
}

export type CreateUserDTO = {
  uid?: string | undefined
  email?: string | undefined
  role?: string | undefined
  username?: string | undefined
  isDeleted?: boolean | undefined
}

export type UpdateUserDTO = {
  uid?: string | undefined
  email?: string | undefined
  role?: string | undefined
  username?: string | undefined
  isDeleted?: boolean | undefined
}

export type CreateAlbumDTO = {
}

export type UpdateAlbumDTO = {
}

export type CreateSongDTO = {
}
