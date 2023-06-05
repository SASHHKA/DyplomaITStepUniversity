import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { AddProducts } from "./components/AddProducts";
import { ProductsContextProvider } from "./global/ProductContext";
import { CartContextProvider } from "./global/CartContext";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import {auth, db} from "./config/Config"

export class App extends Component {

  state={
    user: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('SignedUpUsers').doc(user.uid).get().then(snapshot=>{
          this.setState({
            user: snapshot.data().Name
          })
        })
      }
      else{
        this.setState({
          user:null
        })
      }
    })
  }

  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home user={this.state.user}/>} />
              <Route path="/addproducts" element={<AddProducts/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/signin" element={<SignIn/>} />
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  }
}

export default App;

