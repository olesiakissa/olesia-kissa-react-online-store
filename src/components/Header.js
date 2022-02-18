import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../src/static/logo.svg';
import CartModal from './CartModal';

export default class Header extends React.Component {

  toggleMenu(e) {
    const nav = document.querySelector(".primary-navigation");
    const visibility = nav.getAttribute("data-visible");
    if (visibility === "false") {
      nav.setAttribute("data-visible", "true");
      e.target.setAttribute("aria-expanded", "true");
      e.target.innerText = 'Close';
    } else {
      nav.setAttribute("data-visible", "false");
      e.target.setAttribute("aria-expanded", "false");
      e.target.innerText = 'Menu';
    }
  }

  render() {
    const products = 
    this.props.categories.map(
      category => <li key={category} className='flex'>
                    <Link className='nav-link' to={'/'}
                          onClick={this.props.filterProductsByCategory}>
                                  {category}
                    </Link>
                  </li>);
    const header = document.querySelector('.header')
    const headerOffsetHeight = header ? header.offsetHeight : 80
    return (
      <>
      <header className='header flex'>
      <Link to={'/'}>
        <img src={logo} alt='Homepage' className='header-logo'/>
      </Link>

      <select className='btn btn-currency'
              name='currency'
              onChange={this.props.switchCurrency}>
              {this.props.currencies.map(currency => 
                <option key={currency.symbol} value={currency.symbol}>
                  {`${currency.symbol} ${currency.label}`}
                </option>)}
              </select>

      <div className='btn-cart-container'
           onClick={this.props.toggleCartModal}>
        <button aria-label='Open cart modal'
                className='btn btn-cart'></button>
        {this.props.cartItems.length > 0 && 
        <div className='btn-cart-counter flex'>
          {this.props.cartItems.length}
        </div>}        
      </div>

      <button aria-controls='primary-navigation'
              aria-expanded='false'
              className='btn btn-menu' 
              onClick={this.toggleMenu}>Menu</button>
        <nav>
          <ul className='primary-navigation flex' 
              id='primary-navigation'
              data-visible='false'>
              {products}
          </ul>
        </nav>
      </header>
      {this.props.cartModalIsShown && 
      <CartModal cartItems={this.props.cartItems}
                 addToCart={this.props.addToCart}
                 removeFromCart={this.props.removeFromCart}
                 toggleCartModal={this.props.toggleCartModal}
                 currentCurrency={this.props.currentCurrency}
                 selectProductAttributes={this.props.selectProductAttributes}
                 totalPrice={this.props.totalPrice}
                 offsetHeight={headerOffsetHeight}
      />}
      </>
    )
  }
}