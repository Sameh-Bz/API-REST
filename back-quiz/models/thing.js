const mongoose = require('mongoose');

// Définition du schéma Mongoose pour un produit
const thingSchema = mongoose.Schema({
  name: { type: String, required: true },        // Nom du produit
  description: { type: String, required: true }, // Description du produit
  price: { type: Number, required: true },       // Prix du produit
  inStock: { type: Boolean, required: true }     // Disponibilité du produit
});

// Exportation du modèle Mongoose
module.exports = mongoose.model('Product', thingSchema); // Notez le nom "Product" pour refléter le contexte
