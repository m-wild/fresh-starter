import { Handlers, PageProps } from "$fresh/server.ts"

interface User {
    login: string
    name: string
    avatar_url: string
}

export const handler: Handlers = {
    async GET(req, ctx) {
        const { username } = ctx.params
        const res = await fetch(`https://api.github.com/users/${username}`)
        if (res.status === 404)
            return ctx.render(null)
        
        const user: User = await res.json()
        return ctx.render(user)
    }
}

export default function Page({ data }: PageProps<User | null>) {
    if (!data) {
        return <h1>User not found</h1>
    }

    return (
        <div>
            <img src={data.avatar_url} width={64} height={64} />
            <h1>{data.name}</h1>
            <p>{data.login}</p>
        </div>
    )
}