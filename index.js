let DST = document.getElementById("selection");

function drawingStyleType(event) {
  event.preventDefault();
  if (event.target.name === "DST") {
    new Typewriter("#drawing-style-technique", {
      strings: "You selected " + event.target.value + " drawing style.",
      autoStart: true,
      cursor: " ",
    });
    console.log(event.target.value);
  }
}
DST.addEventListener("change", drawingStyleType);

let drawingStyleChoice = document.getElementById("drawing-style");
let styleChoice = document.getElementById("selection");

function drawingStyle(event) {
  console.log(`${event.target.value}`);

  if (event.target.value === "style") {
    return event.target.value;
  }
}

drawingStyleChoice.addEventListener("change", drawingStyle);

let input = document.querySelector("#general-drawing-details");
let drawingInfo = new FormData(styleChoice);
let choice = " ";
for (let pick of drawingInfo) {
  choice = `${choice}${pick[0]}\r`;
}
console.log(`${choice}`);

///above is done

function generateImage(event) {
  event.preventDefault();
  new Typewriter("#instructions", {
    strings: "Please wait....generating image.",
    autoStart: true,
    cursor: " ",
  });
  let Instructions = new FormData(styleChoice);
  let output = " ";
  for (let entry of Instructions) {
    output = `${output}${entry[1]}\r`;
    console.log(`${output}`);

    let apiKey = "5452ccec034a0afbo38d92e109tf8e74";
    let context = `You are a drawing teacher. Your goal is to generate an image from  ${input.value} using the ${choice} drawing style. Provide detailed and easy to follow step by step instructions in basic HTML on how to draw the image described. Add a line of space between each step.`;
    let prompt = `Provide simple step by step instructions to draw ${input.value}.`;
    let apiLink = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
    console.log(`Prompt: ${prompt}`);
    console.log(`Context ${context}`);
    axios.get(apiLink).then(drawingInstruct);
  }
}

function drawingInstruct(response) {
  image = document.querySelector("#results");
  instructions = document.querySelector("#instructions");
  instructions.innerHTML = response.data.answer
  console.log(response.data);
}

let imageGeneratorForm = document.querySelector("#image-generator");
imageGeneratorForm.addEventListener("submit", generateImage);
console.log("Processing");
