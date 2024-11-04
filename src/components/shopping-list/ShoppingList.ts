import { html } from 'lit-html'
import { component, useState } from 'haunted'

import '../../utils/toaster'

interface ShoppingListProps {
    ingredientList: Array<string>
    removeIngredient: Function
}

function ShoppingList({ ingredientList, removeIngredient }: ShoppingListProps) {
    const [toasterVisible, setToasterVisible] = useState(false)

    const handleRemoveIngredient = (ingredient: string) => {
        removeIngredient(ingredient)
        setToasterVisible(true)

        setTimeout(() => setToasterVisible(false), 1500)
    }

    return html`
        <link rel="stylesheet" href="/dist/styles.css" />
        <div class="shopping-list">
            <h2>Shopping list</h2>
            <ul>
                ${ingredientList
                    ? ingredientList.map((ingredient) => {
                          return html`<li>
                              ${ingredient}
                              <button
                                  @click=${() =>
                                      handleRemoveIngredient(ingredient)}
                                  class="delete-btn"
                              >
                                  +
                              </button>
                          </li>`
                      })
                    : ''}
            </ul>
            <div class="print-btn-wrapper">
                ${ingredientList.length > 0
                    ? html`<button
                          @click=${() => window.print()}
                          class="print-btn"
                      >
                          Print list
                      </button>`
                    : 'Your shopping list is empty.'}
            </div>
        </div>
        ${toasterVisible
            ? html`<toaster-component
                  .message=${'Ingredient removed from shopping list.'}
                  .className=${'red'}
              ></toaster-component>`
            : ''}
    `
}

customElements.define('shopping-list-component', component(ShoppingList))
