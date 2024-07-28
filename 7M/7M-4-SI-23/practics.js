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

        // Set initial positions for points A, B, and C
        const pointA = { x: 700, y: 500 };  // Fixed point A
        const pointB = { x: 1100, y: 500 }; // Initial position for point B
        const pointC = { x: 900, y: 800 };  // Initial position for point C

        // Draw initial triangle
        const triangleShape = new Shape(stage).addTo(stage);
        triangleShape.graphics.beginStroke("green").moveTo(pointA.x, pointA.y)
            .lineTo(pointB.x, pointB.y)
            .lineTo(pointC.x, pointC.y)
            .lineTo(pointA.x, pointA.y);

        // Create draggable circles at each point
        const circleA = new Circle(10, "red").center(stage).pos(pointA.x, pointA.y).drag();
        const circleB = new Circle(10, "red").center(stage).pos(pointB.x, pointB.y).drag();
        const circleC = new Circle(10, "red").center(stage).pos(pointC.x, pointC.y).drag();

        // Create labels for displaying angles
        const angleALabel = new Label({ text: "Angle A: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 50);
        const angleBLabel = new Label({ text: "Angle B: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 80);
        const angleCLabel = new Label({ text: "Angle C: 0°", size: 20, color: "black" }).addTo(stage).pos(50, 110);

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

        // Function to update angles and triangle
        function updateTriangle() {
            const a = distance(pointB, pointC);
            const b = distance(pointA, pointC);
            const c = distance(pointA, pointB);

            const angles = calculateAngles(a, b, c);

            angleALabel.text = `Angle A: ${angles.angleA.toFixed(2)}°`;
            angleBLabel.text = `Angle B: ${angles.angleB.toFixed(2)}°`;
            angleCLabel.text = `Angle C: ${angles.angleC.toFixed(2)}°`;

            // Redraw triangle
            triangleShape.graphics.clear()
                .beginStroke("green")
                .moveTo(pointA.x, pointA.y)
                .lineTo(pointB.x, pointB.y)
                .lineTo(pointC.x, pointC.y)
                .lineTo(pointA.x, pointA.y);

            // Update the stage
            stage.update();
        }

        // Update angles initially
        updateTriangle();

        // Add drag event listeners to update triangle when any circle is moved
        circleA.on("pressmove", (event) => {
            pointA.x = event.currentTarget.x;
            pointA.y = event.currentTarget.y;
            updateTriangle();
        });

        circleB.on("pressmove", (event) => {
            pointB.x = event.currentTarget.x;
            pointB.y = event.currentTarget.y;
            updateTriangle();
        });

        circleC.on("pressmove", (event) => {
            pointC.x = event.currentTarget.x;
            pointC.y = event.currentTarget.y;
            updateTriangle();
        });
    }
}

// Initialize the app
init();
