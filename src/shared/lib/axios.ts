import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"
import { sharedConfigEnv } from "@/shared/config"
import { TokenModel } from "@/entities/token"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${sharedConfigEnv.API_URL}`,
  timeout: 120000,
})

const errorHandler = (error: AxiosError) => {
  return Promise.reject(error?.response?.data)
}

const resHandler = (response: AxiosResponse) => {
  const { data } = response

  return Promise.resolve(data)
}

const reqHandler = (config: InternalAxiosRequestConfig) => {
  config.headers["X-API-KEY"] = TokenModel.$AccessToken.getState()
  return config
}

axiosInstance.interceptors.request.use(reqHandler)
axiosInstance.interceptors.response.use(resHandler, errorHandler)

export default axiosInstance
