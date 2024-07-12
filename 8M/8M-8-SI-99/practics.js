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

    
  const outerCircle = new Circle(160, "red").center()
  console.log(outerCircle.x, outerCircle.y);
  const chaka = new Pic("assets/image/chaka.png")
    .center(outerCircle);

const stickouterrect = new Rectangle(65, 130, "transparent").pos(1660, 605).drag();
const stick = new Pic("assets/image/stick.png").sca(.8).center(stickouterrect).mov(12,15);



let dragCount = 0;
let sticks = [];

// const stickouterrect = new Rectangle(65, 130, "transparent").reg(33,150).rot(180);
// const stick = new Pic("assets/image/stick.png").sca(.8).center(stickouterrect).mov(12,15);
// //stickouterrect.addTo(outerCircle);
 


stickouterrect.on("pressup", () => {
    if(stickouterrect.hitTestCircle(outerCircle,100)){
        console.log("hit");
        if(dragCount>=9){
            return;
        }
       sticks.forEach(stick => stick.removeFrom());
       dragCount++;

       for(let i = 0; i < dragCount; i++){
          const stickouterrect = new Rectangle(65, 130, "transparent").reg(33,150).alp(1);
          const stick = new Pic("assets/image/stick.png").sca(.8).center(stickouterrect).mov(12,15);

          stickouterrect.rotation = 360/dragCount*i ;
          sticks.push(stickouterrect);

          stickouterrect.addTo(outerCircle);
        
       }
       outerCircle.rotation = 0;
         outerCircle.animate({
                props: { rotation: 360/dragCount },
                time: 2,
               
          })
        stickouterrect.x = 1660;
        stickouterrect.y = 605;

        S.update()

        let time =0;
        // sticks.forEach(stick => {
        //     timeout(time,()=>{
        //         stick.animate({
        //             props: { alpha: 1 },
        //             time: .5,
        //             call: () => {
        //                 S.update();
        //             }
        //         })
        //     })
        //     time+=0.5;
        // });
    }



    
   
  });

  

 




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