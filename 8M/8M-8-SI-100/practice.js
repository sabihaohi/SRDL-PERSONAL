import zim from "./zim.js";
const { Frame, Circle, Label, Rectangle, Pic, TextArea, Triangle, Button, Stepper } = zim;

async function init() {
  try {
    // Load JSON data
    const response = await fetch("data.json");
    const data = await response.json();

    // Destructure the loaded data
    const {
      lang,
      headerText,
      chapter,
      informationText,
      resultInformation
    } = data;

    // Create the frame after loading the JSON data
    new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

    function ready() {
      const bg = new Pic("assets/image/bg.png").center();
      const informationBox = new Pic("assets/image/informationbox.png").pos(80, 300);
      const PentagonPic = new Pic("assets/image/garden.png").sca(.8).pos(710, 280);
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
        size: 40,
        color: "black",
        bold: true,
        italic: true,
      }).loc(90, 70);

      const resultInformation = new Label({
        text: "",
        size: 40,
        color: "black",
        bold: true,
      }).pos(180, 500);
   
     
      new Label({
        text: informationText.text[lang],
        size: informationText.size[lang],
        color: "black",
      }).pos(informationText.posX[lang], 365);

        const flowervase = new Pic("assets/image/flowervase.png").pos(1400, 300);
        setupTriangles();
        setupTobOuterRect();
        setupRestartButton();
        CalculateArea();


        
  
        const triangles = [];
  
        function setupTriangles(r=300) {
          for (let i = 0; i < 6; i++) {
            const triangle = new Triangle(r, r, r, "transparent", "transparent", 2).pos(900,450).reg(r/2, 0);
            triangle.rotation = 360 * i / 6;
            triangle.id = i;
            triangles.push(triangle);
          }
          console.log(triangles[2]);
        }
  
      
  
        const points = [
          {
            x: 1040,
            y: 830
          },
          {
            x: 815,
            y: 700
          },
          {
            x: 810,
            y: 450
          },
          {
            x: 1040,
            y: 310
          },
          {
            x: 1265,
            y: 430
          },
          {
            x: 1270,
            y: 690
          }
        ];
  
        //const combinations = [[1, 3, 5], [2, 4, 0], [1, 3, 5], [2, 4, 0], [1, 3, 5], [2, 4, 0]];
        const combinations =[[[0,5],[1,4],[2,3]],[[0,1],[2,5],[3,4]],[[1,2],[0,3],[4,5]]];
  
        function setupTobOuterRect() {
          const tobouterrect = new Rectangle(100, 200, "transparent").pos(1560, 480).drag();
          const flowerbuquet = new Pic("assets/image/tob.png").center(tobouterrect).sca(.5).mov(70,100);
          let flowerCounts = [0, 0, 0, 0, 0, 0];
  
          tobouterrect.on("pressup", () => {
            triangles.forEach((triangle, index) => {
              if (tobouterrect.hitTestPoint(points[index].x, points[index].y)) {
                if (flowerCounts[index] < 3) {
                  new Pic("assets/image/tobtop.png").sca(.9).center(triangle);
                  flowerCounts[index]++;
                  console.log(`Flowers${triangle.id}Count:`, flowerCounts[triangle.id]);
                }
  
                tobouterrect.x = 1560;
                tobouterrect.y = 480;
                S.update();
  
                combinations.forEach((combination,index) => { 
                  let status = true;
                  combination.forEach((flowerIndex) => {
                    if(flowerCounts[flowerIndex[0]] === flowerCounts[flowerIndex[1]] && flowerCounts[flowerIndex[0]] !=0){
                          
                      }
                  else { 
                    status = false; 
                  } 
                });
                if(status==true){ 
                  console.log("Correct Combination",index+1);
                  resultInformation.text = resultInformation.text[lang] + index+1;
                }
                });
              }
            });
          });
  
  
          // points.forEach((point) => {
          //   new Circle(10, "black").pos(point.x, point.y);
          // });
        }
  
        function CalculateArea() {
          function calculateTriangleArea(x1, y1, x2, y2, x3, y3) {
            return 0.5 * Math.abs(x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2));
          }
  
        triangles.forEach((triangle, index) => {
          // Assuming the triangles are drawn with their top vertex at the origin (0,0)
          // and the other vertices at (side/2, height) and (-side/2, height)
          const side = 300;
          const height = Math.sqrt(3) / 2 * side;
          const x1 = triangle.x;
          const y1 = triangle.y;
          const x2 = x1 + side / 2;
          const y2 = y1 + height;
          const x3 = x1 - side / 2;
          const y3 = y2;
  
          const area = calculateTriangleArea(x1, y1, x2, y2, x3, y3);
          console.log(`Area of triangle ${index}: ${area}`);
        });
        }
  
        function setupRestartButton() {
          const restartButton = new Button({
            label: "",
            width: 90,
            height: 90,
            backgroundColor: "#73C69E",
            rollBackgroundColor: "#73C69E",
            borderWidth: 0,
            gradient: 0.4,
            corner: 45
          }).center().mov(850, 460);
  
          // Uncomment to add an image to the button
          // new Pic("assets/image/restart.png").sca(0.15).center(restartButton).rotation = 60;
  
          restartButton.on("click", () => {
            location.reload();
          });
        }
        
      }

     
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Initialize the app
init();
