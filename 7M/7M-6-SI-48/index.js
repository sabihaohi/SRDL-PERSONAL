import zim, { center, Rectangle, Shape, siz, Triangle } from "./zim.js";
const { Frame, Circle, Label, Pic, Button } = zim;

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
        length:400,
        color:"black",
        thickness:2,
       }).pos(750,800);

       const stickbackRect = new Rectangle({
        width: 550,
        height: 50,
        color: "transparent",
      }).pos(600,300);
      const stcikbackPic = new Pic("assets/image/stick.png").sca(.4).center(stickbackRect);
       const stickRect = new Rectangle({
            width: 550,
            height: 50,
            color: "transparent",
       }).pos(600,300).drag();
       const stcikPic = new Pic("assets/image/stick.png").sca(.4).center(stickRect);
       createRect();
       function createRect(){
        const stickAB = new Rectangle({
            width: 350,
            height: 30,
            color: "transparent",
        }).pos(800,750).alp(0);
        const stckABPic = new Pic("assets/image/stick.png").sca(.25).center(stickAB); 
        

        const stickBC = new Rectangle({
            width: 300,
            height: 30,
            color: "transparent",
        }).pos(1100,800).rot(-90).alp(0);
        const stickBCPic = new Pic("assets/image/stick.png").sca(.22).center(stickBC);

        const stickCD = new Rectangle({
            width: 350,
            height: 30,
            color: "red",
        }).pos(800,520).alp(1);
        const stickCDPic = new Pic("assets/image/stick.png").sca(.25).center(stickCD);

        const stickDE = new Rectangle({
            width: 300,
            height: 30,
            color: "transparent",
        }).pos(820,800).rot(-90).alp(0);
        const stickDEPic = new Pic("assets/image/stick.png").sca(.22).center(stickDE);
        
        const rope1 = new Pic("assets/image/rope1.png").sca(.45).pos(1085,510).alp(0);
        const rope2 = new Pic("assets/image/rope1.png").sca(.45).pos(1088,745).alp(0);
        const rope3 = new Pic("assets/image/rope2.png").sca(.5).pos(795,745).alp(0);
        stickRect.on("pressup",()=>{
            if(stickRect.hitTestRect(stickAB,100)){
                console.log("hit"); 
              stickAB.animate({
                props:{alpha:1},
                time:1,
                ease:"linear",
                
              })
              stickRect.x = 600;
              stickRect.y = 300;

            }
            if(stickRect.hitTestRect(stickBC,100)){
                stickBC.animate({
                    props:{alpha:1},
                    time:1,
                    ease:"linear",
                  })
                  stickRect.x = 600;
                  stickRect.y = 300;
            }
            if(stickRect.hitTestRect(stickCD,100)){
                console.log("hit2");
                stickCD.animate({
                    props:{alpha:1},
                    time:1,
                    ease:"linear",
                    
                  })
                  stickRect.x = 600;
                  stickRect.y = 300;
            }
            if(stickRect.hitTestRect(stickDE,100)){
                stickDE.animate({
                    props:{alpha:1},
                    time:1,
                    ease:"linear",
                    
                  })
                  stickRect.x = 600;
                  stickRect.y = 300;
            }


        })

        
       }
    }
}

init();
