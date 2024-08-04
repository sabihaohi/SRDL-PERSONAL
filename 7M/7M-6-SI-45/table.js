// ZIM.js Code
import zim, { center, Rectangle, Shape, siz, Triangle } from "./zim.js";
const { Frame, Circle, Label, Pic } = zim;
// Initialize the frame
const frame = new Frame("fit", 1024, 768, "#ddd", "#333", "myCanvas");
frame.on("ready", function() {
    // Access the stage from the frame
    const stage = frame.stage;

    // Define the data for the table
    createTable();
       function createTable(){
          for(let i=0; i<4; i++){
                for(let j=0; j<4; j++){
                    let table = new Rectangle(150, 40, "transparent", "#000", 1).pos(150*i, 40*j).addTo(stage);
                    //let text = new Label(i+1 + "x" + (j+1), 30, "Arial", "#000").center(table).addTo(stage);
                }
          }
       }
        
    stage.update();
});
