const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(canvas);
// console.log(ctx);

// canvas should cover the entire window so adjust its widht and height

// done for correct scaling of the coordinates
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// since on screen resolutions, it changes our canvas drawings
// we write a trigger for resizing of the screen

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

});

// mouse interactivity
const particleArray = [];
let hue = 0;
const mouse = {
  x: undefined,
  y: undefined,
};
canvas.addEventListener("click", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) particleArray.push(new Particle());
  
});
canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) particleArray.push(new Particle());
 
});

class Particle {
  constructor() {
    // coordinates
    this.x = mouse.x;
    this.y = mouse.y;
   
    //size
    // random size btw 1 to 6 px
    this.size = Math.random() * 15 + 1;
    // note pos val on x makes it to move right and vice versa
    // pos val on y makes it tomove bottom and vice versa;

    //speed
    this.speedX = Math.random() * 3 - 1.5; // ran no. btw +1.5 to -1.5
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ",100%, 50%)";
  }
  // updates x and y
  update() {
    // for every loop animation, the coordinates change and
    // hence movement is seen
    this.x += this.speedX;
    this.y += this.speedY;

    // shrinking size
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    // draws particles
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function handleParticles(params) {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    // when we are shrinking the size , its less than 0 then draw will hang
    // so we remove when they are less than on a certain val
    
    for(let j=i;j<particleArray.length;j++){
        // using py thm
        const dx=particleArray[i].x-particleArray[j].x
        const dy=particleArray[i].y-particleArray[j].y
        const dist=Math.sqrt(dx*dx+dy*dy)
        if(dist<100){
            // then we'll draw a line from i to j
            ctx.beginPath()
            ctx.strokeStyle=particleArray[i].color
            ctx.lineWidth=0.2
            ctx.moveTo(particleArray[i].x,particleArray[i].y) // begin here
            ctx.lineTo(particleArray[j].x,particleArray[j].y) // reach here
            ctx.stroke()
        }
    }
    if (particleArray[i].size <= 0.3) {
        particleArray.splice(i, 1);
        i--;
        console.log(particleArray);
      }
  }
}
// animate mouse control
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hue += 2;
  
  handleParticles();
  let id = requestAnimationFrame(animate);
}

animate();
