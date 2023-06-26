import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
// import axios from 'axios'
import clienteAxios from '../config/clienteAxios';


const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetir, setRepetir] = useState('');
  const [alerta, setAlerta] = useState({}); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([nombre, email, password, repetir].includes(''))
    {
        setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
        })
        return; 
    }

    if(password !== repetir)
    {
        setAlerta({
            msg: 'Los passwords no son iguales',
            error: true
        })
        return; 
    }

    if(password.length < 6)
    {
        setAlerta({
            msg: 'El Password es muy corto, agrega minimo 6 caracteres',
            error: true
        })
        return; 
    }

    setAlerta({});

    // Crear el usuario en la API
    try {
      // TODO: Mover hacia un cliente Axios
        const {data} = await clienteAxios.post(`/usuarios`, {
            nombre,
            email,
            password
        })
        setAlerta({
            msg: data.msg,
            error: false
        })

        setNombre('');
        setEmail('');
        setPassword('');
        setRepetir('');

    } catch (error) {
        setAlerta({
            msg: error.response.data.msg,
            error: true
        })
    }
  }

  const { msg } = alerta; 
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Crea tu Cuenta y administra tus {' '}<span className='text-slate-700'>proyectos</span></h1>
      {msg && <Alerta alerta={alerta} />}
      <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
        <div className='my-5'>
            <label 
                className='uppercase text-gray-600 block text-xl font-bold'
                htmlFor='name'
            >Nombre</label>
            <input id='name' value={nombre} type="text" placeholder='Tu Nombre' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' onChange={e => setNombre(e.target.value)}/>
        </div>
        <div className='my-5'>
          <label 
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='email'
          >Email</label>
          <input id='email' value={email} type="email" placeholder='Email de Registro' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className='my-5'>
          <label 
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='password'
          >Password</label>
          <input id='password' value={password} type="password" placeholder='Password de Registro' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className='my-5'>
          <label 
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='password2'
          >Confirmar Password</label>
          <input id='password2' value={repetir} type="password" placeholder='Repetir tu password' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' onChange={e => setRepetir(e.target.value)}/>
        </div>
        <input
          type='submit'
          value='Crear Cuenta'
          className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
      
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/'
        >
          Ya tienes una cuenta? Inicia sesion
        </Link>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/olvide-password'
        >
          Olvide mi Password
        </Link>
      </nav>
    </>
  )
}

export default Registrar