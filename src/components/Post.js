import React,{useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { database } from '../firebase';
import Video from './Video';
import Like from './Like';
import "./Post.css"
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';
function Post(userData) {
    const [posts,setPosts]=useState(null);
    useEffect(()=>{
        let parr=[];
        const unsub=database.posts.orderBy("createAt","desc").onSnapshot((querySnapshot)=>{
            parr=[]
            querySnapshot.docs.forEach((doc)=>{
                let data={...doc.data(),postId:doc.id}
                parr.push(data);
            })
            setPosts(parr)
            return unsub;
        })
    },[])

    const callback=(entries)=>{
        entries.forEach((entry)=>{
            let ele=entry.target.childNodes[0]
            console.log(ele);
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause();
                }
            })
        })
       }
       let observer=new IntersectionObserver(callback,{threshold:0.6});
       useEffect(()=>{
           let elements=document.querySelectorAll(".videos");
           elements.forEach((element)=>{
               observer.observe(element);
           })
           return ()=>{
               observer.disconnect();
           }
       },[posts])

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
            posts==null || userData==null ? <CircularProgress/>
            :
            <div className='video-container'>
                {
                    posts.map((post,index)=>(
                        <React.Fragment key={index}>
                            <div className="videos">
                                <Video src={post.Purl}/>
                                <div className='fa'>
                                    <Avatar src={post.uProfile} />
                                    <h4>{post.uName}</h4>
                                </div>
                                <Like userData={userData} postData={post}/>
                                <ChatBubbleIcon className="chat-styling" onClick={()=>handleClickOpen(post.pId)}/>
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
                                                    <AddComment postData={post} userData={userData.user}/>
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
        }
    </div>);
}

export default Post;
