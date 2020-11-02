class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage("images/milk.png");

    }
    getFoodStock(){
      return this.foodStock;
    }
    
    updateFoodStock(foodStock){
    this.foodStock=foodStock;
    }
    getFedTime(lastFed){
        this.lastFed=lastFed;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
   
    }

    bedroom() {
      background(bedroom, 1200, 1200);
    }

    garden() {
      background(garden, 1200, 1200);
    }

    washroom() {
      background(washroom, 1200, 1200);
    }

    display(){
      var x=80;
      var y=100;
      imageMode(CENTER);
      image(this.image,720,220,70,70);
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
}