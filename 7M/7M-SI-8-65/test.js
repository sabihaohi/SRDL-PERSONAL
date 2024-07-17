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
const bg = new Pic("assets/image/bg.png").center();
const infoBox = new Pic("assets/image/info.png").pos(100,300)
labelsCreation();

//const slider_1 = new Pic("assets/images/slider_1.png").center().pos(1580,240).sca(.9);
function getTheta(){
  const theta={
  }
  do{
      theta.t1= Math.ceil(Math.random() * 12) * 30,
      theta.t2= Math.ceil(Math.random() * 12) * 30
      //console.log(theta)
  }while(theta.t1===theta.t2)
  return theta
}

const fW =frame.stage.width/2
const fH =frame.stage.height/2
const mov ={x:50,y:25};



//code start from here
///draw circle
const r=200
const circle =new Circle({radius:r,color:white,borderColor:black,borderWidth:2}).center().mov(mov.x,mov.y);
const centerPoint = new Circle(5, "red").pos(circle.x,circle.y)
//console.log(circle.x,circle.y)

const theta=getTheta()

let chordsPoint1
let chordsPoint2
let chordsPoint3
const allChords =[];
const allChordsPoints =[];
const lines = [];
const labels = [];
if(theta){

  chordsPoint1 = new Circle(10, "black").center().mov(circle.x+r*Math.cos(theta.t1)-fW,circle.y+r*Math.sin(theta.t1)-fH).drag(circle);
  chordsPoint2 = new Circle(10, "black").center().mov(circle.x+r*Math.cos(theta.t2)-fW,circle.y+r*Math.sin(theta.t2)-fH).drag(circle);
  chordsPoint3 = new Circle(10, "black").center().mov(circle.x+r*Math.cos(theta.t1+theta.t2)-fW,circle.y+r*Math.sin(theta.t1+theta.t2)-fH).drag(circle);
  allChords.push(chordsPoint1,chordsPoint2,chordsPoint3);
  allChords.forEach((chord)=>{
    allChordsPoints.push({x:chord.x,y:chord.y})
  })

  
}


const distances = [0,0,0];
allChords.forEach((chord,index)=>{

  chord.on("pressmove",()=>{
    drawChords();
    const distance = zim.dist(chord.x, chord.y, allChordsPoints[index].x, allChordsPoints[index].y);
    distances[index] = Math.round(distance);
    console.log(distances);  
  })

  chord.on("pressup",()=>{
    labels.forEach((label)=>{
      label.dispose();
    })
    if(lines[index].hitTestCircle(centerPoint)){
      console.log("hit");
      const diameterLabel = new Label({
        text:"diameter",
        size:20,
        color:black
      }).pos(200,400);
      labels.push(diameterLabel);
     
    }
    else{
      console.log("not hit");
    }
   })
})


function drawChords(){
  lines.forEach((line)=>{
      line.dispose();
  })
  allChords.forEach((chord,index)=>{
    const distance = zim.dist(chord.x,chord.y,allChordsPoints[index].x,allChordsPoints[index].y);
    const angle = zim.angle(chord.x,chord.y,allChordsPoints[index].x,allChordsPoints[index].y);
    const line = new Line(distance,1,"black").pos(chord.x,chord.y);
    line.rotation= angle;
    lines.push(line);
    S.update();

   
  })


}

 
function labelsCreation(){
  const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
      .center()
      .pos(130, 70);

      const header_label = new Label({
        text: headerText.text[lang],
        size: 40,
        bold: true,
      })
      .center(header_rect)
      .sca(1);

      new Label({
        text: chapter.text[lang],
        size: 25,
        color: "black",
        bold: true,
        italic: true,
      }).loc(110, 100);

      new Label({
        text: informationText.text[lang],
        size: 20,
        color: black,
        bold: true,
        
      }).loc(informationText.x[lang], 320);


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

  //const pic = new Pic("assets/images/reset_button.png")
    // .sca(0.9)
    // .center(restartButton)
    // .mov(10, 0);

  restartButton.on("click", () => {
    location.reload();
  });
});
}
init();