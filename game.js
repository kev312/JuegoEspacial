
/*Declaro constantes para los canvas */

    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');

    /*Declaro constante la nave del juego, donde indico propiedades como el alto y ancho */
        const shipWidth = 50;
        const shipHeight = 50;
        let shipX = canvas.width / 2 - shipWidth / 2;
        const shipY = canvas.height - shipHeight - 20;
        const bulletWidth = 5;
        const bulletHeight = 10;
        const bullets = [];
    /*Declaro constantes sobre los enemigos del juego,donde indico propiedades como alto ancho y la velocidad */
        const enemyWidth = 40;
        const enemyHeight = 40;
        const enemies = [];
        let enemySpeed = 1;
        
        /*Puntuacion y vidas */
            let score = 0;
            let lives = 3;
            let rightPressed = false;
            let leftPressed = false;
            let spacePressed = false;

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

        //funcion de la tecla espacio como disparo
        function keyDownHandler(event) {
            if (event.key === 'Right' || event.key === 'ArrowRight') {
            rightPressed = true;
        } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
            leftPressed = true;
        } else if (event.key === ' ' || event.key === 'Spacebar') {
            spacePressed = true;
            shoot(); 
        }
    }

    //Bucle para la funcion de direccion mediante las flechas
    function keyUpHandler(event) {
        if (event.key === 'Right' || event.key === 'ArrowRight') {
            rightPressed = false;
        } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
            leftPressed = false;
        } else if (event.key === ' ' || event.key === 'Spacebar') {
            spacePressed = false;
        }
    }

    //movimiento hacia la izquierda    
        function moveLeft() {
            if (shipX > 0) {
            shipX -= 15;
        }
    }

    //movimiento hacia la derecha
        function moveRight() {
            if (shipX < canvas.width - shipWidth) {
            shipX += 15;
        }
    }

    //accion disparo
        function shoot() {
        bullets.push({ x: shipX + shipWidth / 2 - bulletWidth / 2, y: shipY });
    }

    //funcion para visualizar nave
        function drawShip() {
        context.fillStyle = '#00ff00';
        context.fillRect(shipX, shipY, shipWidth, shipHeight);
    }

    
    function drawBullet() {
        context.fillStyle = '#ff0000';
        bullets.forEach((bullet, index) => {
            context.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
            bullet.y -= 5;
                if (bullet.y < 0) {
                    bullets.splice(index, 1);
            }
        });
    }


    //Spawn de enemigos
        function drawEnemies() {
            context.fillStyle = '#ffffff';
                enemies.forEach((enemy, index) => {
                context.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
                    enemy.y += enemySpeed;
                        if (enemy.y > canvas.height) {
                enemies.splice(index, 1);
                    loseLife();
                }
            });
        }
        function spawnEnemy() {
            const x = Math.random() * (canvas.width - enemyWidth);
                enemies.push({ x: x, y: 0 });
    }
    //Funcion de colisiones de enemigos
        function collisionDetection() {
            bullets.forEach((bullet, bulletIndex) => {
            enemies.forEach((enemy, enemyIndex) => {
                if (bullet.x < enemy.x + enemyWidth &&
                bullet.x + bulletWidth > enemy.x &&
                bullet.y < enemy.y + enemyHeight &&
                bullet.y + bulletHeight > enemy.y) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                score += 10;
                document.getElementById('score').innerText = `Puntuación: ${score}`;
                if (score % 100 === 0) {
                    enemySpeed += 0.5;
                }
            }
        });
    });
}
    //Funcion perdida de vida
        function loseLife() {
            lives -= 1;
            document.getElementById('lives').innerText = `Vidas: ${lives}`;
                if (lives === 0) {
                alert('PERDISTE JUVENIL');
                document.location.reload();
        }
    }
        function draw() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawShip();
            drawBullet();
            drawEnemies();
            collisionDetection();
//Funciones especiales de la nave y animaciones de los frames
         if (rightPressed && shipX < canvas.width - shipWidth) {
            shipX += 5;
        } else if (leftPressed && shipX > 0) {
            shipX -= 5;
        }
        requestAnimationFrame(draw);
    }
        setInterval(spawnEnemy, 2000);
        draw();