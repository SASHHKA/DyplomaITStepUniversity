import React, {useState} from 'react'
import {auth} from '../config/Config'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const SignIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then(()=>{
      setEmail('');
      setPassword('');
      setError('');
      navigate('/')
    }).catch(err=>setError(err.message));
  }

  return (
    <div className='container'>
        <br/>
        <h2>Вхід</h2>
        <hr/>
        <form autoComplete='off' className='form-group' onSubmit={SignIn}>
            <label htmlFor='Email'>Пошта</label>
            <br/>
            <input type='email' className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <br/>
            <label htmlFor='Password'>Пароль</label>
            <br/>
            <input type='password' className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <br/>
            <button type='submit' className='btn btn-success btn-md mybtn'>Увійти</button>
        </form>
        {error && <div className='error-msg'>Неправильна пошта чи пароль</div>}
        <br/>
        <span>Не маєте аккаунту? <Link className='link' to='/signup'>Реєстрація</Link></span>
    </div>
  )
}
