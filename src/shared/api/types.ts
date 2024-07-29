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
  cover: {
    id: string
    url: string
    width: string
    height: string
  }
}

// request interfaces
export interface RequestFetchGetUsers {}
