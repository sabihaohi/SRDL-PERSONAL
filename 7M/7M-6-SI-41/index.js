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

    assetsLoading(itemsInfo);

}



function assetsLoading(itemsInfo) {
    console.log(itemsInfo);
    let btnBoxes = [];
    let hitTestBoxes = [];

    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").sca(.9).pos(400, 330);
    const infoBox = new Pic("assets/image/infobox.png").pos(80, 450);

    for (let i = 0; i < itemsInfo.length; i++) {
        const btnPictureRect2 = new Rectangle({ width: 200, height: 175, color: "white", borderWidth: 5 }).pos(itemsInfo[i].startingX, itemsInfo[i].startingY);
        new Pic(`assets/image/${itemsInfo[i].mainImage}`).sca(.4).center(btnPictureRect2);
        const btnPictureRect = new Rectangle({ width: 200, height: 175, color: "white", borderWidth: 5 }).pos(itemsInfo[i].startingX, itemsInfo[i].startingY).drag();
        new Pic(`assets/image/${itemsInfo[i].mainImage}`).sca(.4).center(btnPictureRect);
       
        btnBoxes.push(btnPictureRect);
    }



    const hitTestBox1 = new Rectangle({ width: 250, height: 200, color: "transparent" }).pos(155, 510);
    const hitTestBox2 = new Rectangle({ width: 250, height: 200, color: "transparent" }).pos(155, 710);
    hitTestBoxes.push(hitTestBox1, hitTestBox2);

    const pictures1 = [];
    const labels1 = [];

    const pictures2 = [];
    const labels2 = [];

    const otherLabels = [];

    let itemInsideBox1 = null;
    let itemInsideBox2 = null;

    btnBoxes.forEach((btn, index) => {

        btn.on("pressup", () => {
            if (btn.hitTestBounds(hitTestBox1)) {
                pictures1.forEach((pic) => {
                    pic.removeFrom();
                });
                labels1.forEach((label) => {
                    label.removeFrom();
                });

                const picture = new Pic(`assets/image/${itemsInfo[index].mainImage}`).centerReg(hitTestBox1).sca(.5);

                btn.x = itemsInfo[index].startingX;
                btn.y = itemsInfo[index].startingY;
             

                pictures1.push(picture);
                const label = new Label({
                    text: `আকার :${itemsInfo[index].structure} \nআকৃতি: ${itemsInfo[index].form} \nওজন: ${itemsInfo[index].weight}`,
                    size: 20,
                    color: "black",
                    lineHeight: 25,
                }).pos(700, 600);

                labels1.push(label);

                itemInsideBox1 = index;
                S.update();
            }
            else if (btn.hitTestBounds(hitTestBox2)) {
                pictures2.forEach((pic) => {
                    pic.removeFrom();
                });
                labels2.forEach((label) => {
                    label.removeFrom();
                });

                const picture = new Pic(`assets/image/${itemsInfo[index].mainImage}`).centerReg(hitTestBox2).sca(.5);

                // btn.animate({
                //     props: { x: itemsInfo[index].startingX, y: itemsInfo[index].startingY }
                // });
               btn.x = itemsInfo[index].startingX;
               btn.y = itemsInfo[index].startingY;
                pictures2.push(picture);
                const label = new Label({
                    text: `আকার :${itemsInfo[index].structure} \nআকৃতি: ${itemsInfo[index].form} \nওজন: ${itemsInfo[index].weight}`,
                    size: 20,
                    color: "black",
                    lineHeight: 25,
                }).pos(1000, 600)
                labels2.push(label);

                itemInsideBox2 = index;
                S.update();
            }
            else {
                //hitTestBoxes[index].removeFrom();
                // btn.animate({
                //     props: { x: itemsInfo[index].startingX, y: itemsInfo[index].startingY }
                // });
                btn.x = itemsInfo[index].startingX;
                btn.y = itemsInfo[index].startingY;
                S.update();
            }

            console.log(itemInsideBox1, itemInsideBox2);

            otherLabels.forEach((label) => {
                label.removeFrom();
            });

            if (itemInsideBox1 != null && itemInsideBox2 != null && itemInsideBox1 === itemInsideBox2) {

                const label = new Label({
                    text: `Same`,
                    size: 50,
                    color: "black",
                    lineHeight: 25,
                }).pos(1000, 800)
                otherLabels.push(label);
            }
            S.update();
        });
    });



}
