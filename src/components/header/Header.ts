import { html } from 'lit-html'
import { component } from 'haunted'

import '../search/SearchForm'

interface HeaderProps {
    onSearch: Function
    toasterVisible: boolean
}

function Header({ onSearch, toasterVisible }: HeaderProps) {
    return html`
        <link rel="stylesheet" href="/dist/styles.css" />
        <header class="header-wrapper">
            <div class="header-content">
                <div class="search-wrapper">
                    <h1>Cocktail Assistant</h1>
                    <p>What would you like to drink?</p>
                    <search-component
                        .onSearch=${onSearch}
                        .toasterVisible=${toasterVisible}
                    ></search-component>
                </div>
                <div class="image-wrapper">
                    <img src="../../public/cocktail.png" alt="cocktail" />
                </div>
            </div>
        </header>
    `
}

customElements.define('header-component', component(Header))
