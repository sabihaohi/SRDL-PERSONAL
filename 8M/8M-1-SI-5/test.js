async function init() {
    try {
      // Load JSON data
      const response = await fetch("data.json");
      const data = await response.json();
  
      const picResponse = await fetch("fibonacci.json");
      let picData = await picResponse.json(); // Ensure this line parses correctly
  
      // Destructure the loaded data
      const {
        lang,
        playBtnText,
        headerText,
        wrongnumbermassage,
        chapter,
        infoAbdunantnumber,
        infodeficentnumber,
        iscorrectnumber,
        iswrongnumber,
        informationText,
        fibonaccitnumber,
        deficentnumber,
        multiflymassage,
        multiflicationmassage,
        attempresult,
        rightresult,
        wrongresult,
        percentageofpass
      } = data;
  
      // Check if picData is empty or not properly loaded
      if (!Array.isArray(picData) || picData.length === 0) {
        console.error("picData is empty or not properly loaded");
        return;
      }
  
      // Create the frame after loading the JSON data
      new Frame(FIT, 1920, 1080, "#adbed9", "#7d9ed1", ready, "assets/");
  
      function ready() {
        assetsLoading();
        labelCreation();
        generateRandomPicture();
      }
  
      function assetsLoading() {
        const bg = new Pic("assets/image/bg.png").center();
        const picturebox = new Pic("assets/image/picturebox.png").pos(40, 400);
        const restartButton = new Button({
          label: "",
          width: 90,
          height: 90,
          backgroundColor: "#96bfe7",
          rollBackgroundColor: "#96bfe7",
          borderWidth: 0,
          gradient: 0.4,
          corner: 45,
        })
          .center()
          .mov(880, 460);
  
        const pic = new Pic("assets/image/restart.png")
          .sca(0.15)
          .center(restartButton);
        pic.rotation = 60;
  
        restartButton.on("click", () => {
          location.reload();
        });
      }
  
      function labelCreation() {
        const header_rect = new Rectangle({ width: 1700, height: 100, color: "transparent" })
          .center()
          .pos(130, 55);
        const header_label = new Label({
          text: headerText.text[lang],
          size: 40,
          bold: true,
        })
          .center(header_rect)
          .sca(1);
  
        new Label({
          text: chapter.text[lang],
          size: chapter.size[lang],
          color: black,
          bold: true,
          italic: true
        }).loc(130, 80);
  
        new Label({
          text: informationText.text[lang],
          size: 20,
          color: black,
          bold: true,
          italic: true
        }).loc(150, 445);
  
        new Label({
          text: fibonaccitnumber.text[lang],
          size: 25,
          color: "black",
          bold: true,
          italic: true,
        }).loc(650, 755);
        new Label({
          text: deficentnumber.text[lang],
          size: 25,
          color: "black",
          bold: true,
          italic: true,
        }).loc(1235, 755);
  
      }
  
      let pictureCount = 1;
      function generateRandomPicture() {
        const picObject = picData[pictureCount];
        if (picObject && picObject.imageLink) {
          const pic = new Pic(picObject.imageLink).center().mov(0, 200);
          pictureCount++;
          if (pictureCount >= picData.length) {
            pictureCount = 0; // Reset pictureCount if it exceeds the array length
          }
        } else {
          console.error("Invalid picData structure or missing imageLink property");
        }
      }
  
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }
  
  // Initialize the app
  init();
  