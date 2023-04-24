export const dataFetch = (baseURL: string): <TResponse>(path: string, options?: RequestInit) => Promise<TResponse> => {
    return async <TResponse>(path: string, options: RequestInit = {}): Promise<TResponse> => {
        try {
            const response: Response = await fetch(`${baseURL}/${path}`, options);
            return await response.json() as TResponse;
        } catch (error) {
            console.error(error);
        }
    };
};