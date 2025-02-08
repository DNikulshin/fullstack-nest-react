import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localStorage.helper'

export const instanceAxios = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,
    },
})
