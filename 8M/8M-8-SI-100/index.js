import zim from "./zim.js";
const {
  Frame,
  Circle,
  Label,
  Rectangle,
  Pic,
  TextArea,
  Triangle,
  Button,
  Stepper,
} = zim;

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
      resultInformation,
      instructionText,
      arearesultText,
      lengthoforSide
    } = data;

    // Create the frame after loading the JSON data
    new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

    function ready() {
      const bg = new Pic("assets/image/bg.png").center();
      const informationBox = new Pic("assets/image/informationbox.png")
        .pos(20, 200)
        .sca(1.2);
      const PentagonPic = new Pic("assets/image/garden.png")
        .sca(0.8)
        .pos(710, 280);
      const header_rect = new Rectangle({
        width: 1700,
        height: 100,
        color: "transparent",
      })
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

      new Label({
        text: "Line2",
        size: 25,
        color: "black",
        bold: true,
        italic: true,
      }).loc(800, 850);

      new Label({
        text: "Line3",
        size: 25,
        color: "black",
        bold: true,
        italic: true,
      }).loc(645, 570);

      new Label({
        text: "Line1",
        size: 25,
        color: "black",
        bold: true,
        italic: true,
      }).loc(1220, 850);

      new Label({
        text: instructionText.text[lang],
        size: 20,
        color: "black",
        bold: true,
        italic: true,
        lineHeight: instructionText.LineHeight[lang],
      }).loc(120, 365);

      new Label({
        text: lengthoforSide.text[lang],
        size: 25,
        color: "black",
        bold: true,
        italic: true,
      }).loc(920, 230);
 

      new Label({
        text: informationText.text[lang],
        size: informationText.size[lang],
        color: "black",
      }).pos(informationText.posX[lang], 275);

     const area =  new Label({
        text: arearesultText.text[lang],
        size: 20,
        color: "black",
        bold: true,
        lineHeight: 25,
      }).pos(120, 600);

      const points = [
        { x: 1040, y: 830 },
        { x: 815, y: 700 },
        { x: 810, y: 450 },
        { x: 1040, y: 310 },
        { x: 1265, y: 430 },
        { x: 1270, y: 690 },
      ];

      const middlepoints = [
        { x: 1020, y: 670 },
        { x: 915, y: 640 },
        { x: 915, y: 490 },
        { x: 1040, y: 430 },
        { x: 1155, y: 490 },
        { x: 1155, y: 630 },
      ];

      const flowervase = new Pic("assets/image/flowervase.png").pos(1400, 300);

      const triangles = [];

      setupTriangles();
      //setupTobOuterRect();
      setupRestartButton();
      CalculateArea();

      function setupTriangles(r = 300) {
        for (let i = 0; i < 6; i++) {
          const triangle = new Triangle(
            r,
            r,
            r,
            "transparent",
            "transparent",
            2
          )
            .pos(900, 450)
            .reg(r / 2, 0);
          new Label({
            text: `${i + 1}`,
            size: 25,
            color: "black",
            bold: true,
          }).pos(points[i].x, points[i].y);

          triangle.rotation = (360 * i) / 6;
          triangle.id = i;
          triangles.push(triangle);
         
        }
        console.log(triangles[2]);
      }

      const combinations = [
        [
          [0, 5],
          [1, 4],
          [2, 3],
        ],
        [
          [0, 1],
          [2, 5],
          [3, 4],
        ],
        [
          [1, 2],
          [0, 3],
          [4, 5],
        ],
      ];
       
     
      const labels = [];
      const tobouterrect = new Rectangle(100, 200, "transparent")
        .pos(1560, 480)
        .drag();
      const flowerbuquet = new Pic("assets/image/tob.png")
        .center(tobouterrect)
        .sca(0.5)
        .mov(70, 100);
      let flowerCounts = [0, 0, 0, 0, 0, 0];

      tobouterrect.on("pressup", () => {
        triangles.forEach((triangle, index) => {
          if (tobouterrect.hitTestPoint(points[index].x, points[index].y)) {
            labels.forEach((label) => {
              label.removeFrom();
            });
            if (flowerCounts[index] < 3) {
              if (flowerCounts[index] == 0) {
                  if(triangle.id == 0){
                    new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x, middlepoints[index].y);
                  }
                  else if(triangle.id == 1){
                    new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x, middlepoints[index].y-30);
                  }
                  else if(triangle.id == 2){
                    new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x-5, middlepoints[index].y);
                  }
                  else if(triangle.id == 3){
                    new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x-20, middlepoints[index].y);
                  }
                  else if(triangle.id == 4){
                    new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x-35, middlepoints[index].y);
                  }
                  else if(triangle.id == 5){
                    new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x-20, middlepoints[index].y-10);
                  }
              }
              else if(flowerCounts[index] == 1){
                if(triangle.id == 0){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x-30, middlepoints[index].y+50);
                }
                else if(triangle.id == 1){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x-40, middlepoints[index].y+40);
                }
                else if(triangle.id == 2){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x-80, middlepoints[index].y+20);
                }
                else if(triangle.id == 3){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x-60, middlepoints[index].y-50);
                }
                else if(triangle.id == 4){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x, middlepoints[index].y-80);
                }
                else if(triangle.id == 5){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x+10, middlepoints[index].y+55);
                }
                
              }

              else if(flowerCounts[index] == 2){
                if(triangle.id == 0){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x+40, middlepoints[index].y+50);
                }
                else if(triangle.id == 1){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x-80, middlepoints[index].y-40);
                }
                else if(triangle.id == 2){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x-30, middlepoints[index].y-70);
                }
                else if(triangle.id == 3){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x+20, middlepoints[index].y-50);
                }
                else if(triangle.id == 4){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x+50, middlepoints[index].y+10);
                }
                else if(triangle.id == 5){
                  new Pic("assets/image/tobtop.png").sca(0.5).pos(middlepoints[index].x+60, middlepoints[index].y-20);
                }
             
              }

              flowerCounts[index]++;
              console.log(
                `Flowers${triangle.id}Count:`,
                flowerCounts[triangle.id]
              );
            }

            tobouterrect.x = 1560;
            tobouterrect.y = 480;
            S.update();

            combinations.forEach((combination, index) => {
              let status = true;
              combination.forEach((flowerIndex) => {
                if (
                  flowerCounts[flowerIndex[0]] ===
                    flowerCounts[flowerIndex[1]] &&
                  flowerCounts[flowerIndex[0]] != 0
                ) {
                } else {
                  status = false;
                }
              });

              if (status == true) {
                console.log("Correct Combination", index + 1);
                const singlelabel = new Label({
                  text: `${resultInformation.text[lang]} ${index + 1} `,
                  size: 20,
                  color: "black",
                  bold: true,
                }).pos(120, resultInformation.posY[lang] + index * 28);
                labels.push(singlelabel);

                S.update();
              }
            });

           
          }
        });
      });

      function getRandomPointInTriangle(triangle) {
        const side = 10;
        const height = (Math.sqrt(3) / 2) * side;
        const x1 = triangle.x;
        const y1 = triangle.y;
        const x2 = x1 + side / 2;
        const y2 = y1 + height;
        const x3 = x1 - side / 2;
        const y3 = y2;

        const r1 = Math.random();
        const r2 = Math.random();

        const sqrtR1 = Math.sqrt(r1);

        const randomX =
          (1 - sqrtR1) * x1 + sqrtR1 * (1 - r2) * x2 + sqrtR1 * r2 * x3;
        const randomY =
          (1 - sqrtR1) * y1 + sqrtR1 * (1 - r2) * y2 + sqrtR1 * r2 * y3;

        return { randomX, randomY };
      }

      function CalculateArea() {
        function calculateTriangleArea(x1, y1, x2, y2, x3, y3) {
          return (
            0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2))
          );
        }

        triangles.forEach((triangle, index) => {
          const side = 10;
          const height = (Math.sqrt(3) / 2) * side;
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
          corner: 45,
        })
          .center()
          .mov(850, 460);

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
