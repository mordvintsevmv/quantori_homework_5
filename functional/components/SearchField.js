const SearchField = () => {

    // Search wrapper
    const search_field = document.createElement('div')
    search_field.classList.add('search-field')

    // Search input
    const search_field_input = document.createElement('input')
    search_field_input.classList.add('search-field__input');
    search_field_input.placeholder = 'Search Task'

    // Appending
    search_field.append(search_field_input)

    return search_field
}

export default SearchField