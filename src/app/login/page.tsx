import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1>JWT Token</h1>
      <form action="" >
        <label htmlFor="" className='px-2'>
          Username:
          <input type="text" placeholder='username' className='text-black outline-none border rounded-lg px-2'/>
        </label>
        <label htmlFor="" className='px-2'>
          Password:
          <input type="text" placeholder='Password' className='text-black outline-none border rounded-lg px-2'/>
        </label>
      </form>
    </div>
  )
}

export default Login
