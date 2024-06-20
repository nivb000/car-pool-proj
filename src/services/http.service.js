const BASE_URL = '/api/'

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`,
        {
            method,
            body: JSON.stringify(data),
            params: (method === 'GET') ? data : null
        })
        return res.json()
    } catch (err) {
        if (err.response && err.response.status === 401) {
            sessionStorage.clear();
            window.location.assign('/')
        }
        throw err
    }
}