import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  @ViewChild('gameElement') gameElement!: ElementRef;

  lives: number = 10;

  shipPositionX: number = 0;
  shipPositionY: number = 10;

  shipWidth: number = 40;
  shipHeight: number = 40

  projectiles: any[] = []
  meteors: any[] = []

  maxProjectiles: number = 2

  
  constructor() { }

  ngAfterViewInit() {
    const gameElement = this.gameElement.nativeElement

    this.animate();
    document.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowRight'){
        if(this.lives > 0){
          if(this.shipPositionX + (this.shipWidth / 2) < gameElement.width/2){
            this.shipPositionX += 30
          }
        }
      }
      if(e.key === 'ArrowLeft'){
        if(this.lives > 0){
          if(-this.shipPositionX + (this.shipWidth / 2) < gameElement.width/2){
            this.shipPositionX -= 30
          }
        }
      }

      if(e.key === ' '){
        if(this.lives > 0){
          if(this.projectiles.length < this.maxProjectiles){
            this.projectiles.push({
              posX: this.shipPositionX,
              posY: this.shipHeight
            })
          }
        }
      }


    })
  }

  renderGame( ctx: CanvasRenderingContext2D, centerX: number, centerY: number){
    //render ship
    const gameElement = this.gameElement.nativeElement

    //fill in canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameElement.width, gameElement.height);


    ctx.strokeStyle = 'white'
    ctx.fillStyle = 'white';


    //draw ship
    ctx.beginPath();
    const shipLocationX = centerX + this.shipPositionX;
    const shipLocationY = gameElement.height - this.shipPositionY

    ctx.moveTo(shipLocationX - this.shipWidth/2, shipLocationY); 
    ctx.lineTo(shipLocationX + this.shipWidth/2, shipLocationY); 
    ctx.lineTo(shipLocationX, shipLocationY-this.shipHeight);     
    ctx.closePath();                 
    ctx.stroke();                    
    ctx.fill();  

    //draw projectiles
    this.projectiles.forEach(projectile => {
      ctx.beginPath();
      const projectileLocationX = centerX + projectile.posX;
      const projectileLocationY = gameElement.height - projectile.posY
  
      ctx.moveTo(projectileLocationX - 5, projectileLocationY); 
      ctx.lineTo(projectileLocationX + 5, projectileLocationY); 
      ctx.lineTo(projectileLocationX, projectileLocationY-40);     
      ctx.closePath();                 
      ctx.stroke();                    
      ctx.fill();  
    })

    //draw meteors
    this.meteors.forEach(meteor => {
      const meteorPosX = centerX + meteor.posX
      const meteorPosY = gameElement.height - meteor.posY

      ctx.beginPath();
      ctx.moveTo(meteorPosX, meteorPosY);
      ctx.arc(meteorPosX, meteorPosY, (20 + meteor.health*20), 0, 2 * Math.PI, false);
      ctx.closePath();  
      ctx.fill();
    })
  }
 
  updateGame(){
    const gameElement = this.gameElement.nativeElement

    //update projectiles
    this.projectiles.forEach((projectile, index) => {
      projectile.posY += 7
      if(projectile.posY > gameElement.height){
        this.projectiles.splice(index, 1)
      }
      
      //detect meteor collision
      this.meteors.forEach(meteor => {
        const radius = (20 + meteor.health*20)
        
        const distanceX = Math.abs(projectile.posX - meteor.posX)
        const distanceY = Math.abs(projectile.posY - meteor.posY)

        //use pythagorean theorum to check if the projectile is in range of meteor
        if(Math.pow(distanceX, 2) + Math.pow(distanceY, 2) < Math.pow(radius, 2)){
          meteor.health--
          this.projectiles.splice(index, 1)
        }
      })
    })


    //update meteors
    this.meteors.forEach((meteor, index) => {
      meteor.posY -= 2
      if(meteor.health < 0){
        this.meteors.splice(index, 1)
      }
      if(meteor.posY < 0){
        this.meteors.splice(index, 1)
        this.lives--
      }
    })

  }

  animate() {    
    const gameElement: HTMLCanvasElement = this.gameElement.nativeElement;
    const centerX = gameElement.width / 2;
    const centerY = gameElement.height / 2;
    const ctx = gameElement.getContext("2d")!;

    this.summonMeteors()

    const animateFrame = () => {
      if(this.lives > 0){
        requestAnimationFrame(animateFrame);
        this.updateGame()
        if(this.lives > 0){
          this.renderGame(ctx, centerX, centerY)
        }
      }
    }
    animateFrame();
  }


  summonMeteors(){
    if(this.lives > 0){
      setTimeout(() => {
        const gameElement: HTMLCanvasElement = this.gameElement.nativeElement;
        this.meteors.push({
          posX: (Math.random()*gameElement.width - gameElement.width / 2),
          posY: gameElement.height + 50,
          health: Math.floor(Math.random()*3)
        })
  
        this.summonMeteors()
      }, 2000)
    }
  }



  restartGame(){
    this.lives = 10;

    this.shipPositionX = 0;
    this.shipPositionY = 10;
  
    this.shipWidth = 40;
    this.shipHeight = 40;
  
    this.projectiles = []
    this.meteors = []

    this.animate();
  }

}
