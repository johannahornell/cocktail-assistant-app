import { html } from 'lit-html'
import { component, useState } from 'haunted'

import '../../utils/toaster'

interface SearchFormProps {
    onSearch: Function
    toasterVisible: boolean
}

function SearchForm({ onSearch, toasterVisible }: SearchFormProps) {
    const [text, setText] = useState('')

    const onSubmit = (e: Event) => {
        e.preventDefault()

        if (!text) {
            alert('Please enter a cocktail name')
            return
        }

        onSearch(text)
        setText('')
    }

    return html`
        <link rel="stylesheet" href="/dist/styles.css">
        <form @submit=${onSubmit} class="search-form">
            <input
                type="text"
                placeholder="Seach for a cocktail"
                .value=${text}
                @change=${(e: Event) =>
                    setText((e.target as HTMLInputElement).value)}
            ></input>
            <button type="submit" class="search-btn">Search</button>
        </form>
        ${
            toasterVisible
                ? html`<toaster-component
                      .message=${'Searching...'}
                      .class=${'gray'}
                  ></toaster-component>`
                : ''
        }
    `
}

customElements.define('search-component', component(SearchForm))
