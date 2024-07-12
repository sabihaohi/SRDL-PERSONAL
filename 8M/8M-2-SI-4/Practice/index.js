import zim from "https://zimjs.org/cdn/016/zim.js";
const { Frame, Rectangle } = zim;

const frame = new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready);

function ready() {
    const rectCopies = [];

    const boundaryRect = new Rectangle(790, 490).pos(100, 100);

    const rectangle = new Rectangle(90, 90, "#ccc", "#e472c4", 10) // 
        .loc(1440, 165).drag();



    let current;
    rectangle.on("mousedown", function (e) {
        current = e.target;
        current.copy = current.clone()
            .addTo()
            .drag();

        // 4. set the current back to the top	
        current.top();

        S.update();
    });

    rectangle.on("pressup", function (e) {
        current = e.currentTarget;

        // swap positions
        swapProperties("x", current, current.copy);
        swapProperties("y", current, current.copy);

        rectCopies.push(current.copy);

        S.update();

        rectCopies.forEach((rect, index) => {
            rect.on("pressup", () => {
                console.log(index)
            });
        });
    });



}