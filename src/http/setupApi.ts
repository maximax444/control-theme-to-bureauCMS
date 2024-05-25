
import { $host } from "./index"
export const getPages = async () => {
    const response = await $host.get('api/pages/client')
        .catch((err) => {
            throw err
        })
    return response
}