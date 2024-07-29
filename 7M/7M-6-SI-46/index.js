import zim, { center, Rectangle, Shape, siz, Triangle } from "./zim.js";
const { Frame, Circle, Label, Pic, Button } = zim;

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
            ["Triangle", "1st side", "2nd side", "3rd side"],
            ["ABC(<BAC)", "0", "0", "0"],
            ["DEF(<EDF)", "0", "0", "0"],
            ["side ratio", "0", "0", "0"]
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
        const leftTrianglePointD = { x: 995, y: 900 };
        const leftTrianglePointE = { x: 1100, y: 600 };
        const leftTrianglePointF = { x: 1150, y: 900 };

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
            .moveTo(leftTrianglePointD.x, leftTrianglePointD.y)
            .lineTo(leftTrianglePointE.x, leftTrianglePointE.y)
            .lineTo(leftTrianglePointF.x, leftTrianglePointF.y)
            .lineTo(leftTrianglePointD.x, leftTrianglePointD.y);

        // Create draggable circles at each vertex of the right triangle
        const rightCircleA = new Circle(15, "red")
            .center(stage)
            .pos(rightTrianglePointA.x - 15, rightTrianglePointA.y - 15).drag(stageRect);;
        new Label("A", 20, "Arial", "white").center(rightCircleA);
        const rightCircleB = new Circle(15, "blue")
            .center(stage)
            .pos(rightTrianglePointB.x - 15, rightTrianglePointB.y - 15)
            .drag(stageRect);
        new Label("B", 20, "Arial", "white").center(rightCircleB);
        const rightCircleC = new Circle(15, "green")
            .center(stage)
            .pos(rightTrianglePointC.x - 15, rightTrianglePointC.y - 15)
            .drag(stageRect);
        new Label("C", 20, "Arial", "white").center(rightCircleC);

        // Create draggable circles at each vertex of the left triangle
        const leftCircleD = new Circle(15, "blue")  // Updated circle for point D
            .center(stage)
            .pos(leftTrianglePointD.x - 15, leftTrianglePointD.y - 15)
            .drag(stageRect); // Make it draggable
        new Label("D", 20, "Arial", "white").center(leftCircleD);
        const leftCircleE = new Circle(15, "red")
            .center(stage)
            .pos(leftTrianglePointE.x - 15, leftTrianglePointE.y - 15)
            .drag(stageRect);
        new Label("E", 20, "Arial", "white").center(leftCircleE);
        const leftCircleF = new Circle(15, "violet")
            .center(stage)
            .pos(leftTrianglePointF.x - 15, leftTrianglePointF.y - 15)
            .drag(stageRect);
        new Label("F", 20, "Arial", "white").center(leftCircleF);

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
        function calculateSideRatios(rightA, rightB, rightC, leftA, leftB, leftC) {
            const ratio1 = Math.floor(rightA / leftA);
            const ratio2 = Math.floor(rightB / leftB);
            const ratio3 = Math.floor(rightC / leftC);
            return { ratio1, ratio2, ratio3 };
        }

        // Function to update angles, side lengths, and right triangle shape
        function rightUpdateTriangle() {
            const a = distanceInCm(rightTrianglePointB, rightTrianglePointC);
            const b = distanceInCm(rightTrianglePointA, rightTrianglePointC);
            const c = distanceInCm(rightTrianglePointA, rightTrianglePointB);

            const angles = calculateAngles(a, b, c);

            labels[5].text = Math.floor(c) + " cm (AB)";  // Update AB length
            labels[6].text = Math.floor(b) + " cm (AC)";  // Update AC length
            labels[7].text = Math.floor(a) + " cm (BC)"; // Update angle

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
            const a = distanceInCm(leftTrianglePointD, leftTrianglePointE);
            const b = distanceInCm(leftTrianglePointD, leftTrianglePointF);
            const c = distanceInCm(leftTrianglePointE, leftTrianglePointF);
            const angles = calculateAngles(a, b, c);

            labels[9].text = Math.floor(a) + " cm (DE)"; // Update DE length
            labels[10].text = Math.floor(b) + " cm (DF)";  // Update DF length
            labels[11].text = Math.floor(c) + " cm (EF)";  // Update EF length

            // Redraw left triangle
            leftTriangleShape.graphics
                .clear()
                .beginStroke("blue")
                .moveTo(leftTrianglePointD.x, leftTrianglePointD.y)
                .lineTo(leftTrianglePointE.x, leftTrianglePointE.y)
                .lineTo(leftTrianglePointF.x, leftTrianglePointF.y)
                .lineTo(leftTrianglePointD.x, leftTrianglePointD.y);

            // Update the stage
            stage.update();
        }

        // Add 'pressup' event listener for right circle A
        rightCircleA.on("pressmove", function () {
            rightTrianglePointA.x = rightCircleA.x + 15;
            rightTrianglePointA.y = rightCircleA.y + 15;
            rightUpdateTriangle();
             // Check similarity after updates
        });
        rightCircleA.on("pressup", function () {
            checkSimilar(); 
        });

        // Add 'pressup' event listener for right circle B
        rightCircleB.on("pressmove", function () {
            rightTrianglePointB.x = rightCircleB.x + 15;
            rightTrianglePointB.y = rightCircleB.y + 15;
            rightUpdateTriangle();
   
        });

        rightCircleB.on("pressup", function () {
            checkSimilar(); // Check similarity after updates
        });

        // Add 'pressup' event listener for right circle C
        rightCircleC.on("pressmove", function () {
            rightTrianglePointC.x = rightCircleC.x + 15;
            rightTrianglePointC.y = rightCircleC.y + 15;
            rightUpdateTriangle();
            
        });
        rightCircleC.on("pressup", function () {
            checkSimilar(); // Check similarity after updates
        });

        // Add 'pressup' event listener for left circle D
        leftCircleD.on("pressup", function () {
            leftTrianglePointD.x = leftCircleD.x + 15;
            leftTrianglePointD.y = leftCircleD.y + 15;
            leftUpdateTriangle();
            checkSimilar(); // Check similarity after updates
        });

        // Add 'pressup' event listener for left circle E
        leftCircleE.on("pressup", function () {
            leftTrianglePointE.x = leftCircleE.x + 15;
            leftTrianglePointE.y = leftCircleE.y + 15;
            leftUpdateTriangle();
            checkSimilar(); // Check similarity after updates
        });

        // Add 'pressup' event listener for left circle F
        leftCircleF.on("pressup", function () {
            leftTrianglePointF.x = leftCircleF.x + 15;
            leftTrianglePointF.y = leftCircleF.y + 15;
            leftUpdateTriangle();
            checkSimilar(); // Check similarity after updates
        });

        // Create a label to display the result message
        const resultMessage = new Label("", 25, "Arial", "black").pos(800, 150);
        stage.addChild(resultMessage);

        // Function to check similarity and update the result message
        function checkSimilar() {
            const rightA = distanceInCm(rightTrianglePointB, rightTrianglePointC);
            const rightB = distanceInCm(rightTrianglePointA, rightTrianglePointC);
            const rightC = distanceInCm(rightTrianglePointA, rightTrianglePointB);

            const leftA = distanceInCm(leftTrianglePointD, leftTrianglePointE);
            const leftB = distanceInCm(leftTrianglePointD, leftTrianglePointF);
            const leftC = distanceInCm(leftTrianglePointE, leftTrianglePointF);

            // Update side ratios in the table
            const sideRatios = calculateSideRatios(rightA, rightB, rightC, leftA, leftB, leftC);
            labels[13].text = sideRatios.ratio1 + ":1"; // Update ratio for DE
            labels[14].text = sideRatios.ratio2 + ":1"; // Update ratio for DF
            labels[15].text = sideRatios.ratio3 + ":1"; // Update ratio for EF

            if (
                sideRatios.ratio1 === sideRatios.ratio2 &&
                sideRatios.ratio2 === sideRatios.ratio3
            ) {
                resultMessage.text = "The triangles are similar!";
            } else {
                resultMessage.text = "The triangles are not similar.";
            }

            // Update the stage after changing the result message
            stage.update();
        }

        // Initial update
        rightUpdateTriangle();
        leftUpdateTriangle();
        checkSimilar(); // Initial similarity check
    }
}

init();
