'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

const Signup = ({ createUser }: any) => {
 const { register, handleSubmit, formState: { errors } } = useForm();

 const onSubmit = (data) => {
  createUser(data);
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   <div className="form-control">
    <label>Email</label>
    <input type="text" name="email" {...register("email")} />
   </div>
   <div className="form-control">
    <label>Password</label>
    <input type="password" name="password" {...register("password")} />
   </div>
   <div className="form-control">
    <label></label>
    <button type="submit">Sign Up</button>
   </div>
  </form>
 );
};

export default Signup;