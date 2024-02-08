"use client"
import { authenticate } from '@/app/utils/action'
import styles from './loginForm.module.css'
import { useState } from 'react'

const LoginForm = () => {

    const [err, setErr] = useState()

    const handleLogin = async (formData) =>{
        const data = await authenticate(formData)
        data.error && setErr(data.error)
    }

  return (
    <div className={styles.container}>
     <form action={handleLogin} className={styles.form}>
        <h1>Login</h1>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Login</button>
        {err && err}
      </form>    
    </div>
  )
}

export default LoginForm