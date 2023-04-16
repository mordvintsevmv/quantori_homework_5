// Localhost server
const localDB = dataFetch('http://localhost:3004')

// Fake server
const fakeDB = dataFetch('https://api.jsonbin.io/v3/b')

let itemsAPI

if (window.location.host.includes('localhost')){
    itemsAPI = localDB
} else{
    itemsAPI = fakeDB
    const warning_text = document.createElement('p')
    warning_text.innerText = "Using fake API.\n All changes will not be saved."
    warning_text.style.opacity = '0.2'
    warning_text.style.fontSize = '12px'
    warning_text.style.position = 'fixed'
    warning_text.style.bottom = "5px"
    warning_text.style.right = "5px"
    warning_text.style.textAlign = "right"

    document.body.appendChild(warning_text);
}

const load_items = async () => {
    return await itemsAPI('items')
}

const post_item = async (item) => {
    return await itemsAPI('items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
}

const delete_item = async (id) => {
    return await itemsAPI('items/' + id, {
        method: 'DELETE'
    })
}

const put_item = async (id, item) => {
    return await itemsAPI('items/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
}