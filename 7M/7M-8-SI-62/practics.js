import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Pic } = zim;

async function init() {
  // Load JSON data
  const response = await fetch("data.json");
  const data = await response.json();

  // Destructure the loaded data
  const {
    lang,
    centerText,
    radiusText,
    headerText,
    chapter,
    chapterNoText,
    footerLabelText,
    informationText,
  } = data;

  // Create the frame after loading the JSON data
  const frame = new Frame(FIT, 2020, 1080, "#adbed9", "#7d9ed1", ready, "assets/");

  function ready() {
    // Background and stage image
    const bg = new Pic("assets/image/bg.png").center();
    const stagePic = new Pic("assets/image/stage.png").center().mov(0, 100);

    // Create and add the rhombus shape
    const rhombus = createRhombus(200, 100); // Adjust width and height as needed
    
    // Center the rhombus manually
    rhombus.x = frame.stage.canvas.width / 2;
    rhombus.y = frame.stage.canvas.height / 2;

    // Add the rhombus to the stage
    frame.stage.addChild(rhombus);
    
    // Update the stage to render the shape
    frame.stage.update();
  }
}

// Function to create a parallelogram rhombus shape
function createRhombus(width, height) {
  // Create a new graphics object
  const graphics = new createjs.Graphics();
  graphics.beginFill("#FF0000"); // Red color
  graphics.moveTo(-width / 2, 0); // Starting point (left middle)
  graphics.lineTo(0, -height / 2); // Top middle
  graphics.lineTo(width / 2, 0); // Right middle
  graphics.lineTo(0, height / 2); // Bottom middle
  graphics.closePath(); // Complete the shape
  graphics.endFill();

  // Create a new shape with the graphics object
  const rhombus = new createjs.Shape(graphics);
  return rhombus;
}

// Initialize the app
init();
