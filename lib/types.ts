export type SearchParamsType = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export type ParamsType<T extends Record<string, string> = {}> = {
    params: Promise<T>
}