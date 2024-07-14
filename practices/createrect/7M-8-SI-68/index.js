import zim, { drag, sca } from "./zim.js";
const { Frame, Rectangle, Pic, Label,Circle, TextArea, Button, Line } = zim;



async function init() {
  const response = await fetch("data.json");
  const data = await response.json();



  const { lang, headerText, chapter, informationText,redText, resultText, footerLabelText,greenText,result } = data;
  //const { itemsInfo } = itemsData;
  new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");



  function ready() {
    let heading_label_X =534
   let heading_label_Y =974

    const rect =new Rectangle(700, 700, "red").center().pos(heading_label_X,heading_label_Y-700);
const button =new Button({
  label:"",
  width:20,
  height:20,
  backgroundColor:"black",
  rollBackgroundColor:"black",
  borderColor:"black",
  gradient:.3,
  corner:11
}).center().pos(heading_label_X+294,heading_label_Y-320).drag();

button.on("pressmove",()=>{
  const distanceFromGlobal =zim.dist(rect.x,rect.y+700,button.x,button.y)
  squareDraw(distanceFromGlobal/2);
})


let line_1,line_2,line_3,line_4
squareDraw(300)
function squareDraw(L){
  if(L*2<1388){
    if(line_1 || line_2 || line_3 || line_4){
      line_1.dispose()
      line_2.dispose()
      line_3.dispose()
      line_4.dispose()
    }
    
    line_1=new Line(L).center().pos(heading_label_X,heading_label_Y);
    line_2=new Line(L).center().pos(line_1.x,heading_label_Y).rot(270);
    line_3=new Line(L).center().pos(line_2.x,line_2.y-line_2.length);
    line_4=new Line(L).center().pos(line_3.x+line_3.length,line_3.y).rot(90);
    button.pos(line_4.x-10,line_4.y-10)
  }else{
    button.pos(line_4.x-10,line_4.y-10)
    return
  }
  
}

   
  
   
  }






}
init();