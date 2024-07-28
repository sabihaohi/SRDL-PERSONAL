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

            
        // Define initial positions for the right triangle vertices
        const rightTrianglePointA = { x: 650, y: 900 };
        const rightTrianglePointB = { x: 800, y: 600 };
        const rightTrianglePointC = { x: 850, y: 900 };

        // Define initial positions for the left triangle vertices
        const leftTrianglePointA = { x: 1000, y: 900 };
        const leftTrianglePointB = { x: 1100, y: 600 };
        const leftTrianglePointC = { x: 1250, y: 800 };

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
        const rightCircleB = new Circle(10, "blue")
            .center(stage)
            .pos(rightTrianglePointB.x, rightTrianglePointB.y)
            .drag(stageRect);
        const rightCircleC = new Circle(10, "green")
            .center(stage)
            .pos(rightTrianglePointC.x, rightTrianglePointC.y)
            .drag(stageRect);

        // Create draggable circles at each vertex of the left triangle
        const leftCircleB = new Circle(10, "red")
            .center(stage)
            .pos(leftTrianglePointB.x, leftTrianglePointB.y)
            .drag(stageRect);
        const leftCircleC = new Circle(10, "violet")
            .center(stage)
            .pos(leftTrianglePointC.x, leftTrianglePointC.y)
            .drag(stageRect);

       
        // Function to calculate distances between two points
        function distance(p1, p2) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
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

        // Function to update angles, side lengths, and right triangle shape
        function rightUpdateTriangle() {
            const a = distance(rightTrianglePointB, rightTrianglePointC);
            const b = distance(rightTrianglePointA, rightTrianglePointC);
            const c = distance(rightTrianglePointA, rightTrianglePointB);

            const angles = calculateAngles(a, b, c);

            // // Update angle labels for right triangle
            // rightAngleALabel.text = `Angle A: ${angles.angleA.toFixed(2)}°`;
            // rightAngleBLabel.text = `Angle B: ${angles.angleB.toFixed(2)}°`;
            // rightAngleCLabel.text = `Angle C: ${angles.angleC.toFixed(2)}°`;

            

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
            const a = distance(leftTrianglePointB, leftTrianglePointC);
            const b = distance(leftTrianglePointA, leftTrianglePointC);
            const c = distance(leftTrianglePointA, leftTrianglePointB);

            const angles = calculateAngles(a, b, c);

            // // Update angle labels for left triangle
            // leftAngleALabel.text = `Angle A: ${angles.angleA.toFixed(2)}°`;
            // leftAngleBLabel.text = `Angle B: ${angles.angleB.toFixed(2)}°`;
            // leftAngleCLabel.text = `Angle C: ${angles.angleC.toFixed(2)}°`;

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
           
        });

        rightCircleB.on("pressup", () => {
            checkSimilar();
        });

        rightCircleC.on("pressmove", (event) => {
            rightTrianglePointC.x = event.currentTarget.x;
            rightTrianglePointC.y = event.currentTarget.y;
            rightUpdateTriangle();
            
        });
        rightCircleC.on("pressup", () => {
                checkSimilar();
        });

        // Add drag event listeners to update left triangle when any circle is moved
        leftCircleB.on("pressmove", (event) => {
            leftTrianglePointB.x = event.currentTarget.x;
            leftTrianglePointB.y = event.currentTarget.y;
            leftUpdateTriangle();
         
        });

        leftCircleB.on("pressup", () => {
            checkSimilar();
        });

        leftCircleC.on("pressmove", (event) => {
            leftTrianglePointC.x = event.currentTarget.x;
            leftTrianglePointC.y = event.currentTarget.y;
            leftUpdateTriangle();
            
        });
        leftCircleC.on("pressup", () => {
            checkSimilar();
        });
        // createTable(566, 275, 190);
        // createTable(566 + 195, 275, 190);
        // createTable(1500, 400, 150);
        // createTable(1650, 400, 150);

        // Function to create rectangles
       const texts = [
        ["Traingle","1st side","2nd side","angle"],
        ["ABC","100","200","50 degree"],
        ["DEF","200","400","80 degree"],
        ["side ratio","1/2","2/3",""]

       ]
       let labels = [];
       createTable();
       function createTable(){
          for(let i=0; i<4; i++){
                for(let j=0; j<4; j++){
                    let table = new Rectangle(196, 40, "transparent", "transparent", 1).pos(196*i+566, 40*j+275);
                    let text = new Label(texts[i][j], 20, "Arial", "#000").center(table);
                    labels.push(text);
                }
          }
       }

        // // Function to check if triangles are similar
        function checkSimilar() {
            const a = distance(rightTrianglePointB, rightTrianglePointC);
            const b = distance(rightTrianglePointA, rightTrianglePointC);
            const c = distance(rightTrianglePointA, rightTrianglePointB);

            const angles = calculateAngles(a, b, c);

            const a1 = distance(leftTrianglePointB, leftTrianglePointC);
            const b1 = distance(leftTrianglePointA, leftTrianglePointC);
            const c1 = distance(leftTrianglePointA, leftTrianglePointB);

            const angles1 = calculateAngles(a1, b1, c1);

            if (
                angles.angleA === angles1.angleA &&
                angles.angleB === angles1.angleB &&
                angles.angleC === angles1.angleC
            ) {
                console.log("Similar");
            } else {
                console.log("Not Similar");
            }
        }

        // Initial update of triangles
        rightUpdateTriangle();
        leftUpdateTriangle();
    }
}

// Initialize the app
init();
