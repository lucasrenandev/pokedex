// ATRIBUINDO OS ELEMENTOS EM SUAS VARIÁVEIS
const pokemonNumber = document.querySelector(".pokemon_number")
const pokemonName = document.querySelector(".pokemon_name")
const pokemonImage = document.querySelector(".pokemon_image")
const form = document.querySelector(".form")
const search = document.querySelector(".search")
const buttonPrev = document.querySelector(".btn_prev")
const buttonNext = document.querySelector(".btn_next")

// VARIÁVEL PARA RENDERIZAR IMAGEM
let renderImage = 1

// FUNÇÃO PARA BUSCAR POKEMON + DADOS (VIA API)
const fetchPokemon = async (pokemon) => {
    const responseAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(responseAPI.status === 200) {
        const dataAPI = await responseAPI.json()
        return dataAPI
    }
}

// FUNÇÃO PARA RENDERIZAR POKEMON + DADOS
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
// CHAMANDO A FUNÇÃO RENDERIZAR POKEMON NO DOCUMENTO
renderPokemon(renderImage)

// ADICIONANDO EVENTO NO FORMULÁRIO
form.addEventListener("submit", (event) => {
     event.preventDefault()
     renderPokemon(search.value.toLowerCase())
})

// FUNÇÃO PARA A IMAGEM ANTERIOR
buttonPrev.addEventListener("click", () => {
    if(renderImage > 1) {
        renderImage = renderImage - 1
        renderPokemon(renderImage)
    }
})

// FUNÇÃO PARA A PRÓXIMA IMAGEM
buttonNext.addEventListener("click", () => {
    renderImage = renderImage + 1
    renderPokemon(renderImage)
})