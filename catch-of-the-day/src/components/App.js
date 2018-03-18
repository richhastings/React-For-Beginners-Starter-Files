import React from 'react'

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base.js'

class App extends React.Component {

  constructor() {
    super()

    this.addFish = this.addFish.bind(this)
    this.updateFish = this.updateFish.bind(this)
    this.deleteFish = this.deleteFish.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.addToOrder = this.addToOrder.bind(this)

    this.state= {
      fishes: {},
      order: {}
    }
  }

  componentWillMount () {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
  }

  componentWillUnmount () {
    base.removeBinding(this.ref)
  }

  componentWillUpdate (nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }

  addFish(fish) {
    const fishes = {...this.state.fishes}
    fishes[`fish-${Date.now()}`] = fish
    this.setState({ fishes })
  }

  updateFish(key, fish) {
    const fishes = {...this.state.fishes}
    fishes[key] = fish
    this.setState({ fishes })
  }

  deleteFish(key) {
    const fishes = {...this.state.fishes}
    fishes[key] = null
    this.setState({ fishes })
  }

  removeFromOrder(key) {
    const order = {...this.state.order}
    delete order[key]
    this.setState({ order })
  }

  loadSamples() {
    this.setState({fishes: sampleFishes})
  }

  addToOrder(key) {
    const order = {...this.state.order}
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={"Fresh Seafood Market"} />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish id={key} key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order} 
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.Object
}

export default App