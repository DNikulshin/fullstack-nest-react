import { instanceAxios } from '../api/axios.api'
import { IResponseData, IUser, IUserData } from '../types/types'

export const AuthService = {
    async registration(
        userData: IUserData
    ): Promise<IResponseData | undefined> {
        const { data } = await instanceAxios.post<IResponseData>(
            'user',
            userData
        )

        return data
    },
    async login(userdata: IUserData): Promise<IUser | undefined> {
        const { data } = await instanceAxios.post<IUser>('auth/login', userdata)

        return data
    },
    async getProfile(): Promise<IUser | undefined> {
        const { data } = await instanceAxios.get<IUser>('auth/profile')

        if (data) return data
    },
}
