// Importation du module Express
const express = require('express');

// Création d'une application Express
const app = express();

// Importation de Mongoose pour la gestion de MongoDB
const mongoose = require('mongoose');

// Importation du modèle Mongoose "Product"
const Product = require('./models/thing');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://<db_username>:<db_password>@cluster1.6sgxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Middleware pour gérer les en-têtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// ** ROUTES **

// Route POST pour créer un produit
app.post('/api/products', (req, res) => {
  const product = new Product({ ...req.body });
  product.save()
    .then((createdProduct) => res.status(201).json({ product: createdProduct }))
    .catch((error) => res.status(400).json({ error }));
});

// Route GET pour récupérer tous les produits
app.get('/api/products', (req, res) => {
  Product.find()
    .then((products) => res.status(200).json({ products }))
    .catch((error) => res.status(400).json({ error }));
});

// Route GET pour récupérer un produit par ID
app.get('/api/products/:id', (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Produit introuvable' });
      }
      res.status(200).json({ product });
    })
    .catch((error) => res.status(400).json({ error }));
});

// Route PUT pour modifier un produit
app.put('/api/products/:id', (req, res) => {
  Product.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Modified!' }))
    .catch((error) => res.status(400).json({ error }));
});

// Route DELETE pour supprimer un produit
app.delete('/api/products/:id', (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!' }))
    .catch((error) => res.status(400).json({ error }));
});

// Exportation de l'application Express
module.exports = app;
