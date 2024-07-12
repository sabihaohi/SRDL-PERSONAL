import zim from "./zim.js";
const { Frame, Circle, Label, Rectangle, Pic, TextArea, Triangle, Button } = zim;

async function init() {
  try {
    // Load JSON data
    const response = await fetch("data.json");
    const data = await response.json();

    // Destructure the loaded data
    const {
      lang,
      playBtnText,
      headerText,
      chapter,
      infoAbdunantnumber,
      infodeficentnumber,
      chapterNoText,
      footerLabelText,
      informationText,
      abdundantnumber,
      deficentnumber
    } = data;

    // Create the frame after loading the JSON data
    new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

    function ready() {
      setupLabels(headerText, chapter, lang);
      setupTriangles();
      setupTobOuterRect();
      setupRestartButton();
    }

    function setupLabels(headerText, chapter, lang) {
      new Label({
        text: "INFORMATIONS",
        size: 40,
        color: "black",
        bold: true,
        italic: true
      }).loc(120, 400).alp(0);
    }

    const triangles = [];



    function setupTriangles(r=300) {
      for (let i = 0; i < 6; i++) {
        const triangle = new Triangle(r, r, r, "pink", "purple", 2).center().reg(r/2, 0);
        new Label({
          text: i,
          size: 20
        }).center(triangle);
        triangle.rotation = 360 * i / 6;
        triangle.id = i;
        triangles.push(triangle);
      }
      console.log(triangles[2]);
    }

    const points =[
      {
        x: 950,
        y: 790
        
       }
      ,{
        x: 725,
        y: 660
      },
      {
        x: 720,
        y: 400
      },
      {
        x: 950,
        y: 270
      },
      {
        x: 1175,
        y: 400
      },
      {
        x: 1180,
        y: 650
      }
      
  ]


  //const combinations =[[1,3,5],[2,4,0],[1,3,5],[2,4,0],[1,3,5],[2,4,0]];   
  const combinations =  [[0,5],[1,4],[2,3],[0,1],[2,5],[3,4],[1,2],[0,3],[4,5]];                                                                                             


    function setupTobOuterRect() {
      const tobouterrect = new Rectangle(100, 100, "red").pos(1500, 500).drag();
      let flowerCounts = [0, 0, 0, 0, 0, 0];


      tobouterrect.on("click", () => {
        triangles.forEach((triangle,index) => {
          if (tobouterrect.hitTestPoint(points[index].x,points[index].y)) {
            console.log("hit");
            if(flowerCounts[triangle.id] < 3){
             new Pic("assets/image/tobtop.png").sca(.2).center(triangle);
             flowerCounts[triangle.id]++;
              console.log(`Flowers${triangle.id}Count:`, flowerCounts[triangle.id]);
            }
        
          tobouterrect.x = 1500;
          tobouterrect.y = 500;
          S.update();

          combinations.forEach((combination, index) => {
            combination.forEach((flowerIndex) => {
              if(flowerCounts[flowerIndex] === flowerCounts[index] && flowerCounts[index]!=0){
                console.log(index,flowerIndex);
              }

            });
          });
         }
        });
     
      });



      points.forEach((point, index) => {
        new Circle(10, "transparent").pos(point.x, point.y);
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

     // new Pic("assets/image/restart.png").sca(0.15).center(restartButton).rotation = 60;

      restartButton.on("click", () => {
        location.reload();
      });
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Initialize the app
init();
