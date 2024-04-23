const recipeForm = document.getElementById('recipe-form');
const recipeList = document.getElementById('recipes-list');

async function getRecipes() {
  try {
    const response = await fetch('/api/recipes');
    const recipes = await response.json();
    displayRecipes(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

function displayRecipes(recipes) {
  recipeList.innerHTML = ''; // Clear existing list items before displaying new data
  recipes.forEach(recipe => {
    const listItem = document.createElement('li');
    listItem.textContent = `${recipe.title} - ${recipe.recipeDetails.content}`;
    recipeList.appendChild(listItem);
  });
}

async function addRecipe(formData) {
  try {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });

    const newRecipe = await response.json();
    displayRecipes([newRecipe]); // Add the newly created recipe to the list
    recipeForm.reset(); // Clear form after successful submission
  } catch (error) {
    console.error('Error adding recipe:', error);
    // Consider displaying an error message to the user
  }
}

recipeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  await addRecipe(Object.fromEntries(formData.entries())); // Convert FormData to object
  getRecipes(); // Fetch and re-display all recipes (including the newly added one)
});

getRecipes(); // Fetch recipes on page load
