import React, {useState} from "react";
import randomColor from "randomcolor";

export default function FormItem(props){
    const pocet = props.pocet;
    const [text,setText] = useState(props.item.text);
    const [color,setColor] = useState(props.item.color);
    return(
        <div className={"d-flex justify-content-around align-items-center shadow p-5"}>
            <label className={"mx-1 mx-md-5"}>Barva</label><input id={`color${pocet}`} type={"color"} value={color} onChange={(e)=>{props.item.color = e.target.value; setColor(e.target.value);}} className={"w-100"}/>
            <label className={"mx-1 mx-md-5"}>nazev:</label><input id={`nazev${pocet}`}  type={"text"} value={text} onChange={(e)=>{props.item.text = e.target.value;setText(e.target.value)}} className={"w-100"}/>
            <div onClick={()=>{props.delete(pocet)}} className={"btn btn-danger mx-2"}>delete</div>
        </div>
    );
}