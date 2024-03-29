// ----------------- import
import { refit } from '../Utils/filters.js'

// ----------------- DOM
const advancedFiltersMenu = document.getElementById('advancedFilters-list')

// ----------------- functions

// crée un tableau des titres des listes pour affichage en tête de liste
export function createList (array) {
  const listTitleIng = (Object.keys(array[0]))[3]
  const listTitleApp = (Object.keys(array[0]))[6]
  const listTitleUst = (Object.keys(array[0]))[7]
  const listTitles = [listTitleIng, listTitleApp, listTitleUst]
  return listTitles
}

// fabrique plusieurs éléments visuel des filtres avancés
export function createAListFactory () {
  // Avec recipes, fait les listes des différents items et renvoie un objet destructurer
  function makeLists (array) {
    const ingredientsItemsList = [...new Set(array.flatMap(recipe => recipe.ingredients.map((ingred) => ingred.ingredient)).map(e => refit(e)))].sort((a,b) => a.localeCompare(b))
    const applianceItemsList = [...new Set(array.flatMap(recipe => recipe.appliance).map(e => refit(e)))].sort((a,b) => a.localeCompare(b))
    const ustensilsItemsList = [...new Set(array.flatMap(recipe => recipe.ustensils.map(e => refit(e))))].sort((a,b) => a.localeCompare(b))

    const advancedFiltersLists = {
      ingredients: ingredientsItemsList,
      appliance: applianceItemsList,
      ustensils: ustensilsItemsList
    }
    return advancedFiltersLists
  }

  function getListBlock (element) {
    function translate (elt) {
      if (elt === 'ingredients') {
        elt = 'Ingrédients'
        return elt
      } else if (element === 'appliance') {
        elt = 'Appareil'
        return elt
      } else if (element === 'ustensils') {
        elt = 'Ustensiles'
        return elt
      }
    }
    const liBlock = document.createElement('li')
    liBlock.className = 'advancedFilters'
    const divButton = document.createElement('button')
    divButton.setAttribute('class', `advancedFilters-button ${element}-color`)
    const divButtonName = document.createElement('span')
    divButtonName.setAttribute('id', `span-${element}`)
    divButtonName.innerText = translate(element)
    const divButtonSearchBar = document.createElement('input')
    divButtonSearchBar.setAttribute('class', `${element}-color advancedSearch`)
    divButtonSearchBar.setAttribute('type', 'search')
    divButtonSearchBar.setAttribute('data-advanced-filter', element)
    divButtonSearchBar.setAttribute('id', `search-${element}`)
    divButtonSearchBar.setAttribute('placeholder', `Rechercher dans ${element}`)
    const menuBlock = document.createElement('menu')
    menuBlock.setAttribute('class', `${element}-color`)
    menuBlock.setAttribute('id', `${element}-list`)

    advancedFiltersMenu.appendChild(liBlock)
    liBlock.appendChild(divButton)
    divButton.appendChild(divButtonName)
    divButton.appendChild(divButtonSearchBar)
    liBlock.appendChild(menuBlock)
  }

  // fabrique la partie liste des filtres avancés
  function getListTemplate (item, itemTittleList) {
    const listElement = document.createElement('li')
    listElement.setAttribute('class', 'list')
    const listElementButton = document.createElement('button')
    listElementButton.setAttribute('data-advanced-filter', itemTittleList)
    listElementButton.innerText = item

    const menuBlock = document.querySelector(`menu #${itemTittleList}-list`)
    menuBlock.appendChild(listElement)
    listElement.appendChild(listElementButton)
  }

  // fabrique la partie tag des items sélectionnés des filtres avancés
  function getItemTagTemplate (item, itemTittleList) {
    const selectedTag = document.createElement('div')
    selectedTag.className = 'advancedSelectedFilterTag'
    selectedTag.classList.add(`${itemTittleList}-color`)
    const textItem = document.createElement('p')
    textItem.innerText = item
    const tagClosureButton = document.createElement('button')
    const tagClosureI = document.createElement('i')
    tagClosureI.className = 'far fa-times-circle'
    selectedTag.appendChild(textItem)
    selectedTag.appendChild(tagClosureButton)
    tagClosureButton.appendChild(tagClosureI)
    return selectedTag
  }

  return {
    makeLists,
    getListBlock,
    getListTemplate,
    getItemTagTemplate
  }
}
