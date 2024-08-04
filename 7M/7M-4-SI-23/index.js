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
        const initialEquilateralSideLength = 200; // Initial side length for equilateral triangle
        const initialScaleneSideLengths = { a: 150, b: 200, c: 250 }; // Initial side lengths for scalene triangle
        const eqCenterX = 680; // Center of the equilateral triangle (x-axis)
        const scCenterX = 1340; // Center of the scalene triangle (x-axis)
        const centerY = 540; // Center of the stage (y-axis)

        // Function to calculate height of the equilateral triangle
        function calculateHeight(side) {
            return (side * Math.sqrt(3)) / 2;
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
        eqTriangleShape.graphics
            .beginStroke("green")
            .moveTo(eqPointA.x, eqPointA.y)
            .lineTo(eqPointB.x, eqPointB.y)
            .lineTo(eqPointC.x, eqPointC.y)
            .lineTo(eqPointA.x, eqPointA.y);

        // Draw the initial scalene triangle
        const scTriangleShape = new Shape(stage).addTo(stage);
        scTriangleShape.graphics
            .beginStroke("blue")
            .moveTo(scPointA.x, scPointA.y)
            .lineTo(scPointB.x, scPointB.y)
            .lineTo(scPointC.x, scPointC.y)
            .lineTo(scPointA.x, scPointA.y);

        // Create a draggable control point for the equilateral triangle
        const eqControlPoint = new Circle(10, "red")
            .center(stage)
            .pos(eqPointA.x, eqPointA.y)
            .drag();

        // Create a draggable control point for the scalene triangle
        const scControlPoint = new Circle(10, "blue")
            .center(stage)
            .pos(scPointA.x, scPointA.y)
            .drag();

        // Create labels for displaying angles and side lengths of the equilateral triangle
        const eqAngleALabel = new Label({
            text: "Eq. Angle A: 60°",
            size: 20,
            color: "black",
        })
            .addTo(stage)
            .pos(200, 350);
        const eqAngleBLabel = new Label({
            text: "Eq. Angle B: 60°",
            size: 20,
            color: "black",
        })
            .addTo(stage)
            .pos(200, 400);
        const eqAngleCLabel = new Label({
            text: "Eq. Angle C: 60°",
            size: 20,
            color: "black",
        })
            .addTo(stage)
            .pos(200, 450);

        const eqSideABLabel = new Label({
            text: `Eq. Side AB: ${equilateralSideLength} cm`,
            size: 20,
            color: "black",
        })
            .addTo(stage)
            .pos(200, 500);
        const eqSideBCLabel = new Label({
            text: `Eq. Side BC: ${equilateralSideLength} cm`,
            size: 20,
            color: "black",
        })
            .addTo(stage)
            .pos(200, 550);
        const eqSideCALabel = new Label({
            text: `Eq. Side CA: ${equilateralSideLength} cm`,
            size: 20,
            color: "black",
        })
            .addTo(stage)
            .pos(200, 600);

        // Create labels for displaying angles and side lengths of the scalene triangle
        // const scAngleALabel = new Label({
        //     text: "Sc. Angle A: 60°",
        //     size: 20,
        //     color: "black",
        // })
        //     .addTo(stage)
        //     .pos(1200, 350);
        // const scAngleBLabel = new Label({
        //     text: "Sc. Angle B: 60°",
        //     size: 20,
        //     color: "black",
        // })
        //     .addTo(stage)
        //     .pos(1200, 400);
        // const scAngleCLabel = new Label({
        //     text: "Sc. Angle C: 60°",
        //     size: 20,
        //     color: "black",
        // })
        //     .addTo(stage)
        //     .pos(1200, 450);

        // const scSideABLabel = new Label({
        //     text: `Sc. Side AB: ${scaleneSides.a} cm`,
        //     size: 20,
        //     color: "black",
        // })
        //     .addTo(stage)
        //     .pos(1200, 500);
        // const scSideBCLabel = new Label({
        //     text: `Sc. Side BC: ${scaleneSides.b} cm`,
        //     size: 20,
        //     color: "black",
        // })
        //     .addTo(stage)
        //     .pos(1200, 550);
        // const scSideCALabel = new Label({
        //     text: `Sc. Side CA: ${scaleneSides.c} cm`,
        //     size: 20,
        //     color: "black",
        // })
        //     .addTo(stage)
        //     .pos(1200, 600);

        // Function to calculate angles of a triangle given three sides
        function calculateAngles(a, b, c) {
            // Using the law of cosines
            const angleA =
                (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI;
            const angleB =
                (Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180) / Math.PI;
            const angleC = 180 - angleA - angleB; // Sum of angles in a triangle is 180

            return {
                A: angleA.toFixed(2),
                B: angleB.toFixed(2),
                C: angleC.toFixed(2),
            };
        }

        // Function to calculate the distance between two points
        function distance(p1, p2) {
            return Math.sqrt(
                Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
            );
        }

        // Function to update the equilateral triangle based on its control point movement
        function updateEquilateralTriangle() {
            // Calculate new side length based on control point's vertical distance from the center
            const dy = centerY - eqControlPoint.y; // Distance from the center in y-axis
            equilateralSideLength = initialEquilateralSideLength + dy * 1.5; // Multiplied for faster scaling

            // Ensure the side length remains above a minimum threshold
            const minSideLength = 50; // Minimum allowed side length
            if (equilateralSideLength < minSideLength) {
                equilateralSideLength = minSideLength;
            }

            // Recalculate height and positions of vertices
            const newHeight = calculateHeight(equilateralSideLength);

            eqPointA.x = eqCenterX;
            eqPointA.y = centerY - newHeight / 2;
            eqPointB.x = eqCenterX - equilateralSideLength / 2;
            eqPointB.y = centerY + newHeight / 2;
            eqPointC.x = eqCenterX + equilateralSideLength / 2;
            eqPointC.y = centerY + newHeight / 2;

            // Update equilateral triangle shape
            eqTriangleShape.graphics
                .clear()
                .beginStroke("green")
                .moveTo(eqPointA.x, eqPointA.y)
                .lineTo(eqPointB.x, eqPointB.y)
                .lineTo(eqPointC.x, eqPointC.y)
                .lineTo(eqPointA.x, eqPointA.y);

            // Update control point position to remain at the top of the triangle
            eqControlPoint.x = eqPointA.x; // Keep x fixed at the top vertex
            eqControlPoint.y = eqPointA.y; // Update y to match the top vertex position

            // Calculate side lengths of the equilateral triangle
            const sideAB = distance(eqPointA, eqPointB);
            const sideBC = distance(eqPointB, eqPointC);
            const sideCA = distance(eqPointC, eqPointA);

            // Calculate angles (all 60° for equilateral)
            const angles = calculateAngles(sideAB, sideBC, sideCA);

            // Update labels with side lengths and angles for the equilateral triangle
            eqAngleALabel.text = `Eq. Angle A: ${angles.A}°`;
            eqAngleBLabel.text = `Eq. Angle B: ${angles.B}°`;
            eqAngleCLabel.text = `Eq. Angle C: ${angles.C}°`;
            eqSideABLabel.text = `Eq. Side AB: ${(sideAB / 10).toFixed(2)} cm`;
            eqSideBCLabel.text = `Eq. Side BC: ${(sideBC / 10).toFixed(2)} cm`;
            eqSideCALabel.text = `Eq. Side CA: ${(sideCA / 10).toFixed(2)} cm`;
        }

        // Function to update the scalene triangle based on its control point movement
        function updateScaleneTriangle() {
            // Calculate new positions for scalene vertices based on the control point's vertical position
            const dy = centerY - scControlPoint.y; // Distance from the center in y-axis

            // Adjust the scalene sides dynamically based on the control point movement
            scaleneSides = [
                 initialScaleneSideLengths.a + dy * 1.2,
                 initialScaleneSideLengths.b + dy * 1.3,
                 initialScaleneSideLengths.c + dy * 1.4,
            ];

            //Ensure the sides remain above a minimum threshold
            for (let side in scaleneSides) {
                if (scaleneSides[side] < 50) {
                    scaleneSides[side] = 50;
                }
            }

            // const minSideLength = 50; // Minimum allowed side length
            // if (equilateralSideLength < minSideLength) {
            //     equilateralSideLength = minSideLength;
            // }

        //     const minSideLengtha = 50; // Minimum allowed side length
        //     const minSideLengthb = 150; // Minimum allowed side length
        //     const minSideLengthc = 250; // Minimum allowed side length
        //     for (let side in scaleneSides) {
        //             if (scaleneSides[side[0]] < minSideLengtha && scaleneSides[side[1]] < minSideLengthb && scaleneSides[side[2]] < minSideLengthc) {
        //                 scaleneSides[side[0]] = minSideLengtha;
        //                 scaleneSides[side[1]] = minSideLengthb;
        //                 scaleneSides[side[2]] = minSideLengthc;
        //             }
        // }

           

            // Calculate new positions for B and C points
            scPointA.x = scControlPoint.x;
            scPointA.y = scControlPoint.y;

            scPointB.x = scPointA.x - scaleneSides.a / 3;
            scPointB.y = centerY + calculateHeight(scaleneSides.b) / 2;
            scPointC.x = scPointA.x + scaleneSides.c / 3;
            scPointC.y = centerY + calculateHeight(scaleneSides.b) / 2;

            // Update scalene triangle shape
            scTriangleShape.graphics
                .clear()
                .beginStroke("blue")
                .moveTo(scPointA.x, scPointA.y)
                .lineTo(scPointB.x, scPointB.y)
                .lineTo(scPointC.x, scPointC.y)
                .lineTo(scPointA.x, scPointA.y);

            // Update control point position to remain at the top of the triangle
            scControlPoint.x = scPointA.x;
            scControlPoint.y = scPointA.y;

            // Calculate side lengths of the scalene triangle
            const sideAB = distance(scPointA, scPointB);
            const sideBC = distance(scPointB, scPointC);
            const sideCA = distance(scPointC, scPointA);

            // Calculate angles for the scalene triangle
            const angles = calculateAngles(sideAB, sideBC, sideCA);

            // Update labels with side lengths and angles for the scalene triangle
            // scAngleALabel.text = `Sc. Angle A: ${angles.A}°`;
            // scAngleBLabel.text = `Sc. Angle B: ${angles.B}°`;
            // scAngleCLabel.text = `Sc. Angle C: ${angles.C}°`;
            // scSideABLabel.text = `Sc. Side AB: ${(sideAB / 10).toFixed(2)} cm`;
            // scSideBCLabel.text = `Sc. Side BC: ${(sideBC / 10).toFixed(2)} cm`;
            // scSideCALabel.text = `Sc. Side CA: ${(sideCA / 10).toFixed(2)} cm`;
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

        // Update the stage
        stage.update();
    }
}

// Initialize the app
init();
