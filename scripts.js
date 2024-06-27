document
  .getElementById("get-all-characters")
  .addEventListener("click", fetchAllCharacters)
document.getElementById("apply-filters").addEventListener("click", applyFilters)

async function fetchAllCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character")
    const data = await response.json()
    displayCharacters(data.results)
    populateFilters(data.results)
  } catch (error) {
    displayError("Error fetching all characters.")
  }
}

function populateFilters(characters) {
  const speciesSet = new Set()
  const typesSet = new Set()

  characters.forEach((character) => {
    if (character.species) speciesSet.add(character.species)
    if (character.type) typesSet.add(character.type)
  })

  const speciesSelect = document.getElementById("species")
  speciesSet.forEach((species) => {
    const option = document.createElement("option")
    option.value = species
    option.text = species
    speciesSelect.appendChild(option)
  })

  const typesSelect = document.getElementById("type")
  typesSet.forEach((type) => {
    const option = document.createElement("option")
    option.value = type
    option.text = type
    typesSelect.appendChild(option)
  })
}

async function applyFilters() {
  const name = document.getElementById("name").value
  const status = document.getElementById("status").value
  const species = document.getElementById("species").value
  const type = document.getElementById("type").value
  const gender = document.getElementById("gender").value

  const query = `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`

  try {
    const response = await fetch(query)
    const data = await response.json()
    displayCharacters(data.results)
  } catch (error) {
    displayError("No se encontro ningun personaje con esos filtros")
  }
}

function displayCharacters(characters) {
  const results = document.getElementById("results")
  results.innerHTML = ""

  if (characters.length === 0) {
    displayError(
      "No se encontraron personajes que coincidan con los filtros aplicados."
    )
    return
  }

  characters.forEach((character) => {
    const characterDiv = document.createElement("div")
    characterDiv.classList.add("character")
    characterDiv.innerHTML = `
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Type: ${character.type}</p>
            <p>Gender: ${character.gender}</p>
            <p>Origin: ${character.origin.name}</p>
            <p>Location: ${character.location.name}</p>
            <img src="${character.image}" alt="${character.name}">
        `
    results.appendChild(characterDiv)
  })
}

function displayError(message) {
  const results = document.getElementById("results")
  results.innerHTML = `<p>${message}</p>`
}
