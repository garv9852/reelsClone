import React, { useEffect } from 'react'
import vid1 from "../assests/video/vid1.mp4"
import vid2 from "../assests/video/vid2.mp4"
import vid3 from "../assests/video/vid3.mp4"
function Ioa() {
   const callback=(entries)=>{
    entries.forEach((entry)=>{
        let ele=entry.target.childNodes[0]
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
   },[])
  return (
    <div className='video-containewr'>
        <div className='videos'>
            <video src={vid1} style={{height:'85vh'}}/>
        </div>
        <div className='videos'>
            <video src={vid2} style={{height:'85vh'}}/>
        </div>
        <div className='videos'>
            <video src={vid3} style={{height:'85vh'}}/>
        </div>
    </div>
  )
}

export default Ioa