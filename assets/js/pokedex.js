const pokemonNumber = document.querySelector(".pokemon_number")
const pokemonName = document.querySelector(".pokemon_name")
const pokemonImage = document.querySelector(".pokemon_image")
const form = document.querySelector(".form")
const search = document.querySelector(".search")
const buttonPrev = document.querySelector(".btn_prev")
const buttonNext = document.querySelector(".btn_next")

let renderImage = 1

const fetchPokemon = async (pokemon) => {
    const responseAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(responseAPI.status === 200) {
        const dataAPI = await responseAPI.json()
        return dataAPI
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.textContent = "Loading..."
    pokemonNumber.textContent = ""
    const dataPokemon = await fetchPokemon(pokemon)

    if(dataPokemon) {
        pokemonImage.style.display = "block"
        pokemonNumber.textContent = dataPokemon.id
        pokemonName.textContent = dataPokemon.name
        pokemonImage.src = dataPokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        renderImage = dataPokemon.id
        search.value = ""
    }
    else {
        pokemonImage.style.display = "none"
        pokemonName.textContent = "Not found :c"
        pokemonNumber.textContent = ""
    }
}
renderPokemon(renderImage)

form.addEventListener("submit", (event) => {
     event.preventDefault()
     renderPokemon(search.value.toLowerCase())
})

buttonPrev.addEventListener("click", () => {

    if(renderImage > 1) {
        renderImage = renderImage - 1
        renderPokemon(renderImage)
    }
})

buttonNext.addEventListener("click", () => {
    renderImage = renderImage + 1
    renderPokemon(renderImage)
})