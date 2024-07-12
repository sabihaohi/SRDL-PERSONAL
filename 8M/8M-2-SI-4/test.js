import zim from "./zim.js";
const { Frame, Rectangle, Pic, Label, TextArea, Button } = zim;

async function init() {
  // Load JSON data
  const response = await fetch("data.json");
  const data = await response.json();

  // Destructure the loaded data
  const {
    lang,
    playBtnText,
    headerText,
    wrongnumbermassage,
    chapter,
    infoAbdunantnumber,
    infodeficentnumber,
    iswrongnumber,
    informationText,
    abdundantnumber,
    deficentnumber,
  } = data;

  // Create the frame after loading the JSON data
  new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

  function ready() {
    const bg = new Pic("assets/image/bg.png").center();
    const InfoBox = new Pic("assets/image/information.png").pos(70, 220);

    const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
      .center()
      .pos(130, 50);

    const header_label = new Label({
      text: headerText.text[lang],
      size: 40,
      bold: true,
    })
      .center(header_rect)
      .sca(1);

    new Label({
      text: chapter.text[lang],
      size: 40,
      color: "black",
      bold: true,
      italic: true,
    }).loc(150, 70);

    new Label({
      text: abdundantnumber.text[lang],
      size: 30,
      color: "black",
      bold: true,
      italic: true,
    }).loc(700, 855);

    new Label({
      text: deficentnumber.text[lang],
      size: 30,
      color: "black",
      bold: true,
      italic: true,
    }).loc(1130, 855);

    new Label({
      text: informationText.text[lang],
      size: informationText.size[lang],
      color: "black",
    }).pos(informationText.posX[lang], 245);

    const abdunatRect = new Rectangle(300, 200, "transparent").center().mov(-140, 210);
    const abaduntNumber = new Label({
      text: "",
      size: 20,
      font: "courier",
      color: "black",
      bold: true,
    }).pos(650, 680);

    const deficentRect = new Rectangle(300, 200, "transparent").center().mov(290, 210);
    const deficentNumber = new Label({
      text: "",
      size: 20,
      font: "courier",
      color: "black",
      bold: true,
    }).pos(1080, 680);

    const isabaduntlabel = new Label({
      text: "",
      size: 30,
      font: "courier",
      color: "black",
      bold: true,
      lineHeight: 35,
    }).pos(170, 350);

    let wrongCount = 0; // Initialize wrong count
    let dragcount = 0;
    let numbers = [];
    // Function to check if a number is abundant
    function isAbundant(number) {
      numbers.length = 0;
       if (number <= 1) {
           return false;
       }

      let sum = 0;
      for (let i = 1; i < number; i++) {
        if (number % i === 0) {
          sum += i;
          numbers.push(i);
        }

      }

      return sum > number;
    }

    let currentRnumber;
    const labelOuterRect = new Rectangle(100, 100, "transparent").center().pos(970, 390).drag();
    const textArea = new TextArea({
      width: 200,
      height: 70,
      backgroundColor: "#62c1e5",
      placeholder: playBtnText.text[lang],
      corner: 10,
    }).pos(175, 820);

    const enterbtn = new Button({
      label: playBtnText.text[lang],
      width: 300,
      backgroundColor: "#20a7db",
    }).pos(120, 910);

    enterbtn.on("click", () => {
      if (textArea.text != "" && textArea.text >= 1 && textArea.text <= 100) {
        label.text = parseInt(textArea.text);
        currentRnumber = parseInt(textArea.text);
      } else if (textArea.text > 100) {
        label.text = parseInt(100);
      } else {
        createRandomNumber();
      }
    });

    const label = new Label({
      text: "",
      size: 50,
      font: "courier",
      color: "black",
      bold: true,
    }).center(labelOuterRect);

    function createRandomNumber() {
      currentRnumber = Math.floor(Math.random() * 100) + 1;
      label.text = `${currentRnumber}`;
    }
    createRandomNumber();

    labelOuterRect.on("pressup", () => {
      let isCorrect = false;
      dragcount++;
      
     console.log(dragcount);
      if (labelOuterRect.hitTestBounds(abdunatRect) && isAbundant(currentRnumber)) {
        abaduntNumber.text += abaduntNumber.text ? `, ${currentRnumber}` : `${currentRnumber}`;
        isabaduntlabel.text = `${currentRnumber} ${infoAbdunantnumber.text[lang]}`;
        isCorrect = true;

        //details calculation
        for(let i=0;i<numbers.length;i++){
          if(i === 0){
            isabaduntlabel.text += `${numbers[i]}`;
          }
          else{
            isabaduntlabel.text += `,${numbers[i]}`;
          }
        }
        isabaduntlabel.text += "\n";
        console.log(numbers);
        let sum = 0
        for(let i=0;i<numbers.length;i++){
          isabaduntlabel.text += `${numbers[i]}`;
          if(i != numbers.length-1){
            isabaduntlabel.text += "+";
          }
          sum += numbers[i];
        }
        isabaduntlabel.text += `=${sum}`;


      } else if (labelOuterRect.hitTestBounds(deficentRect) && !isAbundant(currentRnumber)) {
        deficentNumber.text += deficentNumber.text ? `, ${currentRnumber}` : `${currentRnumber}`;
        isabaduntlabel.text = `${currentRnumber} ${infodeficentnumber.text[lang]}`;
        isCorrect = true;

        for(let i=0;i<numbers.length;i++){
          if(i === 0){
            isabaduntlabel.text += `${numbers[i]}`;
          }
          else{
            isabaduntlabel.text += `,${numbers[i]}`;
          }
        }
        isabaduntlabel.text += "\n";
        console.log(numbers);
        let sum = 0
        for(let i=0;i<numbers.length;i++){
          isabaduntlabel.text += `${numbers[i]}`;
          if(i != numbers.length-1){
            isabaduntlabel.text += "+";
          }
          sum += numbers[i];
        }
        isabaduntlabel.text += `=${sum}`;
      }

      if (isCorrect) {
        labelOuterRect.x = 970;
        labelOuterRect.y = 390;
        createRandomNumber();
      } else {
        handleWrongAnswer();
      }
      if(dragcount >= 20){
        labelOuterRect.noDrag();
        isabaduntlabel.text = `You have reached the maximum number of attempts.\nright ans: ${20 - wrongCount}\nwrong ans: ${wrongCount}\nand pass percentage: ${Math.round(((20 - wrongCount) / 20) * 100)}%` ;
        S.update();
      }
      S.update();
    });

   

    function handleWrongAnswer() {
      wrongCount++;
      //console.log(wrongCount);
      if (wrongCount >= 10) {
        isabaduntlabel.text = wrongnumbermassage.text[lang];
        wrongCount = 0; // Reset wrong count after showing message
      } else {
        isabaduntlabel.text = iswrongnumber.text[lang];
      }

      labelOuterRect.animate({
        props: { x: 970, y: 390 },
        time: 1,
      });
    }

    const restartButton = new Button({
      label: "",
      width: 90,
      height: 90,
      backgroundColor: "#73C69E",
      rollBackgroundColor: "#73C69E",
      borderWidth: 0,
      gradient: 0.4,
      corner: 45,
    })
      .center()
      .mov(850, 460);

    const pic = new Pic("assets/image/restart.png").sca(0.15).center(restartButton);
    pic.rotation = 60;

    restartButton.on("click", () => {
      location.reload();
    });
  }
}

// Initialize the app
init();
