import zim, { drag, sca } from "./zim.js";
const { Frame, Rectangle, Pic, Label, TextArea, Button } = zim;



async function init() {
    const response = await fetch("data.json");
    const data = await response.json();

    const items = await fetch("items.json");
    const itemsData = await items.json();

    const { lang, headerText, chapter,informationText, diameterText,radiusText, footerLabelText } = data;
    const { itemsInfo } = itemsData;
    new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");
    


    function ready() {
    
        mainFunction(itemsInfo);
        labelCreation();
    }
    function labelCreation(){
        const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
        .center()
        .pos(130, 75);

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
        }).loc(110, 110);

        new Label({
            text: informationText.text[lang],
            size: 20,
            color: black,
            bold: true,
            
          }).loc(informationText.x[lang], 380);


    }

    function mainFunction(itemsInfo) {
        console.log(itemsInfo);
        let btnBoxes = [];
        let hitTestBoxes = [];
        
        const bg = new Pic("assets/image/bg.png").center();
        const stage = new Pic("assets/image/stage.png").pos(220,180);
        const infoBox = new Pic("assets/image/infobox.png").pos(60, 330);
        const backscale = new Pic("assets/image/scale.png").pos(600, 750);
        const scaleBox = new Rectangle({ width: 500, height: 100, color: "transparent" }).pos(600, 750)
        const scale = new Pic("assets/image/scale.png").center(scaleBox).mov(-1,-6);
        const buttonBox = new Pic("assets/image/buttonbox.png").pos(1550, 300);
        
        const scaleHitCRectBangles = new Rectangle({ width: 300, height: 80, color: "transparent" }).pos(962, 585);
    
        
        for (let i = 0; i < itemsInfo.length; i++) {
            const btnPictureRect2 = new Rectangle({ width: 200, height: 175, color: "transparent"}).pos(itemsInfo[i].startingX, itemsInfo[i].startingY);
            new Pic(`assets/image/${itemsInfo[i].mainImage}`).sca(.4).center(btnPictureRect2);
            const btnPictureRect = new Rectangle({ width: 200, height: 175, color: "transparent",}).pos(itemsInfo[i].startingX, itemsInfo[i].startingY).drag();
            new Pic(`assets/image/${itemsInfo[i].mainImage}`).sca(.4).center(btnPictureRect);
        
            btnBoxes.push(btnPictureRect);
        }



        const hitTestBox1 = new Rectangle({ width: 1100, height: 450, color: "transparent" }).pos(470, 380);
        hitTestBoxes.push(hitTestBox1);

        const pictures1 = [];
        const labels1 = [];



        let movrects = [{x:5,y:-20},{x:50,y:0},{x:-15,y:-25}];


        btnBoxes.forEach((btn, index) => {

            btn.on("pressup", () => {
                if (btn.hitTestBounds(hitTestBox1)) {
                    pictures1.forEach((pic) => {
                        pic.removeFrom();
                    });
                    labels1.forEach((label) => {
                        label.removeFrom();
                    });
                
                    const picture = new Pic(`assets/image/${itemsInfo[index].mainImage}`).centerReg(hitTestBox1).mov(movrects[index].x,movrects[index].y);
                    
                    btn.x = itemsInfo[index].startingX;
                    btn.y = itemsInfo[index].startingY;

                    scaleBox.drag();

                scaleBox.on("pressup", () => {
                   if(!scaleBox.hitTestRect(scaleHitCRectBangles)){
                    scaleBox.animate({
                        props: { x: 600, y: 750 }
                    });
                   }
                    labels1.forEach((label) => {
                        label.removeFrom();
                    });
                        //console.log("hitTestBox",hitTestBox);
                        if(scaleBox.hitTestRect(scaleHitCRectBangles)){

                            scaleBox.animate({
                                props: { x: scaleHitCRectBangles.x, y: scaleHitCRectBangles.y }
                            })
                            const label = new Label({
                                text: `${diameterText.text[lang]}${itemsInfo[index].diameter} cm \n${radiusText.text[lang]} ${itemsInfo[index].diameter} / 2 cm \n\t\t\t\t\t\t\t\t\t\t\t\t ${itemsInfo[index].radius} `,
                                size: 20,
                                color: "black",
                                lineHeight: 35,
                                bold: true,
                            }).pos(140, 450);
        
                        labels1.push(label);
                        }
                });
                
                    pictures1.push(picture);
                    S.update();
                }
            
                else {
                    btn.x = itemsInfo[index].startingX;
                    btn.y = itemsInfo[index].startingY;
                    S.update();
                }
                    scaleBox.x = 600;
                    scaleBox.y = 750;
                S.update();
            });

        
        });

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