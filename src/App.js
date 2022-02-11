import logo from './logo.svg';
import './App.css';
import Feed from './components/Feed';
import { BrowserRouter ,Switch ,Router ,Routes ,Route} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPass from './components/ForgotPass';
import {AuthProvider} from "./Context/AuthContext"
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import Ioa from "./components/Ioa"
function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile/:uid" element={<Profile/>}/>
        <Route path="/" element={<PrivateRoute element={Feed}/>}/>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
