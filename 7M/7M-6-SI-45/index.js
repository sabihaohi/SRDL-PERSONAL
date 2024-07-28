import zim, { drag } from "./zim.js";
const { Frame, Rectangle, Pic, Label, TextArea, Button } = zim;

new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

async function ready() {
    const response = await fetch("data.json");
    const data = await response.json();
    const { lang, headerText, chapter, chapterNoText, footerLabelText } = data;
   

    assetsLoading();

}
function assetsLoading(){
    const bg = new Pic("assets/image/bg.png").center();
    const stage = new Pic("assets/image/stage.png").center().mov(150,50);
  

}






