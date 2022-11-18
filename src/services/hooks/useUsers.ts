import { useQuery, UseQueryOptions } from "react-query"
import { api } from "../api"

export type User = {
    id: string
    email: string
    createdAt: string
}

type GetUsersResponse = {
    totalCount: number
    users: User[]
}

export const getUsers = async(page: number): Promise<GetUsersResponse> => {
    const { data, headers }= await api.get("/users", {
        params: {
            page: page
        }
    })

    const totalCount = Number(headers['x-total-count'])

    const users: User[] = data.users.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
    }))

    return {
        totalCount,
        users
    }
}

export const useUsers = (page: number /* options: UseQueryOptions */) => {
    return useQuery(["users", page], () => getUsers(page), {
        staleTime: 1000 * 60 * 10, // 10mi
        /* ...options as any */
    })
}