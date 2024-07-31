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
            console.log(theta.t1);
            return theta;
        }

       

        const thetaDEF = getThetaABC();
        const fW2 = frame.stage.width / 2
        const fH2 = frame.stage.height / 2
        const r2 = 100;

      

        //tri. three point
        const circleABCbg = new Circle({ radius: r, color: "transparent", borderColor: "transparent" }).center().mov(-150, 250)
        const c = new Circle(15, "red").center().mov((circleABCbg.x + r * Math.cos(thetaABC.t1) - fW), circleABCbg.y + r * Math.sin(thetaABC.t1) - fH)
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

        const p1 = { x: c.x, y: c.y }
        const p2 = { x: c2.x, y: c2.y }
        const p3 = { x: c3.x, y: c3.y }
        // //draw tringle
        // const triangleAline = new Shape().s(black).ss(2).mt(p1.x, p1.y).lt(p2.x, p2.y).addTo();
        // const triangleBline = new Shape().s(black).ss(2).mt(p2.x, p2.y).lt(p3.x, p3.y).addTo();
        // const triangleCline = new Shape().s(black).ss(2).mt(p3.x, p3.y).lt(p1.x, p1.y).addTo();



       


         // Define initial table data
         const texts = [
            ["Triangle", "1st side", "2nd side", "angle"],
            ["ABC(<BAC)", "0", "0", "0"],
            ["DEF(<EDF)", "0", "0", "0"],
            ["side ratio","0", "0", ""]
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

        // Initial update
        // rightUpdateTriangle();
        // leftUpdateTriangle();
        // checkSimilar(); // Initial similarity check
    }
}

init();
