import zim, { drag } from "./zim.js";
const { Frame, Rectangle, Pic, Label, TextArea, Button } = zim;

new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

async function ready() {
    const response = await fetch("data.json");
    const data = await response.json();

    const items = await fetch("items.json");
    const itemsData = await items.json();

    const { lang, headerText, chapter, chapterNoText, footerLabelText } = data;
    const { itemsInfo } = itemsData;

    mainFunction(itemsInfo);

}



function mainFunction(itemsInfo) {
    console.log(itemsInfo);
    let btnBoxes = [];
    let hitTestBoxes = [];
    
    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").pos(250,250);
    const infoBox = new Pic("assets/image/infobox.png").pos(80, 450);
    const backscale = new Pic("assets/image/scale.png").sca(.7).pos(580, 780);
    const scaleBox = new Rectangle({ width: 500, height: 100, color: "transparent" }).pos(600, 800).drag();;
    const scale = new Pic("assets/image/scale.png").sca(.7).center(scaleBox).mov(95,0);
    
    const scaleHitCRectBangles = new Rectangle({ width: 300, height: 80, color: "transparent" }).pos(962, 585);
   
    
    for (let i = 0; i < itemsInfo.length; i++) {
        const btnPictureRect2 = new Rectangle({ width: 200, height: 175, color: "white", borderWidth: 5 }).pos(itemsInfo[i].startingX, itemsInfo[i].startingY);
        new Pic(`assets/image/${itemsInfo[i].mainImage}`).sca(.4).center(btnPictureRect2);
        const btnPictureRect = new Rectangle({ width: 200, height: 175, color: "white", borderWidth: 5 }).pos(itemsInfo[i].startingX, itemsInfo[i].startingY).drag();
        new Pic(`assets/image/${itemsInfo[i].mainImage}`).sca(.4).center(btnPictureRect);
       
        btnBoxes.push(btnPictureRect);
    }



    const hitTestBox1 = new Rectangle({ width: 1100, height: 450, color: "transparent" }).pos(470, 380);
    //const hitTestBox2 = new Rectangle({ width: 250, height: 200, color: "red" }).pos(155, 710);
    hitTestBoxes.push(hitTestBox1);

    const pictures1 = [];
    const labels1 = [];

    const pictures2 = [];
    const labels2 = [];

    const otherLabels = [];

    let itemInsideBox1 = null;
    let itemInsideBox2 = null;


    let movrects = [{x:0,y:0},{x:50,y:0},{x:-15,y:-15}];

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

               scaleBox.on("pressup", () => {
                labels1.forEach((label) => {
                    label.removeFrom();
                });
                    //console.log("hitTestBox",hitTestBox);
                    if(scaleBox.hitTestRect(scaleHitCRectBangles)){

                        scaleBox.animate({
                            props: { x: scaleHitCRectBangles.x, y: scaleHitCRectBangles.y }
                        })
                          const label = new Label({
                            text: `ব্যাস :${itemsInfo[index].diameter} \nব্যাসার্ধ: ${itemsInfo[index].diameter} /2 \n\t\t\t\t\t ${itemsInfo[index].radius} `,
                            size: 20,
                            color: "black",
                            lineHeight: 25,
                        }).pos(200, 600);
    
                    labels1.push(label);
                    }
               });
             

                pictures1.push(picture);
              

                itemInsideBox1 = index;
                S.update();
            }
         
            else {
                btn.x = itemsInfo[index].startingX;
                btn.y = itemsInfo[index].startingY;
                S.update();
            }


              
                 scaleBox.x = 600;
                 scaleBox.y = 800;
         
      
            S.update();
        });

       
    });



}
