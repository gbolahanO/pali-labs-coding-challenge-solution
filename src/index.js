import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import _ from 'lodash'
import { getIngredients, ingredientsLength } from '../utils/utils'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/api/?', async function(req, res) {
  const { meal_one, meal_two, meal_three } = req.query
  let meals = {}

  // get the meals for meal 1 - 3
  let mealOne = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_one}`)
  let mealTwo = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_two}`)
  let mealThree = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_three}`)

  // select data for meal one
  let singleMealOne = mealOne.data.meals[0]
  let mealOneIngredients = getIngredients(singleMealOne)

  // select data for meal two
  let singleMealTwo = mealTwo.data.meals[0]
  let mealTwoIngredients = getIngredients(singleMealTwo)

  // select data for meal three
  let singleMealThree = mealThree.data.meals[0]
  let mealThreeIngredients = getIngredients(singleMealThree)

  // get the the lenths of the ingredients
  const mealOneLength = ingredientsLength(meal_one, mealOneIngredients)
  const mealTwoLength = ingredientsLength(meal_two, mealTwoIngredients)
  const mealThreeLength = ingredientsLength(meal_three, mealThreeIngredients)

  meals = {
    mealOneLength,
    mealTwoLength,
    mealThreeLength
  }

  // initialize an empty array and remove the keys assigned to the meals object above
  let mealWithoutKey = []
  Object.keys(meals).map(function(value) {
    mealWithoutKey.push(meals[value])
  })

  // sort the meals on the number of ingredients from smallest to largest order
  mealWithoutKey.sort((a, b) => {
    let i = a.noOfIngredients
    let j = b.noOfIngredients
    if (i > j) {
      return true
    } else {
      return false
    }
  })

  // since the array would be in ascending order send the first item in the array
  res.send(mealWithoutKey[0])

})

app.listen(3000, function() {
  console.log("Server started on port: 3000")
})