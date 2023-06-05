import React, {useState} from 'react'
import {auth, db} from '../config/Config'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const SignUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((cred)=>{
      db.collection('SignedUpUsers').doc(cred.user.uid).set({
        Name: name,
        Email: email,
        Password: password
      }).then(()=>{
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        navigate('/signin')
      }).catch(err=>setError(err.message));
    }).catch(err=>setError(err.message));
  }
  return (
    <div className='container'>
        <br/>
        <h2>Реєстрація</h2>
        <hr/>
        <form autoComplete='off' className='form-group' onSubmit={SignUp}>
            <label htmlFor='Name'>Ім'я</label>
            <br/>
            <input type='text' className='form-control' required onChange={(e)=>setName(e.target.value)} value={name}/>
            <br/>
            <label htmlFor='Email'>Пошта</label>
            <br/>
            <input type='email' className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <br/>
            <label htmlFor='Password'>Пароль</label>
            <br/>
            <input type='password' className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <br/>
            <button type='submit' className='btn btn-success btn-md mybtn'>Зареєструватись</button>
        </form>
        {error && <div className='error-msg'>{error}</div>}
        <br/>
        <span>Вже маєте аккаунт? <Link className='link' to='/signin'>Увійти</Link></span>
    </div>
  )
}
