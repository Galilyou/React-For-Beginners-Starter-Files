import React from "react";

class AddFishForm extends React.Component {
  statusRef = React.createRef();
  nameRef = React.createRef();
  imageRef = React.createRef();
  descRef = React.createRef();
  priceRef = React.createRef();

  createFish = event => {
    event.preventDefault();

    const fish = {
      status: this.statusRef.current.value,
      name: this.nameRef.current.value,
      image: this.imageRef.current.value,
      desc: this.descRef.current.value,
      price: parseFloat(this.priceRef.current.value)
    };

    this.props.addFish(fish);
    // clear out form inputs
    event.currentTarget.reset();
  };
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input type="text" name="name" placeholder="Name" ref={this.nameRef} />
        <input
          type="text"
          name="price"
          placeholder="Price"
          ref={this.priceRef}
        />
        <select name="status" placeholder="Status" ref={this.statusRef}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold out</option>
        </select>
        <textarea name="desc" placeholder="Desc" ref={this.descRef} />
        <input
          type="text"
          name="image"
          placeholder="Image"
          ref={this.imageRef}
        />
        <button type="submit">Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
