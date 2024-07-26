import zim, { Triangle, drag, sca } from "./zim.js";
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
    // let line1 = [];
    // let line2 = [];
    // let line3 = [];
    let triangles = [];
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
    else if (PerpendicularDraggablePoint.x < 1250) {
      PerpendicularDraggablePoint.x = 1250;
    }
    PerpendicularDraggablePoint.y = 750;
    const PerpendicularDistance = zim.dist(1200, 740, PerpendicularDraggablePoint.x, PerpendicularDraggablePoint.y);
    Perpendicular.length = PerpendicularDistance;
    distanceLabelA.text = `Distance of A = ${Math.round(PerpendicularDistance)}`;
    conditionTriangle()
    //drawTriangles();
    });

    groundDraggablePoint.on("pressmove", () => {
      distanceLabelB.text = '';
      if (groundDraggablePoint.x > 1550) {
        groundDraggablePoint.x = 1550;
    }
    else if (groundDraggablePoint.x < 1250) {
      groundDraggablePoint.x = 1250;
    }
    groundDraggablePoint.y = 800;
    const GroundDistance = zim.dist(1200, 800, groundDraggablePoint.x, groundDraggablePoint.y);
    ground.length = GroundDistance;
    distanceLabelB.text = `Distance of B = ${Math.round(GroundDistance)}`;
    //drawTriangles();
    conditionTriangle()
    
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
    conditionTriangle();
   });

  //drawTriangles();
  function drawTriangles(){
   
  triangles.forEach((triangle)=>{
     triangle.removeFrom();
  })
  const triangle = new Triangle(hyperbola.length, Perpendicular.length, ground.length) // side lengths, color
		.pos(800, 550, RIGHT, BOTTOM); // 150 from right and 200 from bottom
    triangle.color= "transparent";
    triangle.borderColor = "black";

    triangles.push(triangle);
  
  }

  const drawTrianglebtn = new Button({
    width: 250,
    height: 50,
    label: "Draw Triangle",
    backgroundColor: "#f1c40f",
    corner: 10,
    rollBackgroundColor: "#f39c12",
    color: "white",
    rollColor: "white",
   }).pos(600,700).alp(0);

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

  function conditionTriangle(){
    const PerpendicularDistance = zim.dist(1200, 740, PerpendicularDraggablePoint.x, PerpendicularDraggablePoint.y);
    const GroundDistance = zim.dist(1200, 800, groundDraggablePoint.x, groundDraggablePoint.y);
    const hyperbolaDistance = zim.dist(1200, 850, hyperbolaDraggablePoint.x, hyperbolaDraggablePoint.y);

    const maxDistance = Math.max(PerpendicularDistance,GroundDistance,hyperbolaDistance);
    const sumOfDistance = PerpendicularDistance+GroundDistance+hyperbolaDistance;
    const twoSmallLineDistance = sumOfDistance - maxDistance;

    if(twoSmallLineDistance>maxDistance){
      console.log('drawn triangle is possible');
      possibleBtn.on("click",()=>{
        drawTrianglebtn.alp(1);
      })
     
    }
    else{
      console.log('drawn triangle is not possible');
      notpossibleBtn.on("click",()=>{
        drawTrianglebtn.alp(0);
      })
      possibleBtn.on("click",()=>{
        drawTrianglebtn.alp(0);
      })
     
      triangles.forEach((triangle)=>{
        triangle.removeFrom();
      })

    }


  }


   drawTrianglebtn.on("click",()=>{
    drawTriangles();
   })

  
    
   
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