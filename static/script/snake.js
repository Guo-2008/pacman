(function () {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const size = 20;
    let snake = [{x: 9, y: 9}];
    let direction = {x:1, y:0};
    let food = spawnFood();
    let score = 0;

    function spawnFood() {
        return {
            x: Math.floor(Math.random()* (canvas.width / size)),
            y: Math.floor(Math.random()* (canvas.height / size))
        };
    }

    function drawRect(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * size, y * size, size - 1, size - 1);
    }

    function update() {
        const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

        if (head.x < 0 || head.y < 0 || head.x >= canvas.width/size || head.y >= canvas.height/size || snake.some(part => part.x === head.x && part.y === head.y)) {
            alert('Game over! Score: ' + score);
            snake = [{x:9, y:9}];
            direction = {x:1, y:0};
            food = spawnFood();
            score = 0;
            document.getElementById('score').textContent = 'Score: ' + score;
            return;
        }

        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 1;
            document.getElementById('score').textContent = 'Score: ' + score;
            food = spawnFood();
        } else {
            snake.pop();
        }

        ctx.clearRect(0,0,canvas.width, canvas.height);
        drawRect(food.x, food.y, 'red');
        snake.forEach(part => drawRect(part.x, part.y, 'lime'));
    }

    document.addEventListener('keydown', e => {
        switch(e.keyCode) {
            case 37: if(direction.x !== 1){ direction = {x:-1, y:0}; } break;
            case 38: if(direction.y !== 1){ direction = {x:0, y:-1}; } break;
            case 39: if(direction.x !== -1){ direction = {x:1, y:0}; } break;
            case 40: if(direction.y !== -1){ direction = {x:0, y:1}; } break;
        }
    });

    setInterval(update, 150);
})();
