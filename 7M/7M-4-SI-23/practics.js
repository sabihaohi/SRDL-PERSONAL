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

        const bg = new Pic("assets/bg.png").center().mov(0, 0).alp(1);

        const rightTrianglePointA = { x: 700, y: 800 };  
        const rightTrianglePointB = { x: 850, y: 500 }; 
        const rightTrianglePointC = { x: 950, y: 800 }; 

        const leftTrianglePointA = { x: 1200, y: 800 };
        const leftTrianglePointB = { x: 1300, y: 500 };
        const leftTrianglePointC = { x: 1450, y: 700 };

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
        const rightCircleB = new Circle(10, "blue").center(stage).pos(rightTrianglePointB.x, rightTrianglePointB.y).drag();
        const rightCircleC = new Circle(10, "green").center(stage).pos(rightTrianglePointC.x, rightTrianglePointC.y).drag();


        const leftCircleB = new Circle(10, "red").center(stage).pos(leftTrianglePointB.x, leftTrianglePointB.y).drag();
        const leftCircleC = new Circle(10, "violet").center(stage).pos(leftTrianglePointC.x, leftTrianglePointC.y).drag();

       
        const rightAngleALabel = new Label({ text: "Angle A: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 50);
        const rightAngleBLabel = new Label({ text: "Angle B: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 80);
        const rightAngleCLabel = new Label({ text: "Angle C: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 110);

        const leftAngleALabel = new Label({ text: "Angle A: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 50);
        const leftAngleBLabel = new Label({ text: "Angle B: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 80);
        const leftAngleCLabel = new Label({ text: "Angle C: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 110);



        // Create labels for displaying side lengths
        // const sideABLabel = new Label({ text: "AB: 0", size: 20, color: "black" }).addTo(stage).pos(750, 400);
        // const sideBCLabeL = new Label({ text: "BC: 0", size: 20, color: "black" }).addTo(stage).pos(1000, 700);
        // const sideCALabel = new Label({ text: "CA: 0", size: 20, color: "black" }).addTo(stage).pos(800, 650);

        // Function to calculate distances between two points
        function distance(p1, p2) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        }

        // Function to calculate angles using the law of cosines
        function calculateAngles(a, b, c) {
            const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
            const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
            const angleC = Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI);
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


        rightUpdateTriangle();

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
        });

        rightCircleC.on("pressmove", (event) => {
            rightTrianglePointC.x = event.currentTarget.x;
            rightTrianglePointC.y = event.currentTarget.y;
            rightUpdateTriangle();
        });

        leftCircleB.on("pressmove", (event) => {
            leftTrianglePointB.x = event.currentTarget.x;
            leftTrianglePointB.y = event.currentTarget.y;
            leftUpdateTriangle();
        });

        leftCircleC.on("pressmove", (event) => {
            leftTrianglePointC.x = event.currentTarget.x;
            leftTrianglePointC.y = event.currentTarget.y;
            leftUpdateTriangle();
        });
    }
}

// Initialize the app
init();
