import React from "react";

export default function Popup({name,color}){
    console.log(name + "name");
    console.log(color + "color");
    return(
        <div id={"popup"} className={"position-fixed bg-dark text-light rounded w-100 h-100 top-0 d-flex align-items-center flex-column"}>
            <div  className={"text-end w-100"}><p onClick={()=>{document.getElementById("popup").remove()}} className={"p-2 me-5 mt-2 btn btn-danger"}>X</p></div>
            <h2 className={"display-1 m-5"}>Vítěz: {name}</h2>
            <div style={{width: "80%", height: "200px", backgroundColor: color}} ></div>
        </div>
    );
}