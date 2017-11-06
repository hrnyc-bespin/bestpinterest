import React from "react";
import ReactDOM from "react-dom";
const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  ComponentDidMount() {
    this.getData();
  }

  getData() {
    axios.get(url);
  }
  render() {
    return (
      <div>
        <h1>Let us begin</h1>
        <h3>Bespinterest is BestPinterest</h3>
        <Login handleLogin={() => console.log('test')}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
