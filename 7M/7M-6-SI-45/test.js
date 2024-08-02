import zim from 'https://zimjs.org/cdn/016/zim';
const { Frame, Circle, Label, Pic, center, Rectangle, Shape, siz, Triangle } =
	zim;

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

		const bg = new Pic('assets/image/bg.png').center();
		const stagePic = new Pic('assets/image/stage.png').center().mov(0, 180);
		const table = new Pic('assets/image/table.png').pos(510, 220);
		const infoBox = new Pic('assets/image/info.png').pos(100, 400);

		const stageRect = new Rectangle({
			width: 800,
			height: 420,
			color: 'transparent',
		})
			.center()
			.mov(0, 185);

		// Define initial table data
		const texts = [
			['Triangle', '1st side', '2nd side', 'angle'],
			['ABC(<BAC)', '0', '0', '0'],
			['DEF(<EDF)', '0', '0', '0'],
			['side ratio', '0', '0', ''],
		];

		let labels = [];

		// Create the table
		createTable();

		function createTable() {
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 4; j++) {
					let table = new Rectangle(
						196,
						40,
						'transparent',
						'transparent',
						1
					).pos(196 * i + 566, 40 * j + 277);
					let text = new Label(
						texts[i][j],
						20,
						'Arial',
						'#000'
					).center(table);
					labels.push(text);
				}
			}
		}

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
			.drag(stageRect);
		new Label('B', 20, 'Arial', 'white').center(leftCircleB);
		const leftCircleC = new Circle(15, 'green')
			.center(stage)
			.pos(leftTrianglePointC.x - 15, leftTrianglePointC.y - 15)
			.drag(stageRect);
		new Label('C', 20, 'Arial', 'white').center(leftCircleC);

		// Create draggable circles at each vertex of the right triangle
		const rightCircleA = new Circle(15, 'blue')
			.center(stage)
			.pos(rightTrianglePointA.x - 10, rightTrianglePointA.y - 10);
		new Label('D', 20, 'Arial', 'white').center(rightCircleA);
		const rightCircleB = new Circle(15, 'red')
			.center(stage)
			.pos(rightTrianglePointB.x - 10, rightTrianglePointB.y - 10)
			.drag(stageRect);
		new Label('E', 20, 'Arial', 'white').center(rightCircleB);
		const rightCircleC = new Circle(15, 'violet')
			.center(stage)
			.pos(rightTrianglePointC.x - 15, rightTrianglePointC.y - 15)
			.drag(stageRect);
		new Label('F', 20, 'Arial', 'white').center(rightCircleC);

		// Conversion factor: pixels to centimeters
		const PIXELS_PER_CM = 37.79527559;

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

			let angle = Math.max(angleAB, angleAC) - Math.min(angleAB, angleAB);

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

			let angle2 =
				Math.max(angleDE, angleDF) - Math.min(angleDE, angleDF);

			angle = Math.round(angle);
			angle2 = Math.round(angle2);

			return { angle, angle2 };
		}

		// Function to calculate side ratios
		function calculateSideRatios(leftA, leftB, rightA, rightB) {
			const ratio1 = Number((leftA / rightA).toFixed(1));
			const ratio2 = Number((leftB / rightB).toFixed(1));
			return { ratio1, ratio2 };
		}

		const { leftABDis, leftACDis } = leftUpdateTriangle();
		const { rightABDis, rightACDis } = rightUpdateTriangle();

		// Function to update angles, side lengths, and left triangle shape
		function leftUpdateTriangle() {
			const leftABDis = distanceInCm(
				leftTrianglePointA,
				leftTrianglePointB
			);
			const leftACDis = distanceInCm(
				leftTrianglePointA,
				leftTrianglePointC
			);
			const leftBCDis = distanceInCm(
				leftTrianglePointA,
				leftTrianglePointB
			);
			const { angle } = calculateAngles();

			labels[5].text = Math.round(leftABDis) + ' cm (AB)'; // Update AB length
			labels[6].text = Math.round(leftACDis) + ' cm (AC)'; // Update AC length
			labels[7].text = `${angle}°`; // Update angle

			// Redraw left triangle
			leftTriangleShape.graphics
				.clear()
				.beginStroke('green')
				.moveTo(leftTrianglePointA.x, leftTrianglePointA.y)
				.lineTo(leftTrianglePointB.x, leftTrianglePointB.y)
				.lineTo(leftTrianglePointC.x, leftTrianglePointC.y)
				.lineTo(leftTrianglePointA.x, leftTrianglePointA.y);

			// Update the stage
			stage.update();
			return { leftABDis, leftACDis, leftBCDis };
		}

		// Function to update angles, side lengths, and right triangle shape
		function rightUpdateTriangle() {
			const rightABDis = distanceInCm(
				rightTrianglePointA,
				rightTrianglePointB
			);
			const rightACDis = distanceInCm(
				rightTrianglePointA,
				rightTrianglePointC
			);
			const c = distanceInCm(rightTrianglePointA, rightTrianglePointB);

			const { angle2 } = calculateAngles();

			labels[9].text = Math.round(rightABDis) + ' cm (DE)'; // Update DE length
			labels[10].text = Math.round(rightACDis) + ' cm (DF)'; // Update DF length
			labels[11].text = `${angle2}°`; // Update angle

			// Redraw right triangle
			rightTriangleShape.graphics
				.clear()
				.beginStroke('blue')
				.moveTo(rightTrianglePointA.x, rightTrianglePointA.y)
				.lineTo(rightTrianglePointB.x, rightTrianglePointB.y)
				.lineTo(rightTrianglePointC.x, rightTrianglePointC.y)
				.lineTo(rightTrianglePointA.x, rightTrianglePointA.y);

			// Update the stage
			stage.update();

			return { rightABDis, rightACDis, c };
		}

		// Add drag event listeners to update left triangle when any circle is moved
		leftCircleB.on('pressmove', (event) => {
			leftTrianglePointB.x = event.currentTarget.x;
			leftTrianglePointB.y = event.currentTarget.y;
			leftUpdateTriangle();
			updateRatios();
		});

		leftCircleB.on('pressup', () => {
			checkSimilar();
		});

		leftCircleC.on('pressmove', (event) => {
			leftTrianglePointC.x = event.currentTarget.x;
			leftTrianglePointC.y = event.currentTarget.y;
			leftUpdateTriangle();
			updateRatios();
		});

		leftCircleC.on('pressup', () => {
			checkSimilar();
		});

		// Add drag event listeners to update right triangle when any circle is moved
		rightCircleB.on('pressmove', (event) => {
			rightTrianglePointB.x = event.currentTarget.x;
			rightTrianglePointB.y = event.currentTarget.y;
			rightUpdateTriangle();
			updateRatios();
		});

		rightCircleB.on('pressup', () => {
			checkSimilar();
		});

		rightCircleC.on('pressmove', (event) => {
			rightTrianglePointC.x = event.currentTarget.x;
			rightTrianglePointC.y = event.currentTarget.y;
			rightUpdateTriangle();
			updateRatios();
		});

		rightCircleC.on('pressup', () => {
			checkSimilar();
		});

		// Function to update the side ratios in the table
		function updateRatios() {
			const { leftABDis, leftACDis } = leftUpdateTriangle();
			const { rightABDis, rightACDis } = rightUpdateTriangle();

			const { ratio1, ratio2 } = calculateSideRatios(
				Math.round(leftABDis),
				Math.round(leftACDis),
				Math.round(rightABDis),
				Math.round(rightACDis)
			);

			labels[13].text = `${Math.round(leftABDis)} / ${Math.round(
				rightABDis
			)} =${ratio1}`; // Update ratio for 1st side (AB/DE)
			labels[14].text = `${Math.round(leftACDis)} / ${Math.round(
				rightACDis
			)} =${ratio2} `; // Update ratio for 2nd side (AC/DF)
		}

		const resultMessage = new Label({
			text: '',
			lineHeight: 35,
			size: 25,
		}).pos(150, 500);
		stage.addChild(resultMessage);

		function checkSimilar() {
			const { angle, angle2 } = calculateAngles();

			const { leftABDis, leftACDis } = leftUpdateTriangle();
			const { rightABDis, rightACDis } = rightUpdateTriangle();

			const { ratio1, ratio2 } = calculateSideRatios(
				Math.round(leftABDis),
				Math.round(leftACDis),
				Math.round(rightABDis),
				Math.round(rightACDis)
			);
			if (angle === angle2 && ratio1 === ratio2) {
				console.log('Triangles are similar');
				resultMessage.text = similarMessage.text[lang];
				resultMessage.color = 'green';
			} else {
				console.log('Triangles are not similar');
				resultMessage.text = errorMessage.text[lang];
				resultMessage.color = 'red';
			}
		}

		labelCreation();
		function labelCreation() {
			const header_rect = new Rectangle({
				width: 1700,
				height: 100,
				color: 'transparent',
			})
				.center()
				.pos(130, 60);

			const SubHeader_rect = new Rectangle({
				width: 1500,
				height: 50,
				color: 'transparent',
			})
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
				.sca(0.6)
				.mov(0, 20);

			new Label({
				text: chapter.text[lang],
				size: 25,
				color: 'black',
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
				label: '',
				width: 90,
				height: 90,
				backgroundColor: '#967bb6',
				rollBackgroundColor: '#967bb6',
				borderWidth: 0,
				gradient: 0.4,
				corner: 45,
			})
				.center()
				.mov(830, 430);

			const pic = new Pic('assets/image/restart.png')
				.sca(0.15)
				.center(restartButton);
			pic.rotation = 60;

			restartButton.on('click', () => {
				location.reload();
			});
		}

		// Initial update of triangles
		leftUpdateTriangle();
		rightUpdateTriangle();
		updateRatios();
		checkSimilar();
	}
}

// Initialize the app
init();