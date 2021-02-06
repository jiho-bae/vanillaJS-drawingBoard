const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStlye = INITIAL_COLOR ;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

const startPainting = () => {
    painting = true;

}
const stopPainting = ()=> {
    painting=false;
}

const onMouseMove = event => {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}
 
const handleRangeChange = event => {
    const size = event.target.value;
    ctx.lineWidth = size;
}

const handleModeClick = () => {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText = "Paint";
    }
}

const handleCanvasClick = () => {
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

const handleCM = event => {
    event.preventDefault();
}

const handleSaveClick = () => {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "YourPainting";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
} 

if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}