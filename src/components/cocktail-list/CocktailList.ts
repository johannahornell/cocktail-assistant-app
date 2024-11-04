import { html } from 'lit-html'
import { component } from 'haunted'

import './CocktailItem'

interface CocktailListProps {
    searchedCocktails: Array<Array<Object>>
    onAddIngredients: Function
    headingText: string
}

function CocktailList({
    searchedCocktails,
    onAddIngredients,
    headingText
}: CocktailListProps) {
    return html`
        <link rel="stylesheet" href="/dist/styles.css" />
        <div class="cocktail-list">
            <h2>${headingText}</h2>
            ${searchedCocktails
                ? searchedCocktails.map((cocktail) => {
                      return html`<cocktail-item-component
                          .cocktail=${cocktail}
                          .onAddIngredients=${onAddIngredients}
                      ></cocktail-item-component>`
                  })
                : 'Looks like that cocktail is not in our list, try another search!'}
        </div>
    `
}
customElements.define('cocktail-list-component', component(CocktailList))
