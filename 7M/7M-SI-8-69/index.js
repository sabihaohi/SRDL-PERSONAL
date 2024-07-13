import zim, { Circle, animate, timeout } from "./zim.js";
// Function to initialize the application

async function init() {
// Load JSON data
const response = await fetch("data.json");
const data = await response.json();

// Destructure the loaded data
const { subText,lang, headerText, chapter, chapterNoText,informationText} = data;
const { Frame, Pic, Button, Slider, Label, Rectangle,Line } = zim;


const frame = new Frame("fit", 1920, 1080, "#edf0f2");
frame.on("ready", () => {
const bg = new Pic("assets/images/bg.png").center();
const slider_1 = new Pic("assets/images/slider_1.png").center().pos(1580,240).sca(.9);
function getTheta(){
  const theta={
  }
  do{
      theta.t1= Math.ceil(Math.random() * 12) * 30,
      theta.t2= Math.ceil(Math.random() * 12) * 30
      console.log(theta)
  }while(theta.t1===theta.t2)
  return theta
}

const fW =frame.stage.width/2
const fH =frame.stage.height/2
const mov ={x:30,y:70}



//code start from here
///draw circle
const r=250
const circle =new Circle({radius:r,color:white,borderColor:black,borderWidth:2}).center().mov(mov.x,mov.y);

const theta=getTheta()

let chordsLine
if(theta){
  chordsLine =new Shape().s(black).ss(5)
  .mt(circle.x+r*Math.cos(theta.t1)-fW,circle.y+r*Math.sin(theta.t1)-fH)
  .lt(circle.x+r*Math.cos(theta.t2)-fW,circle.y+r*Math.sin(theta.t2)-fH).center();

}





  const restartButton = new Button({
    label: "",
    width: 90,
    height: 90,
    backgroundColor: "transparent",
    rollBackgroundColor: "transparent",
    borderWidth: 0,
    gradient: 0.4,
    corner: 50,
  })
    .center()
    .mov(850, 430);

  const pic = new Pic("assets/images/reset_button.png")
    .sca(0.9)
    .center(restartButton)
    .mov(10, 0);

  restartButton.on("click", () => {
    location.reload();
  });
});
}
init();