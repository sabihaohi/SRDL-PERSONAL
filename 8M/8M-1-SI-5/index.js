import zim, { sca } from "./zim.js";
const { Frame, Rectangle, Pic, Label, TextArea, Button } = zim;

async function init() {
  // Load JSON data
  const response = await fetch("data.json");
  const data = await response.json();

  const picResponse = await fetch("fibonacci.json");
  const picData = await picResponse.json();

  // console.log(picData.items[0].imageLink);



  // Destructure the loaded data
  const {
    lang,
    headerText,
    chapter,
    flowername,
    iscorrectnumber,
    iswrongnumber,
    informationText,
    fibonaccitnumber,
    deficentnumber,
    leafnumberlabel
  } = data;

  // Create the frame after loading the JSON data
  new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");


  function ready() {

    asstesLoading();
    labelCreation();
    generateRandomPicture();
    //handleDrag();
  }

  function asstesLoading() {
    const bg = new Pic("assets/image/bg.png").center();
    const picturebox = new Pic("assets/image/picturebox.png").pos(40, 400);
    const restartButton = new Button({
      label: "",
      width: 90,
      height: 90,
      backgroundColor: "#96bfe7",
      rollBackgroundColor: "#96bfe7",
      borderWidth: 0,
      gradient: 0.4,
      corner: 45,
    })
      .center()
      .mov(880, 460);

    const pic = new Pic("assets/image/restart.png")
      .sca(0.15)
      .center(restartButton);
    pic.rotation = 60;

    restartButton.on("click", () => {
      location.reload();
    });


  }

  function labelCreation() {
    const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
      .center()
      .pos(130, 55);
    const header_label = new Label({
      text: headerText.text[lang],
      size: 40,
      bold: true,
    })
      .center(header_rect)
      .sca(1);

    new Label({
      text: chapter.text[lang],
      size: chapter.size[lang],
      color: black,
      bold: true,
      italic: true
    }).loc(130, 80);

    new Label({
      text: informationText.text[lang],
      size: 20,
      color: black,
      bold: true,
      italic: true
    }).loc(150, 445);

    new Label({
      text: fibonaccitnumber.text[lang],
      size: 25,
      color: "black",
      bold: true,
      italic: true,
    }).loc(650, 755);
    new Label({
      text: deficentnumber.text[lang],
      size: 25,
      color: "black",
      bold: true,
      italic: true,
    }).loc(1235, 755);


  }

  let currentIndex = null;
  let indexArray = [];
  let imageBackgroundRect;
  let pictureCount = 0;
  function generateRandomPicture() {
    //console.log(picData.items[pictureCount].imageLink);
    const picouterrect = new Rectangle({ width: 150, height: 100, color: "transparent" }).pos(145, 540).drag();
    const pic = new Pic(`${picData.items[pictureCount].imageLink}`).sca(.3).center(picouterrect);

    if (pictureCount >= picData.length) {
      pictureCount = 0;
    }



    const fibonacciRect = new Rectangle({ width: 450, height: 150, color: "transparent" }).pos(540, 815);
    const notfibonaccirect = new Rectangle({ width: 450, height: 150, color: "transparent" }).pos(1135, 815);
    const displayrect = new Rectangle({ width: 650, height: 400, color: "transparent" }).pos(615, 300)

    const finalPicouterRect = new Rectangle({ width: 200, height: 150, color: "transparent" }).pos(670, 420).drag();
    const resultLabel = new Label({
      text: "",
      size: 20,
      color: "black",
      bold: true,
      lineHeight: 35,
    }).center(displayrect).mov(-20, -40);

    const allPicdata = [];
    picData.items.forEach((item) => {
      allPicdata.push(item);
    });


    picouterrect.on("pressup", () => {
      let previousimg1;
      if (picouterrect.hitTestBounds(fibonacciRect) && picData.items[pictureCount].isFibonacci) {


        resultLabel.text = "";

        previousimg1 = new Pic(`${picData.items[pictureCount].imageLink}`).center(finalPicouterRect).sca(.4).mov(200, 120);

        resultLabel.text = iscorrectnumber.text[lang] + `\n${flowername.text[lang]} ` + `${allPicdata[pictureCount].name[lang]}` + `\n${leafnumberlabel.text[lang]}` + `${allPicdata[pictureCount].leafNumber}`;
        // picouterrect.animate({
        //   props: { x: 670, y: 425,scale:1.3 },
        //   time: 1,


        // });
        picouterrect.x = 145;
        picouterrect.y = 540;
        pictureCount++;
        const previousimg = new Pic(`${picData.items[pictureCount].imageLink}`).sca(.3).center(picouterrect);


        S.update();

      }
      else if (picouterrect.hitTestBounds(fibonacciRect) && !picData.items[pictureCount].isFibonacci) {
        picouterrect.animate({
          props: { x: 145, y: 540 },
          time: 1,
        });
        previousimg1.dispose();
        resultLabel.text = iswrongnumber.text[lang]
        S.update();
      }

      else if (picouterrect.hitTestBounds(notfibonaccirect) && picData.items[pictureCount].isFibonacci) {
        picouterrect.animate({
          props: { x: 145, y: 540 },
          time: 1,
        });
        resultLabel.text = ""
        resultLabel.text = iswrongnumber.text[lang];
        S.update();
      }

      else if (picouterrect.hitTestBounds(notfibonaccirect) && !picData.items[pictureCount].isFibonacci) {
        pictureCount++;
        // picouterrect.animate({
        //   props: { x: 670, y: 425,scale:1.3 },
        //   time: 1,


        // });
        picouterrect.x = 670;
        picouterrect.y = 425;
        resultLabel.text = ""
        resultLabel.text = iscorrectnumber.text[lang] + `\n${flowername.text[lang]} ` + `${allPicdata[pictureCount].name[lang]}` + `\n${leafnumberlabel.text[lang]}` + `${allPicdata[pictureCount].leafNumber}`;
        //pictureCount++;
        S.update();
      }

      S.update();
    });


  }


}


// Initialize the app
init();

