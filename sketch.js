
/*// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/mUV88zZpr/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confianza = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the video
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  //flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  textAlign(LEFT);
  textSize(8);
  text(confianza, 10, height - 4);

if ((label == 'botella' && confianza >= 0.98)){
    background(255, 165, 0);
}else if ((label == 'saludo' && confianza >= 0.98)){
    background(0, 255, 0);
}else if ((label == 'groseria' && confianza >= 0.98)){
    background(255, 0, 0);
}
}
// Get a prediction for the current video frame
function classifyVideo() {
  //flippedVideo = ml5.flipImage(video)
  classifier.classify(video, gtonResult);
  //flippedVideo.remove();
}

// When we get a result
function gtonResult(results, error) {
  // If there is an error
  if (error) {
    console.log(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  confianza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}

*/
// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/mUV88zZpr/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confianza = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the video
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  
  // Dibujar el video en tiempo real
  push();
  
  // Crear filtros creativos según la etiqueta detectada
  if (label == 'botella' && confianza >= 0.98) {
    // Efecto de rotación y desenfoque
    translate(width / 2, height / 2);
    rotate(frameCount * 0.05);  // Rotación continua
    imageMode(CENTER);
    image(video, 0, 0, width, height);
    filter(BLUR, 5);  // Desenfoque fuerte
  } else if (label == 'saludo' && confianza >= 0.98) {
    // Efecto de espejo horizontal y solarización
    translate(width, 0);  // Mover al otro lado
    scale(-1, 1);  // Invertir horizontalmente (espejo)
    image(video, 0, 0, width, height);
    filter(THRESHOLD, 0.5);  // Solarización
  } else if (label == 'groseria' && confianza >= 0.98) {
    // Zoom dinámico con posterización
    let zoom = sin(frameCount * 0.05) * 0.5 + 1.5;  // Zoom fluctuante
    translate(width / 2, height / 2);
    scale(zoom);  // Escalar el video para hacer el efecto de zoom
    imageMode(CENTER);
    image(video, 0, 0, width, height);
    filter(POSTERIZE, 3);  // Posterización para aspecto de cómic
  } else {
    // Si no coincide con ninguna etiqueta, solo mostramos el video sin glitch ni pixeles
    image(video, 0, 0);
  }
  
  pop();

  // Mostrar la etiqueta y la confianza
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  textAlign(LEFT);
  textSize(8);
  text(confianza.toFixed(2), 10, height - 4);
}

// Obtener una predicción para el video actual
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// Cuando obtenemos un resultado
function gotResult(results, error) {
  if (error) {
    console.log(error);
    return;
  }
  // Guardar el label y la confianza del resultado
  label = results[0].label;
  confianza = results[0].confidence;
  
  // Clasificar de nuevo el video
  classifyVideo();
}
