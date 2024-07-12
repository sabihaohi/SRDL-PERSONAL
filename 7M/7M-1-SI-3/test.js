import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Rectangle, Label, TextArea, Pic } = zim;

async function init() {
  // Load JSON data
  const response = await fetch("data.json");
  const data = await response.json();

  // Destructure the loaded data
  const { lang, headerText, chapter, chapterNoText, footerLabelText, informationText } = data;

  // Create the frame after loading the JSON data
  new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

  function ready() {
    //asstesLoading();
    generateRandomnumberwithCombination();
  }

  function asstesLoading() {
    const bg = new Pic("assets/image/bg.png").center();
  }

  const steps = [];
  const inputBoxes = [];
  const combinations = [];
  
  function generateRandomnumberwithCombination(mainNum, powerNum) {
    const stepRects = [
      new Rectangle(200, 200, "white").pos(100, 100),
      new Rectangle(200, 200, "white").pos(1200, 100),
      new Rectangle(200, 200, "white").pos(400, 400),
      new Rectangle(200, 200, "white").pos(1300, 400),
      new Rectangle(200, 200, "white").pos(200, 700),
      new Rectangle(200, 200, "white").pos(1200, 700),
    ];

    stepRects.forEach((rect, i) => {
      if (i > 0) rect.visible = false;
      steps.push(rect);
    });

    const labels = stepRects.map(rect => new Label("", 30, "Arial", "black").center(rect).mov(-30));

    mainNum = Math.floor(Math.random() * 9) + 1;
    powerNum = mainNum <= 2 ? Math.floor(Math.random() * 20) + 1 : Math.floor(Math.random() * 5) + 1;

    const superscript = d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d];
    const combination1 = `${mainNum}${powerNum.toString().split("").map(superscript).join("")}`;
    const combination3 = `(${combination1})${powerNum.toString().split("").map(superscript).join("")}`;

    labels[0].text = `${combination1} \u00D7 ${combination1}`;
    labels[1].text = `${combination1} / ${combination1}`;
    labels[2].text = combination3;
    labels[3].text = `${combination1} \u00D7 ${combination1}`;
    labels[4].text = `${combination1} / ${combination1}`;
    labels[5].text = combination3;

    const combinationResults = [
      Math.pow(mainNum, powerNum) * Math.pow(mainNum, powerNum),
      Math.pow(mainNum, powerNum) / Math.pow(mainNum, powerNum),
      Math.pow(Math.pow(mainNum, powerNum), powerNum),
      Math.pow(mainNum, powerNum) * Math.pow(mainNum, powerNum),
      Math.pow(mainNum, powerNum) / Math.pow(mainNum, powerNum),
      Math.pow(Math.pow(mainNum, powerNum), powerNum),
    ];

    for (let i = 0; i < 6; i++) {
      const inputBox = new TextArea(300, 200).pos(steps[i].x + 450, steps[i].y + 50);
      if (i === 3) inputBox.pos(steps[i].x - 1250, steps[i].y + 50);
      inputBox.on("input", () => {
        if (parseFloat(inputBox.text) === combinationResults[i]) {
          if (i < 5) steps[i + 1].visible = true;
        }
      });
      inputBoxes.push(inputBox);
    }
  }
}

// Initialize the app
init();
