import * as React from 'react';
import { useState ,useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';
import "./Signup.css"
import insta from "../assests/instagram.png"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import  {Link ,useNavigate}  from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { storage, database } from '../firebase';



export default function Signup() {
  const useStyles=makeStyles({
    text1:{
      color:'grey',
      textAlign:"center"
    },
    alert1:{
      padding:"0px 16px"
    }
  })
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [file,setFile]=useState(null);
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(null);
  const history=useNavigate();
  const classes=useStyles();
  const {signup}=useContext(AuthContext);

  let handleClick=async ()=>{
    if(file==null){
      setErr("Upload a Profile Photo");
      setTimeout(()=>{
        setErr('')
      },3000)
      return;
    } 
    try{
      setErr('');
      setLoading(true);
      let userObj=await signup(email,password);
      let uid=userObj.user.uid
      const uploadtask=storage.ref(`/data/${uid}/profile-pic`).put(file);
      uploadtask.on('state_changed',fn1,fn2,fn3)
      setLoading(true)
      function fn1(snapshot){
          let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
          console.log(`upload is ${progress}`);
      }
      function fn2(error){
        setErr("Upload a Profile Photo");
        setTimeout(()=>{
          setErr('')
        },3000)
        return;
      }
      async function fn3(snapshot){
          let url=[];
          let x=await uploadtask.snapshot.ref.getDownloadURL().then((u)=>{
            return u;
          })
          console.log(x);
          await database.users.doc(uid).set({
            name:name,
            email:email,
            password:password,
            uid:uid,
            profilePic:x,
            postIds:[],
            createdAt:database.getTimeStamp()
          })
          setLoading(false);
          history('/')
      }
    }
    catch(error){
      setErr(error);
      setTimeout(()=>{
        setErr('')
      },3000)
      console.log(error);
      return;
    }
  }
  return (
    <div className="signupWrapper">
      <div className='signupCard'>
        <Card variant="outlined">
          <div className='instaLogo'>
            <img src={insta}></img>
          </div>
            <CardContent>
              <Typography className={classes.text1}variant="subtitle1">
                Sign up to see photos and vidoes from your friends
              </Typography>
              {
                err!='' && <Alert className={classes.alert1} severity="error">{err}</Alert>
              }
              <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense'size='small' value={email} onChange={(e)=>{setEmail(e.target.value)}}/> 
              <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense'size='small' value={password} onChange={(e)=>{setPassword(e.target.value)}}/> 
              <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense'size='small' value={name} onChange={(e)=>{setName(e.target.value)}}/> 
              <Button variant="outlined" fullWidth={true} margin="dense" startIcon={<CloudUploadIcon/>} component="label">
              Upload Profile Image
              <input type="file" accept="image/*" hidden onChange={(e)=>{setFile(e.target.files[0])}}/>
              </Button>
            </CardContent>
          <CardActions>
          <Button disabled={loading} variant="contained" fullWidth={true} onClick={handleClick}>Sign In</Button>
          </CardActions>
        </Card>
        <Card variant='oulined'>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1" margin="dense">
              Having an account ? <Link to="/login" style={{"textDecoration":"none","color":"blue","fontWeight":"550"}}>Log In</Link> 
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}