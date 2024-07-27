import zim, { Triangle, drag, sca, timeout } from "./zim.js";
const { Frame, Rectangle, Pic, Label,Circle, TextArea, Button, Line } = zim;



async function init() {
  const response = await fetch("data.json");
  const data = await response.json();



  const { lang,notpossibleText, headerText, chapter, informationText,distanceOfA,distanceOfB,distanceOfC,subHeaderText,rulesOfcreatingTriangle,possibleBtnText,impossibleBtnText,drawTriangleBtnText} = data;
  //const { itemsInfo } = itemsData;
  new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");



  function ready() {
    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").center().mov(150, 80);
    const infoBox = new Pic("assets/image/infoBox.png").pos(100, 350);
    let triangles = [];
    labelCreation();
    const [Perpendicular, ground, hyperbola, PerpendicularDraggablePoint,groundDraggablePoint,hyperbolaDraggablePoint] = drawShape();


    let createTrinaglleRule = new Label({
      text: rulesOfcreatingTriangle.text[lang],
      size: 20,
      color: "black",
      bold: true,
      lineHeight: 30,
    }).pos(165,450)

    let distanceLabelA = new Label({
          text: distanceOfA.text[lang] + `${Math.round(Perpendicular.length)}`,
          size: 20,
          color: "black",
          bold: true,
        }).pos(170, 590);
    
    let distanceLabelB = new Label({
      text:distanceOfB.text[lang] + `${Math.round(ground.length)}`,
      size: 20,
      color: "black",
      bold: true,
    }).pos(170, 630);
    let errorText =  new Label({
      text:notpossibleText.text[lang],
      size: 20,
      color: "red",
      lineHeight: 30,
    }).pos(800,450).alp(0);
    let distanceLabelC = new Label({
      text: distanceOfC.text[lang] +`${Math.round(hyperbola.length)}`,
      size: 20,
      color: "black",
      bold: true,
    }).pos(170, 670);

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
    distanceLabelA.text =distanceOfA.text[lang] + `${Math.round(PerpendicularDistance)}`;
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
    distanceLabelB.text =distanceOfB.text[lang] + `${Math.round(GroundDistance)}`;
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
  distanceLabelC.text = distanceOfC.text[lang] + `${Math.round(hyperbolaDistance)}`;
    //drawTriangles();
    conditionTriangle();
   });

  //drawTriangles();
  function drawTriangles(){
   
  triangles.forEach((triangle)=>{
     triangle.removeFrom();
  })
  const maxLenght = Math.max(Perpendicular.length, ground.length, hyperbola.length);
  const triangle = new Triangle(hyperbola.length, Perpendicular.length, maxLenght) // side lengths, color
		.pos(800, 450, RIGHT, BOTTOM); // 150 from right and 200 from bottom
    triangle.color= "transparent";
    triangle.borderColor = "black";
    triangle.borderThickness = 5;
    triangles.push(triangle);
  
  }

  const drawTrianglebtn = new Button({
    width: 250,
    height: 50,
    label: drawTriangleBtnText.text[lang],
    backgroundColor: "#f1c40f",
    corner: 10,
    rollBackgroundColor: "#f39c12",
    color: "white",
    rollColor: "white",
   }).pos(600,700).alp(0);

   const possibleBtn = new Button({
    width: 200,
    height: 50,
    label: possibleBtnText.text[lang],
    backgroundColor: "#2ecc71",
    corner: 10,
    rollBackgroundColor: "#27ae60",
    color: "white",
    rollColor: "white",
   }).pos(600,800);

   const notpossibleBtn = new Button({
    width: 200,
    height: 50,
    label: impossibleBtnText.text[lang],
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
        errorText.alp(0);
      })
     
    }
    else{
      drawTrianglebtn.alp(0);
      console.log('drawn triangle is not possible');
      notpossibleBtn.on("click",()=>{
        drawTrianglebtn.alp(0);
      })
      possibleBtn.on("click",()=>{
        drawTrianglebtn.alp(0);
        errorText.alp(1);
       
      })
     
      triangles.forEach((triangle)=>{
        triangle.removeFrom();
      })

    }


  }
  const playButton = new Button({
    label: "play",
    width: 100,
    height: 100,
    backgroundColor: "blue",
    rollBackgroundColor: "red",
    borderWidth: 0,
    gradient: 0.3,
    corner: 10,
  })
    .center()
    .sca(.8)
    .pos(1670, 930).alp(0);
   
  playButton.on("click", () => {
    practiccMode();
  });

   drawTrianglebtn.on("click",()=>{
    drawTriangles();
   })

  
  
   const modeSlider = new Slider({
    step: 1,
    vertical: true,
    min: 1,
    max: 2,
    useTicks: true,
    button: "circle",
    barColor: "black",
    tickColor: "black",
  })
    .center()
    .pos(1704, 244)
    .sca(1)
    .change(() => {
      if(modeSlider.currentValue == 1){
        playButton.alp(1);
      }
    });

   
  const animationTime = 1;
    function practiccMode() {
      // Generate random changes for each line length
      const randomChange = () => Math.random() * 30 - 25; // Random value between -25 and 5
      const randomChange2 = () => Math.random() * 30 + 25; // Random value between 25 and 55
    
      // Calculate new lengths for each line
      const lengthChangePerpendicular = randomChange();
      const lengthChangeGround = randomChange();
      const lengthChangeHyperbola = randomChange2();
    
      // Ensure minimum length constraint
      const minLength = 20;
      const newPerpendicularLength = Math.max(minLength, Perpendicular.length + lengthChangePerpendicular);
      const newGroundLength = Math.max(minLength, ground.length + lengthChangeGround);
      const newHyperbolaLength = Math.max(minLength, hyperbola.length + lengthChangeHyperbola);
    
      // Animate lines with new lengths
      zim.animate(Perpendicular, { length: newPerpendicularLength }, 1, "easeInOutQuart");
      zim.animate(ground, { length: newGroundLength }, 1, "easeInOutQuart");
      zim.animate(hyperbola, { length: newHyperbolaLength }, 1, "easeInOutQuart");
    
      // Update draggable points to align with new line lengths
      const updateDraggablePoint = (point, length) => {
        const endX = 1200 + length;
        zim.animate(point, { x: endX }, 1, "easeInOutQuart");
      };
    
      updateDraggablePoint(PerpendicularDraggablePoint, newPerpendicularLength);
      updateDraggablePoint(groundDraggablePoint, newGroundLength);
      updateDraggablePoint(hyperbolaDraggablePoint, newHyperbolaLength);
    
      // Ensure y positions remain fixed
      PerpendicularDraggablePoint.y = 750;
      groundDraggablePoint.y = 800;
      hyperbolaDraggablePoint.y = 850;
    
      // Function to check if a valid triangle can be formed
      function checkTriangleCondition() {
        const maxDistance = Math.max(newPerpendicularLength, newGroundLength, newHyperbolaLength);
        const sumOfDistances = newPerpendicularLength + newGroundLength + newHyperbolaLength;
        const twoSmallestSides = sumOfDistances - maxDistance;
    
        if (twoSmallestSides > maxDistance) {
          console.log('Drawn triangle is possible');
          
          // Animate possibleBtn
          possibleBtn.animate({
            time:animationTime,
            call: () => {
              possibleBtn.backgroundColor = "blue";
              drawTrianglebtn.animate({
                props: { alpha: 1 },
                time: animationTime,
                call: () => {
                  drawTrianglebtn.animate({
                    time: 1,
                    call: () => {
                      drawTrianglebtn.backgroundColor = "green";
                      timeout(1, () => {
                        drawTriangles();
                      });
                    }
                  });
                }
              });
            }
          });
        } else {
          console.log('Drawn triangle is not possible');
          drawTrianglebtn.alp(0);
          possibleBtn.animate({
            props: { backgroundColor: "red" },
            time: 2
          });
    
          notpossibleBtn.on("click", () => {
            drawTrianglebtn.alp(0);
          });
          
          possibleBtn.on("click", () => {
            drawTrianglebtn.alp(0);
            errorText.alp(1);
          });
    
          triangles.forEach((triangle) => {
            triangle.removeFrom();
          });
        }
      }
    
      // Check triangle condition after animation
      setTimeout(() => {
        distanceLabelA.text = distanceOfA.text[lang] + `${Math.round(newPerpendicularLength)}`;
        distanceLabelB.text = distanceOfB.text[lang] + `${Math.round(newGroundLength)}`;
        distanceLabelC.text = distanceOfC.text[lang] + `${Math.round(newHyperbolaLength)}`;
    
        checkTriangleCondition();
      }, 1000); // Adjust the timeout to match the duration of your animations
    } 
   
  }
  function labelCreation() {
    const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
      .center()
      .pos(130, 60);

    
      const SubHeader_rect = new Rectangle({ width: 1500, height: 50, color: "transparent" })
      .center()
      .pos(270, 140);

    const header_label = new Label({
      text: headerText.text[lang],
      size: 40,
      bold: true,
    })
      .center(header_rect)
      .sca(1);

      const subHeader_label = new Label({
        text: subHeaderText.text[lang],
        size: 40,
        bold: true,
      })
        .center(SubHeader_rect)
        .sca(0.6).mov(100,10);

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

    }).loc(informationText.x[lang], 405);


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