import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  // surfacing an input from a form to its react-based form submit handler
  // this can be done in several ways, worst of all is directly accessing the DOM
  // using document.querySelector() or similar function.
  // right here: we will do it using refs in react.

  storeNameInput = React.createRef();

  // read about when functions are bound (or mounted) in the react lifecycle.
  // in short, 'this' will not be bound in each method, sometimes you will need
  // bind it yourself int he constructor, like below.
  /* 
  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
  }

  goToStore(event) {
    // STOP FORM SUBMIT TO SERVER
    event.preventDefault();

    console.log(this.storeNameInput.current.value);
  } */

  // or better, don't declare goToStore as method, but rather as a propery: like so
  goToStore = event => {
    // STOP FORM SUBMIT TO SERVER
    event.preventDefault();

    // grab the value from input field
    const storeName = this.storeNameInput.current.value;

    // change route to /store/:storeId
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input
          ref={this.storeNameInput}
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;
