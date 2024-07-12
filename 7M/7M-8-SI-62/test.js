import zim from "https://zimjs.org/cdn/016/zim";
const { Frame, Circle, Rectangle, Line, Pic } = zim;

async function init() {
  // Load JSON data
  const response = await fetch("data.json");
  const data = await response.json();

  // Destructure the loaded data
  const { lang, headerText, chapter, chapterNoText, footerLabelText, informationText } = data;

  // Create the frame after loading the JSON data
  new Frame(FIT, 2020, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

  function ready() {
    assetsLoading();

    const point1 = new Circle(8, "transparent").loc(900, 260);
    const point2 = new Circle(8, "red").loc(1100, 260).drag();
    const circleLinePoint1 = new Circle(8, "red").loc(1190, 640);
    console.log(circleLinePoint1.x, circleLinePoint1.y);
    
    const lines = [];
    function drawLines() {
      lines.forEach(line => {
        line.removeFrom();
      });

      const distance = zim.dist(point1.x, point1.y, point2.x, point2.y);
      const angle = zim.angle(point1.x, point1.y, point2.x, point2.y);
      const line = new Rectangle(distance, 2).pos(point1.x, point1.y).rot(angle);
      lines.push(line);
    }
    drawLines();
    point2.on("pressmove", drawLines);

    let startPointX;
    let startPointY;
    let endPointX;
    let endPointY;
    let isDrawing = false;
    let line;

    circleLinePoint1.on("mousedown", (event) => {
      // Get the mouse coordinates
      const mouseX = event.stageX;
      const mouseY = event.stageY;
      startPointX = circleLinePoint1.x;
      startPointY = circleLinePoint1.y;
      endPointX = mouseX;
      endPointY = mouseY;
      isDrawing = true;
    });

    circleLinePoint1.on("pressmove", (event) => {
      // Get the mouse coordinates
      const mouseX = event.stageX;
      const mouseY = event.stageY;
      endPointX = mouseX;
      endPointY = mouseY;
      if (isDrawing) {
        DrawShape();
      }
    });

    // Update the stage regularly
    createjs.Ticker.on("tick", () => {
      if (isDrawing) {
        DrawShape();
      }
    });

    let success = false;
    function DrawShape() {
      if (line) {
        line.removeFrom();
      }
      line = new Line({ points: [[startPointX, startPointY], [endPointX, endPointY]] }).center();
      const circleRadius = 150; // Assuming a circle radius here
      if (zim.dist(startPointX, startPointY, endPointX, endPointY) > circleRadius * 2) {
        isDrawing = false;
        if (!success) {
          line.color = "red";
        }
      }
      if (zim.dist(circleLinePoint1.x, circleLinePoint1.y, endPointX, endPointY) < circleRadius) {
        success = true;
        line.color = "green";
      } else {
        success = false;
      }
    }

    stage.on("stagemouseup", () => {
      isDrawing = false;
    });
  }

  function assetsLoading() {
    const bg = new Pic("assets/image/bg.png").center();
  }
}

// Initialize the app
init();
