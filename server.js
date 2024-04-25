const express = require('express')
//const prisma = require('./prisma/client');
const app = express();
const port = 2000;
const prisma = require('./db')
const path = require('path');
const bodyparser = require('body-parser');
app.set('views','views')
app.set('view engine', 'ejs');
app.use(express.json());
// app.use(express.bodyparser());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', async (req, res) => {
  res.render("index", {recipeApp : " Title", content: ''})})


app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: { recipeDetails: true }, // Include related recipe details
    });
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error retrieving recipes' }); // Handle errors gracefully
  }
});


// Route to add a new recipe (POST /api/recipes)
app.post('/api/recipes', async (req, res) => {
  try {
      // Check for missing 'title' property (optional, but recommended)
      if (!req.body.title) {
          return res.status(400).json({ message: 'Missing required property: title' });
      }
     
      const newRecipe = await prisma.recipe.create({
          data: {
              title: req.body.title,
              recipeDetails: { create: { content: req.body.content } }, // Create associated `recipeDetails`
          },
          include: { recipeDetails: true }, // Include related recipe details on creation
         
        });
      res.json(newRecipe);
  } catch (error) {
      console.error('Error adding recipe:', error);
      res.status(500).json({ message: 'Error creating recipe' });
  }
});
















app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
























