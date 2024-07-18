import zim, { drag, sca } from "./zim.js";
const { Frame, Rectangle, Pic, Label, Circle, Button, Container } = zim;

async function init() {
  const response = await fetch("data.json");
  const data = await response.json();

  const { lang, headerText, chapter, informationText } = data;

 const frame = new Frame("fit", 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

  function ready() {
    mainFunction();
    labelCreation();
  }

  function labelCreation() {
    const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
      .center()
      .pos(130, 60);

    const header_label = new Label({
      text: headerText.text[lang],
      size: 40,
      bold: true,
    })
      .center(header_rect)
      .sca(1);

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
    }).loc(informationText.x[lang], 380);
  }

  function mainFunction() {
    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").center().mov(100, 80);
    const scaleouterRect = new Rectangle({ width: 500, height: 87, color: "transparent" }).center().mov(100, 80);
    const scale = new Pic("assets/image/scale.png").center().mov(100, 80);

    const wheelContainer = new Container().addTo(frame);
    const wheelCircle = new Circle(80, "transparent").loc(960, 540).drag().addTo(wheelContainer);
    const wheel = new Pic("assets/image/wheel.png").sca(0.47).center(wheelCircle).addTo(wheelContainer);

    // wheelCircle.on("click", function () {
    //   wheelCircle.y = 540;  // Reset y position to ensure it's centered correctly
    //   wheelCircle.animate({
    //     props: { x: wheelCircle.x + 200, y: wheelCircle.y, rotation: 360 },
    //     time: 4,
    //   });
    // });

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

init();
