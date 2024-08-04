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

        // Initial setup for the triangles
        const initialEquilateralSideLength = 200; 
        const initialScaleneSideLengths = { a: 340, b: 200, c: 650 };
        const eqCenterX = 980; 
        const scCenterX = 1340; 
        const centerY = 540;

        // Function to calculate height of the equilateral triangle
        function calculateHeight(side) {
            return side * Math.sqrt(3) / 2;
        }

        // Calculate initial positions for the equilateral triangle vertices
        let equilateralSideLength = initialEquilateralSideLength;
        const equilateralHeight = calculateHeight(equilateralSideLength);

        const eqPointA = { x: eqCenterX, y: centerY - equilateralHeight / 2 };
        const eqPointB = { x: eqCenterX - equilateralSideLength / 2, y: centerY + equilateralHeight / 2 };
        const eqPointC = { x: eqCenterX + equilateralSideLength / 2, y: centerY + equilateralHeight / 2 };

        // Calculate initial positions for the scalene triangle vertices
        let scaleneSides = { ...initialScaleneSideLengths };

        const scPointA = { x: scCenterX, y: centerY - calculateHeight(scaleneSides.b) / 2 };
        const scPointB = { x: scPointA.x - scaleneSides.a / 3, y: centerY + calculateHeight(scaleneSides.b) / 2 };
        const scPointC = { x: scPointA.x + scaleneSides.c / 3, y: centerY + calculateHeight(scaleneSides.b) / 2 };

        // Draw the initial equilateral triangle
        const eqTriangleShape = new Shape(stage).addTo(stage);
        eqTriangleShape.graphics.beginStroke("green")
            .moveTo(eqPointA.x, eqPointA.y)
            .lineTo(eqPointB.x, eqPointB.y)
            .lineTo(eqPointC.x, eqPointC.y)
            .lineTo(eqPointA.x, eqPointA.y);

        // Draw the initial scalene triangle
        const scTriangleShape = new Shape(stage).addTo(stage);
        scTriangleShape.graphics.beginStroke("blue")
            .moveTo(scPointA.x, scPointA.y)
            .lineTo(scPointB.x, scPointB.y)
            .lineTo(scPointC.x, scPointC.y)
            .lineTo(scPointA.x, scPointA.y);

       
        const eqControlPoint = new Circle(10, "red").center(stage).pos(eqPointA.x, eqPointA.y).drag();

       
        const scControlPoint = new Circle(10, "blue").center(stage).pos(scPointA.x, scPointA.y).drag();

        
        const eqAngleALabel = new Label({ text: "Eq. Angle A: 60°", size: 20, color: "black" }).addTo(stage).pos(200, 350);
        const eqAngleBLabel = new Label({ text: "Eq. Angle B: 60°", size: 20, color: "black" }).addTo(stage).pos(200, 400);
        const eqAngleCLabel = new Label({ text: "Eq. Angle C: 60°", size: 20, color: "black" }).addTo(stage).pos(200, 450);

        const eqSideABLabel = new Label({ text: `Eq. Side AB: ${equilateralSideLength} cm`, size: 20, color: "black" }).addTo(stage).pos(200, 500);
        const eqSideBCLabel = new Label({ text: `Eq. Side BC: ${equilateralSideLength} cm`, size: 20, color: "black" }).addTo(stage).pos(200, 550);
        const eqSideCALabel = new Label({ text: `Eq. Side CA: ${equilateralSideLength} cm`, size: 20, color: "black" }).addTo(stage).pos(200, 600);

      
        const scAngleALabel = new Label({ text: "Sc. Angle A: 60°", size: 20, color: "black" }).addTo(stage).pos(200, 700);
        const scAngleBLabel = new Label({ text: "Sc. Angle B: 60°", size: 20, color: "black" }).addTo(stage).pos(200, 750);
        const scAngleCLabel = new Label({ text: "Sc. Angle C: 60°", size: 20, color: "black" }).addTo(stage).pos(200, 800);

        const scSideABLabel = new Label({ text: `Sc. Side AB: ${scaleneSides.a} cm`, size: 20, color: "black" }).addTo(stage).pos(200, 850);
        const scSideBCLabel = new Label({ text: `Sc. Side BC: ${scaleneSides.b} cm`, size: 20, color: "black" }).addTo(stage).pos(200, 900);
        const scSideCALabel = new Label({ text: `Sc. Side CA: ${scaleneSides.c} cm`, size: 20, color: "black" }).addTo(stage).pos(200, 950);

      
        function calculateAngles(a, b, c) {
            // Using the law of cosines
            const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
            const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
            const angleC = 180 - angleA - angleB; // Sum of angles in a triangle is 180

            return {
                A: angleA.toFixed(2),
                B: angleB.toFixed(2),
                C: angleC.toFixed(2),
            };
        }

        
        function distance(p1, p2) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        }

       
        function updateEquilateralTriangle() {
            
            const dy = centerY - eqControlPoint.y; 
            equilateralSideLength = initialEquilateralSideLength + dy * 1.5; 

            
            const minSideLength = 50; 
            if (equilateralSideLength < minSideLength) {
                equilateralSideLength = minSideLength;
            }

           
            const newHeight = calculateHeight(equilateralSideLength);

            eqPointA.x = eqCenterX;
            eqPointA.y = centerY - newHeight / 2;
            eqPointB.x = eqCenterX - equilateralSideLength / 2;
            eqPointB.y = centerY + newHeight / 2;
            eqPointC.x = eqCenterX + equilateralSideLength / 2;
            eqPointC.y = centerY + newHeight / 2;

            
            eqTriangleShape.graphics.clear()
                .beginStroke("green")
                .moveTo(eqPointA.x, eqPointA.y)
                .lineTo(eqPointB.x, eqPointB.y)
                .lineTo(eqPointC.x, eqPointC.y)
                .lineTo(eqPointA.x, eqPointA.y);

          
            eqControlPoint.x = eqPointA.x; 
            eqControlPoint.y = eqPointA.y; 

           
            const sideAB = distance(eqPointA, eqPointB);
            const sideBC = distance(eqPointB, eqPointC);
            const sideCA = distance(eqPointC, eqPointA);

            
            const angles = calculateAngles(sideAB, sideBC, sideCA);

           
            eqAngleALabel.text = `Eq. Angle A: ${angles.A}°`;
            eqAngleBLabel.text = `Eq. Angle B: ${angles.B}°`;
            eqAngleCLabel.text = `Eq. Angle C: ${angles.C}°`;
            eqSideABLabel.text = `Eq. Side AB: ${(sideAB / 10).toFixed(2)} cm`;
            eqSideBCLabel.text = `Eq. Side BC: ${(sideBC / 10).toFixed(2)} cm`;
            eqSideCALabel.text = `Eq. Side CA: ${(sideCA / 10).toFixed(2)} cm`;
        }

        
        function updateScaleneTriangle() {
           
            const dy = centerY - scControlPoint.y; 
           
           
            scaleneSides = {
                a: initialScaleneSideLengths.a + dy * 1.2,
                b: initialScaleneSideLengths.b + dy * 1.3,
                c: initialScaleneSideLengths.c + dy * 1.4,
            };

            
            for (let side in scaleneSides) {
                if (scaleneSides[side] < 200) {
                    scaleneSides[side] = 200;
                }
            }

            // Calculate new positions for B and C points
            scPointA.x = scControlPoint.x;
            scPointA.y = scControlPoint.y;

            scPointB.x = scPointA.x - scaleneSides.a / 3;
            scPointB.y = centerY + calculateHeight(scaleneSides.b) / 2;
            scPointC.x = scPointA.x + scaleneSides.c / 3;
            scPointC.y = centerY + calculateHeight(scaleneSides.b) / 2;

            
            scTriangleShape.graphics.clear()
                .beginStroke("blue")
                .moveTo(scPointA.x, scPointA.y)
                .lineTo(scPointB.x, scPointB.y)
                .lineTo(scPointC.x, scPointC.y)
                .lineTo(scPointA.x, scPointA.y);

            
            scControlPoint.x = scPointA.x;
            scControlPoint.y = scPointA.y;

           
            const sideAB = distance(scPointA, scPointB);
            const sideBC = distance(scPointB, scPointC);
            const sideCA = distance(scPointC, scPointA);

           
            const angles = calculateAngles(sideAB, sideBC, sideCA);

           
            scAngleALabel.text = `Sc. Angle A: ${angles.A}°`;
            scAngleBLabel.text = `Sc. Angle B: ${angles.B}°`;
            scAngleCLabel.text = `Sc. Angle C: ${angles.C}°`;
            scSideABLabel.text = `Sc. Side AB: ${(sideAB / 10).toFixed(2)} cm`;
            scSideBCLabel.text = `Sc. Side BC: ${(sideBC / 10).toFixed(2)} cm`;
            scSideCALabel.text = `Sc. Side CA: ${(sideCA / 10).toFixed(2)} cm`;
        }

        // Initial triangle drawing
        updateEquilateralTriangle();
        updateScaleneTriangle();

        // Add drag event listener to control point of the equilateral triangle
        eqControlPoint.on("pressmove", (event) => {
            // Allow only vertical dragging
            eqControlPoint.y = event.stageY;

            // Update the equilateral triangle with the new control point position
            updateEquilateralTriangle();
        });

        // Add drag event listener to control point of the scalene triangle
        scControlPoint.on("pressmove", (event) => {
            // Allow only vertical dragging
            scControlPoint.y = event.stageY;

            // Update the scalene triangle with the new control point position
            updateScaleneTriangle();
        });
    }
}

// Initialize the app
init();
