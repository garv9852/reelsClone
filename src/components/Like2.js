import React, { useEffect ,useState ,useContext } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { database } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
function Like2({userData,postData}) {
    const [like,setLike]=useState(false);
    let {user}=useContext(AuthContext)
    useEffect(()=>{
        let check=postData.likes.includes(user.uid)?true:false;
        setLike(check);
    },[postData])
    let handleClick=()=>{
        if(like){
            let narr=postData.likes.filter((e)=>{
                return e!=user.uid;
            })
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }
        else{
            let narr=[...postData.likes,user.uid];
            postData.likes=narr;
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }
    }
  return (
      <div style={{display:"flex",alignItems:"center",padding:"1rem"}}>
          {
            like!=null?
            <>
            { 
                like==true?<FavoriteIcon className={'like'} onClick={handleClick}/>:<FavoriteIcon className={"unlike2"} onClick={handleClick}/>
            }
            </>
            :
            <>
            </>
          }
      </div>
  );
}

export default Like2;
