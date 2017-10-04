import React from 'react';


function listify(stringData) {
  var arrayed = stringData.split(", ");
  console.log("Arrayed: ");
  console.log(arrayed);
  return(arrayed);
  //var res = str.split(" ");
  //return ["test"];
}

class TitleBox extends React.Component {
  render() {
    return <h3 className="text-center"><strong>{this.props.title}</strong></h3>;
  }
}

class RecipeTable extends React.Component {
  render() {
    var rows = [];
    var recipes = this.props.data;
    // build the rows from the data
    for (let a = 0; a < recipes.length; a++) {
      // console.log("Woah!");
      var builtRow = (
        <tr>

          <td className="text-center">
            {recipes[a].name}
          </td>

          <td>
            <ul>
              {recipes[a].ingr.map(ingredient => <li>{ingredient}</li>)}
            </ul>
          </td>

          <td className="text-center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.handleChange}
              id={"d" + a}
            >
              Delete
            </button>
          </td>

        </tr>
      );
      rows.push(builtRow);
    }
    return (
      <table className="table table-bordered table-hover">
        <tbody>
          <tr className="text-center">
            <td><strong>Recipe</strong></td>
            <td><strong>Ingredients</strong></td>
            <td><strong>Modify</strong></td>
          </tr>
          {rows}
        </tbody>
      </table>
    );
  }
}

class AddNewRecipeBox extends React.Component {
  render() {
    return (
      <div>
        <h3>Add a recipe to the box</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <label for="Name">Recipe Name:</label>
            <input
              type="text"
              className="form-control"
              id="rname"
              onChange={this.props.handleChange}
              value={this.props.rname}
            />
          </div>
          <div className="form-group">
            <label for="ingr">Ingredients (separate multiple ingredients with a comma)</label>
            <input
              type="text"
              className="form-control"
              id="ingr"
              onChange={this.props.handleChange}
              value={this.props.ingr}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <br />

      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    // bind handle functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // initial state is seeded from hard coded data
    this.state = { data: this.props.data, rname: "", ingr: "" };
    // binding this
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Submit pressed!");

    var oldList = this.state.data;
    //console.log("OldList: " + oldList[0]);
    // transform the ingredients list into an array
    var listo = listify(this.state.ingr);
    //console.log(listo);
    oldList.push({ name: this.state.rname, ingr: listo });
    //console.log("OldList: " + oldList[3].name);
    this.setState({ data: oldList, rname: "", ingr: "" });
    // alert("submit button pressed");
  }

  handleChange(event) {
    // Decide what to do based on the id of what was clicked.
    // event.preventDefault();
    console.log("Handle Change was called!");
    // console.log("rname is: " + event.target.value + ". ID is: " + event.target.id);
    console.log(event.target.id + " was the event's id");
    if (event.target.id === "rname") {
      this.setState({ rname: event.target.value });
    }
    if (event.target.id === "ingr") {
      this.setState({ ingr: event.target.value });
    }
    // if the change was a delete request
    if (event.target.id[0] === "d") {
      var targetIndex = parseInt(event.target.id[1], 10);
      var oldList = this.state.data.slice();
      console.log("Current list: ");
      console.log(this.state.data);
     // console.log(oldList);
      oldList.splice(targetIndex, 1);
      console.log("New list: ");
      console.log(oldList);
      this.setState({data: oldList});
      //this.setState({data: {}})
    }

    // if the event was the delete button being pressed
    // delete!
  }

  render() {
    return (
      <div>
        <br />
        <TitleBox title="Recipe Box" />
        <h4 className="text-center">A recipe box app in React!</h4>
        <br />
        <RecipeTable data={this.state.data} handleChange={this.handleChange} />
        <AddNewRecipeBox
          rname={this.state.rname}
          ingr={this.state.ingr}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }

  componentDidUpdate() {
    console.log("Hello! My state change, and so I updated!");
    // Check for localStorage object availibility, persist data if it exists
    if (typeof(Storage) !== "undefined") {
      localStorage.recipeData = JSON.stringify(this.state.data);
    }
  }
}


// make the app component available to the main app
export default App;
