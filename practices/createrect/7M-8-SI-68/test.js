import zim from "https://zimjs.org/cdn/016/zim";
const { Frame, Rectangle, Circle, Line, Label } = zim;

const frame = new Frame("fit", 1920, 1080, "#ddd");

frame.on("ready", () => {
    const [cells, distancesOfCells] = drawGraph();
    let [circle, line, upperLine, draggablePoint] = drawShapes();
    const [halfRectLabel, fullRectLabel] = createLabels();

    let radius = 200;
    drawColorsOnGraph(distancesOfCells, cells, radius, halfRectLabel, fullRectLabel);
    draggablePoint.on("pressmove", () => {

        if (draggablePoint.x > 1145) {
            draggablePoint.x = 1145;
        }
        else if (draggablePoint.x < 850) {
            draggablePoint.x = 850;
        }
        draggablePoint.y = 100;

        radius = zim.dist(800, 100, draggablePoint.x, draggablePoint.y);
        line.length = radius;
        upperLine.length = radius;
        circle.radius = radius;
        S.update();

        drawColorsOnGraph(distancesOfCells, cells, radius, halfRectLabel, fullRectLabel);
    });

});


function drawShapes() {
    let circle = new Circle({ radius: 200, color: "transparent", borderWidth: 5 }).loc(960, 540);
    let line = new Line({ length: 200, thickness: 3 }).pos(960, 540);
    let upperLine = new Line({ length: 200, thickness: 5 }).pos(800, 100);
    let draggablePoint = new Circle({ radius: 10, color: "red" }).loc(1000, 100).drag();
    return [circle, line, upperLine, draggablePoint];
}

function drawGraph() {
    const cells = [];
    const distancesOfCells = [];
    let cellDistance = 0;

    // Graph Cells
    for (let row = 0; row < 40; row++) {
        for (let col = 0; col < 40; col++) {
            const cell = new Rectangle({ width: 20, height: 20, color: "white", borderWidth: 0.5, borderColor: "grey" }).reg(10, 10).pos(560 + 20 * col, 140 + 20 * row);

            cells.push(cell);
            cellDistance = zim.dist(960, 540, cell.x, cell.y);
            distancesOfCells.push(cellDistance);
        }
    }

    // Graph Lines
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const line = new Rectangle({ width: 100, height: 100, color: "transparent", borderWidth: 0.5, borderColor: "#78080a" }).pos(560 + 100 * col, 140 + 100 * row);
        }
    }
    return [cells, distancesOfCells];
}

function createLabels() {
    const halfRectLabel = new Label({ size: 28, font: "monospace", bold: true }).loc(50, 140);
    const fullRectLabel = new Label({ size: 28, font: "monospace", bold: true }).loc(50, 180);
    return [halfRectLabel, fullRectLabel];
}

function drawColorsOnGraph(distancesOfCells, cells, radius, halfRectLabel, fullRectLabel) {
    let halfRectCount = 0;
    let fullRectCount = 0;

    distancesOfCells.forEach((cellDis, index) => {
        if (cellDis < radius + 10) {
            cells[index].color = "red";
            fullRectCount++;

            if (cellDis > radius - 10) {
                cells[index].color = "teal";
                halfRectCount++;
                fullRectCount--;
            }
        }
        else {
            cells[index].color = "white";
        }
    });
    halfRectLabel.text = "Half Cells Count: " + halfRectCount;
    fullRectLabel.text = "Full Cells Count: " + fullRectCount;
}                                                           