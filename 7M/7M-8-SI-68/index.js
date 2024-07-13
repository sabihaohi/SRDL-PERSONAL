import zim, { drag, sca } from "./zim.js";
const { Frame, Rectangle, Pic, Label,Circle, TextArea, Button, Line } = zim;



async function init() {
  const response = await fetch("data.json");
  const data = await response.json();



  const { lang, headerText, chapter, informationText, diameterText, radiusText, footerLabelText } = data;
  //const { itemsInfo } = itemsData;
  new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");



  function ready() {
    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").center().mov(150, 80);
    const infoBox = new Pic("assets/image/infoBox.png").pos(100, 350);
    //mainFunction();
    labelCreation();
    const [cells, distancesOfCells] = drawGraph();
    const [circle,line,upperLine,draggablePoint] = drawShape();
    const [halfRectLabel, fullRectLabel] = createLabels();

    let radius =100;
    drawColorsOnGraph(distancesOfCells, cells, radius, halfRectLabel, fullRectLabel);
    draggablePoint.on("pressmove", () => {
      
      if (draggablePoint.x > 1050) {
          draggablePoint.x = 1050;
      }
      else if (draggablePoint.x < 900) {
          draggablePoint.x = 900;
      }
      draggablePoint.y = 230;

      radius = zim.dist(850, 230, draggablePoint.x, draggablePoint.y);
      line.length = radius;
      upperLine.length = radius;
      circle.radius = radius;
      S.update();

      drawColorsOnGraph(distancesOfCells, cells, radius,halfRectLabel, fullRectLabel);
  });
   
  
   
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

  function drawGraph() {
    const cells = [];
    const distancesOfCells = [];
    let cellDistance = 0;
    for (let row = 0; row < 25; row++) {

      for (let col = 0; col < 25; col++) {
        const cell = new Rectangle({ width: 20, height: 20, color: "white", borderWidth: 0.5, borderColor: "green" }).reg(10, 10).pos(850 + 20 * col, 360 + 20 * row);

        cells.push(cell);
       
        cellDistance = zim.dist(1100, 610, cell.x, cell.y);
        distancesOfCells.push(cellDistance);
      }
    }
    // Graph Lines
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const line = new Rectangle({ width: 100, height: 100, color: "transparent", borderWidth: 0.5, borderColor: "red" }).pos(850 + 100 * col, 360 + 100 * row);
      }
    }
    return [cells, distancesOfCells];
  }

  function drawShape(){
    const circle = new Circle({ radius: 100, color: "transparent", borderWidth: 1 }).loc(1100, 610);
    const line = new Line({ length: 100, thickness: 2 }).pos(1100, 610);
    //new Circle(5, "red").pos(1100, 620);
    const upperLine = new Line({ length: 100, thickness: 2 }).pos(850, 230);
    const draggablePoint = new Circle({ radius: 10, color: "red" }).loc(950, 230).drag();
    return [circle, line, upperLine, draggablePoint];

  }
  function createLabels() {
    const halfRectLabel = new Label({ size: 28, font: "monospace", bold: true }).loc(200, 490);
    const fullRectLabel = new Label({ size: 28, font: "monospace", bold: true }).loc(200, 550);
    return [halfRectLabel, fullRectLabel];
}

  function drawColorsOnGraph(distancesOfCells, cells, radius, halfRectLabel, fullRectLabel) {
    let fullRectCount = 0;
    let halfRectCount = 0;
    distancesOfCells.forEach((cellDis, index) => {
      if (cellDis < radius + 10) {
          cells[index].color = "red";
          fullRectCount++;

          if (cellDis > radius - 10) {
              cells[index].color = "green";
              halfRectCount++;
              fullRectCount--;
          }
      }
      else {
          cells[index].color = "white";
      }
      halfRectLabel.text = "green:" + halfRectCount;
      fullRectLabel.text = "red: " + fullRectCount;

  });
   
  }


}
init();