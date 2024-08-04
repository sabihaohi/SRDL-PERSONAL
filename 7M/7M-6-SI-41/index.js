import zim, { drag } from "./zim.js";
const { Frame, Rectangle, Pic, Label, TextArea, Button } = zim;

new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

async function ready() {
    const response = await fetch("data.json");
    const data = await response.json();

    const items = await fetch("items.json");
    const itemsData = await items.json();

    const { lang, headerText, chapter,subHeaderText,informationText, chapterNoText,structure,shape,weight,result,opinionSameText,opinionDifferentText  } = data;
    const { itemsInfo } = itemsData;

    mainFunction(itemsInfo);
    labelCreation();






function mainFunction(itemsInfo) {
    console.log(itemsInfo);
    let btnBoxes = [];
    let hitTestBoxes = [];

    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").sca(.9).pos(400, 330);
    const infoBox = new Pic("assets/image/infobox.png").pos(80, 450);
   // const tableImage  = new Pic("assets/image/table.png").pos(750, 550);
   let labels = [];

    const texts = [
      [`${structure.text[lang]}`, '', '',],
      [`${shape.text[lang]}`, '', '', ],
      [`${weight.text[lang]}`, '', '',],
      [`${result.text[lang]}`, '', '', ],
    ];
    
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        let tableCell = new Rectangle(
          165,
          110,
          'transparent',
          'black',
          1
        ).pos(165 * i + 746, 110 * j + 577);
  
        let text = new Label(
          texts[i][j],
          20,
          'Arial',
          '#000'
        ).center(tableCell).mov(-20,0);
  
        labels.push(text);
       
      }
    }
    labels[10].mov(-40,-30);
   // console.log(labels);
  

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
                console.log(labels);
               

                labels[1].text = `${itemsInfo[index].structure}`;
                labels[4].text = `${itemsInfo[index].form}`;
                labels[7].text = `${itemsInfo[index].weight}`;





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
                // const label = new Label({
                //     text: `আকার :${itemsInfo[index].structure} \nআকৃতি: ${itemsInfo[index].form} \nওজন: ${itemsInfo[index].weight}`,
                //     size: 20,
                //     color: "black",
                //     lineHeight: 25,
                // }).pos(1000, 600)
                // labels2.push(label);

                labels[2].text = `${itemsInfo[index].structure}`;
                labels[5].text = `${itemsInfo[index].form}`;
                labels[8].text = `${itemsInfo[index].weight}`;

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
              labels[10].text = `${opinionSameText.text[lang]}`;
              //labels[10].mov(-40,-30)
              labels[10].size = 18;
            labels[10].color = "green";
            labels[10].lineHeight = 25;
               
            }
            else if(itemInsideBox1 != null && itemInsideBox2 != null && itemInsideBox1 !== itemInsideBox2){
                labels[10].text = `${opinionDifferentText.text[lang]}`;
                //labels[10].mov(-40,-30)
              labels[10].size = 18;
              labels[10].color = "red";
            labels[10].lineHeight = 30;
            }

           
            S.update();
        });
    });



}


		function labelCreation() {
			const header_rect = new Rectangle({
				width: 1700,
				height: 100,
				color: 'transparent',
			})
				.center()
				.pos(130, 100);

			const SubHeader_rect = new Rectangle({
				width: 1500,
				height: 50,
				color: 'transparent',
			})
				.center()
				.pos(270, 175);

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
				.sca(0.6)
				.mov(140, 25);

			new Label({
				text: chapter.text[lang],
				size: 25,
				color: 'black',
				bold: true,
				italic: true,
			}).loc(140, 130);

			new Label({
				text: informationText.text[lang],
				size: 20,
				color: black,
				bold: true,
			}).loc(informationText.positionX[lang], 490);

			const restartButton = new Button({
				label: '',
				width: 90,
				height: 90,
				backgroundColor: '#967bb6',
				rollBackgroundColor: '#967bb6',
				borderWidth: 0,
				gradient: 0.4,
				corner: 45,
			})
				.center()
				.mov(830, 430);

			const pic = new Pic('assets/image/restart.png')
				.sca(0.15)
				.center(restartButton);
			pic.rotation = 60;

			restartButton.on('click', () => {
				location.reload();
			});
		}

}