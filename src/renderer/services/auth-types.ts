export type LoginInput = {
  username: string
  password: string
}

export type TokenPair = {
  accessToken: string
  refreshToken: string
}

export type CurrentUser = {
  id: number
  username: string
  email: string
  avatar: string
  sex: string
  phone?: string
  remark?: string
  createdAt: string
  updatedAt?: string
}

export type LoginResponse = {
	user: CurrentUser
	tokens: TokenPair
}

export type RefreshResponse = {
	tokens: TokenPair
}

export type ChangePasswordInput = {
  oldPassword: string
  newPassword: string
}

export type UpdateProfileInput = {
  username: string
  avatar: string
  sex: string
}
