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
    labelCreation();
    const [Perpendicular, ground, hyperbola, PerpendicularDraggablePoint,groundDraggablePoint,hyperbolaDraggablePoint] = drawShape();

    PerpendicularDraggablePoint.on("pressmove", () => {
      if (PerpendicularDraggablePoint.x > 1500) {
        PerpendicularDraggablePoint.x = 1500;
    }
    else if (PerpendicularDraggablePoint.x < 1200) {
      PerpendicularDraggablePoint.x = 1200;
    }
    PerpendicularDraggablePoint.y = 610;
    const PerpendicularDistance = zim.dist(1100, 610, PerpendicularDraggablePoint.x, PerpendicularDraggablePoint.y);
    Perpendicular.length = PerpendicularDistance;

    drawTriangles();
    });

    groundDraggablePoint.on("pressmove", () => {
      if (groundDraggablePoint.x > 1500) {
        groundDraggablePoint.x = 1500;
    }
    else if (groundDraggablePoint.x < 1200) {
      groundDraggablePoint.x = 1200;
    }
    groundDraggablePoint.y = 650;
    const GroundDistance = zim.dist(1100, 650, groundDraggablePoint.x, groundDraggablePoint.y);
    ground.length = GroundDistance;
    drawTriangles();
    
    });

   hyperbolaDraggablePoint.on("pressmove", () => {
    if (hyperbolaDraggablePoint.x > 1500) {
      hyperbolaDraggablePoint.x = 1500;
  }
  else if (hyperbolaDraggablePoint.x < 1200) {
    hyperbolaDraggablePoint.x = 1200;
  }
  hyperbolaDraggablePoint.y = 700;
  const hyperbolaDistance = zim.dist(1100, 700, hyperbolaDraggablePoint.x, hyperbolaDraggablePoint.y);
  hyperbola.length = hyperbolaDistance;
  drawTriangles();
   });

   drawTriangles();

   
   function drawTriangles(){
    let line_1,line_2,line_3;
    if(line_1 || line_2 || line_3 ){
            line_1.removeFrom()
            line_2.removeFrom()
            line_3.removeFrom()
            
      }
      line_1 = new Line({ length: hyperbola.length, thickness: 2 }).pos(700,500);
      line_2 = new Line({ length: Perpendicular.length, thickness: 2 }).pos(line_1.x,500).rot(310);
      line_3 = new Line({ length: ground.length, thickness: 2 }).pos(line_1.x+line_1.length,line_1.y).rot(-130);
   }

  //  function squareDraw(L,p,q){
  //   if(L*2<1162){
  //     if(line_1 || line_2 || line_3 || line_4){
  //       line_1.dispose()
  //       line_2.dispose()
  //       line_3.dispose()
  //       line_4.dispose()
  //     }
      
  //     line_1=new Line(L).center().pos(heading_label_X,heading_label_Y);
  //     line_2=new Line(L).center().pos(line_1.x,heading_label_Y).rot(270);
  //     line_3=new Line(L).center().pos(line_2.x,line_2.y-line_2.length);
  //     line_4=new Line(L).center().pos(line_3.x+line_3.length,line_3.y).rot(90);
      
  
  //     button.pos(line_4.x-10,line_4.y-10)
  //     S.update()
  //   }else{
  //     button.pos(line_4.x-10,line_4.y-10)
  //     return
  //   }
  //   console.log(length,"=",width)
  //   area(length,width)
    
  // }
   const drawTriangle = new Button({
    width: 200,
    height: 50,
    label: "Draw Triangle",
    backgroundColor: "#f1c40f",
    corner: 10,
    rollBackgroundColor: "#f39c12",
    color: "white",
    rollColor: "white",
   }).pos(500,800);

   const possibleMassgae = new Label({
    text: "Possible Triangle",
    size: 20,
    color: "black",
    bold: true,
   }).pos(100, 400).alp(0);
   const notPossibleMassgae = new Label({
    text: "Triangle is not possible",
    size: 20,
    color: "black",
    bold: true,
   }).pos(100, 400).alp(0);

   let distanceLabels = [];

    drawTriangle.on("click",()=>{
      distanceLabels.forEach((label)=>{
        label.removeFrom();
      })
      const PerpendicularDistance = zim.dist(1100, 610, PerpendicularDraggablePoint.x, PerpendicularDraggablePoint.y);
      const GroundDistance = zim.dist(1100, 650, groundDraggablePoint.x, groundDraggablePoint.y);
      const hyperbolaDistance = zim.dist(1100, 700, hyperbolaDraggablePoint.x, hyperbolaDraggablePoint.y);
      let distanceLabel = new Label({
        text: `Perpendicular Distance: ${Math.round(PerpendicularDistance)} Ground Distance: ${Math.round(GroundDistance)} Hyperbola Distance: ${Math.round(hyperbolaDistance)}`,
        size: 20,
        color: "black",
        bold: true,
      }).pos(100, 450);
      distanceLabels.push(distanceLabel);

      if(PerpendicularDistance + GroundDistance > hyperbolaDistance){
        
        possibleMassgae.alp(1);
      }else{
        possibleMassgae.alp(0);
      }
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
    
    const Perpendicular  = new Line({ length: 155, thickness: 2 }).pos(1100, 610);
    const ground = new Line({ length: 155, thickness: 2 }).pos(1100, 650);
    const hyperbola = new Line({ length: 200, thickness: 2 }).pos(1100, 700);

    const PerpendicularDraggablePoint = new Circle({ radius: 10, color: "red" }).pos(1255, 600).drag();
    const groundDraggablePoint = new Circle({ radius: 10, color: "red" }).pos(1255, 640).drag();
    const hyperbolaDraggablePoint = new Circle({ radius: 10, color: "red" }).pos(1300, 690).drag();
    return [Perpendicular, ground, hyperbola, PerpendicularDraggablePoint,groundDraggablePoint,hyperbolaDraggablePoint];

  }

  

}
init();