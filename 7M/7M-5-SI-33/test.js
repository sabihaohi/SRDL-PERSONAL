import zim, { drag, sca } from "./zim.js";
const { Frame, Rectangle, Pic, Label, Circle, Button, Line } = zim;

async function init() {
  const response = await fetch("data.json");
  const data = await response.json();

  const { lang, headerText, chapter, informationText } = data;
  new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

  function ready() {
    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").center().mov(150, 80);
    const infoBox = new Pic("assets/image/infoBox.png").pos(100, 350);

    labelCreation();

    const { Perpendicular, ground, hyperbola, draggablePoints } = drawShape();

    draggablePoints.forEach(point => {
      point.on("pressmove", () => {
        point.y = point.startY;

        if (point.x > 1500) {
          point.x = 1500;
        } else if (point.x < 1200) {
          point.x = 1200;
        }

        updateLineLengths();
        drawTriangles();
      });
    });

    function updateLineLengths() {
      Perpendicular.length = zim.dist(1100, 610, Perpendicular.x, Perpendicular.y);
      ground.length = zim.dist(1100, 650, ground.x, ground.y);
      hyperbola.length = zim.dist(1100, 700, hyperbola.x, hyperbola.y);
    }

    drawTriangles();

    let lines = [];

    function drawTriangles() {
      lines.forEach(line => line.removeFrom());
      lines = [];

      const line1 = new Line({ length: hyperbola.length, thickness: 2 }).pos(700, 500);
      const line2 = new Line({ length: Perpendicular.length, thickness: 2 }).pos(line1.x, 500).rot(310);
      const line3 = new Line({ length: ground.length, thickness: 2 }).pos(line1.x + line1.length, line1.y).rot(-130);

      lines.push(line1, line2, line3);
    }

    const drawTriangleButton = new Button({
      width: 200,
      height: 50,
      label: "Draw Triangle",
      backgroundColor: "#f1c40f",
      corner: 10,
      rollBackgroundColor: "#f39c12",
      color: "white",
      rollColor: "white",
    }).pos(500, 800);

    const possibleMessage = new Label({
      text: "Possible Triangle",
      size: 20,
      color: "black",
      bold: true,
    }).pos(100, 400).alp(0);

    const notPossibleMessage = new Label({
      text: "Triangle is not possible",
      size: 20,
      color: "black",
      bold: true,
    }).pos(100, 400).alp(0);

    let distanceLabels = [];

    drawTriangleButton.on("click", () => {
      distanceLabels.forEach(label => label.removeFrom());
      distanceLabels = [];

      const PerpendicularDistance = zim.dist(1100, 610, Perpendicular.x, Perpendicular.y);
      const GroundDistance = zim.dist(1100, 650, ground.x, ground.y);
      const hyperbolaDistance = zim.dist(1100, 700, hyperbola.x, hyperbola.y);

      const distanceLabel = new Label({
        text: `Perpendicular Distance: ${Math.round(PerpendicularDistance)} Ground Distance: ${Math.round(GroundDistance)} Hyperbola Distance: ${Math.round(hyperbolaDistance)}`,
        size: 20,
        color: "black",
        bold: true,
      }).pos(100, 450);
      distanceLabels.push(distanceLabel);

      if (PerpendicularDistance + GroundDistance > hyperbolaDistance) {
        possibleMessage.alp(1);
        notPossibleMessage.alp(0);
      } else {
        possibleMessage.alp(0);
        notPossibleMessage.alp(1);
      }
    });
  }

  function labelCreation() {
    const headerRect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
      .center()
      .pos(130, 60);

    new Label({
      text: headerText[lang],
      size: 40,
      bold: true,
    }).center(headerRect).sca(1);

    new Label({
      text: chapter[lang],
      size: 25,
      color: "black",
      bold: true,
      italic: true,
    }).loc(100, 110);

    new Label({
      text: informationText[lang],
      size: 20,
      color: "black",
      bold: true,
    }).loc(100, 380);
  }

  function drawShape() {
    const Perpendicular = new Line({ length: 155, thickness: 2 }).pos(1100, 610);
    const ground = new Line({ length: 155, thickness: 2 }).pos(1100, 650);
    const hyperbola = new Line({ length: 200, thickness: 2 }).pos(1100, 700);

    const draggablePoints = [
      new Circle({ radius: 10, color: "red" }).pos(1255, 600).drag(),
      new Circle({ radius: 10, color: "red" }).pos(1255, 640).drag(),
      new Circle({ radius: 10, color: "red" }).pos(1300, 690).drag()
    ];

    draggablePoints.forEach(point => {
      point.startY = point.y;
    });

    return { Perpendicular, ground, hyperbola, draggablePoints };
  }
}

init();
