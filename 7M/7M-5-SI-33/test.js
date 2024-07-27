import zim, { Triangle, drag, sca } from "./zim.js";
const { Frame, Rectangle, Pic, Label, Circle, TextArea, Button, Line } = zim;

async function init() {
  const response = await fetch("data.json");
  const data = await response.json();

  const {
    lang,
    notpossibleText,
    headerText,
    chapter,
    informationText,
    distanceOfA,
    distanceOfB,
    distanceOfC,
    subHeaderText,
    rulesOfcreatingTriangle,
    possibleBtnText,
    impossibleBtnText,
    drawTriangleBtnText,
  } = data;

  new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

  function ready() {
    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").center().mov(150, 80);
    const infoBox = new Pic("assets/image/infoBox.png").pos(100, 350);
    let triangles = [];
    labelCreation();
    const [
      Perpendicular,
      ground,
      hyperbola,
      PerpendicularDraggablePoint,
      groundDraggablePoint,
      hyperbolaDraggablePoint,
    ] = drawShape();

    let createTrinaglleRule = new Label({
      text: rulesOfcreatingTriangle.text[lang],
      size: 20,
      color: "black",
      bold: true,
      lineHeight: 30,
    }).pos(165, 450);

    let distanceLabelA = new Label({
      text: distanceOfA.text[lang] + `${Math.round(Perpendicular.length)}`,
      size: 20,
      color: "black",
      bold: true,
    }).pos(170, 590);

    let distanceLabelB = new Label({
      text: distanceOfB.text[lang] + `${Math.round(ground.length)}`,
      size: 20,
      color: "black",
      bold: true,
    }).pos(170, 630);

    let errorText = new Label({
      text: notpossibleText.text[lang],
      size: 20,
      color: "red",
      lineHeight: 30,
    })
      .pos(800, 450)
      .alp(0);

    let distanceLabelC = new Label({
      text: distanceOfC.text[lang] + `${Math.round(hyperbola.length)}`,
      size: 20,
      color: "black",
      bold: true,
    }).pos(170, 670);

    PerpendicularDraggablePoint.on("pressmove", () => {
      distanceLabelA.text = "";
      if (PerpendicularDraggablePoint.x > 1550) {
        PerpendicularDraggablePoint.x = 1550;
      } else if (PerpendicularDraggablePoint.x < 1250) {
        PerpendicularDraggablePoint.x = 1250;
      }
      PerpendicularDraggablePoint.y = 750;
      const PerpendicularDistance = zim.dist(
        1200,
        740,
        PerpendicularDraggablePoint.x,
        PerpendicularDraggablePoint.y
      );
      Perpendicular.length = PerpendicularDistance;
      distanceLabelA.text =
        distanceOfA.text[lang] + `${Math.round(PerpendicularDistance)}`;
      conditionTriangle();
    });

    groundDraggablePoint.on("pressmove", () => {
      distanceLabelB.text = "";
      if (groundDraggablePoint.x > 1550) {
        groundDraggablePoint.x = 1550;
      } else if (groundDraggablePoint.x < 1250) {
        groundDraggablePoint.x = 1250;
      }
      groundDraggablePoint.y = 800;
      const GroundDistance = zim.dist(
        1200,
        800,
        groundDraggablePoint.x,
        groundDraggablePoint.y
      );
      ground.length = GroundDistance;
      distanceLabelB.text =
        distanceOfB.text[lang] + `${Math.round(GroundDistance)}`;
      conditionTriangle();
    });

    hyperbolaDraggablePoint.on("pressmove", () => {
      distanceLabelC.text = "";
      if (hyperbolaDraggablePoint.x > 1550) {
        hyperbolaDraggablePoint.x = 1550;
      } else if (hyperbolaDraggablePoint.x < 1350) {
        hyperbolaDraggablePoint.x = 1350;
      }
      hyperbolaDraggablePoint.y = 850;
      const hyperbolaDistance = zim.dist(
        1200,
        850,
        hyperbolaDraggablePoint.x,
        hyperbolaDraggablePoint.y
      );
      hyperbola.length = hyperbolaDistance;
      distanceLabelC.text =
        distanceOfC.text[lang] + `${Math.round(hyperbolaDistance)}`;
      conditionTriangle();
    });

    function drawTriangles() {
      triangles.forEach((triangle) => {
        triangle.removeFrom();
      });
      const triangle = new Triangle(
        hyperbola.length,
        Perpendicular.length,
        ground.length
      ) // side lengths, color
        .pos(800, 450, RIGHT, BOTTOM); // 150 from right and 200 from bottom
      triangle.color = "transparent";
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
    })
      .pos(600, 700)
      .alp(0);

    const possibleBtn = new Button({
      width: 200,
      height: 50,
      label: possibleBtnText.text[lang],
      backgroundColor: "#2ecc71",
      corner: 10,
      rollBackgroundColor: "#27ae60",
      color: "white",
      rollColor: "white",
    }).pos(600, 800);

    const notpossibleBtn = new Button({
      width: 200,
      height: 50,
      label: impossibleBtnText.text[lang],
      backgroundColor: "#e74c3c",
      corner: 10,
      rollBackgroundColor: "#c0392b",
      color: "white",
      rollColor: "white",
    }).pos(850, 800);

    function conditionTriangle() {
      // Ensure we use updated lengths
      const a = Math.round(Perpendicular.length);
      const b = Math.round(ground.length);
      const c = Math.round(hyperbola.length);

      console.log("Checking triangle conditions:");
      console.log("Side A:", a, "Side B:", b, "Side C:", c);

      const canFormTriangle = a + b > c && a + c > b && b + c > a;

      if (canFormTriangle) {
        console.log("Drawn triangle is possible");
        drawTrianglebtn.alp(1); // Show the button to draw the triangle
        errorText.alp(0); // Hide error text

        possibleBtn.on("click", () => {
          drawTrianglebtn.alp(1); // Show the button to draw the triangle
          errorText.alp(0); // Hide error text
        });

        notpossibleBtn.on("click", () => {
          drawTrianglebtn.alp(0); // Hide the button
          errorText.alp(1); // Show error text
        });

      } else {
        console.log("Drawn triangle is not possible");
        drawTrianglebtn.alp(0); // Hide the button to draw the triangle
        errorText.alp(1); // Show error text

        notpossibleBtn.on("click", () => {
          drawTrianglebtn.alp(0); // Hide the button to draw the triangle
          errorText.alp(1); // Show error text
        });

        possibleBtn.on("click", () => {
          drawTrianglebtn.alp(0); // Ensure button is hidden if clicked
          errorText.alp(1); // Show error text
        });

        triangles.forEach((triangle) => {
          triangle.removeFrom(); // Remove any drawn triangle
        });
      }
    }

    drawTrianglebtn.on("click", () => {
      drawTriangles(); // Draw the triangle if conditions are met
    });

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
      .sca(0.8)
      .pos(1670, 930)
      .alp(1);

    playButton.on("click", () => {
      randomizeLineLengths();
    });

    function randomizeLineLengths() {
      const randomChange = () => Math.random() * 30 - 15; // Random change between -15 and +15

      // Animate lines with random length changes
      zim.animate(
        Perpendicular,
        { length: Perpendicular.length + randomChange() },
        500,
        "easeInOutQuart"
      );
      zim.animate(
        ground,
        { length: ground.length + randomChange() },
        500,
        "easeInOutQuart"
      );
      zim.animate(
        hyperbola,
        { length: hyperbola.length + randomChange() },
        500,
        "easeInOutQuart"
      );

      // Update distance labels after animation
      setTimeout(() => {
        distanceLabelA.text =
          distanceOfA.text[lang] + `${Math.round(Perpendicular.length)}`;
        distanceLabelB.text =
          distanceOfB.text[lang] + `${Math.round(ground.length)}`;
        distanceLabelC.text =
          distanceOfC.text[lang] + `${Math.round(hyperbola.length)}`;
        conditionTriangle();
      }, 500);
    }
  }

  function labelCreation() {
    const header_rect = new Rectangle({
      width: 1700,
      height: 100,
      color: "transparent",
    })
      .center()
      .pos(130, 60);

    const SubHeader_rect = new Rectangle({
      width: 1500,
      height: 50,
      color: "transparent",
    })
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
      .sca(0.6)
      .mov(100, 10);

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
      color: "black",
      bold: true,
    }).loc(informationText.x[lang], 405);
  }

  function drawShape() {
    const Perpendicular = new Line({ length: 155, thickness: 2 }).pos(
      1200,
      750
    );
    const ground = new Line({ length: 155, thickness: 2 }).pos(1200, 800);
    const hyperbola = new Line({ length: 155, thickness: 2 }).pos(1200, 850);
    new Label({
      text: "A",
      size: 20,
      color: "black",
      bold: true,
    })
      .center(Perpendicular)
      .mov(-90, 0);
    new Label({
      text: "B",
      size: 20,
      color: "black",
      bold: true,
    })
      .center(ground)
      .mov(-90, 0);
    new Label({
      text: "C",
      size: 20,
      color: "black",
      bold: true,
    })
      .center(hyperbola)
      .mov(-90, 0);

    const PerpendicularDraggablePoint = new Circle({
      radius: 10,
      color: "red",
    })
      .pos(1355, 740)
      .drag();
    const groundDraggablePoint = new Circle({ radius: 10, color: "red" })
      .pos(1355, 790)
      .drag();
    const hyperbolaDraggablePoint = new Circle({ radius: 10, color: "red" })
      .pos(1355, 840)
      .drag();
    return [
      Perpendicular,
      ground,
      hyperbola,
      PerpendicularDraggablePoint,
      groundDraggablePoint,
      hyperbolaDraggablePoint,
    ];
  }
}
init();
