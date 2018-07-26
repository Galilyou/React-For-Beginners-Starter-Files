import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = JSON.parse(localStorage.getItem(params.storeId));

    if (localStorageRef) {
      this.setState({ order: localStorageRef });
    }

    this.dbRef = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    // clean up and stop listening to changes
    // if you don't do this, memory leaks happen, think of it like unsubscribing
    // to events in .NET
    base.removeBinding(this.dbRef);
  }

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

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    // 1. get a copy of state.order
    const order = { ...this.state.order };
    // 2. add the new key that was sent to it
    order[key] = order[key] + 1 || 1;
    // 3. setState with the new copy
    this.setState({
      order: order
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
