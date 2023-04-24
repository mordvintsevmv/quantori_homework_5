export const dataFetch = (baseURL) => {
    return async (path, options = {}) => {
        try{
            const response = await fetch(`${baseURL}/${path}`, options)
            return response.json()
        }
        catch (error) {
            console.error(error)
        }
    }
}



