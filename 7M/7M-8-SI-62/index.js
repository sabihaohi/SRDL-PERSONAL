import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Rectangle, Label, Slider, Button, Pic,Line,Shape } = zim;



async function init() {

 // Load JSON data
 const response = await fetch("data.json");
 const data = await response.json();

 // Destructure the loaded data
 const { lang,centerText,radiusText, headerText, chapter, chapterNoText, footerLabelText, informationText } = data;

 // Create the frame after loading the JSON data
 new Frame(FIT, 2020, 1080, "#adbed9", "#7d9ed1", ready, "assets/");



 function ready() {

  asstesLoading();
  labelsCreation();

 


 const point1 = new Circle(8, "transparent").loc(800, 280);
 const point2 = new Circle(8, "red").loc(1000, 280).drag();
 const circleLinePoint1 = new Circle(8, "red").loc(1150, 700);
 const circleLinePoint2 = new Circle(8, "transparent").loc(1290,700).drag();
 const pointerimage = new Pic("assets/image/pointer.png").sca(0.18).center(circleLinePoint2).mov(5,-10);
 let distance = zim.dist(point1.x, point1.y, point2.x, point2.y);
//const stageRect = new Rectangle(500, 500, "red").center();
//console.log(circleLinePoint1.x, circleLinePoint1.y);
 const lines = [];
 function drawLine(){


    lines.forEach(line => {
        line.removeFrom();
    });

    distance = zim.dist(point1.x, point1.y, point2.x, point2.y);
    //const distance1 = zim.dist(circleLinePoint1.x, circleLinePoint1.y, circleLinePoint2.x, circleLinePoint2.y);

    const line = new Rectangle(distance, 5).pos(point1.x, point1.y);
    const line2 = new Rectangle(distance, 5).pos(circleLinePoint1.x, circleLinePoint1.y);
    circleLinePoint2.x = circleLinePoint1.x + point2.x - point1.x;
    //circleLinePoint2.y = circleLinePoint1.y + point2.y - point1.y;
    // console.log(circleLinePoint2.x, circleLinePoint2.y);
    lines.push(line,line2);
    //console.log(line2.x, line2.y);
    
    
 }

 drawLine();
 const shapes = [];
 const radiusLabels =[];
 point2.on("pressmove",()=>{
    shapes.forEach(shape => {
        shape.removeFrom();
    });
    radiusLabels.forEach(label => {
        label.removeFrom();
    });
 point2.y = 280;
 if(point2.x>1050){
        point2.x = 1050;
 }
 const radius= new Label({
    text: `${radiusText.text[lang]}\n${Math.round(distance)}`,
    color: "black",
    size: 20,
    font: "Arial",
    lineHeight: 35,
    bold: true,
}).pos(200,500);
const radius2= new Label({
    text: `${radiusText.text[lang]} = ${Math.round(distance)}`,
    color: "black",
    size: 12,
    font: "Arial",
    align: "center",
    lineHeight: 35,
}).pos(1180,700);
radiusLabels.push(radius,radius2);

 S.update();
  drawLine();
  
  
})
const container = new zim.Container().center().pos(circleLinePoint1.x, circleLinePoint1.y);


circleLinePoint2.on("pressmove",()=>{
   
    //  let m = (circleLinePoint2.y -0) / (circleLinePoint2.x - 0);
     let theta = Math.atan2(circleLinePoint2.y-circleLinePoint1.y, circleLinePoint2.x-circleLinePoint1.x);
     container.removeAllChildren();
     theta = theta > 0 ? (theta < .2 ? 0.001 : theta) : theta;
     console.log(theta);
    //  if (theta < 0) {
        const arc = new Shape().s("black").a(0, 0, distance, theta, 0).addTo().center(container);
    //  }else{
        // const arc = new Shape().s("black").a(0, 0, distance, 0, theta).addTo().center(container);
    // }
     shapes.push(arc);
     S.update();
})
 new Label({
    text: informationText.text[lang],
    size: 20,
    color: black,
    bold: true,
    
  }).loc(informationText.x[lang], 360);
const centerOfCircle= new Label({
    text: centerText.text[lang]+`\n(${circleLinePoint1.x},${circleLinePoint1.y})`,
    color: "black",
    size: 22,
    font: "Arial",
    bold: true,
    lineHeight: 35
}).pos(200,420);

const centerOfCircleinstage= new Label({
    text: `(${circleLinePoint1.x},${circleLinePoint1.y})`,
    color: "black",
    size: 12,
    font: "Arial",
    align: "center",
    lineHeight: 35
}).pos(1080,660);



const radius2= new Label({
    text: `${radiusText.text[lang]}\n${Math.round(distance)}`,
    color: "black",
    size: 20,
    font: "Arial",
    lineHeight: 35,
    bold: true,
}).pos(200,500);
const radiusDefault= new Label({
    text: `${radiusText.text[lang]} = ${Math.round(distance)}`,
    color: "black",
    size: 12,
    font: "Arial",
    align: "center",
    lineHeight: 35,
}).pos(1180,700);
radiusLabels.push(radius2,radiusDefault);

  
}
 
 function asstesLoading(){
  const bg = new Pic("assets/image/bg.png").center();
  const infoBox = new Pic("assets/image/infoBox.png").sca(1.2).pos(100,300);
  const stage = new Pic("assets/image/stage.png").center().mov(100,180);
  const lineBox = new Pic("assets/image/line_box.png").pos(700,200);
  
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
        }).loc(150, 110);
   }

   
}



// Initialize the app
init();


