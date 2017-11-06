import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Let us begin</h1>
        <h3>Bespinterest is BestPinterest</h3>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));