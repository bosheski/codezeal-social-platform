'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '../store/AuthProvider';

function FeedPosts() {
 const user = useUser((state) => state.user);
 console.log('user from feed', user)
 return <div>
  Heyy
 </div>
}

export default FeedPosts