import React from 'react'
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super()
    this.renderInventory = this.renderInventory.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e, key) {
    const fish = this.props.fishes[key]
    const updatedFish = {...fish, [e.target.name]:  e.target.value}
    this.props.updateFish(key, updatedFish)
  }

  renderInventory(key) {
    const fish = this.props.fishes[key]
    return (
      <div className="fish-edit" key={key}>
        <input onChange={(e) => this.handleChange(e, key)} type="text" value={fish.name} name="name" placeholder="Fish Name" />
        <input onChange={(e) => this.handleChange(e, key)} type="text" value={fish.price} name="price" placeholder="Fish Price" />
        <select onChange={(e) => this.handleChange(e, key)} type="text" value={fish.status} name="status" placeholder="Fish Status">
          <option value="available">Available</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea onChange={(e) => this.handleChange(e, key)} type="text" value={fish.desc} name="desc" placeholder="Fish Desc" / >
        <input onChange={(e) => this.handleChange(e, key)} type="text" value={fish.image } name="image" placeholder="Fish Image" />
        <button onClick={() => this.props.deleteFish(key)}>Remove Fish</button>
      </div>
    )
  }


  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory) }
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Samples</button>
      </div>
    )
  }
}

export default Inventory