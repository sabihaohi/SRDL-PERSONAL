import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Rectangle, Label, Slider, Button, Pic } = zim;



async function init() {

 // Load JSON data
 const response = await fetch("data.json");
 const data = await response.json();

 // Destructure the loaded data
 const { lang, headerText, chapter, chapterNoText, footerLabelText, informationText } = data;

 // Create the frame after loading the JSON data
 new Frame(FIT, 2020, 1080, "#adbed9", "#7d9ed1", ready, "assets/");



 function ready() {

  asstesLoading();
  labelsCreation();
  const [problems,solutions] = generateProblems();
  const steps = problemLabesCreation(problems);
  const inputPositions = 
  [{x:1025,y:370},{x:1305,y:505},{x:700,y:505},{x:880,y:655},{x:918,y:755},{x:990,y:905}];
  const inputBox = inputBoxCreation(steps,inputPositions);

  
  for(let i = 0; i<6; i++){
    steps[i].alpha =0;
    // inputBox[i].alpha = 1;
    inputBox[i].removeFrom();
  }

  let level = 0;
  steps[level].alpha = 1;
  inputBox[level].pos(inputPositions[level].x,inputPositions[level].y);

  const door1 = new Pic("assets/image/door.png").sca(.2).center().mov(425,308);
  const door2 = new Pic("assets/image/door1.png").sca(.2).center().mov(374,308);

  inputBox.forEach((input, index) => {
    input.on("input", ()=>{
      if(parseFloat(input.text) == solutions[index]){
        inputBox[level].readOnly = true;
        level++;
       if(level<6){
        steps[level].alpha = 1;
        inputBox[level].pos(inputPositions[level].x,inputPositions[level].y);
        //S.update();
       }
        
      
        let scale =1;
        if(level === 6){
          console.log("completed");
          door1.animate({
            props:{scaleX:scale},
            time:2,
            call:()=>{
              scale-=.1;
            }
          })
      }

      S.update();
    }
      
    });


   });

 }


 function inputBoxCreation(steps,inputPositions){
 
    const inputBoxs = [];
  for (let i = 0; i < 6; i++) {
    const inputBox = new TextArea({
      width: 80,
      height: 50,
      borderWidth: 2,
      corner: 10,
      fontSize: 30,
      align: "center",
      backgroundColor: "transparent",
      borderColor: "transparent",
    })
    inputBoxs.push(inputBox);
    
    }
  
    return inputBoxs;
 }

 function asstesLoading(){
  const bg = new Pic("assets/image/bg.png").center();
  const stage = new Pic("assets/image/stage.png").center().mov(0, 50);
  const shapes = new Pic("assets/image/shapes.png").sca(.87).center().mov(40,120) ;
  const doorhandle = new Pic("assets/image/doorhandle.png").sca(.2).center().mov(400,300);
 }

 function labelsCreation(){
  const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
      .center()
      .pos(130, 60);

      const header_label = new Label({
        text: headerText.text[lang],
        size: 40,
        bold: true,
      })
      .center(header_rect)
      .sca(1);

      new Label({
        text: chapter.text[lang],
        size: 25,
        color: "black",
        bold: true,
        italic: true,
      }).loc(150, 100);
 }

 function generateProblems(){
    const problems =[];
    const solutions = [];
    for(let i = 0; i<6; i++){
       if(i===0 ||i===2){
          const mainNum = Math.floor(Math.random() * 9) + 1;
          let powerNum;
          if(mainNum <= 2){
            powerNum = Math.floor(Math.random() * 20) + 1;
          }
         else{
            powerNum = Math.floor(Math.random() * 5) + 1;
         }

         problems.push([mainNum,powerNum]);

         const solution = Math.pow(mainNum, powerNum) * Math.pow(mainNum, powerNum);
         solutions.push(solution);

       }
       
       else if(i===1 || i===4){
        const mainNum = Math.floor(Math.random() * 9) + 1;
        let powerNum1;
        let powerNum2;
        if(mainNum <= 2){
            powerNum1 = Math.floor(Math.random() * 20) + 1;
            powerNum2 = Math.floor(Math.random() * powerNum1) + 1;
          }
         else{
            powerNum1 = Math.floor(Math.random() * 5) + 1;
            powerNum2 = Math.floor(Math.random() * powerNum1) + 1;
         }
         problems.push([mainNum,powerNum1,powerNum2]);
         const solution = Math.pow(mainNum, powerNum1) /  Math.pow(mainNum, powerNum2);
         solutions.push(solution);
       }
       else{
        const mainNum = Math.floor(Math.random() * 9) + 1;
         let powerNum1 = Math.floor(Math.random() * 2) + 1;
         let powerNum2 = Math.floor(Math.random() * 2) + 1;
        
         problems.push([mainNum,powerNum1,powerNum2]);
         const solution = Math.pow(mainNum,(powerNum1 * powerNum2)); 
        solutions.push(solution);
           
       }
        
    }

    return [problems,solutions];
    

 }

 function problemLabesCreation(problem){
  const steps = [];
  const stepsPos = [{x:700,y:350},{x:1300,y:330},{x:1020,y:480},{x:700,y:620},{x:1200,y:700},{x:700,y:870}]
  for(let i = 0; i<6; i++){
    const step = new Rectangle(150, 100, "transparent").pos(stepsPos[i].x,stepsPos[i].y);
    steps.push(step);
  }
  for(let i = 0; i<6; i++){
    if(i===0 ||i===2){ 
        const combination1 = problem[i][0] + `${ problem[i][1].toString()
            .split("")
            .map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d])
            .join("")}` ;
        new Label(`${combination1} \u00D7 ${combination1} `, 30, "Arial", "black").center(steps[i]).mov(-30);
    }
    else if(i===1 || i===4){
        const combination1 = problem[i][0] + `${ problem[i][1].toString()
            .split("")
            .map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d])
            .join("")}` ;
            const combination2 = problem[i][0] + `${ problem[i][2].toString()
                .split("")
                .map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d])
                .join("")}` ;

        new Label(`${combination1} / ${combination2} `, 30, "Arial", "black").center(steps[i]).mov(-30);
    }
    else{

        const combination3 ="("+ problem[i][0] + `${problem[i][1].toString()
            .split("")
            .map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d])
            .join("")}` +")"+ `${problem[i][2].toString()
            .split("")
            .map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d])
            .join("")}`

        new Label(`${combination3} `, 30, "Arial", "black").center(steps[i]).mov(-30);

    }
  }

  return steps;

 }


 

}



// Initialize the app
init();


