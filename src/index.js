import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// debug console log messages toggle
var dbm = false;

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

//localStorage.removeItem("recipeData");
// Prep cookie-based recipe storage:
if (typeof(Storage) !== "undefined") {
  if(localStorage.recipeData != null){
    dbm ? console.log("Local storage object already exists!") : null;
    // localStorage.removeItem("recipeData");
  }
  else {
    dbm? console.log("Creating local storage...") : null;
    // stringify and store the object
    localStorage.recipeData = JSON.stringify(recipeData);
  }
  dbm ? console.log("rendering app from local storage...") : null;


  // Render based on local storage after parsing it
  ReactDOM.render(<App data={JSON.parse(localStorage.recipeData)} />, document.getElementById("root"));
} else {
  // Sorry! No Web Storage support..
  dbm ? console.log("No browser support, loading dumy data!") : null;
  // render with dummy data
  ReactDOM.render(<App data={recipeData} />, document.getElementById("root"));
}

// Dummy data structure, pre-browser storage





