import React,{useContext, useEffect, useState} from 'react';
import Alert from '@mui/material/Alert';
import MovieIcon from '@mui/icons-material/Movie'; 
import { LinearProgress } from '@mui/material';
import { Button } from '@mui/material';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';
import {v4 as uuidv4} from 'uuid'

function UploadFile(props) {
  const [err,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const {user}=useContext(AuthContext);
  const handleUploadClick=async (file)=>{
    let u=props.user;
    if((file.size/(1024*1024))>100)
    {
      setError("Please select the video under 100MB")
      setTimeout(()=>{
        setError('')
      },3000)
      return
    }
    try{
      setLoading(true)
      console.log(file);
      let uid=uuidv4()
      console.log(uid);
      const uploadtask=storage.ref(`/data/${uid}/${file.name}`).put(file,{contentType:file.type});
      uploadtask.on('state_changed',fn1,fn2,fn3);
      function fn1(snapshot){
        let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
        console.log(`upload is ${progress}`);
      }
      function fn2(error){
        setError("error occured");
        setTimeout(()=>{
          setError('')
        },3000)
        return;
      }
      function fn3(){
        uploadtask.snapshot.ref.getDownloadURL().then(async (url)=>{
          console.log(url);
          let obj={
            likes:[],
            comments:[],
            pId:uid,
            Purl:url,
            uName:u.name,
            uProfile:u.profilePic,
            uId:u.uid,
            createAt:database.getTimeStamp()
          }
          console.log(obj);
          database.posts.add(obj).then(async (ref)=>{
            let res=await database.users.doc(u.uid).update({
              postIds:[...u.postIds,ref.id]
            })
          }).then(()=>{
            setLoading(false)
          }).catch((error)=>{
            setError(`${error}`)
            setLoading(false) 
          })
        })
      }
    }
    catch(error)
    {
      setError(`${error}`)
      setTimeout(()=>{
        setError('')
      },3000)
      setLoading(false)
      return
    }
  }
  return (
  <div style={{marginTop:"5rem",marginBottom:'1rem'}}>
      {
        err!=''?<Alert severity="error">{err}</Alert>:
        <>
          <Button variant="outlined" component="label" disabled={loading}>
            <MovieIcon/>&nbsp; Upload Video
            <input type="file" accept="video/*" hidden id="upload input" onChange={(e)=>handleUploadClick(e.target.files[0])}/>
          </Button>
          {
            loading && <LinearProgress color="secondary" style={{marginTop:'1%'}}/>
          }
        </>
      }
  </div>);
}

export default UploadFile;
