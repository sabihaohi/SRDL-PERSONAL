
import zim from "./zim.js";

const { Stage, Slider, Button, Label, Frame, Pic, Line, Rectangle } = zim;

async function init() {
    const response = await fetch("data.json");
    const data = await response.json();

    const { lang, headerText, chapter, productText, informationText, footerText } = data;

    const frame = new Frame("fit", 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

    function ready() {
        const bg = new Pic("assets/image/bg.png").center();
        const products = [];
        const verticalGap = 20;
        let allInside = false;
        let overlapDetected = false;
        let dragcount = 0;

        const Btnpictures = ["bedBtn.png", "desk2Btn.png", "deskBtn.png", "doorBtn.png", "matsBtn.png", "seatBtn.png", "tableBtn.png", "table2Btn.png", "toolBtn.png", "seatBtn.png,"];
        const dragpicture = ["bed.png", "desk2.png", "desk.png", "door.png", "mat.png", "seat.png", "table.png", "table2.png", "tool.png"];


        let picCount = 0;

        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 2; col++) {
                const product = new Rectangle(200, 110, "transparent")
                    .pos(1450 + col * 220, 230 + row * (20 + verticalGap))
                    .drag();
                const image = new Pic(`assets/image/${Btnpictures[picCount]}`).sca(.5).center(product);
                picCount++;
                products.push(product);
                product.y += row * 100;
            }
        }
        const dropzoneRect = new Rectangle(1200, 700, "transparent").alp(0).pos(180, 210);

        const doorouterRect = new Rectangle(180, 20, "transparent").pos(1372, 720).reg(180, 0).rot(270);
        const doorPicture = new Pic("assets/image/door.png").center(doorouterRect);

        let previosX = 0;
        let previousY = 0;

        products.forEach((pos, index) => {
            pos.on("pressdown", () => {
                previosX = pos.x;
                previousY = pos.y;

            });
        });

        products.forEach((pic, index) => {
            pic.on("pressup", () => {
                if (pic.hitTestBounds(dropzoneRect)) {
                    let isHitting = false;
                    products.forEach((product, Picindex) => {

                        if (pic.hitTestBounds(product) && index !== Picindex) {
                            isHitting = true;
                            pic.animate({
                                props: { x: previosX, y: previousY },
                            })
                        }
                    });
                    if (!isHitting) {
                        dragcount++;
                        const draggedpicrect = new Rectangle(200, 200, "transparent").pos(pic.x, pic.y).drag();
                        const draggedPic = new Pic(`assets/image/${dragpicture[index]}`).sca(.8).center(draggedpicrect);
                        products.push(draggedpicrect);
                        pic.removeFrom();


                    }
                    if (dragcount === 8) {
                        doorouterRect.animate({
                            props: { rotation: 270 },
                            time: 2,
                        })
                    }


                }
            });
        });






        // // Check for collisions
        // function checkCollisions() {
        //     let currentAllInside = true;
        //     let currentOverlapDetected = false;

        //     for (let i = 0; i < products.length; i++) {
        //         const rect1 = products[i];
        //         // Check if any rectangle is not inside the drop zone
        //         if (!rect1.hitTestBounds(dropzoneRect)) {
        //             currentAllInside = false;
        //         }
        //         // Check for overlap with other rectangles
        //         for (let j = i + 1; j < products.length; j++) {
        //             const rect2 = products[j];
        //             if (rect1.hitTestBounds(rect2)) {
        //                 currentOverlapDetected = true;
        //                 break;
        //             }
        //         }
        //         if (currentOverlapDetected) {
        //             break;
        //         }
        //     }

        //     // Show alerts based on changes in state
        //     if (!allInside && currentAllInside && !currentOverlapDetected) {
        //         allInside = true;
        //         overlapDetected = false;
        //         doorouterRect.animate({
        //             props:{rotation: -90},
        //             time:2,
        //         })
        //     } else if (allInside && !currentAllInside) {
        //         allInside = false;
        //         alert("Please place all rectangles inside the drop zone.");
        //     } else if (!overlapDetected && currentOverlapDetected) {
        //         overlapDetected = true;
        //         alert("Overlap detected! Please rearrange the rectangles.");
        //     }
        // }

        // // Track number of dragged rectangles
        // products.forEach(product => {
        //     dragcount++;
        //     if(dragcount === products.length) {
        //         product.on("pressup", () => {
        //             setTimeout(checkCollisions, 1); // Slight delay to ensure position update
        //         });
        //     }


        // });

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
        .mov(800, 430);

    const pic = new Pic("assets/image/restart.png")
        .sca(0.15)
        .center(restartButton);
    pic.rotation = 60;

    restartButton.on("click", () => {
        location.reload();
    });
}

// Initialize the app
init();
