import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Circle, Label, Rectangle, Pic, Grid } = zim;

const canvasWidth = 1920;
const canvasHeight = 1080;

new Frame(
    zim.FIT,
    canvasWidth,
    canvasHeight,
    "white",
    "#333",
    ready,
    "assets/",
    new zim.Waiter()
);

function ready() {
    const bg = new Pic("assets/images/bg.png").center();

    const header_rect = new Rectangle({ width: canvasWidth, height: 120, color: "#ff7878" }).center().pos(0, 0);
    const header_label = new Label({
        text: "যে কোনো দুটি বিন্দুর মধ্যবিন্দু নির্ণয়",
        size: 40,
    }).center(header_rect).sca(1);

    const gridParent = new Rectangle(1100, 700, "#A7C7E7").pos(700, 200);

    const grid = new zim.Grid(
        gridParent,
        4,
        3,
        10,
        10,
        true,
        true,
        "center",
        "middle"
    );

    const point1 = new Circle(8, "blue").loc(1050, 760).drag();
    const point2 = new Circle(8, "red").loc(1400, 360).drag();

    const dataPanel = new Rectangle(400, 700, "#A7C7E7").pos(200, 200);

    const labela = new Label({
        text: "",
        size: 20,
        font: "courier",
        color: "black",
        rollColor: "red",
        bold: true,
        italic: true
    }).pos(250, 300);

    const labelb = new Label({
        text: "",
        size: 20,
        font: "courier",
        color: "black",
        rollColor: "red",
        bold: true,
        italic: true
    }).pos(250, 400);

    const labelcenter = new Label({
        text: "",
        size: 20,
        font: "courier",
        color: "black",
        rollColor: "red",
        bold: true,
        italic: true
    }).pos(250, 500);

    let line;

    function drawLines() {
        if (line) {
            line.removeFrom();
        }

        // Boundary checks to keep points within gridParent
        point1.x = Math.min(Math.max(point1.x, gridParent.x), gridParent.x + gridParent.width);
        point1.y = Math.min(Math.max(point1.y, gridParent.y), gridParent.y + gridParent.height);
        point2.x = Math.min(Math.max(point2.x, gridParent.x), gridParent.x + gridParent.width);
        point2.y = Math.min(Math.max(point2.y, gridParent.y), gridParent.y + gridParent.height);

        const distance = zim.dist(point1.x, point1.y, point2.x, point2.y);
        const angle = zim.angle(point1.x, point1.y, point2.x, point2.y);
        line = new Rectangle(distance, 2).pos(point1.x, point1.y).rot(angle);

        labela.text = `a = (${point1.x.toFixed(2)}, ${point1.y.toFixed(2)})`;
        labelb.text = `b = (${point2.x.toFixed(2)}, ${point2.y.toFixed(2)})`;

        const centerX = (point1.x + point2.x) / 2;
        const centerY = (point1.y + point2.y) / 2;

        labelcenter.text = `Center = (${centerX.toFixed(2)}, ${centerY.toFixed(2)})`;


        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
                const { x, y } = grid.cellLoc(row, col);
                console.log(`Grid Point (${row}, ${col}) coordinates: (${x.toFixed(2)}, ${y.toFixed(2)})`);
            }
        }
        // Update grid based on the center point
        grid.center(centerX, centerY); // Adjust the grid to center around (centerX, centerY)
    }

    drawLines();

    point1.on("pressmove", drawLines);
    point2.on("pressmove", drawLines);
}
