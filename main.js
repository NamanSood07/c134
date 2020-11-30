img="";
status="";
objects=[];
number_of_objects=""

function preload(){
  img=loadImage("dog_cat.jpg") 
      
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.position(600,250)
    video=createCapture(VIDEO);
    video.hide();
      video.size(380,380)
    
   objectDetector=ml5.objectDetector('cocossd' , modelLoaded);
   document.getElementById("statuss").innerHTML="Status : Detecting Objects"
}
function modelLoaded(){
  console.log("Model Loaded!!")
  status=true;
  objectDetector.detect(video,gotResult)
}
function gotResult(error,results){
  if(error){
    console.log(error);


  }
  console.log(results)
  objects=results;
}

function draw(){
    image(video,0,0,380,380);
    if(status!= ""){
      r=random(255);
      g=random(255)
      b=random(255)
      for(i=0; i<objects.length;i++){
        document.getElementById("statuss").innerHTML="Status : Objects Detected"
        document.getElementById("number_of_objects").innerHTML="Number Of Objects are:"+objects.length
        fill (r,g,b)
        percent= floor(objects[i].confidence*100);
        text(objects[i].label+" "+  percent+" % ",objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b)
        rect(objects[i].x -150, objects[i].y-200, objects[i].width,objects[i].height)
      }
    }

}