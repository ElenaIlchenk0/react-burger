export const request = <T>(url: string, options?: RequestInit): Promise<T> => {
    return fetch(url, options)
        .then((res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
}


