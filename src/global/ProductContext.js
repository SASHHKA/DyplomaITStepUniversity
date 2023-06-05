import React,{ createContext } from "react";
import {db} from '../config/Config';

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component{

    state={
        products:[]
    }

    componentDidMount(){
        const prevProducts = this.state.products;
        db.collection('Products').onSnapshot(snapshot=>{
            let changes = snapshot.docChanges();
            changes.forEach(change=>{
                if(change.type==='added'){
                    prevProducts.push({
                        productID: change.doc.id,
                        productName: change.doc.data().productName,
                        productDescription: change.doc.data().productDescription,
                        productCategory: change.doc.data().productCategory,
                        productPrice: change.doc.data().productPrice,
                        productImg: change.doc.data().productImg,
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })
    }
    render(){
        return(
            <ProductsContext.Provider value={{products:[...this.state.products]}}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}
