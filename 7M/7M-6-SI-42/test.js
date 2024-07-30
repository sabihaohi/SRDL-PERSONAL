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

        function getThetaDEF() {
            const theta = {};
            do {
                theta.t1 = Math.ceil(Math.random() * 6) * 30 + 170;
                theta.t2 = Math.ceil(Math.random() * 6) * 30 + 170;
                theta.t3 = Math.ceil(Math.random() * 6) * 30 + 170;
            } while ((theta.t1 === theta.t2) || (theta.t1 === theta.t3) || (theta.t2 === theta.t3));
            return theta;
        }

        const thetaDEF = getThetaABC();
        const fW2 = frame.stage.width / 2;
        const fH2 = frame.stage.height / 2;
        const r2 = 100;

        const thetaABC = getThetaDEF();
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
        const c = new Circle(15, "red").center().mov((circleABCbg.x + r * Math.cos(thetaABC.t1) - fW), circleABCbg.y + r * Math.sin(thetaABC.t1) - fH);
        const labelA = new Label({
            text: "A",
            size: 20,
            color: "white",
            bold: true,
        }).center(c);
        const c2 = new Circle(15, "blue").center().mov((circleABCbg.x + r * Math.cos(thetaABC.t2) - fW), circleABCbg.y + r * Math.sin(thetaABC.t2) - fH);
        const labelB = new Label({
            text: "B",
            size: 20,
            color: "white",
            bold: true,
        }).center(c2);
        const c3 = new Circle(15, "green").center().mov((circleABCbg.x + r * Math.cos(thetaABC.t3) - fW), circleABCbg.y + r * Math.sin(thetaABC.t3) - fH);
        const labelC = new Label({
            text: "C",
            size: 20,
            color: "white",
            bold: true,
        }).center(c3);

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

        // tri. three point
        const circleDEFbg = new Circle({ radius: r, color: "transparent", borderColor: "transparent" }).center().mov(150, 250);
        const c4 = new Circle(15, "red").center().mov((circleDEFbg.x + r * Math.cos(thetaDEF.t1) - fW), circleDEFbg.y + r * Math.sin(thetaDEF.t1) - fH);
        const labelD = new Label({
            text: "D",
            size: 20,
            color: "white",
            bold: true,
        }).center(c4);
        const c5 = new Circle(15, "blue").center().mov((circleDEFbg.x + r * Math.cos(thetaDEF.t2) - fW), circleDEFbg.y + r * Math.sin(thetaDEF.t2) - fH);
        const labelE = new Label({
            text: "E",
            size: 20,
            color: "white",
            bold: true,
        }).center(c5);
        const c6 = new Circle(15, "green").center().mov((circleDEFbg.x + r * Math.cos(thetaDEF.t3) - fW), circleDEFbg.y + r * Math.sin(thetaDEF.t3) - fH);
        const labelF = new Label({
            text: "F",
            size: 20,
            color: "white",
            bold: true,
        }).center(c6);

        const p4 = { x: c4.x, y: c4.y };
        const p5 = { x: c5.x, y: c5.y };
        const p6 = { x: c6.x, y: c6.y };

        // Calculate the lengths of the sides of triangle DEF
        const lengthDE = calculateDistance(p4, p5);
        const lengthEF = calculateDistance(p5, p6);
        const lengthFD = calculateDistance(p6, p4);

        // Log the lengths of triangle DEF
        console.log("Triangle DEF side lengths:");
        console.log(`DE: ${lengthDE}`);
        console.log(`EF: ${lengthEF}`);
        console.log(`FD: ${lengthFD}`);

        // Draw triangle DEF
        const triangleDline = new Shape().s(black).ss(2).mt(p4.x, p4.y).lt(p5.x, p5.y).addTo().drag();
        const triangleEline = new Shape().s(black).ss(2).mt(p5.x, p5.y).lt(p6.x, p6.y).addTo();
        const triangleFline = new Shape().s(black).ss(2).mt(p6.x, p6.y).lt(p4.x, p4.y).addTo();

        // Calculate side ratios (as an example, you might need different logic based on your needs)
        const ratio1 = (lengthAB / lengthDE).toFixed(2);
        const ratio2 = (lengthBC / lengthEF).toFixed(2);
        const ratio3 = (lengthCA / lengthFD).toFixed(2);

        // Define initial table data with updated lengths
        const texts = [
            ["Triangle", "1st side", "2nd side", "3rd side"],
            ["ABC(<BAC)", lengthAB.toFixed(2), lengthBC.toFixed(2), lengthCA.toFixed(2)],
            ["DEF(<EDF)", lengthDE.toFixed(2), lengthEF.toFixed(2), lengthFD.toFixed(2)],
            ["side ratio", ratio1, ratio2, ratio3]
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
