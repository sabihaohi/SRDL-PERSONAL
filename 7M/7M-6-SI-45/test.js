import zim, { center, Rectangle, Shape, siz, Triangle } from "./zim.js";
const { Frame, Circle, Label, Pic } = zim;

async function init() {
    // Load JSON data
    const response = await fetch("data.json");
    const data = await response.json();

    // Destructure the loaded data
    const { lang, headerText, chapter, chapterNoText, footerLabelText, informationText,similarMessage,errorMessage } = data;

    // Create the frame after loading the JSON data
    const frame = new Frame("fit", 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

    function ready() {
        const stage = frame.stage;

        const bg = new Pic("assets/image/bg.png").center();
        const stagePic = new Pic("assets/image/stage.png").center().mov(0, 180);
        const table = new Pic("assets/image/table.png").pos(510, 220);
        const infoBox = new Pic("assets/image/info.png").pos(100, 400);
        const stageRect = new Rectangle({
            width: 800,
            height: 420,
            color: "transparent",
        })
            .center()
            .mov(0, 185);

        // Define initial table data
        const texts = [
            ["Triangle", "1st side", "2nd side", "angle"],
            ["ABC(<BAC)", "100", "200", "63.00°"],
            ["DEF(<EDF)", "200", "400", "63.00°"],
            ["side ratio", "1/2", "1/2", ""]
        ];

        let labels = [];

        // Create the table
        createTable();

        function createTable() {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    let table = new Rectangle(196, 40, "transparent", "transparent", 1).pos(196 * i + 566, 40 * j + 277);
                    let text = new Label(texts[i][j], 20, "Arial", "#000").center(table);
                    labels.push(text);
                }
            }
        }

        // Initial positions for the right triangle vertices
        const rightTrianglePointA = { x: 695, y: 900 };
        const rightTrianglePointB = { x: 800, y: 600 };
        const rightTrianglePointC = { x: 850, y: 900 };

        // Initial positions for the left triangle vertices
        const leftTrianglePointA = { x: 995, y: 900 };
        const leftTrianglePointB = { x: 1100, y: 600 };
        const leftTrianglePointC = { x: 1150, y: 900 };

        // Draw initial right triangle
        const rightTriangleShape = new Shape(stage).addTo(stage);
        rightTriangleShape.graphics
            .beginStroke("green")
            .moveTo(rightTrianglePointA.x, rightTrianglePointA.y)
            .lineTo(rightTrianglePointB.x, rightTrianglePointB.y)
            .lineTo(rightTrianglePointC.x, rightTrianglePointC.y)
            .lineTo(rightTrianglePointA.x, rightTrianglePointA.y);

        // Draw initial left triangle
        const leftTriangleShape = new Shape(stage).addTo(stage);
        leftTriangleShape.graphics
            .beginStroke("blue")
            .moveTo(leftTrianglePointA.x, leftTrianglePointA.y)
            .lineTo(leftTrianglePointB.x, leftTrianglePointB.y)
            .lineTo(leftTrianglePointC.x, leftTrianglePointC.y)
            .lineTo(leftTrianglePointA.x, leftTrianglePointA.y);

        // Create draggable circles at each vertex of the right triangle
        const rightCircleA = new Circle(15, "red")
            .center(stage)
            .pos(rightTrianglePointA.x - 15, rightTrianglePointA.y - 15)
        new Label("A", 20, "Arial", "white").center(rightCircleA);
        const rightCircleB = new Circle(15, "blue")
            .center(stage)
            .pos(rightTrianglePointB.x - 15, rightTrianglePointB.y - 10)
            .drag(stageRect);
        new Label("B", 20, "Arial", "white").center(rightCircleB);
        const rightCircleC = new Circle(15, "green")
            .center(stage)
            .pos(rightTrianglePointC.x - 15, rightTrianglePointC.y - 15)
            .drag(stageRect);
        new Label("C", 20, "Arial", "white").center(rightCircleC);

        // Create draggable circles at each vertex of the left triangle
        const leftCircleA = new Circle(15, "blue")
            .center(stage)
            .pos(leftTrianglePointA.x - 10, leftTrianglePointA.y - 10)
        new Label("D", 20, "Arial", "white").center(leftCircleA);
        const leftCircleB = new Circle(15, "red")
            .center(stage)
            .pos(leftTrianglePointB.x - 10, leftTrianglePointB.y - 10)
            .drag(stageRect);
        new Label("E", 20, "Arial", "white").center(leftCircleB);
        const leftCircleC = new Circle(15, "violet")
            .center(stage)
            .pos(leftTrianglePointC.x - 15, leftTrianglePointC.y - 15)
            .drag(stageRect);
        new Label("F", 20, "Arial", "white").center(leftCircleC);

        // Conversion factor: pixels to centimeters
        const PIXELS_PER_CM = 37.79527559;

        // Function to calculate distances between two points in centimeters
        function distanceInCm(p1, p2) {
            const distanceInPixels = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            return distanceInPixels / PIXELS_PER_CM;
        }

        // Function to calculate angles using the law of cosines
        function calculateAngles(a, b, c) {
            const angleA = Math.floor(
                (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI
            );
            const angleB = Math.floor(
                (Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180) / Math.PI
            );
            const angleC = Math.floor(
                (Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180) / Math.PI
            );
            return { angleA, angleB, angleC };
        }

        // Function to calculate side ratios
        function calculateSideRatios(rightA, rightB, leftA, leftB) {
            const ratio1 =Math.floor(rightA / leftA);
            const ratio2 = Math.floor(rightB / leftB);
            return { ratio1, ratio2 };
        }

        // Function to update angles, side lengths, and right triangle shape
        function rightUpdateTriangle() {
            const a = distanceInCm(rightTrianglePointB, rightTrianglePointC);
            const b = distanceInCm(rightTrianglePointA, rightTrianglePointC);
            const c = distanceInCm(rightTrianglePointA, rightTrianglePointB);

            const angles = calculateAngles(a, b, c);

            labels[5].text = Math.floor(a) + " cm (AB)";  // Update AB length
            labels[6].text = Math.floor(b) + " cm (AC)";  // Update AC length
            labels[7].text = `${angles.angleA.toFixed(2)}°`; // Update angle

            // Redraw right triangle
            rightTriangleShape.graphics
                .clear()
                .beginStroke("green")
                .moveTo(rightTrianglePointA.x, rightTrianglePointA.y)
                .lineTo(rightTrianglePointB.x, rightTrianglePointB.y)
                .lineTo(rightTrianglePointC.x, rightTrianglePointC.y)
                .lineTo(rightTrianglePointA.x, rightTrianglePointA.y);

            // Update the stage
            stage.update();
        }

        // Function to update angles, side lengths, and left triangle shape
        function leftUpdateTriangle() {
            const a = distanceInCm(leftTrianglePointB, leftTrianglePointC);
            const b = distanceInCm(leftTrianglePointA, leftTrianglePointC);
            const c = distanceInCm(leftTrianglePointA, leftTrianglePointB);
            const angles = calculateAngles(a, b, c);

            labels[9].text = Math.floor(a) + " cm (DE)"; // Update DE length
            labels[10].text = Math.floor(b) + " cm (DF)"; // Update DF length
            labels[11].text = `${angles.angleA.toFixed(2)}°`; // Update angle

            // Redraw left triangle
            leftTriangleShape.graphics
                .clear()
                .beginStroke("blue")
                .moveTo(leftTrianglePointA.x, leftTrianglePointA.y)
                .lineTo(leftTrianglePointB.x, leftTrianglePointB.y)
                .lineTo(leftTrianglePointC.x, leftTrianglePointC.y)
                .lineTo(leftTrianglePointA.x, leftTrianglePointA.y);

            // Update the stage
            stage.update();
        }

        // Add drag event listeners to update right triangle when any circle is moved
        rightCircleB.on("pressmove", (event) => {
            rightTrianglePointB.x = event.currentTarget.x;
            rightTrianglePointB.y = event.currentTarget.y;
            rightUpdateTriangle();
            updateRatios();
        });

        rightCircleB.on("pressup", () => {
            checkSimilar();
        });

        rightCircleC.on("pressmove", (event) => {
            rightTrianglePointC.x = event.currentTarget.x;
            rightTrianglePointC.y = event.currentTarget.y;
            rightUpdateTriangle();
            updateRatios();
        });

        rightCircleC.on("pressup", () => {
            checkSimilar();
        });

        // Add drag event listeners to update left triangle when any circle is moved
        leftCircleB.on("pressmove", (event) => {
            leftTrianglePointB.x = event.currentTarget.x;
            leftTrianglePointB.y = event.currentTarget.y;
            leftUpdateTriangle();
            updateRatios();
        });

        leftCircleB.on("pressup", () => {
            checkSimilar();
        });

        leftCircleC.on("pressmove", (event) => {
            leftTrianglePointC.x = event.currentTarget.x;
            leftTrianglePointC.y = event.currentTarget.y;
            leftUpdateTriangle();
            updateRatios();
        });

        leftCircleC.on("pressup", () => {
            checkSimilar();
        });

        // Function to update the side ratios in the table
        function updateRatios() {
            const rightAB = distanceInCm(rightTrianglePointA, rightTrianglePointB);
            const rightAC = distanceInCm(rightTrianglePointA, rightTrianglePointC);

            const leftDE = distanceInCm(leftTrianglePointA, leftTrianglePointB);
            const leftDF = distanceInCm(leftTrianglePointA, leftTrianglePointC);

            const { ratio1, ratio2 } = calculateSideRatios(rightAB, rightAC, leftDE, leftDF);

            labels[13].text = `${Math.floor(rightAB)} / ${Math.floor(leftDE)} =${ratio1}`; // Update ratio for 1st side (AB/DE)
            labels[14].text =  `${Math.floor(rightAC)} / ${Math.floor(leftDF)} =${ratio2} ` // Update ratio for 2nd side (AC/DF)
        }
        let results =[];
        // Function to check if triangles are similar
        function checkSimilar() {
            results.forEach((result) => {
                result.removeFrom();
            });
            const a = Math.floor(distanceInCm(rightTrianglePointB, rightTrianglePointC));
            const b = Math.floor(distanceInCm(rightTrianglePointA, rightTrianglePointC));
            const c = Math.floor(distanceInCm(rightTrianglePointA, rightTrianglePointB));

            const rightAngles = calculateAngles(a, b, c);

            const a1 = Math.floor(distanceInCm(leftTrianglePointB, leftTrianglePointC));
            const b1 = Math.floor(distanceInCm(leftTrianglePointA, leftTrianglePointC));
            const c1 = Math.floor(distanceInCm(leftTrianglePointA, leftTrianglePointB));

            const leftAngles = calculateAngles(a1, b1, c1);

            const { ratio1, ratio2 } = calculateSideRatios(c, b, c1, b1);

            // Check if the triangles are similar by angle and two side ratios
            const angleAEqual = rightAngles.angleA === leftAngles.angleA;
           // const sideRatiosEqual = Math.abs(ratio1 - ratio2) < 0.1; // Allow small tolerance

            if (angleAEqual && ratio1 === ratio2) {
                console.log("Triangles are similar");
              const successText = new Label({
                text: similarMessage.text[lang],
                size: 20,
                lineHeight: 30,
               }).pos(150,500)
               results.push(successText);
            }
             else {
                console.log("Triangles are not similar");
                const errorText = new Label({
                    text: errorMessage.text[lang],
                    size: 20,
                    lineHeight: 30,
                    color: "red",
                   }).pos(150,500)

                   results.push(errorText);
            }
        }

        // Initial update of triangles
        rightUpdateTriangle();
        leftUpdateTriangle();
        updateRatios();
        checkSimilar();
    }
}

// Initialize the app
init();
