import { html } from 'lit-html'
import { component, useState, useEffect } from 'haunted'

import './components/header/Header'
import './components/cocktail-list/CocktailList'
import './components/shopping-list/ShoppingList'

function App() {
    const [searchedCocktails, setSearchedCocktails] = useState([])
    const [randomCocktail, setRandomCocktail] = useState([])
    const [ingredientsList, setIngredientsList] = useState<string[]>([])
    const [toasterVisible, setToasterVisible] = useState(false)

    const searchCocktails = async (cocktail: string) => {
        const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
        )
        const data = await res.json()
        const searchData = data.drinks

        setSearchedCocktails(searchData)
        setToasterVisible(false)
    }

    const fetchRandomCocktail = async () => {
        const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/random.php`
        )
        const data = await res.json()
        const randomData = data.drinks

        setRandomCocktail(randomData)
    }

    useEffect(() => {
        fetchRandomCocktail()
    }, [])

    const onSearch = (text: string) => {
        setToasterVisible(true)
        searchCocktails(text)
    }

    const onAddIngredients = (ingredients: Array<string>) => {
        setIngredientsList((prevArray = []) => {
            const concatArray = prevArray.concat(ingredients)
            const newArray = [...new Set(concatArray)]

            return newArray
        })
    }

    const removeIngredient = (ingredient: string) => {
        setIngredientsList((prevArray = []) => {
            const newArray = prevArray.filter((item) => item !== ingredient)
            return newArray
        })
    }

    return html`
        <link rel="stylesheet" href="/dist/styles.css" />
        <div>
            <header-component
                .onSearch=${onSearch}
                .toasterVisible=${toasterVisible}
            ></header-component>
            <section class="main-content-wrapper">
                <div class="cocktail-list-wrapper">
                    ${searchedCocktails != null && searchedCocktails.length == 0
                        ? html`<cocktail-list-component
                              .searchedCocktails=${randomCocktail}
                              .onAddIngredients=${onAddIngredients}
                              .headingText=${"Can't decide? Here's a suggestion!"}
                          ></cocktail-list-component>`
                        : html` <cocktail-list-component
                              .searchedCocktails=${searchedCocktails}
                              .onAddIngredients=${onAddIngredients}
                              .headingText=${'Search result'}
                          ></cocktail-list-component>`}
                </div>
                <div class="shopping-list-wrapper">
                    <shopping-list-component
                        .ingredientList=${ingredientsList}
                        .removeIngredient=${removeIngredient}
                    ></shopping-list-component>
                </div>
            </section>
        </div>
    `
}

customElements.define('cocktail-app', component(App))
