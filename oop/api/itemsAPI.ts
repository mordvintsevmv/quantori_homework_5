import {dataFetch} from "./api";
import {Item} from "../types/item";

// Localhost server
const localDB = dataFetch('http://localhost:3004')

// JSON bin server
const jsonbinAPI = dataFetch('https://api.jsonbin.io/v3/b')

// Functions for localhost server
export let load_items = async () => {
    return await localDB('items')
}

export let post_item = async (item: Item) => {
    return await localDB('items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
}

export let delete_item = async (id: number) => {
    return await localDB('items/' + id, {
        method: 'DELETE'
    })
}

export let update_item = async (id: number, item: Item) => {
    return await localDB('items/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
}

// If Localhost server is unavailable, then the functions are replaced to fetch data from JSONbin
export const change_API_path = () => {
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
                'X-Master-Key': '$2b$10$KaHvykHsLNyRLB/SubZcF.j3TnmR./yJ5VVyqOcikmTeBJ6BTBeEK'
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
                'X-Master-Key': '$2b$10$KaHvykHsLNyRLB/SubZcF.j3TnmR./yJ5VVyqOcikmTeBJ6BTBeEK'
            },
            body: JSON.stringify({items: [...items, item]})
        })
    }

    delete_item = async (id) => {

        let items = await load_items()

        items = items.filter((item: Item) => item.id !== id)

        return await jsonbinAPI('643d4670ace6f33a220cf2db', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': '$2b$10$KaHvykHsLNyRLB/SubZcF.j3TnmR./yJ5VVyqOcikmTeBJ6BTBeEK'
            },
            body: JSON.stringify({items: [...items]})
        })
    }

    update_item = async (id, item) => {

        let items = await load_items()

        items = items.map((task: Item) => task.id === id ? item : task)

        return await jsonbinAPI('643d4670ace6f33a220cf2db', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': '$2b$10$KaHvykHsLNyRLB/SubZcF.j3TnmR./yJ5VVyqOcikmTeBJ6BTBeEK'
            },
            body: JSON.stringify({items: [...items]})
        })
    }
}