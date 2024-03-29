// pour les suites de caractères, supprimer espaces et mettre en case minuscule
const refit = x => x.trim().toLowerCase()

// renvoie une liste de recettes filtrée avec e de l'event listener, et en array: Recipes
export function filterThroughMainInput (e, array) {
  const filteredArrayDescription = array.filter(recipe => refit(recipe.description).includes(refit(e.target.value)))
  const filteredArrayName = array.filter(recipe => refit(recipe.name).includes(refit(e.target.value)))
  const filteredArrayIngredients = array.filter(recipe => recipe.ingredients.some(ing => refit(ing.ingredient).includes(refit(e.target.value))))
  const setOfMainSearchInput = [...new Set([...filteredArrayDescription, ...filteredArrayName, ...filteredArrayIngredients])]
  return setOfMainSearchInput
}
export function filterAdvancedItemsListThroughAdvancedInput (value, title, listArray) {
  if (title === 'appliance') {
    const filteredWithInputInAppliance = (listArray.appliance).filter(item => item.includes(refit(value)))
    return filteredWithInputInAppliance
  } else if (title === 'ustensils') {
    const filteredWithInputInUstensils = (listArray.ustensils).filter(item => item.includes(refit(value)))
    return filteredWithInputInUstensils
  } else if (title === 'ingredients') {
    const filteredWithInputInIngredients = (listArray.ingredients).filter(item => item.includes(refit(value)))
    return filteredWithInputInIngredients
  }
}
export function filterThroughAdvancedField (value, array, title) {
  if (title === 'appliance') {
    const filteredArrayAppliance = array.filter(recipe => refit(recipe.appliance).includes(refit(value)))
    return filteredArrayAppliance
  } else if (title === 'ustensils') {
    const filteredArrayUstensils = array.filter(recipe => recipe.ustensils.some(app => refit(app).includes(refit(value))))
    return filteredArrayUstensils
  } else if (title === 'ingredients') {
    const filteredAdvancedArrayIngredients = array.filter(recipe => recipe.ingredients.some(ing => refit(ing.ingredient).includes(refit(value))))
    return filteredAdvancedArrayIngredients
  }
}

export function intersection (array) {
  let intersectionArray = array[0]
  for (let i = 0; i < array.length - 1; i++) {
    intersectionArray = array[i + 1].filter(element => intersectionArray.includes(element))
  }
  return intersectionArray
};

export { refit }
