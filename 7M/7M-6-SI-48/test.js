import zim, { center, Rectangle, Shape, siz, Triangle } from "./zim.js";
const { Frame, Circle, Label, Pic, Button, Line } = zim; // Added Line

async function init() {
    // Load JSON data
    const response = await fetch("data.json");
    const data = await response.json();

    // Destructure the loaded data
    const { lang, headerText, chapter, chapterNoText, footerLabelText, subHeaderText, informationText, similarMessage, errorMessage } = data;

    // Create the frame after loading the JSON data
    const frame = new Frame("fit", 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

    function ready() {
        const stage = frame.stage;
        const bg = new Pic("assets/image/bg.png").center();
        const stagePic = new Pic("assets/image/stage.png").center().mov(0, 100);
        const infoBox = new Pic("assets/image/info.png").pos(100, 400);
        // const table = new Pic("assets/image/table.png").pos(510, 220);
        labelCreation();
        const [upperLine,draggablePoint] = drawShape();
        draggablePoint.on("pressmove", () => {
      
          if (draggablePoint.x > 1050) {
              draggablePoint.x = 1050;
          }
          else if (draggablePoint.x < 900) {
              draggablePoint.x = 900;
          }
          draggablePoint.y = 230;
    
          upperLine.length = draggablePoint.x - 850;
         
          S.update();
    
         // drawColorsOnGraph(distancesOfCells, cells, radius,halfRectLabel, fullRectLabel,resultRectLabel);
      });

      
       
      


    }

    function drawShape(){
        // const circle = new Circle({ radius: 100, color: "transparent", borderWidth: 1 }).loc(1100, 610);
        // const line = new Line({ length: 100, thickness: 2 }).pos(1100, 610);
        // //new Circle(5, "red").pos(1100, 620);
        const upperLine = new Line({ length: 100, thickness: 2 }).pos(850, 230);
        const draggablePoint = new Circle({ radius: 10, color: "red" }).loc(950, 230).drag();
        return [upperLine, draggablePoint];
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
          .sca(0.6).mov(0,20);
  
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
  
      }).loc(informationText.positionX[lang], 430);
  
      const restartButton = new Button({
          label: "",
          width: 90,
          height: 90,
          backgroundColor: "#967bb6",
          rollBackgroundColor: "#967bb6",
          borderWidth: 0,
          gradient: 0.4,
          corner: 45,
        })
          .center()
          .mov(830, 430);
    
        const pic = new Pic("assets/image/restart.png").sca(0.15).center(restartButton);
        pic.rotation = 60;
    
        restartButton.on("click", () => {
          location.reload();
        });
  
  
    }
}

init();
