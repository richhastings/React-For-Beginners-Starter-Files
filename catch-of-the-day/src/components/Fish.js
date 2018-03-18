import React from 'react'
import { formatPrice } from '../helpers'

class Fish extends React.Component {
  render() {
    const { details, addToOrder, id } = this.props
    const isAvailable = details.status === 'available'
    const buttonText = isAvailable ? 'Add to order':'Sold Out!'

    return (
      <li className="menu-fish">
        <img src={details.image} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => addToOrder(id)}
        >
          {buttonText}
        </button> 
      </li>
    )
  }
}

Fish.propTypes = {
  details: React.PropTypes.object,
  addToOrder: React.PropTypes.func,
  id: React.PropTypes.string
}

export default Fish