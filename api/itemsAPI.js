// Localhost server
const localDB = dataFetch('http://localhost:3004')

// JSON bin server
const jsonbinAPI = dataFetch('https://api.jsonbin.io/v3/b')

let load_items = async () => {
    return await localDB('items')
}

let post_item = async (item) => {
    return await localDB('items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
}

let delete_item = async (id) => {
    return await localDB('items/' + id, {
        method: 'DELETE'
    })
}

let update_item = async (id, item) => {
    return await localDB('items/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
}

const change_API_path = () => {
    const warning_text = document.createElement('p')
    warning_text.innerText = "Using JSONbin API to store tasks. \n It may take time to fetch data."
    warning_text.style.opacity = "0.3"
    warning_text.style.fontSize = "12px";
    warning_text.style.position = "fixed";
    warning_text.style.bottom = "5px";
    warning_text.style.right = "5px";
    warning_text.style.textAlign = "right"

    document.body.append(warning_text)

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

    update_item = async (id, item) => {

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


