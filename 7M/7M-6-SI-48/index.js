import zim from "https://zimjs.org/cdn/016/zim";
const { Frame, Circle, Pic, Shape } = zim;

async function init() {
  // Load JSON data
  const response = await fetch("data.json");
  const data = await response.json();

  // Destructure the loaded data
  const {
    lang,
    centerText,
    radiusText,
    headerText,
    chapter,
    chapterNoText,
    footerLabelText,
    informationText,
  } = data;

  // Create the frame after loading the JSON data
  const frame = new Frame(FIT, 2020, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

  function ready() {

    const bg = new Pic("assets/image/bg.png").center();
    const stagePic = new Pic("assets/image/stage.png").sca(1.4).center().mov(0,100);
    const point1 = new Circle(8, "transparent").loc(800, 450);
    new Label({
        text:"Length of the Rhombus",
        size:20
    }).pos(point1.x,point1.y-30);
    const point2 = new Circle(8, "blue").loc(1050, 450).drag();
    let distance = zim.dist(point1.x, point1.y, point2.x, point2.y);
    let angle;
    const lines = [];
    drawLine();
    function drawLine() {
        lines.forEach(line => {
          line.removeFrom();
        });
  
        distance = zim.dist(point1.x, point1.y, point2.x, point2.y);
        const line = new Rectangle(distance, 5).pos(point1.x, point1.y);
        lines.push(line);
      }

      point2.on("pressmove", () => {
        // shapes.forEach(shape => {
        //   shape.removeFrom();
        // });
  
        console.log(distance);
        point2.y = 450;
  
        if (point2.x > 1150) {
          point2.x = 1150;
        } else if (point2.x < 900) {
          point2.x = 900;
        }
  
        drawLine();
        rhombus();
        createAngle()
      });
    
      const anglesLines = [];
      const angleLabels =[];

      createAngle();

      
      function createAngle(){

        anglesLines.forEach(line => {
            line.removeFrom();
        });

        angleLabels.forEach(label => {
            label.removeFrom();
        });

        distance = zim.dist(point1.x, point1.y, point2.x, point2.y);

        const Lowerline = new Line({
            length:distance,
            color:"red",
            lineWidth:5
        }).pos(600,800);
        
        const angleLableA =  new Label({
            text:"A",
            size:20
        }).pos(Lowerline.x-20,Lowerline.y-5);

        const angleLableB =  new Label({
            text:"B",
            size:20
        }).pos(Lowerline.x+distance+15,Lowerline.y-5);


     angleLabels.push(angleLableA,angleLableB);
      

        
        const upperLine = new Line({
            length:distance,
            color:"blue",
            lineWidth:5
        }).pos(600,800).rot(-90);
        const outerCircle = new Circle(distance,"transparent").loc(upperLine.x,upperLine.y).alp(.2);
        const angleDragPoint = new Circle(15,"green").loc(upperLine.x,upperLine.y-distance).drag(outerCircle);
        new Label({
            text:"C",
            size:20,
            color:"white"
        }).center(angleDragPoint);

        anglesLines.push(Lowerline,upperLine,outerCircle,angleDragPoint);
        angle = zim.angle(Lowerline.x,Lowerline.y,angleDragPoint.x,angleDragPoint.y,);
        angleDragPoint.on("pressmove",()=>{
            const angle = zim.angle(Lowerline.x,Lowerline.y,angleDragPoint.x,angleDragPoint.y,);
            console.log(360-angle);
            upperLine.rot(angle);

            angleDragPoint.loc(
                upperLine.x + Math.cos(angle * Math.PI / 180) * distance,
                upperLine.y + Math.sin(angle * Math.PI / 180) * distance
              );
            rhombus();
        })

     
        
        

      }

      // Initial drawing
    const rhobmobusLines =[];
    const rhombusLabels =[];

    rhombus();

   
   function rhombus(){
    rhobmobusLines.forEach(line => {
        line.removeFrom();
    })

    rhombusLabels.forEach(label => {
        label.removeFrom();
    });
    distance = zim.dist(point1.x, point1.y, point2.x, point2.y);

    const line1 = new Line({
        length: distance,
        color: "red",
        lineWidth: 10,
    }).pos(900, 580);

    const rhombhosLabelA = new Label({
        text: "A",
        size: 20,
    }).pos(line1.x -20, line1.y-5);



    const line2 = new Line({
        length: distance,
        color: "blue",
        lineWidth: 10,
    }).pos(line1.x,line1.y).rot(-angle);

   const rhombhosLabelB =  new Label({
        text: "B",
        size: 20,
    }).pos(line1.x + distance + 20, line1.y-5);


    const line3 = new Line({
        length: distance,
        color: "green",
        lineWidth: 10,
    }).pos(line1.x + distance, line1.y).rot(45);

    const rhombhosLabelC = new Label({
        text: "C",
        size: 20,
    }).pos(line1.x + distance/1.42, line1.y+distance/1.4 + 10);

    const line4 = new Line({
        length: distance,
        color: "green",
        lineWidth: 10,
    }).pos(line1.x+distance/1.42,line1.y+distance/1.4);
 
   const rhombhosLabelD =  new Label({
        text: "D",
        size: 20,
    }).pos(line1.x + distance/1.42 +distance, line1.y+distance/1.4 + 5);


    rhobmobusLines.push(line1, line2, line3,line4);
    rhombusLabels.push(rhombhosLabelA,rhombhosLabelB,rhombhosLabelC,rhombhosLabelD);
   

   }

  }
}

// Initialize the app
init();
