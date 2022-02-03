import React, { useEffect, useState } from "react";
import "../App.css";

const LoadingScreen=()=>{
    return(
        <div className="spinner">
              <span>Loading...</span>
              <div className="half-spinner"></div>
        </div>

    )
}
 

export default LoadingScreen