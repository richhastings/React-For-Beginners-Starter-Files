import React from 'react'

class AddFishForm extends React.Component {

  createFish(event) {
    event.preventDefault()

    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }

    this.props.addFish(fish)
    this.fishForm.reset()
  }

  render() {
    return (
      <form
        className="fish-edit"
        onSubmit={(e) => this.createFish(e)}
        ref={(form) => this.fishForm = form}
      >
        <input
          type="text"
          placeholder="Fish Name"
          ref={(input) => this.name = input}
        />
        <input
          type="text"
          placeholder="Fish Price"
          ref={(input) => this.price = input}
        />
        <select ref={(input) => this.status = input}>
          <option value="available">Available</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          placeholder="Fish Desc"
          ref={(input) => this.desc = input}
        />
        <input
          type="text"
          placeholder="Fish Image"
          ref={(input) => this.image = input}/>
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired
}

export default AddFishForm