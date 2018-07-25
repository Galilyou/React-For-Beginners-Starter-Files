import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  addFish = fish => {
    // don't directly update state.fishes (state in react is supposed to be immutable, i think)
    // instead, use setState

    // 1. copy existing fishes
    const fishes = { ...this.state.fishes };

    // 2. add the current fish
    fishes[`fish${Date.now()}`] = fish;

    console.log(fishes);
    // 3. update this.state
    this.setState({
      fishes: fishes
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
