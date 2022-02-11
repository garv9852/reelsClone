import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

function Comments({postData}) {
  const [comments,setComments]=useState(null);
  useEffect(async ()=>{
    let Allcomments=[]
    for(let i=0;i<postData.comments.length;i++)
    {
        let dat=await database.comments.doc(postData.comments[i]).get();
        Allcomments.push(dat.data());
    }
    setComments(Allcomments)
  },[postData])
  return (
  <div>
      {
          comments==null?<CircularProgress/>:
          <>
          {
              comments.map((comment,index)=>(
                <div style={{display:"flex",alignItems:"center",paddingTop:"1rem"}} key={index}>
                    <Avatar src={comment.uProfilePic} className="comment-child" style={{marginRight:"1rem"}}/>
                    <div className="comment-child" style={{fontWeight:"600",marginTop: "-8px"}}>{comment.uName}</div>
                    <div className="comment-child" style={{marginTop: "-8px"}}>{comment.text}</div>
                </div>
              ))
          }
          </>
      }
  </div>);
}

export default Comments;
