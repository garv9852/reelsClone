import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase';
import Navbar from './Navbar';
import Post from './Post';
import UploadFile from './UploadFile';
function Feed() {
  const {user,logout}=useContext(AuthContext);
  const [userData,setUser]=useState('');
  useEffect( ()=>{
    const unsub=database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setUser(snapshot.data());
    })
  },[user])
  return (
    <>
    <Navbar userData={userData}/>
       <div style={{display:'flex',justifyContent:"center",alignItems:"center",flexDirection:'column'}}>  
          <UploadFile user={userData}/>
          <Post user={userData}/>
       </div>
    </>
  );
}

export default Feed;
