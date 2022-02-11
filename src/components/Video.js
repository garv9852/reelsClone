import React from 'react';
import ReactDOM from 'react-dom';
import "./Video.css"

function Video(props) {
  const handleClick=(e)=>{
    e.preventDefault();
    e.target.muted=!e.target.muted
  }
  const handleScroll=(e)=>{
    let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if(next){
      next.scrollIntoView();
      e.target.muted=true
    }
  }
  return (
    <video src={props.src} onEnded={handleScroll} className="videos-styling" muted={true} onClick={handleClick}>
    </video>
    );
}

export default Video;
