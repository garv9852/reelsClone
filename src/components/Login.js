import * as React from 'react';
import {useContext,useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./Signup.css"
import insta from "../assests/instagram.png"
import bg from "../assests/mobile.png"
import  {Link,useNavigate}  from 'react-router-dom';
import "../components/Login.css"
import img1 from "../assests/img1.jpg"
import img2 from "../assests/img2.jpg"
import img3 from "../assests/img3.jpg"
import img4 from "../assests/img4.jpg"
import img5 from "../assests/img5.jpg"
import img6 from "../assests/img6.jpg"
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase';


export default function Login() { 
  const useStyles=makeStyles({
    text1:{
      color:'grey',
      textAlign:"center",
      textDecoration:"0"
    },
    alert1:{
      padding:"0px 16px"
    },
  })
  const classes=useStyles();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(null);
  const {login}=useContext(AuthContext);
  const history=useNavigate();
  let handleClick=async ()=>{
    try{
        if(email=='' || password=='')
        {
            setErr("Invaild Creditionals")
            setTimeout(()=>{
                setErr('');
            },3000)
            return;
        }
        setLoading(true)
        let data=await login(email,password);
        history('/');
        setLoading(false)
    }
    catch(error)
    {
        setErr(error);
        setTimeout(()=>{
            setErr('');
        },3000)
        setLoading(false);
        console.log(error)
        return;
    }
  }
  return (
    <div className="loginWrapper">
        <div className='imgcard' style={{"backgroundImage":`url(`+bg+`)`,"backgroundSize":"cover"}}>
            <div className='card'>
                <CarouselProvider
                    visibleSlides={1}
                    totalSlides={6}
                    naturalSlideWidth={238}
                    naturalSlideHeight={423}
                    hasMasterSpinner
                    isPlaying={true}
                    infinite={true}
                    dragEnabled={false}
                    touchEnabled={true}

                >
                    <Slider>
                    <Slide index={0}><Image src={img1}/></Slide>
                    <Slide index={1}><Image src={img6}/></Slide>
                    <Slide index={2}><Image src={img4}/></Slide>
                    <Slide index={3}><Image src={img5}/></Slide>
                    <Slide index={4}><Image src={img3}/></Slide>
                    <Slide index={5}><Image src={img2}/></Slide>
                    </Slider>
                </CarouselProvider>
            </div>
        </div>
        <div className='loginCard'>
            <Card variant="outlined">
            <div className='instaLogo'>
                <img src={insta}></img>
            </div>
                <CardContent>
                {
                    err!='' && <Alert className={classes.alert1} severity="error">{err}</Alert>
                }
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense'size='small' value={email} onChange={(e)=>{setEmail(e.target.value)}}/> 
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense'size='small' value={password} onChange={(e)=>{setPassword(e.target.value)}}/> 
                <Link to="/forgot-password"><Typography color="primary" className={classes.text1} margin="dense">
                    Forget Password?
                </Typography></Link>
                </CardContent>
            <CardActions>
            <Button variant="contained" fullWidth={true} onClick={handleClick} disabled={loading}>Log In</Button>
            </CardActions>
            </Card>
            <Card variant='oulined'>
            <CardContent>
                <Typography className={classes.text1} variant="subtitle1" margin="dense">
                Don't Have an account ? <Link to="/signup" style={{"textDecoration":"none","color":"blue","fontWeight":"550"}}>Sign Up</Link> 
                </Typography>
            </CardContent>
            </Card>
        </div>
    </div>
  );
}