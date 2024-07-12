import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Circle, Button, Label, Rectangle, GlowEffect, Pic,Ticker,Grid } = zim;

const canvasWidth = 1920;
const canvasHeight = 1080;


new Frame(
    zim.FIT,
    canvasWidth,
    canvasHeight,
    "white",
    "#333",
    ready,
    "assets/",
    new zim.Waiter()
);

function ready() {
    const bg = new Pic("assets/images/bg1.png").center();
    const header_rect = new Rectangle({width:W, height:120, color:"#ff7878"}).center().pos(0,0);
    const header_label = new Label (
      {
         text:"যে কোনো দুটি বিন্দুর মধ্যবিন্দু নির্ণয়",
         size:40,
      }
    ).center(header_rect).sca(1);

   const gridParent = new Rectangle(1100, 700,"#A7C7E7").pos(700,200);

   const grid = new zim.Grid(
    gridParent, 
    4, 
    3, 
    10, 
    10, 
    true, 
    true, 
    "center", 
    "middle"
);

    //const line = new zim.Line(0, 0, 1920, 1080, "black", 2);
    const point1 = new Circle(8, "blue").loc(1050, 760).drag();
    const point2 = new Circle(8, "red").loc(1400, 360).drag();


    const dataPannel = new Rectangle(400, 700,"#A7C7E7").pos(200,200);

        const labela = new Label({
            text:"",
            size:20,
            font:"courier",
            color:black,
            rollColor:red,
            bold:true,
            italic:true
        }).pos(250,300);

        const labelb = new Label({
            text:"",
            size:20,
            font:"courier",
            color:black,
            rollColor:red,
            bold:true,
            italic:true
        }).pos(250,400);

        const labelcenter = new Label({
            text:"",
            size:20,
            font:"courier",
            color:black,
            rollColor:red,
            bold:true,
            italic:true
        }).pos(250,500);
        


    const lines = [];
    let centerX;
    let centerY;
    function drawLines(){
        lines.forEach(line => {
            line.removeFrom();
        });

        const distance = zim.dist(point1.x, point1.y, point2.x, point2.y);
        const angle = zim.angle(point1.x, point1.y, point2.x, point2.y);
        const line = new Rectangle(distance, 2).pos(point1.x, point1.y).rot(angle);
        lines.push(line);

        centerX = (point1.x + point2.x) / 2;
        centerY = (point1.y + point2.y) / 2;

        labela.text = `a = (${Math.floor(point1.x)}, ${point1.y})`;
        labelb.text = `b = (${point2.x}, ${point2.y})`;
        labelcenter.text = `Center = (${centerX}, ${centerY})`;

    }
    drawLines();

    point1.on("pressmove", drawLines);
    point2.on("pressmove", drawLines);



   
}

