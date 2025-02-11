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
    createdAt: string
    updatedAt: string
    transactions?: []
}

export interface IResponseTransactionLoader {
    categories: ICategory[]
    transactions: ITransaction[]
}

export interface ITransaction {
    amount: number
    category: ICategory
    id: number
    title: string
    type: string
    createdAt: string
    updatedAt: string
}
