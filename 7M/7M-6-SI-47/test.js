import zim, { center, Rectangle, Shape, siz, Triangle } from "./zim.js";
const { Frame, Circle, Label, Pic, Button, Line } = zim; // Added Line

async function init() {
    // Load JSON data
    const response = await fetch("data.json");
    const data = await response.json();

    // Destructure the loaded data
    const { lang, headerText, chapter, chapterNoText, footerLabelText, subHeaderText, informationText, similarMessage, errorMessage } = data;

    // Create the frame after loading the JSON data
    const frame = new Frame("fit", 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

    function ready() {
        const stage = frame.stage;
        const bg = new Pic("assets/image/bg.png").center();
        const stagePic = new Pic("assets/image/stage.png").center().mov(0, 100);
        const infoBox = new Pic("assets/image/info.png").pos(100, 400);
        // const table = new Pic("assets/image/table.png").pos(510, 220);
        const statingPoint = new Line({
            length: 500,
            color: "black",
        }).pos(750, 820);
        new Label({
            text: "Starting Point",
            size: 20,
            color: "black",
        }).pos(750, 830);

        const bcLabel = new Label({
            text: "create BC line from here",
            size: 18,
            color: "black",
        }).pos(1125, 700).alp(0);

        const cdLabel = new Label({
            text: "create CD line from here",
            size: 18,
            color: "black",
        }).pos(900, 470).alp(0);

        const adLabel = new Label({
            text: "create AD line from here",
            size: 18,
            color: "black",
        }).pos(600, 670).alp(0);



        const stickbackRect = new Rectangle({
            width: 550,
            height: 50,
            color: "transparent",
        }).pos(600, 300);
        const stcikbackPic = new Pic("assets/image/stick.png").sca(0.4).center(stickbackRect);
        const stickRect = new Rectangle({
            width: 550,
            height: 50,
            color: "transparent",
        }).pos(600, 300).drag();
        const stcikPic = new Pic("assets/image/stick.png").sca(0.4).center(stickRect);
        createRect();

        function createRect() {
            const stickAB = new Rectangle({
                width: 350,
                height: 30,
                color: "transparent",
            }).pos(800, 750).alp(0);
            const stckABPic = new Pic("assets/image/stick.png").sca(0.25).center(stickAB);
            const labelA = new Label({
                text: "A",
                size: 20,
                color: "black",
            }).pos(stickAB.x-20, 758).alp(0);

            const labelB = new Label({
                text: "B",
                size: 20,
                color: "black",
            }).pos(stickAB.x+358, 755).alp(0);
         

            const stickBC = new Rectangle({
                width: 300,
                height: 30,
                color: "transparent",
            }).pos(1100, 800).rot(-90).alp(0);
            const stickBCPic = new Pic("assets/image/stick.png").sca(0.22).center(stickBC);
            const labelC = new Label({
                text: "C",
                size: 20,
                color: "black",
            }).pos(stickAB.x+358, stickBC.y-275).alp(0);

            const stickCD = new Rectangle({
                width: 350,
                height: 30,
                color: "transparent",
            }).pos(800, 520).alp(0);
            const stickCDPic = new Pic("assets/image/stick.png").sca(0.25).center(stickCD);
            const labelD = new Label({
                text: "D",
                size: 20,
                color: "black",
            }).pos(stickAB.x-30, stickCD.y+10).alp(0);
            const stickDE = new Rectangle({
                width: 300,
                height: 30,
                color: "transparent",
            }).pos(820, 800).rot(-90).alp(0);
            const stickDEPic = new Pic("assets/image/stick.png").sca(0.22).center(stickDE);

            const rope1 = new Pic("assets/image/rope1.png").sca(0.45).pos(1085, 510).alp(0);
            const rope2 = new Pic("assets/image/rope1.png").sca(0.45).pos(1088, 745).alp(0);
            const rope3 = new Pic("assets/image/rope2.png").sca(0.5).pos(795, 745).alp(0);

          
            let currentHitState = 0; 

            stickRect.on("pressup", () => {
                switch (currentHitState) {
                    case 0:
                        if (stickRect.hitTestRect(stickAB, 100)) {
                            console.log("hit AB");
                            stickAB.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                                
                            });
                            labelA.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            })

                            labelB.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            });
                            bcLabel.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            });

                            stickRect.x = 600;
                            stickRect.y = 300;
                            currentHitState++; // Move to next state
                        }
                        break;

                    case 1:
                        if (stickRect.hitTestRect(stickBC, 100)) {
                            console.log("hit BC");
                            stickBC.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            });
                            labelC.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            });
                            bcLabel.animate({
                                props: { alpha: 0 },
                                time: 1,
                                ease: "linear",
                            });
                            cdLabel.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            })
                            rope2.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            });
                            
                            
                            stickRect.x = 600;
                            stickRect.y = 300;
                            currentHitState++;
                        }
                        break;

                    case 2:
                        if (stickRect.hitTestRect(stickCD, 100)) {
                            console.log("hit CD");
                            stickCD.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            });
                            labelD.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            });
                            cdLabel.animate({
                                props: { alpha: 0 },
                                time: 1,
                                ease: "linear",
                            });
                            adLabel.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            })
                            rope1.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            });
                            
                            stickRect.x = 600;
                            stickRect.y = 300;
                            currentHitState++;
                        }
                        break;

                    case 3:
                        if (stickRect.hitTestRect(stickDE, 100)) {
                            console.log("hit DE");
                            stickDE.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            });
                            adLabel.animate({
                                props: { alpha: 0 },
                                time: 1,
                                ease: "linear",
                            });
                            rope3.animate({
                                props: { alpha: 1 },
                                time: 1,
                                ease: "linear",
                            });
                            stickRect.x = 600;
                            stickRect.y = 300;
                            currentHitState++;
                        }
                        break;
                }
            });
            resetHitSequence();
            // Example of resetting the sequence
            function resetHitSequence() {
                currentHitState = 0;
                // Optionally reset positions, alphas, etc.
                stickAB.alpha = 0;
                stickBC.alpha = 0;
                stickCD.alpha = 0;
                stickDE.alpha = 0;
                console.log("Sequence reset");
            }
        }
        labelCreation()
        function labelCreation() {
            const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
              .center()
              .pos(130, 60);
        
            
              const SubHeader_rect = new Rectangle({ width: 1500, height: 50, color: "transparent" })
              .center()
              .pos(270, 140);
        
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
                .sca(0.6).mov(0,20);
        
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
              color: black,
              bold: true,
        
            }).loc(informationText.positionX[lang], 430);
        
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
}

init();
