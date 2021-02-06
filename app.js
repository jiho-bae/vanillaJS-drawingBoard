const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

ctx.strokeStlye = "#2c2c2c";
ctx.lineWidth = 2.5;


let painting = false;

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
 
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
} 

console.log(Array.from(colors));

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));