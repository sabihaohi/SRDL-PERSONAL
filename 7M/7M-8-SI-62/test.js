import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Rectangle, Label, Circle, Pic, Shape } = zim;

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
    const stage = frame.stage;
    assetsLoading(stage);

    const point1 = new Circle(8, "transparent").loc(800, 280);
    const point2 = new Circle(8, "blue").loc(1000, 280).drag();
    //const circleLinePoint1 = new Circle(8, "red").loc(1150, 700);
    const circleLinePoint2 = new Circle(8, "red").loc(1290,700).drag();
    const pointerimage = new Pic("assets/image/pointer.png").sca(0.18).center(circleLinePoint2).mov(5,-10);
    let distance = zim.dist(point1.x, point1.y, point2.x, point2.y);
   //const stageRect = new Rectangle(500, 500, "red").center();
   //console.log(circleLinePoint1.x, circleLinePoint1.y);
   console.log(distance);
    const lines = [];
    function drawLine(){
       lines.forEach(line => {
           line.removeFrom();
       });
   
       distance = zim.dist(point1.x, point1.y, point2.x, point2.y);
       const line = new Rectangle(distance, 5).pos(point1.x, point1.y);
       //const line2 = new Rectangle(distance, 5).pos(circleLinePoint1.x, circleLinePoint1.y);
       //circleLinePoint2.x = circleLinePoint1.x + point2.x - point1.x;
       lines.push(line);  
    }
   
    drawLine();
    const shapes = [];


    point2.on("pressmove",()=>{
        shapes.forEach(shape => {
            shape.removeFrom();
        });
        // radiusLabels.forEach(label => {
        //     label.removeFrom();
        // });

        console.log(distance);
     point2.y = 280;
     
     if(point2.x>1050){
            point2.x = 1050;
     }
        else if(point2.x<900){
            point2.x = 900;
        }

        drawLine();  
    });


    const rightTrianglePointA = { x: 695, y: 895 };
    const rightTrianglePointC = { x: 850, y: 900 };

    const pointB = new Circle(15, "blue")
      .center(stage)
      .pos(800 - 15, 600 - 15)
      .drag();
    new Label("B", 20, "Arial", "white").center(pointB);

    const rightTriangleShape = new Shape().addTo(stage);

    // Create a label for angles
    const angleLabel = new Label({
      text: "",
      size: 20,
      color: "black",
    }).pos(200, 400).addTo(stage);

    // Function to calculate distances between two points
    function distanceInCm(p1, p2) {
      const distanceInPixels = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      return distanceInPixels; // Assuming 1 pixel per cm for simplicity
    }

    // Function to calculate angles using the law of cosines
   
    function calculateAngle(p,q){
        let angle = Math.atan2(p.y-q.y, p.x-q.x) * 180 / Math.PI;
        angle = angle<0?angle*=-1:360-angle;
        console.log(angle);
    }
    
  
    // Function to update the right triangle shape and angle label
    function rightUpdateTriangle() {
    //   const a = Math.floor(distanceInCm(rightTrianglePointA, pointB));
    //   const b = Math.floor(distanceInCm(rightTrianglePointC, pointB));
    //   const c = Math.floor(distanceInCm(rightTrianglePointA, rightTrianglePointC));

      // Redraw right triangle with lines AB and AC
      rightTriangleShape.graphics
        .clear()
        .beginStroke("green")
        .moveTo(rightTrianglePointA.x, rightTrianglePointA.y)
        .lineTo(pointB.x, pointB.y)
        .moveTo(rightTrianglePointA.x, rightTrianglePointA.y) // Line AC
        .lineTo(rightTrianglePointC.x, rightTrianglePointC.y);

      // Calculate and update angles
     // const { angleA, angleB, angleC } = calculateAngles(a, b, c);
     const angle = calculateAngle(pointB,rightTrianglePointA);
     //angleLabel.text = `Angle A: ${angle}°`;
     

      // Update the stage
      stage.update();
    }
    

   
    // Initial drawing
    rightUpdateTriangle();

    // Update triangle and angle label on pointB movement
    pointB.on("pressmove", () => {
      rightUpdateTriangle();
    });

    // Ensure the initial drawing and angle labels are updated
    rightUpdateTriangle();
  }

  function assetsLoading(stage) {
    const bg = new Pic("assets/image/bg.png").center().addTo(stage);
    const infoBox = new Pic("assets/image/infoBox.png")
      .sca(1.2)
      .pos(100, 300)
      .addTo(stage);
    const stagePic = new Pic("assets/image/stage.png").center().mov(100, 180).addTo(stage);
    const lineBox = new Pic("assets/image/line_box.png").pos(700, 200).addTo(stage);
  }
}

// Initialize the app
init();
