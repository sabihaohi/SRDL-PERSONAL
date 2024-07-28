import zim, { center, Rectangle, Shape, siz, Triangle } from "./zim.js";
const { Frame, Circle, Label, Pic } = zim;

async function init() {
    // Load JSON data
    const response = await fetch("data.json");
    const data = await response.json();

    // Destructure the loaded data
    const { lang, headerText, chapter, chapterNoText, footerLabelText, informationText } = data;

    // Create the frame after loading the JSON data
    const frame = new Frame("fit", 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

    function ready() {
        const stage = frame.stage;

        const bg = new Pic("assets/image/bg.png").center();
        const stagePic = new Pic("assets/image/stage.png").center().mov(0,180);
        const table = new Pic("assets/image/table.png").pos(510,220)
        const infoBox = new Pic("assets/image/info.png").pos(100,400);
        const stageRect = new Rectangle({ width: 800, height: 420, color: "transparent",}).center().mov(0, 185);
        

        

        const rightTrianglePointA = { x: 650, y: 900 };
        const rightTrianglePointB = { x: 800, y: 600 };
        const rightTrianglePointC = { x: 850, y: 900 };

        const leftTrianglePointA = { x: 1000, y: 900 };
        const leftTrianglePointB = { x: 1100, y: 600 };
        const leftTrianglePointC = { x: 1250, y: 800 };

        // Draw initial triangle right
        const rightTriangleShape = new Shape(stage).addTo(stage);
        rightTriangleShape.graphics.beginStroke("green").moveTo(rightTrianglePointA.x, rightTrianglePointA.y)
            .lineTo(rightTrianglePointB.x, rightTrianglePointB.y)
            .lineTo(rightTrianglePointC.x, rightTrianglePointC.y)
            .lineTo(rightTrianglePointA.x, rightTrianglePointA.y);

        //draw initial tringle left
        const leftTriangleShape = new Shape(stage).addTo(stage);
        leftTriangleShape.graphics.beginStroke("blue").moveTo(leftTrianglePointA.x, leftTrianglePointA.y)
            .lineTo(leftTrianglePointB.x, leftTrianglePointB.y)
            .lineTo(leftTrianglePointC.x, leftTrianglePointC.y)
            .lineTo(leftTrianglePointA.x, leftTrianglePointA.y);



        // const circleA = new Circle(10, "red").center(stage).pos(rightTrianglePointA.x, rightTrianglePointA.y); // Not draggable since it's fixed
        const rightCircleB = new Circle(10, "blue").center(stage).pos(rightTrianglePointB.x, rightTrianglePointB.y).drag(stageRect);
        const rightCircleC = new Circle(10, "green").center(stage).pos(rightTrianglePointC.x, rightTrianglePointC.y).drag(stageRect);


        const leftCircleB = new Circle(10, "red").center(stage).pos(leftTrianglePointB.x, leftTrianglePointB.y).drag(stageRect);
        const leftCircleC = new Circle(10, "violet").center(stage).pos(leftTrianglePointC.x, leftTrianglePointC.y).drag(stageRect);


        const rightAngleALabel = new Label({ text: "Right Triangle Angle A: 0°", size: 20, color: "black" }).addTo(stage).pos(infoBox.x + 150, infoBox.y+500);
        const rightAngleBLabel = new Label({ text: "Right Triangle Angle B: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 80);
        const rightAngleCLabel = new Label({ text: "Right Triangle Angle C: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 110);

        const leftAngleALabel = new Label({ text: "Left Angle A: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 50);
        const leftAngleBLabel = new Label({ text: "Left Angle B: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 80);
        const leftAngleCLabel = new Label({ text: "Left Angle C: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 110);



       
        // Function to calculate distances between two points
        function distance(p1, p2) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        }

        // Function to calculate angles using the law of cosines
        function calculateAngles(a, b, c) {
            const angleA = Math.floor(Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI));
            const angleB = Math.floor(Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI));
            const angleC = Math.floor(Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI));
            return { angleA, angleB, angleC };
        }

        // Function to update angles, side lengths, and triangle shape
        function rightUpdateTriangle() {
            const a = distance(rightTrianglePointB, rightTrianglePointC);
            const b = distance(rightTrianglePointA, rightTrianglePointC);
            const c = distance(rightTrianglePointA, rightTrianglePointB);

            const angles = calculateAngles(a, b, c);

            // Update angle labels
            rightAngleALabel.text = `Angle A: ${angles.angleA.toFixed(2)}°`;
            rightAngleBLabel.text = `Angle B: ${angles.angleB.toFixed(2)}°`;
            rightAngleCLabel.text = `Angle C: ${angles.angleC.toFixed(2)}°`;

            // Update side length labels
            // sideABLabel.text = `AB: ${(c / 10).toFixed(2)} cm`;
            // sideBCLabeL.text = `BC: ${(a / 10).toFixed(2)} cm`;
            // sideCALabel.text = `CA: ${(b / 10).toFixed(2)} cm`;

            // Redraw triangle
            rightTriangleShape.graphics.clear()
                .beginStroke("green")
                .moveTo(rightTrianglePointA.x, rightTrianglePointA.y)
                .lineTo(rightTrianglePointB.x, rightTrianglePointB.y)
                .lineTo(rightTrianglePointC.x, rightTrianglePointC.y)
                .lineTo(rightTrianglePointA.x, rightTrianglePointA.y);

            // Update the stage
            stage.update();
        }

        function leftUpdateTriangle() {
            const a = distance(leftTrianglePointB, leftTrianglePointC);
            const b = distance(leftTrianglePointA, leftTrianglePointC);
            const c = distance(leftTrianglePointA, leftTrianglePointB);

            const angles = calculateAngles(a, b, c);

            // Update angle labels
            leftAngleALabel.text = `Angle A: ${angles.angleA.toFixed(2)}°`;
            leftAngleBLabel.text = `Angle B: ${angles.angleB.toFixed(2)}°`;
            leftAngleCLabel.text = `Angle C: ${angles.angleC.toFixed(2)}°`;

            // Update side length labels
            // sideABLabel.text = `AB: ${(c / 10).toFixed(2)} cm`;
            // sideBCLabeL.text = `BC: ${(a / 10).toFixed(2)} cm`;
            // sideCALabel.text = `CA: ${(b / 10).toFixed(2)} cm`;

            // Redraw triangle
            leftTriangleShape.graphics.clear()
                .beginStroke("green")
                .moveTo(leftTrianglePointA.x, leftTrianglePointA.y)
                .lineTo(leftTrianglePointB.x, leftTrianglePointB.y)
                .lineTo(leftTrianglePointC.x, leftTrianglePointC.y)
                .lineTo(leftTrianglePointA.x, leftTrianglePointA.y);

            // Update the stage
            stage.update();
        }

        // Add drag event listeners to update triangle when any circle is moved
        rightCircleB.on("pressmove", (event) => {
            rightTrianglePointB.x = event.currentTarget.x;
            rightTrianglePointB.y = event.currentTarget.y;
            rightUpdateTriangle();
            checkSimilar()
        });

        rightCircleC.on("pressmove", (event) => {
            rightTrianglePointC.x = event.currentTarget.x;
            rightTrianglePointC.y = event.currentTarget.y;
            rightUpdateTriangle();
            checkSimilar()
        });

        leftCircleB.on("pressmove", (event) => {
            leftTrianglePointB.x = event.currentTarget.x;
            leftTrianglePointB.y = event.currentTarget.y;
            leftUpdateTriangle();
            checkSimilar()
        });

        leftCircleC.on("pressmove", (event) => {
            leftTrianglePointC.x = event.currentTarget.x;
            leftTrianglePointC.y = event.currentTarget.y;
            leftUpdateTriangle();
            checkSimilar()
        });

        createTable(566,275,190);
        createTable(566+195,275,190);
        createTable(1500,400,150);
        createTable(1650,400,150);
        // Function to create rectangles
        function createTable(x, y, W) {
            let pos = 0       
            for (let i = 0; i < 4; i++) {
                const rect = new Rectangle({ width: W, height: 42, color: "transparent" ,borderColor:"black" }).center().pos(x, y + pos)
                pos += 41;
            }
        }

        function checkSimilar(){
            const a = distance(rightTrianglePointB, rightTrianglePointC);
            const b = distance(rightTrianglePointA, rightTrianglePointC);
            const c = distance(rightTrianglePointA, rightTrianglePointB);

            const angles = calculateAngles(a, b, c);

            const a1 = distance(leftTrianglePointB, leftTrianglePointC);
            const b1 = distance(leftTrianglePointA, leftTrianglePointC);
            const c1 = distance(leftTrianglePointA, leftTrianglePointB);

            const angles1 = calculateAngles(a1, b1, c1);

            if(angles.angleA === angles1.angleA){
                console.log("Similar")
            }else{
                console.log("Not Similar")
            }
        }
    }
}

// Initialize the app
init();





