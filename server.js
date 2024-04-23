const express = require('express')
//const prisma = require('./prisma/client');
const app = express();
const port = 2000;
const prisma = require('./db')
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

//app.use(express.static('public'));
//app.set('views', path.join( __dirname, 'public'))
// Route to fetch all recipes (GET /recipes)

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











// app.post('/api/recipes', async (req, res) => {
//   try {
//     const newRecipe = await prisma.recipe.create({
//       data: {
//         title: req.body.title,
//         recipeDetails: { create: { content: req.body.content } }, // Create associated `recipeDetails`
//       },
//       include: { recipeDetails: true }, // Include related `recipeDetails` on creation
//     });
//     res.json(newRecipe); // Send the newly created recipe back to the client
//   } catch (error) {
//     console.error('Error adding recipe:', error);
//     res.status(500).json({ message: 'Error creating recipe' }); // Handle errors gracefully
//   }
// });






app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
























// const express = require ('express')
// const ejs = require('ejs');

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// const app = express()
// app.set('view engine', 'ejs');
// app.use(express.static('public'))

// const port =2000;

// app.set("view engine", "ejs")
// app.use(express.json())
// app.use(express.urlencoded)

// // app.get("/",(req,res)=>{
// //   app.get('/recipes', async (req, res) => {
// //     const recipes = await prisma.recipe.findMany();
// //     res.json(recipes);
// //   });
  
// // })

// app.get('/',(req,res)=>{

//   app.get('/recipes', async (req, res) => {
//     try {
//       const recipes = await prisma.recipe.findMany({
//         include: { recipeDetails: true }, // Include related details
//       });
//       res.json(recipes);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error fetching recipes' });
//     }
//   });
// });


// app.post('/', async(req,res)=>{
//   const  { title,content } = req.body;
//   try{
//     const recipeDetails =await prisma.recipeDetails.create({
//       data:{content},
//     })
//     const recipe =await prisma.recipe.create({
//       data: {title,recipeDetails:{connect : {id:recipeDetails.id}}}
//     })
// res.json(recipe);
//   }
//   catch(error){
//     console.error(error);
//     res.status(500).json({message:"error creating recipe"})
//   }
// })
// app.put('/',(req,res)=>{

// })
// app.delete ('/',(req,res)=>{

// })













// app.listen(port,()=>{console.log(`server is running on ${port}`)})