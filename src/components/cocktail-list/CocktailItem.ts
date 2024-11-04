import { html } from 'lit-html'
import { component, useState } from 'haunted'

import '../../utils/toaster'

interface CocktailItemProps {
    cocktail: {
        strDrinkThumb: string
        strDrink: string
        strInstructions: string
    }
    onAddIngredients: Function
}

function CocktailItem({ cocktail, onAddIngredients }: CocktailItemProps) {
    const [toasterVisible, setToasterVisible] = useState(false)

    const { strDrinkThumb, strDrink, strInstructions } = cocktail

    let ingredientAndMeasure = []
    let ingredientAndMeasureList

    for (let i = 1; i <= 15; i++) {
        const ingredient =
            cocktail[`strIngredient${i}` as keyof typeof cocktail]
        const measurement = cocktail[`strMeasure${i}` as keyof typeof cocktail]

        if (ingredient) {
            if (measurement) {
                ingredientAndMeasure.push(measurement + ' ' + ingredient)
            } else {
                ingredientAndMeasure.push(ingredient)
            }
        }

        ingredientAndMeasureList = ingredientAndMeasure.join(', ')
    }

    const getIngredients = () => {
        const ingredients = []

        for (let i = 1; i <= 15; i++) {
            const ingredient =
                cocktail[`strIngredient${i}` as keyof typeof cocktail]

            if (ingredient) {
                ingredients.push(ingredient)
            }
        }

        onAddIngredients(ingredients)
        setToasterVisible(true)

        setTimeout(() => setToasterVisible(false), 1500)
    }

    return html`
        <link rel="stylesheet" href="/dist/styles.css" />
        <div class="cocktail-list-item">
            <div
                class="image"
                style="background-image: url(${strDrinkThumb});"
            ></div>
            <div class="text">
                <h3>${strDrink}</h3>
                <p>${strInstructions}</p>
                <div class="button-wrapper">
                    <p><span>Ingredients:</span> ${ingredientAndMeasureList}</p>
                    <button @click=${getIngredients} class="add-btn">+</button>
                </div>
            </div>
        </div>
        ${toasterVisible
            ? html`<toaster-component
                  .message=${'Ingredients added to shopping list.'}
                  .className=${'green'}
              ></toaster-component>`
            : ''}
    `
}

customElements.define('cocktail-item-component', component(CocktailItem))
