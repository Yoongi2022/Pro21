//Variables
var NubesImg, Nubes;
var BatmanImg, Batman;
var DonaImg, Dona;
var BasuraImg, Basura;
var gameState = "play"

//Función para cargar imágenes
function preload(){
  //Cargar imágenes con las variables asignadas
  NubesImg = loadImage("nubes.png");
  BatmanImg = loadImage("Batman.png");
  DonaImg = loadImage("dona.png");
  BasuraImg = loadImage("basura.png");
  Soundmp3 = loadSound("sound.mp3");
}

function setup() {
    createCanvas(1000,1000);
    

    //Crear "nubes"
    Nubes = createSprite(600,300);
    //Añadirle la imágen a "nubes"
    Nubes.addImage(NubesImg);
    //Añadirle velicidad a "nubes"
    Nubes.velocityY = 4;

    //Crear grupo de "donas" y "basura"
    DonasGroup = new Group();
    BasuraGroup = new Group();

    //Crear el sprite de "Batman"
    Batman = createSprite(600,700,50,50);
    //Asignarle el tamaño
    Batman.scale = 0.3;
    //Añadirle la imágen a "batman"
    Batman.addImage("Batman", BatmanImg);
 
}

function draw() {
  background("white");

  //Escribir una condición para desplazar infinitamente las nubes
  if(Nubes.y > 300 ) {
    Nubes.y = 200;
    }

    //Crear estado de juego "play"
    if (gameState === "play") {
      Soundmp3.play();
     
      edges= createEdgeSprites();
      Batman.collide(edges);

      
        if(keyDown("LEFT_ARROW")){
            Batman.x = Batman.x - 5;
    
        //Código para mover a "batman" a la derecha al presionar la flecha derecha
        }
        if(keyDown("RIGHT_ARROW")){
              Batman.x = Batman.x + 5; 
        }

//> <
        //Donas y Basura = DB
            spawnDB(); 
    
      //Código para hacer que DonasGroup colisione con Batman y cambiar gamestate a end.
           if(DonasGroup.isTouching(Batman)){
            Batman.velocityX = 0;
            Batman.destroy();
            DonasGroup.destroy();
            DonasGroup.setVelocityYEach(0);
            gameState = "end"
            }

            if(BasuraGroup.isTouching(Batman)){
                Batman.velocityX = 0;
                Batman.destroy();
                BasuraGroup.destroy();
                BasuraGroup.setVelocityYEach(0);
                gameState = "end"
              }
              }

         //Dibujar sprites 
        drawSprites();
      }

      //Indicar que pasará al cambiar al estado de End
      if (gameState === "end"){
        stroke("purple");
        fill("purple");
        textSize(30);
        text("Fin del juego", 200,200)
      }

      function spawnDB() {
    //Código para aparecer los obstáculos
    if (frameCount % 240 === 0) {
    var Dona = createSprite(Math.round(random(250, 100),40, 10, 10));
    Dona.addImage(DonaImg);
    Dona.scale = 0.2;
    var Basura = createSprite(Math.round(random(250, 100),10, 10, 10));
    Basura.addImage(BasuraImg);
    Basura.scale = 0.2;

    Dona.velocityY = 6;
    Basura.velocityY = 6;

    //Cambiar la profundidad de Batman
    //Batman.depth = DB.depth;
    Batman.depth = Batman.depth +1;

    //Asignar lifetime a Dona y Basura
    Dona.lifetime = 800;
    Basura.lifetime = 800;

     //Agregar cada obstáculo al grupo obstaclesGroup.add(obstacle)
     //Aquí los obstáculos son "Dona" y "Basura"
     DonasGroup.add(Dona);
     BasuraGroup.add(Basura);
      }
    }
  