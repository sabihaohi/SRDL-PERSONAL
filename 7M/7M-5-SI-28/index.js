import zim from "./zim.js";
const { Frame, Rectangle, Pic, Label, TextArea, Button } = zim;

new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

async function ready() {
    const response = await fetch("data.json");
    const data = await response.json();

    const items = await fetch("items.json");
    const itemsData = await items.json();

    const { lang, headerText, chapter, chapterNoText, footerLabelText } = data;

    const { itemsInfo } = itemsData;
    // console.log(itemsInfo);

    const bg = new Pic("assets/image/bg.png").center();
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
        size: 25,
        color: "black",
        bold: true,
        italic: true,
        lineHeight: 33,
    }).loc(110, 70);


    const dropZone = new Rectangle(1190, 675, "transparent").pos(180, 230);
    const boundaries = createBoundaries();
    const btnItems = createDraggableButtons(itemsInfo);
    const insideItems = createInsideItems(itemsInfo);
    const itemsPlaced = [];

    for (let i = 0; i < itemsInfo.length; i++) {
        itemsPlaced.push(false);
    }

    const doorRect = new Rectangle(180, 20, "transparent").pos(1372, 720).reg(180, 0).rot(270);
    new Pic("assets/image/door.png").center(doorRect);

    for (let i = 0; i < btnItems.length; i++) {
        btnItems[i].on("pressup", () => {
            if (btnItems[i].hitTestBounds(dropZone) && !isHittingBoundaries(btnItems[i], boundaries)) {
                handleBtnDrag(btnItems[i], i, btnItems, insideItems, boundaries, itemsInfo, itemsPlaced, doorRect);
            }
            else {
                insideItems[i].removeFrom();
                btnItems[i].animate({
                    props: { x: itemsInfo[i].btnStartingX, y: itemsInfo[i].btnStartingY }
                });
            }
        });
    }

    for (let i = 0; i < insideItems.length; i++) {
        insideItems[i].on("pressup", () => {
            if (insideItems[i].hitTestBounds(dropZone)) {
                handleInsideDrag(insideItems[i], i, btnItems, insideItems, boundaries, itemsInfo, itemsPlaced, doorRect);
            }
        });
    }

    for (let i = 0; i < btnItems.length; i++) {
        btnItems[i].on("pressmove", () => {
            insideItems[i].pos(btnItems[i].x - 13, btnItems[i].y - 13);
            S.update();
        });
    }
}


function createBoundaries() {
    const boundary1 = new Rectangle(25, 725, "transparent").pos(1370, 203);
    const boundary2 = new Rectangle(25, 725, "transparent").pos(155, 203);
    const boundary3 = new Rectangle(1230, 25, "transparent").pos(155, 203);
    const boundary4 = new Rectangle(1230, 25, "transparent").pos(155, 900);

    const boundaries = [boundary1, boundary2, boundary3, boundary4];
    return boundaries;
}


function createDraggableButtons(itemsInfo) {
    const btnItems = [];

    for (let i = 0; i < itemsInfo.length; i++) {
        const btnItem = new Rectangle(itemsInfo[i].btnWidth, itemsInfo[i].btnHeight, "transparent").pos(itemsInfo[i].btnStartingX, itemsInfo[i].btnStartingY).sca(0.9).drag();

        new Pic(`assets/image/${itemsInfo[i].btnImage}`).center(btnItem);
        btnItems.push(btnItem);
    }
    return btnItems;
}



function createInsideItems(itemsInfo) {

    const insideItems = [];

    for (let i = 0; i < itemsInfo.length; i++) {
        const mainItem = new Rectangle(itemsInfo[i].mainWidth, itemsInfo[i].mainHeight, "transparent").sca(itemsInfo[i].scale).drag();
        new Pic(`assets/image/${itemsInfo[i].mainImage}`).center(mainItem).mov(itemsInfo[i].moveX, itemsInfo[i].moveY);
        insideItems.push(mainItem);
    }

    return insideItems;
}

function isHittingBoundaries(item, boundaries) {

    let isHitting = false;
    boundaries.forEach((boundary) => {
        if (item.hitTestRect(boundary, 100)) {
            isHitting = true;
        }
    });
    return isHitting;
}

function handleBtnDrag(item, index, btnItems, insideItems, boundaries, itemsInfo, itemsPlaced, doorRect) {

    insideItems[index].pos(item.x - 13, item.y - 13);
    item.alp(0);
    S.update();

    let isHittingBoundary = isHittingBoundaries(insideItems[index], boundaries);
    let isHittingOtherObjects = false;

    for (let i = 0; i < insideItems.length; i++) {
        if (i !== index && insideItems[index].hitTestRect(insideItems[i], 100)) {
            isHittingOtherObjects = true;
            break;
        }
    }

    if (isHittingBoundary || isHittingOtherObjects) {
        insideItems[index].removeFrom();
        item.alp(1)
        item.animate({
            props: { x: itemsInfo[index].btnStartingX, y: itemsInfo[index].btnStartingY }
        });
        S.update();
        itemsPlaced[index] = false;
    }
    else {
        console.log("Not Hitting");
        itemsPlaced[index] = true;
    }

    handleDoor(doorRect, insideItems, itemsPlaced);

}

function handleInsideDrag(item, index, btnItems, insideItems, boundaries, itemsInfo, itemsPlaced, doorRect) {

    let isHittingBoundary = isHittingBoundaries(item, boundaries);

    let isHittingOtherObjects = false;

    for (let i = 0; i < insideItems.length; i++) {
        if (i !== index && insideItems[index].hitTestRect(insideItems[i], 100)) {
            isHittingOtherObjects = true;
            break;
        }
    }

    if (isHittingBoundary || isHittingOtherObjects) {
        itemsPlaced[index] = false;
    }
    else {
        console.log("Not Hitting");
        itemsPlaced[index] = true;
    }

    handleDoor(doorRect, insideItems, itemsPlaced);

}

function handleDoor(doorRect, insideItems, itemsPlaced) {
    let correctlyPlacedCount = 0;
    for (let i = 0; i < insideItems.length; i++) {
        if (itemsPlaced[i] == false) {
            continue;
        }

        let isHitting = false;
        for (let j = 0; j < insideItems.length; j++) {

            if (i !== j && insideItems[i].hitTestRect(insideItems[j])) {
                isHitting = true;
                break;
            }
        }
        if (!isHitting) {
            correctlyPlacedCount++;
        }
    }
    console.log(correctlyPlacedCount);


    if (correctlyPlacedCount == insideItems.length) {
        doorRect.animate({
            rotation: 360
        });

        timeout(1, () => {
            let isHitting = false;
            for (let i = 0; i < insideItems.length; i++) {

                if (doorRect.hitTestRect(insideItems[i], 100)) {
                    isHitting = true;
                    break;
                }
            }
            if (isHitting) {
                doorRect.animate({
                    rotation: 270
                });
            }
        });
    }
    else {
        doorRect.animate({
            rotation: 270
        });
    }
}
