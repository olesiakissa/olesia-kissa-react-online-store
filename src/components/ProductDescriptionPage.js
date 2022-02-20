import React from 'react';

export default class ProductDescriptionPage extends React.Component {

  componentDidMount() {
    document.querySelector('.pdp-description').innerHTML = this.props.product.description;
  }

  render() {
    const currentItemPrice = this.props.product.prices.find(
      price => price.currency.symbol === this.props.currentCurrency).amount;
    return (
      <div className={`pdp-product-container flex`}>
        <img src={this.props.product.gallery[0]} 
            alt={this.props.product.name}
            className='pdp-image' />
      <h1 className="pdp-product-name">{this.props.product.name}</h1>
      <div className='check-alert' 
      style={{display: !this.props.product.inStock ? 'block' : 'none'}}>
        Currently unavailable for purchase
      </div>
      {this.props.product.attributes.length > 0 && 
      this.props.product.attributes.map(attribute => {
        if (attribute.name === 'Color') {
          return (<div className='pdp-attributes pdp-colors-container'>
          <h2 className='attr-name'>{attribute.name}:</h2>
          <div className='color-swatches pdp-attr-buttons flex'>
            {
              attribute.items.map(color => 
              <button aria-label={color.displayValue}
                      style={{backgroundColor: `${color.value}`}}
                      className='pdp-color-swatch'>
              </button>)
            }
          </div>
        </div>)
        } else if (attribute.name === 'Capacity') {
          return (
            <div className='pdp-attributes pdp-capacity-container'>
              <h2 className='attr-name'>{attribute.name}:</h2>
              <div className='capacity pdp-attr-buttons flex'>
              {attribute.items.map(capacity => 
              <button className='pdp-button'>{capacity.value}</button>
              )}
              </div>
            </div>
          )
        } else if (attribute.name === 'Size') {
          return (
            <div className='pdp-attributes pdp-sizes-container'>
              <h2 className='attr-name'>{attribute.name}:</h2>
              <div className='sizes pdp-buttons flex'>
              {attribute.items.map(size => 
              <button className='pdp-button'>{size.value}</button>)}
              </div>
            </div>            
          )
        }
      })}
      <div className='pdp-price-container'>
        <h2 className='pdp-price'>Price:</h2>
        <p>{`${this.props.currentCurrency}${currentItemPrice}`}</p>
      </div>
      <button className='pdp-btn-addToCart'
              onClick={() => this.props.addToCart(this.props.product)}
              disabled={!this.props.product.inStock ? true : false}>add to cart</button>
      <div className='pdp-description'>
      </div>   
      </div>
    )
  }
}