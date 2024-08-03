import zim from 'https://zimjs.org/cdn/016/zim';
const { Frame, Circle, Label, Pic, Rectangle, Shape, Button } = zim;

async function init() {
  // Load JSON data
  const response = await fetch('data.json');
  const data = await response.json();

  // Destructure the loaded data
  const {
    lang,
    headerText,
    chapter,
    chapterNoText,
    footerLabelText,
    subHeaderText,
    informationText,
    similarMessage,
    errorMessage,
  } = data;

  // Create the frame after loading the JSON data
  const frame = new Frame(
    'fit',
    1920,
    1080,
    '#adbed9',
    '#7d9ed1',
    ready,
    'assets/'
  );

  function ready() {
    const stage = frame.stage;

    // Call the separate functions inside ready
    createBackground(stage);
    const tableLabels = createTable(stage);
    const { resultMessage, updateRatios } = createResultMessage(stage);
    const { updateLeftTriangle, updateRightTriangle, checkSimilarity } = createTriangles(stage, tableLabels, updateRatios, resultMessage);
    createLabels(stage);

    stage.update();
  }


// Function to create the background images and stage rectangle
function createBackground(stage) {
  const bg = new Pic('assets/image/bg.png').center();
  const stagePic = new Pic('assets/image/stage.png').center().mov(0, 180);
  const table = new Pic('assets/image/table.png').pos(510, 220);
  const infoBox = new Pic('assets/image/info.png').pos(100, 400);

  const stageRect = new Rectangle({
    width: 800,
    height: 420,
    color: 'transparent',
  }).center().mov(0, 185);

  stage.addChild(bg, stagePic, table, infoBox, stageRect);

  return stageRect;
}

// Function to create the table with labels
function createTable(stage) {
  const texts = [
    ['Triangle', '1st side', '2nd side', 'angle'],
    ['ABC(<BAC)', '0', '0', '0'],
    ['DEF(<EDF)', '0', '0', '0'],
    ['side ratio', '0', '0', ''],
  ];

  let labels = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let tableCell = new Rectangle(
        196,
        40,
        'transparent',
        'transparent',
        1
      ).pos(196 * i + 566, 40 * j + 277).addTo(stage);

      let text = new Label(
        texts[i][j],
        20,
        'Arial',
        '#000'
      ).center(tableCell);

      labels.push(text);
    }
  }

  return labels;
}

