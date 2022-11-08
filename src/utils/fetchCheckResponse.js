export const request = (url, options) => {
    return fetch(url, options)
        .then((res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
}
