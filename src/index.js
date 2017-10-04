import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Dummy data structure
var recipeData = [
  {
    name: "Rice and Beans",
    ingr: ["Rice", "Beans"]
  },
  {
    name: "Mediocre Spaghetti",
    ingr: ["Spaghetti", "Sauce from a jar", "Frozen meatballs"]
  },
  {
    name: "Salad",
    ingr: ["Lettuce", "Tomatoes", "Salad dressing"]
  }
];


ReactDOM.render(<App data={recipeData} />, document.getElementById("root"));

