export interface ProfileDto {
  name: string
  email: string
  slug: string
  description: string
  image?: {
    id: string
    url: string
    width: string
    height: string
  }
  cover?: {
    id: string
    url: string
    width: string
    height: string
  }
}

export interface ApiKeyDto {
  value: string
}

// request interfaces
export interface RequestFetchGetUsers {}

export interface RequestFetchLoginUser {
  email: string
  password: string
}

export interface RequestFetchSignUpUser {
  email: string
  name: string
  password: string
}

export interface RequestFetchGetProfile {}

// error interface
export interface ErrorData {
  statusCode: number
  message: string
  error: string
}
