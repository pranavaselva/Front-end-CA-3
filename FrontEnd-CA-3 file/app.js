// fetching the data for random  meal
function RandomMeal(){
    return fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => data.meals[0])
    .catch((error) => {console.log(error)})
}

// for displaying the random meal
async function displayRandomMeal() {
 const radomMeal = document.getElementById('random-meal');
 
 try{
     const meal  = await RandomMeal();
     let image = document.createElement('img');
     let mealName = document.createElement('h3');
     let category = document.createElement('p');

     image.setAttribute('id','meal-image');
     mealName.setAttribute('id','meal-name');
     category.setAttribute('id','category');

     image.src = meal.strMealThumb;
     mealName.textContent = meal.strMeal;
     category.textContent = `Category: ${meal.strCategory}`;

    //  onclick event for recipe and ingredients
     image.addEventListener('click',() => {
        showRecipe(meal);
     })

     radomMeal.appendChild(image);
     radomMeal.appendChild(mealName);
     radomMeal.appendChild(category);

   } catch(error) {
   console.log(error);
  }
}

// for ingredients and recipe
function showRecipe(meal){
    const modal =  document.getElementById('meal-recipe');
    modal.textContent = '';

    const ingredients = document.createElement('div');
    const recipe  = document.createElement('div');
    const title = document.createElement('h3')
    title.textContent = ("Ingredients")
    
    const ingredientsList  = document.createElement('ul');
        // for loop for getting the ingredients from the data
    for (let i=1;i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];

        if (ingredient && ingredient.trim() !== ""){
            const listOfItem = document.createElement('li');
            listOfItem.textContent = ingredient;
            ingredientsList.appendChild(listOfItem);
        }
    }
    ingredients.appendChild(title);
    ingredients.appendChild(ingredientsList);

    // getting the meal recipe
    recipe.innerHTML = `<p>Recipe: ${meal.strInstructions}</p>`;

    // close button for closing the ingredient popup
    const closeBtn = document.createElement('button');
    closeBtn.textContent = "Close"
    closeBtn.addEventListener('click', () =>{
        modal.style.display = 'none';
    });

    modal.appendChild(ingredients);
    modal.appendChild(recipe);
    modal.appendChild(closeBtn);

    modal.style.display = 'block';

}
displayRandomMeal();

// fetching data for searching meal
function searchMeal(userInput){
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${userInput}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        return data.meals;
    })
    .catch((error) => {
         console.log(error);
         throw error;
    })
}

// getting user searched value
let userInput;
const searchBtn = document.getElementById('search-btn')

searchBtn.addEventListener('keypress', async (event) =>{
    if (event.key == 'Enter'){
        userInput= await searchMeal(searchBtn.value);

        displayMeal();
    }
});

// for displaying the searched meal
function displayMeal() {
    const  searchResult = document.getElementById('search-result');

    searchResult.innerHTML = '';

    if(userInput && userInput.length>0){
        userInput.forEach(reuslt => {
            const results = document.createElement('div');
            results.classList.add('containers')

        const resultImage = document.createElement('img');
        const resultMealName = document.createElement('h3');
        const mealCategory = document.createElement('p');

        resultImage.setAttribute('class','result-image');
        resultMealName.setAttribute('class', 'result-mealname');
        mealCategory.setAttribute('class','result-category');

        resultImage.src=reuslt.strMealThumb;
        resultMealName.textContent = reuslt.strMeal;
        mealCategory.textContent = `category: ${searchBtn.value}`;

        results.appendChild(resultImage);
        results.appendChild(resultMealName);
        results.appendChild(mealCategory);

        searchResult.appendChild(results);
      });
    }
    // if the result is not found
     else {
        const resultNotFound = document.getElementById('notfound')
        resultNotFound.innerText = "No result found."
    }
};