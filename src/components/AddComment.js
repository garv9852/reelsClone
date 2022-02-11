import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from '../firebase';

function AddComment({userData,postData}) {
    const [text,setText]=useState("");
    console.log(userData);
    let handleClick=async ()=>{
        let x=await database.comments.add({
            text:text,
            uName:userData.name,
            uProfilePic:userData.profilePic,
        })
        await database.posts.doc(postData.postId).update({
            comments:postData.comments.length==0?[x.id]:[...postData.comments,x.id]
        })
        setText("")
    }
  return (
      <div style={{display:"flex",alignItems:"center"}}>
          <TextField id="outlined-basic" label="Comment" variant="outlined" size="small"value={text} width={{width:'110%'}} style={{paddingRight:"1rem"}} onChange={(e)=>{setText(e.target.value)}}/>
          <Button variant="contained" onClick={handleClick}>Submit</Button>
      </div>
  );
}

export default AddComment;
