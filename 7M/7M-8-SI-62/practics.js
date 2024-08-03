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



    const point1 = new Circle(8, "RED").loc(800, 280);
    const point2 = new Circle(8, "blue").loc(1000, 280).drag();
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
        point2.y = 280;
  
        if (point2.x > 1050) {
          point2.x = 1050;
        } else if (point2.x < 900) {
          point2.x = 900;
        }
  
        drawLine();
        rhombus();
        createAngle()
      });
    
      const anglesLines = [];

    createAngle();

      
      function createAngle(){

        anglesLines.forEach(line => {
            line.removeFrom();
        });

        distance = zim.dist(point1.x, point1.y, point2.x, point2.y);

        const Lowerline = new Line({
            length:distance,
            color:"red",
            lineWidth:5
        }).pos(400,800);
        
        const upperLine = new Line({
            length:distance,
            color:"blue",
            lineWidth:5
        }).pos(400,800).rot(-90);


       
        const outerCircle = new Circle(distance,"transparent").loc(upperLine.x,upperLine.y).alp(.2);


        const angleDragPoint = new Circle(15,"green").loc(upperLine.x,upperLine.y-distance).drag(outerCircle);

        anglesLines.push(Lowerline,upperLine,outerCircle,angleDragPoint);
        angle = zim.angle(Lowerline.x,Lowerline.y,angleDragPoint.x,angleDragPoint.y,);
        angleDragPoint.on("pressmove",()=>{
            const angle = zim.angle(Lowerline.x,Lowerline.y,angleDragPoint.x,angleDragPoint.y,);
            console.log(360-angle);
            upperLine.rot(angle);
            rhombus();
        })

     
        
        

      }

      // Initial drawing
    const rhobmobusLines =[];

    rhombus();

   
   function rhombus(){
    rhobmobusLines.forEach(line => {
        line.removeFrom();
    })
    distance = zim.dist(point1.x, point1.y, point2.x, point2.y);

    const line1 = new Line({
        length: distance,
        color: "red",
        lineWidth: 10,
    }).pos(800, 580);

    console.log(line1.x, line1.y)

    const line2 = new Line({
        length: distance,
        color: "blue",
        lineWidth: 10,
    }).pos(line1.x,line1.y).rot(45);

    const line3 = new Line({
        length: distance,
        color: "green",
        lineWidth: 10,
    }).pos(line1.x + distance, line1.y).rot(45);

    const line4 = new Line({
        length: distance,
        color: "green",
        lineWidth: 10,
    }).pos(line1.x+distance/1.42,line1.y+distance/1.4);

    rhobmobusLines.push(line1, line2, line3,line4);

   }




   
    

  }
}

// Initialize the app
init();
