// Localhost server
const localDB = dataFetch('http://localhost:3004')

// Fake server
const jsonbinAPI = dataFetch('https://api.jsonbin.io/v3/b')

let load_items
let post_item
let delete_item
let put_item

if (window.location.host.includes('localhost')){
    load_items = async () => {
        return await localDB('items')
    }

    post_item = async (item) => {
        return await localDB('items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        })
    }

    delete_item = async (id) => {
        return await localDB('items/' + id, {
            method: 'DELETE'
        })
    }

    put_item = async (id, item) => {
        return await localDB('items/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        })
    }
} else{
    load_items = async () => {
        const response = await jsonbinAPI('643d4670ace6f33a220cf2db', {
            method: 'GET',
            headers: {
                'X-Master-Key' : '$2b$10$KaHvykHsLNyRLB/SubZcF.j3TnmR./yJ5VVyqOcikmTeBJ6BTBeEK'
            }
        })

        return response.record.items
    }

    post_item = async (item) => {

        const items = await load_items()

        return await jsonbinAPI('643d4670ace6f33a220cf2db', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key' : '$2b$10$KaHvykHsLNyRLB/SubZcF.j3TnmR./yJ5VVyqOcikmTeBJ6BTBeEK'
            },
            body: JSON.stringify({items:[...items, item]})
        })
    }

    delete_item = async (id) => {

        let items = await load_items()

        items = items.filter(item => item.id !== id)

        return await jsonbinAPI('643d4670ace6f33a220cf2db', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key' : '$2b$10$KaHvykHsLNyRLB/SubZcF.j3TnmR./yJ5VVyqOcikmTeBJ6BTBeEK'
            },
            body: JSON.stringify({items:[...items]})
        })
    }

    put_item = async (id, item) => {

        let items = await load_items()

        items = items.map(task => task.id === id ? item : task)

        return await jsonbinAPI('643d4670ace6f33a220cf2db', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key' : '$2b$10$KaHvykHsLNyRLB/SubZcF.j3TnmR./yJ5VVyqOcikmTeBJ6BTBeEK'
            },
            body: JSON.stringify({items:[...items]})
        })
    }
}

