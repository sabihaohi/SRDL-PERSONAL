import zim, { drag, sca } from "./zim.js";
const { Frame, Rectangle, Pic, Label,Circle, TextArea, Button, Line } = zim;



async function init() {
  const response = await fetch("data.json");
  const data = await response.json();



  const { lang, headerText, chapter, informationText,redText, resultText, footerLabelText,greenText,result } = data;
  //const { itemsInfo } = itemsData;
  new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");



  function ready() {
    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").center().mov(150, 80);
    const infoBox = new Pic("assets/image/infoBox.png").pos(100, 350);
    //mainFunction();
    let line1 = [];
    let line2 = [];
    let line3 = [];
    labelCreation();
    const [Perpendicular, ground, hyperbola, PerpendicularDraggablePoint,groundDraggablePoint,hyperbolaDraggablePoint] = drawShape();

    let distanceLabelA = new Label({
          text: `Distance of A = ${Math.round(Perpendicular.length)}`,
          size: 20,
          color: "black",
          bold: true,
        }).pos(170, 450);
    
    let distanceLabelB = new Label({
      text: `Distance of B = ${Math.round(ground.length)}`,
      size: 20,
      color: "black",
      bold: true,
    }).pos(170, 500);

    let distanceLabelC = new Label({
      text: `Distance of C = ${Math.round(hyperbola.length)}`,
      size: 20,
      color: "black",
      bold: true,
    }).pos(170, 550);

    PerpendicularDraggablePoint.on("pressmove", () => {
      distanceLabelA.text = '';
      if (PerpendicularDraggablePoint.x > 1550) {
        PerpendicularDraggablePoint.x = 1550;
    }
    else if (PerpendicularDraggablePoint.x < 1350) {
      PerpendicularDraggablePoint.x = 1350;
    }
    PerpendicularDraggablePoint.y = 750;
    const PerpendicularDistance = zim.dist(1200, 740, PerpendicularDraggablePoint.x, PerpendicularDraggablePoint.y);
    Perpendicular.length = PerpendicularDistance;
    distanceLabelA.text = `Distance of A = ${Math.round(PerpendicularDistance)}`;

    //drawTriangles();
    });

    groundDraggablePoint.on("pressmove", () => {
      distanceLabelB.text = '';
      if (groundDraggablePoint.x > 1550) {
        groundDraggablePoint.x = 1550;
    }
    else if (groundDraggablePoint.x < 1350) {
      groundDraggablePoint.x = 1350;
    }
    groundDraggablePoint.y = 800;
    const GroundDistance = zim.dist(1200, 800, groundDraggablePoint.x, groundDraggablePoint.y);
    ground.length = GroundDistance;
    distanceLabelB.text = `Distance of B = ${Math.round(GroundDistance)}`;
    //drawTriangles();
    
    });

   hyperbolaDraggablePoint.on("pressmove", () => {
    distanceLabelC.text = '';
    if (hyperbolaDraggablePoint.x > 1550) {
      hyperbolaDraggablePoint.x = 1550;
  }
  else if (hyperbolaDraggablePoint.x < 1350) {
    hyperbolaDraggablePoint.x = 1350;
  }
  hyperbolaDraggablePoint.y = 850;
  const hyperbolaDistance = zim.dist(1200, 850, hyperbolaDraggablePoint.x, hyperbolaDraggablePoint.y);
  hyperbola.length = hyperbolaDistance;
  distanceLabelC.text = `Distance of C = ${Math.round(hyperbolaDistance)}`;
  //drawTriangles();
   });

   //drawTriangles();
   function drawTriangles(){
   
    line1.forEach((line)=>{
      line.removeFrom();
    })
  
    line2.forEach((line)=>{
      line.removeFrom();
    })
  
    line3.forEach((line)=>{
      line.removeFrom();
    })
    let line_1,line_2,line_3;
      line_1 = new Line({ length: hyperbola.length, thickness: 2 }).pos(700,500);
      line1.push(line_1);
      line_2 = new Line({ length: Perpendicular.length, thickness: 2 }).pos(line_1.x,500).rot(310);
      line2.push(line_2);
      line_3 = new Line({ length: ground.length, thickness: 2 }).pos(line_1.x+line_1.length,line_1.y).rot(-130);
      line3.push(line_3);
   }

   const possibleBtn = new Button({
    width: 200,
    height: 50,
    label: "Possible",
    backgroundColor: "#2ecc71",
    corner: 10,
    rollBackgroundColor: "#27ae60",
    color: "white",
    rollColor: "white",
   }).pos(600,800);

   const notpossibleBtn = new Button({
    width: 200,
    height: 50,
    label: "Not Possible",
    backgroundColor: "#2ecc71",
    corner: 10,
    rollBackgroundColor: "#27ae60",
    color: "white",
    rollColor: "white",
   }).pos(850,800);
  //  const drawTriangle = new Button({
  //   width: 200,
  //   height: 50,
  //   label: "Draw Triangle",
  //   backgroundColor: "#f1c40f",
  //   corner: 10,
  //   rollBackgroundColor: "#f39c12",
  //   color: "white",
  //   rollColor: "white",
  //  }).pos(500,800);

  

  

   let distanceLabels = [];

    // drawTriangle.on("click",()=>{
    //   distanceLabels.forEach((label)=>{
    //     label.removeFrom();
    //   })
    //   const PerpendicularDistance = zim.dist(1200, 740, PerpendicularDraggablePoint.x, PerpendicularDraggablePoint.y);
    //   const GroundDistance = zim.dist(1355, 800, groundDraggablePoint.x, groundDraggablePoint.y);
    //   const hyperbolaDistance = zim.dist(1100, 850, hyperbolaDraggablePoint.x, hyperbolaDraggablePoint.y);
    //   let distanceLabel = new Label({
    //     text: `Perpendicular Distance: ${Math.round(PerpendicularDistance)} Ground Distance: ${Math.round(GroundDistance)} Hyperbola Distance: ${Math.round(hyperbolaDistance)}`,
    //     size: 20,
    //     color: "black",
    //     bold: true,
    //   }).pos(100, 450);
    //   distanceLabels.push(distanceLabel);

    //   if(PerpendicularDistance + GroundDistance > hyperbolaDistance){ 
    //     possibleMassgae.alp(1);
    //   }else{
    //     possibleMassgae.alp(0);
    //   }
    // })
      
    
   
  }
  function labelCreation() {
    const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
      .center()
      .pos(130, 60);

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
    }).loc(100, 110);

    new Label({
      text: informationText.text[lang],
      size: 20,
      color: black,
      bold: true,

    }).loc(informationText.x[lang], 380);


  }


  function drawShape(){
    
    const Perpendicular  = new Line({ length: 155, thickness: 2 }).pos(1200, 750);
    const ground = new Line({ length: 155, thickness: 2 }).pos(1200, 800);
    const hyperbola = new Line({ length: 155, thickness: 2 }).pos(1200, 850);
    new Label({
      text: "A",
      size: 20,
      color: "black",
      bold: true,
    }).center(Perpendicular).mov(-90,0);
    new Label({
      text: "B",
      size: 20,
      color: "black",
      bold: true,
    }).center(ground).mov(-90,0);
    new Label({
      text: "C",
      size: 20,
      color: "black",
      bold: true,
    }).center(hyperbola).mov(-90,0);

    const PerpendicularDraggablePoint = new Circle({ radius: 10, color: "red" }).pos(1355, 740).drag();
    const groundDraggablePoint = new Circle({ radius: 10, color: "red" }).pos(1355, 790).drag();
    const hyperbolaDraggablePoint = new Circle({ radius: 10, color: "red" }).pos(1355, 840).drag();
    return [Perpendicular, ground, hyperbola, PerpendicularDraggablePoint,groundDraggablePoint,hyperbolaDraggablePoint];

  }

  

}
init();