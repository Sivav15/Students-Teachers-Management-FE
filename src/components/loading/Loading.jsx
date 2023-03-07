import React from 'react'
import loading from "./loading1.svg";
function Loading({width,padding}) {
    return (
 
        <img src={loading} alt="loading" style={{
         width : width,
         padding : padding,
        }} />

 )
}

export default Loading