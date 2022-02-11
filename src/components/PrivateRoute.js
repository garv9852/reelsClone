import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function PrivateRoute({element:Element,...rest}) {
    const {user}=useContext(AuthContext)
    // console.log(Element);
    
  return (
  <>
    <div>
      {
        user?<Element {...rest}/> : <Navigate to="/login"/>
      }
    </div>
  </>);
}

export default PrivateRoute;


