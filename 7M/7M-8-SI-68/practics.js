import zim, { drag, sca, Circle } from "./zim.js";  // Add Circle to the import statement
const { Frame, Rectangle, Pic, Label, TextArea, Button, Line } = zim;

async function init() {
  const response = await fetch("data.json");
  const data = await response.json();

  const { lang, headerText, chapter, informationText, diameterText, radiusText, footerLabelText } = data;

  new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

  function ready() {
    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").center().mov(150, 80);
    labelCreation();
    const [cells, distancesOfCells] = drawGraph();

    // Ensure Circle is available and used correctly
    const circle = new Circle({ radius: 150, color: "transparent", borderWidth: 5 }).loc(960, 540);
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
      color: "black",  // Add quotes around black
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
        cellDistance = zim.dist(960, 540, cell.x, cell.y);
        distancesOfCells.push(cellDistance);
      }
    }

    // Graph Lines
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const line = new Rectangle({ width: 100, height: 100, color: "transparent", borderWidth: 0.5, borderColor: "#78080a" }).pos(850 + 100 * col, 360 + 100 * row);
      }
    }
    return [cells, distancesOfCells];
  }

  function drawShape() {
    // Your shape drawing code here
  }
}

init();
