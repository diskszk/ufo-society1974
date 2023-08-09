/* eslint-disable */
export type User = {
  uid: string
  email: string
  role: string
  username: string
  isDeleted: boolean
}

export type CreateUserDTO = {
  uid: string
  email: string
  role: string
  username: string
  isDeleted: boolean
}

export type UpdateUserDTO = {
  uid: string
  email: string
  role: string
  username: string
  isDeleted: boolean
}

export type Album = {
  id: string
  image: string
  publishedDate: string
  title: string
  published: boolean
}

export type CreateAlbumDTO = {
  image: string
  publishedDate: string
  title: string
}

export type UpdateAlbumDTO = {
  id: string
  image: string
  publishedDate: string
  title: string
}

export type CreateSongDTO = {
  lyric: string
  title: string
  wordsRights: string
  musicRights: string
}

export type Song = {
  id: string
  lyric: string
  title: string
  wordsRights: string
  musicRights: string
}

export type UpdateSongDTO = {
  id: string
  lyric: string
  title: string
  wordsRights: string
  musicRights: string
}

export type AccessCountResponse = {
  accessCount: number
}
