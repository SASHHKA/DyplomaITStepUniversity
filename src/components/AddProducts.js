import React, { useState } from "react";
import {storage, db} from '../config/Config'

export const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState("");

  const types = ['image/png', 'image/jpeg']
  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if(selectedFile && types.includes(selectedFile.type)) {
        setProductImg(selectedFile);
        setError('');
    }
    else{
        setProductImg(null);
        setError('Будь-ласка оберіть інший тип зображення: jpeg, png')
    }
  }

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(productName, productDescription, productPrice, productImg)
    const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
    uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        console.log(progress)
    }, err=>{
        setError(err.message)
    },()=>{
        storage.ref('product-images').child(productImg.name).getDownloadURL().then(url=>{
            db.collection('Products').add({
                productName: productName,
                productDescription: productDescription,
                productCategory: productCategory,
                productPrice: Number(productPrice),
                productImg: url
            }).then(()=>{
                setProductName('');
                setProductDescription('');
                setProductCategory('');
                setProductPrice(0);
                setProductImg('');
                setError('');
                document.getElementById('file').value = '';
            }).catch(err=>setError(err.message))
        })
    })
  }

  return (
    <div className="container">
      <br />
      <h2>Додати Товар</h2>
      <hr />
      <form
        autoComplete="off"
        className="form-group" onSubmit={addProduct}
      >
        <label htmlFor="product-name">Назва товару</label>
        <br />
        <input type="text" className="form-control" required
        onChange={(e) => setProductName(e.target.value)} value={productName} />
        <br />
        <label htmlFor="product-description">Опис товару</label>
        <br />
        <input type="text" className="form-control" required
        onChange={(e) => setProductDescription(e.target.value)} value={productDescription} />
        <br />
        <label htmlFor="product-description">Категорія товару</label>
        <br />
        <input type="text" className="form-control" required
        onChange={(e) => setProductCategory(e.target.value)} value={productCategory} />
        <br />
        <label htmlFor="product-price">Ціна товару</label>
        <br />
        <input type="number" className="form-control" required
        onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
        <br />
        <label htmlFor="product-img">Фото товару</label>
        <br />
        <input
          type="file"
          className="form-control" onChange={productImgHandler} id='file' />
        <br />
        <button className="btn btn-success btn-md mybtn">Додати</button>
      </form>
      {error && <span>{error}</span>}
    </div>
  );
};
