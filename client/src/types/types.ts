export interface IUser {
    id: number
    email: string
    token: string
}

export interface IUserData {
    email: string
    password: string
}

export interface IresponseUser {
    email: string
    id: number
    createdAt: Date
    updatedAt: Date
    password: string
}

export interface IResponseData {
    token: string
    user: IresponseUser
}

export interface ICategory {
    title: string
    id: number
    createdAt: Date
    updatedAt: Date
    transactions: []
}
