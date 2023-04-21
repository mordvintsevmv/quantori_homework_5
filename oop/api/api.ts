export const dataFetch = (baseURL: string) => {
    return async (path: string, options: RequestInit = {}): Promise<any> => {
        try {
            const response = await fetch(`${baseURL}/${path}`, options);
            return response.json();
        } catch (error) {
            console.error(error);
        }
    };
};