import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modelOpen: false,
        modelProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }
    componentDidMount() {
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return { products: tempProducts };
        });
    };

    getDetail(id) {
        return this.state.products.find(item => item.id === id);
    }

    handleDetail = (id) => {
        const product = this.getDetail(id);
        this.setState(() => {
            return ({ detailProduct: product });
        })
    }
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getDetail(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return { products: tempProducts, cart: [...this.state.cart, product] }
        }, () => {
            this.addTotals();
        });

    }
    openModel = id => {
        const product = this.getDetail(id);
        this.setState(() => {
            return { modelProduct: product, modelOpen: true }
        });
    }
    closeModel = () => {
        this.setState(() => {
            return { modelOpen: false }
        });
    }
    increment = (id) => {
        console.log("this is increment method");
        let tempCart = [...this.state.cart];
        let product = tempCart.find(item => item.id === id);
        product.count = product.count + 1;
        console.log(product.count);
        product.total = product.count * product.price;
        this.addTotals();
    }
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        let product = tempCart.find(item => item.id === id);
        product.count = product.count - 1;
        if(product.count===0){
            this.removeItem(id);
        }
        product.total = product.count * product.price;
        this.addTotals();
    }
    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getDetail(id));
        const removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        },()=>{
            this.addTotals();
        });
        console.log("this is removeItem method");
    }
    clearCart = () => {
        this.setState(() => {
            return { cart: [] }
        }, () => {
            this.setProducts();
            this.addTotals();
        });
    }
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => subTotal += item.total);
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = tax + subTotal;
        this.setState(() => {
            return { cartSubTotal: subTotal, cartTax: tax, cartTotal: total }
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModel: this.openModel,
                closeModel: this.closeModel,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart

            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };