import "./Profile.css"
import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import Navbar from './Navbar';
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import { CircularProgress, Typography } from '@mui/material';
function Profile() {
    const {uid}=useParams();
    const [userData,setUserData]=useState(null);
    const [posts,setPost]=useState(null)
    useEffect(()=>{
        database.users.doc(uid).onSnapshot((snap)=>{
            setUserData(snap.data())
        })
    },[uid])
    useEffect(async ()=>{
        if(userData==null)
            return;
        let parr=[];
        for(let i=0;i<userData.postIds.length;i++)
        {
            let postData=await database.posts.doc(userData.postIds[i]).get();
            let data={...postData.data(),postId:postData.id}
            parr.push(data);
        }
        setPost(parr)
    })
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <div>
        {
            posts==null || userData==null?<CircularProgress/>
            :
            <>
                <div/>
                    <Navbar userData={userData}/>
                    <div className='spacer'></div>
                        <div className='container'>
                            <div className='upper-part'>
                                <div className='profile-img'>
                                    <img src={userData.profilePic}/>
                                </div>
                                <div className='info'>
                                    <Typography variant="h5">
                                        Email:{userData.email}
                                    </Typography>
                                    <Typography variant="h6">
                                        Post:{userData.postIds.length}
                                    </Typography>
                                </div>
                            </div>
                            <hr style={{marginTop:"1rem",marginBottom:"1rem"}}/>
                            <div className='profile-videos'>
                            {
                                posts.map((post,index)=>(
                                    <React.Fragment key={index}>
                                        <div className="profile-videos">
                                            <video muted="muted" onClick={()=>handleClickOpen(post.pId)}>
                                                <source src={post.Purl}/>
                                            </video>
                                            <Dialog
                                                open={open==post.pId}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                fullWidth={true}
                                                maxWidth="md">

                                                <div className='modal-container'>
                                                    <div className='video-modal'>
                                                        <video autoPlay={true} muted="muted" controls>
                                                            <source src={post.Purl}/>
                                                        </video>
                                                    </div>
                                                    <div className='comment-modal'>
                                                        <Card className="card1">
                                                            <Comments postData={post}/>
                                                        </Card>
                                                        <Typography margin="dense" >{post.likes.length==0?"":`Liked by ${post.likes.length} users`}</Typography>
                                                        <Card variant="outlined" className='card2'>
                                                            <div style={{display:"flex"}}>
                                                                <Like2 postData={post} userData={userData} style={{display:"flex",alignItems:"center"}}/>
                                                                <AddComment postData={post} userData={userData}/>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </div>
                                            </Dialog>
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                            </div>
                        <div/>
                </div>
            </>
        }
    </div>
  );
}

export default Profile