// Function to create the triangles and add drag functionality
function createTriangles(stage, labels, updateRatios, resultMessage) {
  // Conversion factor: pixels to centimeters
  const PIXELS_PER_CM = 37.79527559;

  // Initial positions for the left triangle vertices
  const leftTrianglePointA = { x: 695, y: 900 };
  const leftTrianglePointB = { x: 800, y: 600 };
  const leftTrianglePointC = { x: 850, y: 900 };

  // Initial positions for the right triangle vertices
  const rightTrianglePointA = { x: 995, y: 900 };
  const rightTrianglePointB = { x: 1100, y: 600 };
  const rightTrianglePointC = { x: 1150, y: 900 };

  // Draw initial left triangle
  const leftTriangleShape = new Shape(stage).addTo(stage);
  leftTriangleShape.graphics
    .beginStroke('green')
    .moveTo(leftTrianglePointA.x, leftTrianglePointA.y)
    .lineTo(leftTrianglePointB.x, leftTrianglePointB.y)
    .lineTo(leftTrianglePointC.x, leftTrianglePointC.y)
    .lineTo(leftTrianglePointA.x, leftTrianglePointA.y);

  // Draw initial right triangle
  const rightTriangleShape = new Shape(stage).addTo(stage);
  rightTriangleShape.graphics
    .beginStroke('blue')
    .moveTo(rightTrianglePointA.x, rightTrianglePointA.y)
    .lineTo(rightTrianglePointB.x, rightTrianglePointB.y)
    .lineTo(rightTrianglePointC.x, rightTrianglePointC.y)
    .lineTo(rightTrianglePointA.x, rightTrianglePointA.y);

  // Create draggable circles at each vertex of the left triangle
  const leftCircleA = new Circle(15, 'red')
    .center(stage)
    .pos(leftTrianglePointA.x - 15, leftTrianglePointA.y - 15);
  new Label('A', 20, 'Arial', 'white').center(leftCircleA);
  const leftCircleB = new Circle(15, 'blue')
    .center(stage)
    .pos(leftTrianglePointB.x - 15, leftTrianglePointB.y - 10)
    .drag();
  new Label('B', 20, 'Arial', 'white').center(leftCircleB);
  const leftCircleC = new Circle(15, 'green')
    .center(stage)
    .pos(leftTrianglePointC.x - 15, leftTrianglePointC.y - 15)
    .drag();
  new Label('C', 20, 'Arial', 'white').center(leftCircleC);

  // Create draggable circles at each vertex of the right triangle
  const rightCircleA = new Circle(15, 'blue')
    .center(stage)
    .pos(rightTrianglePointA.x - 10, rightTrianglePointA.y - 10);
  new Label('D', 20, 'Arial', 'white').center(rightCircleA);
  const rightCircleB = new Circle(15, 'red')
    .center(stage)
    .pos(rightTrianglePointB.x - 10, rightTrianglePointB.y - 10)
    .drag();
  new Label('E', 20, 'Arial', 'white').center(rightCircleB);
  const rightCircleC = new Circle(15, 'violet')
    .center(stage)
    .pos(rightTrianglePointC.x - 15, rightTrianglePointC.y - 15)
    .drag();
  new Label('F', 20, 'Arial', 'white').center(rightCircleC);

  // Add drag event listeners to update left triangle when any circle is moved
  leftCircleB.on('pressmove', (event) => {
    leftTrianglePointB.x = event.currentTarget.x;
    leftTrianglePointB.y = event.currentTarget.y;
    updateLeftTriangle();
    updateRatios();
  });

  leftCircleB.on('pressup', () => {
    checkSimilarity();
  });

  leftCircleC.on('pressmove', (event) => {
    leftTrianglePointC.x = event.currentTarget.x;
    leftTrianglePointC.y = event.currentTarget.y;
    updateLeftTriangle();
    updateRatios();
  });

  leftCircleC.on('pressup', () => {
    checkSimilarity();
  });

  // Add drag event listeners to update right triangle when any circle is moved
  rightCircleB.on('pressmove', (event) => {
    rightTrianglePointB.x = event.currentTarget.x;
    rightTrianglePointB.y = event.currentTarget.y;
    updateRightTriangle();
    updateRatios();
  });

  rightCircleB.on('pressup', () => {
    checkSimilarity();
  });

  rightCircleC.on('pressmove', (event) => {
    rightTrianglePointC.x = event.currentTarget.x;
    rightTrianglePointC.y = event.currentTarget.y;
    updateRightTriangle();
    updateRatios();
  });

  rightCircleC.on('pressup', () => {
    checkSimilarity();
  });

  // Function to calculate distances between two points in centimeters
  function distanceInCm(p1, p2) {
    const distanceInPixels = Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
    return distanceInPixels / PIXELS_PER_CM;
  }

  // Function to calculate angles using the law of cosines
  function calculateAngles() {
    const angleAB = zim.angle(
      leftTrianglePointB.x,
      leftTrianglePointB.y,
      leftTrianglePointA.x,
      leftTrianglePointA.y
    );
    const angleAC = zim.angle(
      leftTrianglePointC.x,
      leftTrianglePointC.y,
      leftTrianglePointA.x,
      leftTrianglePointA.y
    );

    let angle = Math.max(angleAB, angleAC) - Math.min(angleAB, angleAC);

    const angleDE = zim.angle(
      rightTrianglePointB.x,
      rightTrianglePointB.y,
      rightTrianglePointA.x,
      rightTrianglePointA.y
    );
    const angleDF = zim.angle(
      rightTrianglePointC.x,
      rightTrianglePointC.y,
      rightTrianglePointA.x,
      rightTrianglePointA.y
    );

    let angle2 = Math.max(angleDE, angleDF) - Math.min(angleDE, angleDF);

    return { angle: angle.toFixed(2), angle2: angle2.toFixed(2) };
  }

  // Function to calculate side ratios and angles
  function calculateRatios() {
    const sideABC = [
      distanceInCm(leftTrianglePointA, leftTrianglePointB),
      distanceInCm(leftTrianglePointB, leftTrianglePointC),
      distanceInCm(leftTrianglePointA, leftTrianglePointC),
    ];

    const sideDEF = [
      distanceInCm(rightTrianglePointA, rightTrianglePointB),
      distanceInCm(rightTrianglePointB, rightTrianglePointC),
      distanceInCm(rightTrianglePointA, rightTrianglePointC),
    ];

    const { angle, angle2 } = calculateAngles();

    return { sideABC, sideDEF, angle, angle2 };
  }

  // Function to update the shape and table for the left triangle
  function updateLeftTriangle() {
    leftTriangleShape.graphics.clear();
    leftTriangleShape.graphics
      .beginStroke('green')
      .moveTo(leftTrianglePointA.x, leftTrianglePointA.y)
      .lineTo(leftTrianglePointB.x, leftTrianglePointB.y)
      .lineTo(leftTrianglePointC.x, leftTrianglePointC.y)
      .lineTo(leftTrianglePointA.x, leftTrianglePointA.y);

    const { sideABC, angle } = calculateRatios();

    labels[5].text = sideABC[0].toFixed(2);
    labels[6].text = sideABC[1].toFixed(2);
    labels[7].text = angle;
  }

  // Function to update the shape and table for the right triangle
  function updateRightTriangle() {
    rightTriangleShape.graphics.clear();
    rightTriangleShape.graphics
      .beginStroke('blue')
      .moveTo(rightTrianglePointA.x, rightTrianglePointA.y)
      .lineTo(rightTrianglePointB.x, rightTrianglePointB.y)
      .lineTo(rightTrianglePointC.x, rightTrianglePointC.y)
      .lineTo(rightTrianglePointA.x, rightTrianglePointA.y);

    const { sideDEF, angle2 } = calculateRatios();

    labels[9].text = sideDEF[0].toFixed(2);
    labels[10].text = sideDEF[1].toFixed(2);
    labels[11].text = angle2;
  }

  // Function to check if triangles are similar
  function checkSimilarity() {
    const { sideABC, sideDEF, angle, angle2 } = calculateRatios();

    const ratio1 = sideABC[0] / sideDEF[0];
    const ratio2 = sideABC[1] / sideDEF[1];

    labels[13].text = ratio1.toFixed(2);
    labels[14].text = ratio2.toFixed(2);

    if (Math.abs(ratio1 - ratio2) < 0.01 && Math.abs(angle - angle2) < 2) {
      resultMessage.text = similarMessage;
      resultMessage.color = 'green';
    } else {
      resultMessage.text = errorMessage;
      resultMessage.color = 'red';
    }
  }

  // Function to update ratios
  function updateRatios() {
    const { sideABC, sideDEF } = calculateRatios();

    const ratio1 = sideABC[0] / sideDEF[0];
    const ratio2 = sideABC[1] / sideDEF[1];

    labels[13].text = ratio1.toFixed(2);
    labels[14].text = ratio2.toFixed(2);
  }

  return { updateLeftTriangle, updateRightTriangle, checkSimilarity };
}

// Function to create the result message label and its updater
function createResultMessage(stage) {
  const resultMessage = new Label({
    text: '',
    size: 40,
    font: 'Arial',
    color: 'red',
    align: 'center',
  }).pos(960, 750);

  stage.addChild(resultMessage);

  return { resultMessage };
}

// Function to create the header and footer labels
function createLabels(stage) {
  // Create header labels
  const header = new Label({
    text: headerText.text[lang],
    size: 40,
    font: 'Arial',
    color: 'black',
    align: 'center',
  }).pos(960, 50);

  const subHeader = new Label({
    text: subHeaderText.text[lang],
    size: 30,
    font: 'Arial',
    color: 'black',
    align: 'center',
  }).pos(960, 100);

  // Create footer label
  const footerLabel = new Label({
    text: footerLabelText.text[lang],
    size: 20,
    font: 'Arial',
    color: 'black',
    align: 'center',
  }).pos(960, 1030);

  stage.addChild(header, subHeader, footerLabel);
}
}
init();
