//Create variables here
var  dog, happyDog, database, foodS, foodStock;
var image1,image2;
var feedPet,add, addFood;
var fedTime,lastFed;
var foodObj, readState, changeState;
var gameState;
var currentTime;
var bedroom, garden, washroom;

function preload()
{
  //load images here
  image1=loadImage("images/Dog.png");
  image2=loadImage("images/Happy.png");
  sadDog = loadImage("images/Lazy.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(1200, 1200);
  dog = createSprite(800,200,150,150);
  dog.addImage(image1);
  dog.scale=0.15;
  
  database=firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  readState = database.ref('gameState');
  readState.on("value", (data) => {
    gameState = data.val();
  });

  foodObj=new Food();

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedFood);

  add=createButton("add food");
  add.position(800,95);
  add.mousePressed(addFood);
}


function draw() {  
  background(46, 139, 87);
  foodObj.display();
  
 fedTime = database.ref("feedTime");
 fedTime.on("value",function(data){
   lastFed = data.val();
 })

  
  drawSprites();
  //add styles here


 
  fill(255,255,254);
  textSize(15);
  
  if(lastFed >= 12){
    update("playing");
    text("Last Feed : " + lastFed % 12 + " PM", 350,30);
  }
  else if(lastFed === 0){
    update("sleeping");
    text("Last Feed : 12 AM",350,30);
  }
  else {
    update("hungry");
    foodObj.display();
    text("Last Feed : " + lastFed + " AM", 350,30);
  }
 
  if(gameState !== "hungry") {
    feed.hide();
    add.hide();
    dog.remove();
  }

  else {
    feed.show();
    add.show();
    dog.addImage(sadDog);
  }

  if(currentTime === lastFed + 1) {
    foodObj.garden();
    update("playing");
  }

  else if (currentTime === lastFed + 2) {
    foodObj.bedroom();
    update("sleeping");
  }

  else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    foodObj.washroom();
    update("bathing");
  }

  else {
    gameState = "hungry"
    feed.show();
    add.show();
    dog.addImage(sadDog);
  }
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  });
}

function feedFood(){
  dog.addImage(image2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour(),
    currentTime: hour()
  });
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function update(state) {
  database.ref('/').update({
    gameState: state
  });
}