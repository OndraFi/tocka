import './App.css';
import React, {useEffect, useState} from "react";
import FormItem from "./formItem";
import randomColor from "randomcolor";

function App() {

    let items = [];
    let posun = 50.0;

    let pocet = 1;

    let list = [pocet];
    const [form, setForm] = useState([{color: randomColor(), text: ""}]);

    const [name, setName] = useState("");
    const [color, setColor] = useState();

    class Item {

        constructor(x, text, color) {
            this.state = {
                x: x,
                text: text,
                color: color,
            };
        }
    };


    function draw() {
        const canvas = document.getElementById("canvas");
        const container = document.getElementById("container");
        canvas.width = container.offsetWidth - 20;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < items.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = items[i].state.color;
            ctx.fillRect(items[i].state.x, 10, 80, 80);
            ctx.fillStyle = "#ffffff";
            ctx.font = "20px Arial";
            ctx.fillText(items[i].state.text, items[i].state.x, 70, 80);
        }
        ctx.fillStyle = "#000";
        ctx.fillRect(canvas.width / 2, 0, 2, canvas.height);
    }

    function create() {
        items = [];
        let pole = [];

        const formular = document.getElementById("form");
        for (let i = 0; i < form.length; i++) {
            pole.push({
                text: form[i].text,
                color: form[i].color,
            });
        }

        for (let i = 0; i < 100; i++) {
            const item = pole[Math.floor(Math.random() * pole.length)];
            items.push(new Item(i * 85, item.text, item.color));
        }
        ;
        posun = 50.0;
        tocka();
    }

    function tocka() {
        const canvas = document.getElementById("canvas");
        let click = new Audio(require("./audio/click.mp3"));

        for (var i = 0; i < items.length; i++) {
            if (items[i].state.x > canvas.width / 2 && items[i].state.x - posun < canvas.width / 2) {
                click.play();
                console.log("click");
            }
            items[i].state.x -= posun;

        }
        draw();
        posun = (posun / 1.005) - 0.1;
        if (posun > 1) {
            window.requestAnimationFrame(tocka);
        } else {
            for (let i = 0; i < items.length; i++) {
                if (items[i].state.x < canvas.width / 2 && items[i].state.x + 80 > canvas.width / 2) {
                    console.log(items[i]);
                    let open = new Audio(require("./audio/open.mp3"));
                    open.play();
                    const popup = document.getElementById("popup");
                    popup.style.display = "flex";
                    setName(items[i].state.text);
                    setColor(items[i].state.color);
                    console.log(name);
                    console.log(color);
                    return;
                }
            }
        }

    }

    window.addEventListener("resize", () => {
        const canvas = document.getElementById("canvas");
        const container = document.getElementById("container");
        canvas.width = container.offsetWidth - 20;
        draw();
    });

    function addToForm() {
        pocet++;
        setForm([...form, {color: randomColor(), text: ""}]);
    };

    const deleteFromForm = (index) => {
        console.log("index" + index);
        var list = [...form];
        list.splice(index, 1);
        setForm(list);
        console.log(form);
    }

    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const container = document.getElementById("container");
        canvas.width = container.offsetWidth - 20;
    }, [])


    return (
        <div className={"w-100 bg-dark text-light"} style={{minHeight: "100vh"}}>

            <div id={"popup"} className={"position-fixed bg-dark text-light rounded w-100 h-100 top-0 align-items-center flex-column"} style={{display: "none"}}>
                <div  className={"text-end w-100"}><p onClick={()=>{document.getElementById("popup").style.display = "none"}} className={"p-2 me-5 mt-2 btn btn-danger"}>X</p></div>
                <h2 className={"display-1 m-5"}>Vítěz: {name}</h2>
                <div style={{width: "80%", height: "200px", backgroundColor: color}} ></div>
            </div>

        <div className="App container-md p-0 d-flex align-items-center justify-content-around flex-column"
             id={"container"}>
            <form id={"form"} action="" className={"my-5 mx-2 w-100"}>
                {form.map((item, index) => (
                    <FormItem key={index} pocet={index} item={item} delete={deleteFromForm}></FormItem>
                ))}
                <div className={"btn btn-danger my-4 rounded-circle"} onClick={addToForm}><span>+</span></div>

            </form>
            <canvas id={"canvas"} className={"my-5"}
                    width={"500px"}
                    height={"100px"}
                    style={{border: "1px solid white", imageRendering: "pixelated"}}>
            </canvas>
            <button className={"btn btn-danger mb-5"}
                    onClick={async () => {
                        create();
                    }}>TWISTED!!
            </button>
        </div>
        </div>
    );


}

export default App;
