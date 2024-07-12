import zim from "./zim.js";
const { Frame, Circle, Label, Rectangle, Pic,TextArea } = zim;

async function init() {
 // Load JSON data
 const response = await fetch("data.json");
 const data = await response.json();

 // Destructure the loaded data
 const { lang,playBtnText, headerText, chapter, infoAbdunantnumber,infodeficentnumber,chapterNoText, footerLabelText, informationText ,abdundantnumber,deficentnumber} = data;

 // Create the frame after loading the JSON data
 new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

 function ready() {
  const bg = new Pic("assets/image/bg1.png").center();
  // const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
  // .center()
  // .pos(130, 40);
  // const header_label = new Label({
  //     text: headerText.text[lang],
  //     size: 40,
  //     bold: true,
  // })
  // .center(header_rect)
  // .sca(1);

  //     new Label({
  //     text:chapter.text[lang],
  //     size:40,
  //     color:black,
  //     bold:true,
  //     italic:true
  // }).loc(120,70); 

  new Label ({
    text:"INFORMATIONS",
    size:40,
    color:black,
    bold:true,
    italic:true
  }).loc(120,0);

    
  const outerCircle = new Circle(160, "transparent").center()
  console.log(outerCircle.x, outerCircle.y);
  const chaka = new Pic("assets/image/chaka.png")
    .center(outerCircle);

 

  //const backstick = new Pic("assets/image/stick.png").sca(.8).pos(1580, 555);
  const outerBackStick = new Rectangle(200, 200, "transparent").pos(1600, 580).drag();
  const dragStick = new Pic("assets/image/stick.png").sca(.8).center(outerBackStick);
  const  onestickfordragone = new Pic("assets/image/stick.png").sca(.8).rot(90).center(outerCircle).pos(130,50).alp(0);
  //two
  const onestickfordragtwo = new Pic("assets/image/stick.png").sca(.8).rot(90).center(outerCircle).pos(130,50).alp(0);
  const  onestickfordragtwo1 = new Pic("assets/image/stick.png").sca(.8).rot(270).center(outerCircle).pos(-60,30).alp(0);

  //three
  const  onestickfordrag3one = new Pic("assets/image/stick.png").sca(.8).rot(90).center(outerCircle).pos(130,50).alp(0);
  const  onestickfordrag3two = new Pic("assets/image/stick.png").sca(.8).rot(270).center(outerCircle).pos(-60,30).alp(0);
  const  onestickfordrag3three = new Pic("assets/image/stick.png").sca(.8).rot(0).center(outerCircle).pos(55,-60).alp(0);


  //four
  const onestickfordrag4one = new Pic("assets/image/stick.png").sca(.8).rot(90).center(outerCircle).pos(130,50).alp(0);
  const onestickfordrag4two = new Pic("assets/image/stick.png").sca(.8).rot(270).center(outerCircle).pos(-60,30).alp(0);
  const onestickfordrag4three = new Pic("assets/image/stick.png").sca(.8).rot(0).center(outerCircle).pos(55,-60).alp(0);
  const onestickfordrag4four = new Pic("assets/image/stick.png").sca(.8).rot(180).center(outerCircle).pos(30,130).alp(0);


  let dragCount = 0;

  function CalculteDistance(Degree,numberOfStick){
     return Degree/numberOfStick;
  }

  let sticks = [];
 

  outerBackStick.on("pressup", () => {
    dragCount++;
    console.log(dragCount);

    // if(dragCount == 1){
    //   if(outerBackStick.hitTestCircle(outerCircle,100)){
    //     console.log("hit");
    //     createstick(160,360,1);
       
    //   }
    // }
    // if(dragCount==2){
    //   if(outerBackStick.hitTestCircle(outerCircle,100)){
    //     console.log("hit2");
    //     createstick(160,180,2);
        
    //   }
    // }
    if(dragCount == 1){
      console.log("dragCount",dragCount);
      if(outerBackStick.hitTestCircle(outerCircle,100)){
        console.log("hit");
        onestickfordragone.animate({
          props: { alpha: 1 },
          time: 0.5,
        });
        outerBackStick.x=1600;
        outerBackStick.y=580;
        outerCircle.animate({
          props: { rotation: 360 },
          time: 2,
        });
  
        
      }
    }
    if(dragCount==2){
      if(outerBackStick.hitTestCircle(outerCircle,100)){
        console.log("hit2");
        onestickfordragtwo.animate({
          props: { alpha: 1 },
          time: 0.5,
          call:()=>{
            onestickfordragtwo1.animate({
              props: { alpha: 1 },
              time: 0.5,
            });
          }
        });
        outerBackStick.x=1600;
        outerBackStick.y=580;
        outerCircle.animate({
          props: { rotation: 180 },
          time: 2,
        });
        
      }
    }

    if(dragCount==3){
      if(outerBackStick.hitTestCircle(outerCircle,100)){
        console.log("hit3");
        onestickfordrag3one.animate({
          props: { alpha: 1 },
          time: 0.2,
          call:()=>{
            onestickfordrag3two.animate({
              props: { alpha: 1 },
              time: 0.2,
              call:()=>{
                onestickfordrag3three.animate({
                  props: { alpha: 1 },
                  time: 0.2,
                });
              }
            });
          }
        });
        outerBackStick.x=1600;
        outerBackStick.y=580;
        outerCircle.animate({
          props: { rotation: 120 },
          time: 2,
        });
        
      }
    }
    
    if(dragCount == 4){
      if(outerBackStick.hitTestCircle(outerCircle,100)){
        console.log("hit4");
        onestickfordrag4one.animate({
          props: { alpha: 1 },
          time: 0.5,
          call:()=>{
            onestickfordrag4two.animate({
              props: { alpha: 1 },
              time: 0.5,
              call:()=>{
                onestickfordrag4three.animate({
                  props: { alpha: 1 },
                  time: 0.5,
                  call:()=>{
                    onestickfordrag4four.animate({
                      props: { alpha: 1 },
                      time: 0.5,
                    });
                  }
                });
              }
            });
          }
        });
        outerBackStick.x=1600;
        outerBackStick.y=580;
        outerCircle.animate({
          props: { rotation: 90 },
          time: 2,
        });
        
      }
    }
  });

  function createstick(r, numberofcreatepoint) {
    const angleIncrement = 360 / numberofcreatepoint; // Calculate angle increment for even distribution
    for (let i = 0; i <= numberofcreatepoint; i++) {
        const angle = angleIncrement/numberofcreatepoint; 
        const x = r * Math.cos(angle * Math.PI / 180); 
        const y = r * Math.sin(angle * Math.PI / 180); 
        const createStick = new Rectangle(50,5, "black").center(outerCircle.x, outerCircle.y).rot(angleIncrement); 
        createStick.pos(x, y); 
    }
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

  const pic = new Pic("assets/image/restart.png")
    .sca(0.15)
    .center(restartButton);
  pic.rotation = 60;

  restartButton.on("click", () => {
    location.reload();
  });

}
          
          

}

// Initialize the app
init();