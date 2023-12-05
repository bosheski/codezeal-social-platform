'use client';
import { useRouter } from 'next/navigation';
import styles from "./Login.module.scss";
import React from 'react';
import { useForm } from 'react-hook-form';

const Login = ({ loginUser }) => {

 const router = useRouter();
 const { register, handleSubmit, formState: { errors } } = useForm();
 const onSubmit = (data) => {
  loginUser(data);
 }

 return (
  <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
   <div>
    <label>Email</label>
    <input type="text" {...register("email")} />
   </div>
   <div>
    <label>Password</label>
    <input type="password" {...register("password")} />
   </div>
   <div>
    <label></label>
    <button type="submit">Login</button>
   </div>
  </form>
 );
};

export default Login;