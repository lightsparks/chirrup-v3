export function ApiUrl(data: Array<string>): string {
    return [process.env.VUE_APP_API_URL, ...data].join('/')
}