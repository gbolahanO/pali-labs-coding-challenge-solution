import _ from 'lodash'

const getIngredients = function(meal) {
  return _.pick(meal, ['idMeal', 'strIngredient1', 'strIngredient2', 'strIngredient3',
  'strIngredient4', 'strIngredient5', 'strIngredient6', 'strIngredient7',
  'strIngredient8', 'strIngredient9', 'strIngredient10', 'strIngredient11',
  'strIngredient12', 'strIngredient13', 'strIngredient14' ,'strIngredient15',
  'strIngredient16', 'strIngredient17', 'strIngredient18', 'strIngredient19',
  'strIngredient20'
  ])
}

const ingredientsLength = function(meal_id, mealIngredients) {
	let noOfIngredients = 0

  for (const key in mealIngredients) {
    if(typeof mealIngredients[key] === 'string' && mealIngredients[key] !== '') {
      noOfIngredients++
    }
  }
  return {
    meal_id,
    noOfIngredients: noOfIngredients - 1
  }
}

export { getIngredients, ingredientsLength }