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
        const infoBox = new Pic("assets/image/info.png").pos(100, 400);
        const table = new Pic("assets/image/table.png").pos(510, 220);

        const stageRect = new Rectangle({
            width: 800,
            height: 420,
            color: "transparent",
        })
            .center()
            .mov(0, 185);


            
        
        function getThetaABC() {
            const theta = {};
            do {
                theta.t1 = Math.ceil(Math.random() * 6) * 30 + 170;
                theta.t2 = Math.ceil(Math.random() * 6) * 30 + 170;
                theta.t3 = Math.ceil(Math.random() * 6) * 30 + 170;
            } while ((theta.t1 === theta.t2) || (theta.t1 === theta.t3) || (theta.t2 === theta.t3));
            return theta;
        }

        
        const thetaDEF = getThetaABC();
        const fW = frame.stage.width / 2;
        const fH = frame.stage.height / 2;
        const r = 100;


        // Function to calculate distance between two points
        function calculateDistance(point1, point2) {
            const dx = point2.x - point1.x;
            const dy = point2.y - point1.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        // tri. three point
        const circleABCbg = new Circle({ radius: r, color: "transparent", borderColor: "transparent" }).center().mov(-150, 250);
        const c = new Circle(10, "transparent").center().mov((circleABCbg.x + r * Math.cos(thetaDEF.t1) - fW), circleABCbg.y + r * Math.sin(thetaDEF.t1) - fH);
        const labelA = new Label({
            text: "A",
            size: 18,
            color: "black",
            bold: true,
        }).pos(c.x-10, c.y-10);
        const c2 = new Circle(15, "transparent").center().mov((circleABCbg.x + r * Math.cos(thetaDEF.t2) - fW), circleABCbg.y + r * Math.sin(thetaDEF.t2) - fH);
        const labelB = new Label({
            text: "B",
            size: 20,
            color: "black",
            bold: true,
        }).pos(c2.x-10, c2.y-10);
        const c3 = new Circle(15, "transparent").center().mov((circleABCbg.x + r * Math.cos(thetaDEF.t3) - fW), circleABCbg.y + r * Math.sin(thetaDEF.t3) - fH);
        const labelC = new Label({
            text: "C",
            size: 20,
            color: "black",
            bold: true,
        }).pos(c3.x-10, c3.y-10);

        const p1 = { x: c.x, y: c.y };
        const p2 = { x: c2.x, y: c2.y };
        const p3 = { x: c3.x, y: c3.y };

        // Calculate the lengths of the sides of triangle ABC
        const lengthAB = calculateDistance(p1, p2);
        const lengthBC = calculateDistance(p2, p3);
        const lengthCA = calculateDistance(p3, p1);

        // Log the lengths of triangle ABC
        console.log("Triangle ABC side lengths:");
        console.log(`AB: ${lengthAB}`);
        console.log(`BC: ${lengthBC}`);
        console.log(`CA: ${lengthCA}`);

        // Draw triangle ABC
        const triangleAline = new Shape().s(black).ss(2).mt(p1.x, p1.y).lt(p2.x, p2.y).addTo();
        const triangleBline = new Shape().s(black).ss(2).mt(p2.x, p2.y).lt(p3.x, p3.y).addTo();
        const triangleCline = new Shape().s(black).ss(2).mt(p3.x, p3.y).lt(p1.x, p1.y).addTo();

       

        // Calculate side ratios (as an example, you might need different logic based on your needs)
        // const ratio1 = (lengthAB / lengthDE).toFixed(2);
        // const ratio2 = (lengthBC / lengthEF).toFixed(2);
        // const ratio3 = (lengthCA / lengthFD).toFixed(2);


        const  outerRect = new Rectangle({ width: 200, height: 350, color: "transparent" }).center().mov(120, 205);
        // Initial positions for the left triangle vertices
        const leftTrianglePointD = { x: 995, y: 900 };
        const leftTrianglePointE = { x: 1100, y: 600 };
        const leftTrianglePointF = { x: 1150, y: 900 };

        const leftTriangleShape = new Shape(stage).addTo(stage);
        leftTriangleShape.graphics
            .beginStroke("blue")
            .moveTo(leftTrianglePointD.x, leftTrianglePointD.y)
            .lineTo(leftTrianglePointE.x, leftTrianglePointE.y)
            .lineTo(leftTrianglePointF.x, leftTrianglePointF.y)
            .lineTo(leftTrianglePointD.x, leftTrianglePointD.y);

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

     const texts = [
        ["Triangle", "1st side", "2nd side", "3rd side"],
        ["ABC(<BAC)", `${Math.floor(distanceInCm(p1, p2))} cm (AB)`,`${ Math.floor(distanceInCm(p2, p3))} cm (BC)`,`${ Math.floor(distanceInCm(p3, p1))} cm (CA)`],
        ["DEF(<EDF)", "", "", ""],
        ["side ratio", "", "",""]
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

     function leftUpdateTriangle() {
        const a = Math.floor(distanceInCm(leftTrianglePointD, leftTrianglePointE));
        const b = Math.floor(distanceInCm(leftTrianglePointD, leftTrianglePointF));
        const c = Math.floor(distanceInCm(leftTrianglePointE, leftTrianglePointF));
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

      // Add drag event listeners to update left triangle when any circle is moved
      leftCircleD.on("pressmove", (event) => {  // Updated drag event listener for point D
        leftTrianglePointD.x = event.currentTarget.x;
        leftTrianglePointD.y = event.currentTarget.y;
        leftUpdateTriangle();
        //updateRatios();
    });

    leftCircleD.on("pressup", () => {
        //checkSimilar();
    });

    leftCircleE.on("pressmove", (event) => {
        leftTrianglePointE.x = event.currentTarget.x;
        leftTrianglePointE.y = event.currentTarget.y;
        leftUpdateTriangle();
        //updateRatios();
    });

    leftCircleE.on("pressup", () => {
       // checkSimilar();
    });

    leftCircleF.on("pressmove", (event) => {
        leftTrianglePointF.x = event.currentTarget.x;
        leftTrianglePointF.y = event.currentTarget.y;
        leftUpdateTriangle();
        //updateRatios();
    });

    leftCircleF.on("pressup", () => {
        //checkSimilar();
    });

     // Create a label to display the result message
     const resultMessage = new Label({
        text: "",
        lineHeight:35,
        size:25,
    }).pos(150, 500);
    stage.addChild(resultMessage);

    // Function to check similarity and update the result message
    // function checkSimilar() {
    //     const rightA = Math.floor(distanceInCm(rightTrianglePointA, rightTrianglePointB));
    //     const rightB = Math.floor(distanceInCm(rightTrianglePointA, rightTrianglePointC));
    //     const rightC = Math.floor(distanceInCm(rightTrianglePointB, rightTrianglePointC));

    //     const leftA = Math.floor(distanceInCm(leftTrianglePointD, leftTrianglePointE));
    //     const leftB = Math.floor(distanceInCm(leftTrianglePointD, leftTrianglePointF));
    //     const leftC = Math.floor(distanceInCm(leftTrianglePointE, leftTrianglePointF));

    //     // Update side ratios in the table
    //     const sideRatios = calculateSideRatios(rightA, rightB, rightC, leftA, leftB, leftC);
    //     labels[13].text = sideRatios.ratio1 ;  // Update ratio for DE
    //     labels[14].text = sideRatios.ratio2  ; // Update ratio for DF
    //     labels[15].text = sideRatios.ratio3  ; // Update ratio for EF

    //     if (
    //         sideRatios.ratio1 === sideRatios.ratio2 &&
    //         sideRatios.ratio2 === sideRatios.ratio3
    //     ) {
    //         resultMessage.color = "green";
    //         resultMessage.text = similarMessage.text[lang];
           
    //     } else {
    //         resultMessage.text = errorMessage.text[lang];
    //         resultMessage.color = "red";
    //     }

    //     // Update the stage after changing the result message
    //     stage.update();
    // }

    leftUpdateTriangle();
    //checkSimilar(); 


       

        labelCreation();

        function labelCreation() {
            const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
                .center()
                .pos(130, 60);

            const SubHeader_rect = new Rectangle({ width: 1500, height: 50, color: "transparent" })
                .center()
                .pos(270, 140);

            const header_label = new Label({
                text: headerText.text[lang],
                size: 40,
                bold: true,
            })
                .center(header_rect)
                .sca(1);

            const subHeader_label = new Label({
                text: subHeaderText.text[lang],
                size: 40,
                bold: true,
            })
                .center(SubHeader_rect)
                .sca(0.6).mov(0, 20);

            new Label({
                text: chapter.text[lang],
                size: 25,
                color: "black",
                bold: true,
                italic: true,
            }).loc(100, 110);

            new Label({
                text: informationText.text[lang],
                size: 20,
                color: "black",
                bold: true,
            }).loc(informationText.positionX[lang], 430);

            const restartButton = new Button({
                label: "",
                width: 90,
                height: 90,
                backgroundColor: "#967bb6",
                rollBackgroundColor: "#967bb6",
                borderWidth: 0,
                gradient: 0.4,
                corner: 45,
            })
                .center()
                .mov(830, 430);

            const pic = new Pic("assets/image/restart.png").sca(0.15).center(restartButton);
            pic.rotation = 60;

            restartButton.on("click", () => {
                location.reload();
            });
        }
    }
}

init();
