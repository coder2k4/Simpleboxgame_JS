var $start = document.getElementById('start');
var $game = document.getElementById('game');
var $time = document.getElementById('time');
var $timeHeader = document.getElementById('time-header');
var $resultHeader = document.getElementById('result-header');
var $result = document.getElementById('result');
var $input = document.getElementById('game-time');
var score = 0;
var isGamerStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBox);
$input.addEventListener('input', setGameTime);


function handleBox(event) {
    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}

function hide(el) {
    el.classList.add('hide');
}

function show(el) {
    el.classList.remove('hide');
}

function startGame() {
    score = 0;
    $input.setAttribute('disabled', '');
    setGameTime();
    isGamerStarted = true;
    $game.style.backgroundColor = '#fff';
    var interval = setInterval(function () {
        if (getTime() <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (getTime() - 0.1).toFixed(1);
        }

    }, 100);
    renderBox();
}

function endGame() {
    isGamerStarted = false;
    $game.innerHTML = '';
    show($resultHeader);
    hide($timeHeader);
    show($start);
    $start.classList.remove('hide');
    $resultHeader.classList.remove('hide');
    $timeHeader.classList.add('hide');
    $game.style.backgroundColor = '#ccc';
    $input.removeAttribute('disabled');
    setGameScore();
}

function setGameScore() {
    $result.textContent = score.toString();
}

function getTime() {
    return parseFloat($time.textContent);
}

function setGameTime() {
    hide($resultHeader);
    show($timeHeader);
    hide($start);
    $time.textContent = (+$input.value).toFixed(1);
}

function renderBox() {
    $game.innerHTML = '';
    var box = document.createElement('div');
    calcCoords(box);
    box.setAttribute('data-box', 'true');
    $game.insertAdjacentElement('afterbegin', box);
}

function calcCoords(box) {
    var gameSize = $game.getBoundingClientRect();
    var minBox, maxBox, boxWidth, boxHeight, boxLeft, boxTop;
    minBox = 50;
    boxLeft = randomeBox(0, gameSize.width - minBox);
    boxTop = randomeBox(0, gameSize.height - minBox);
    maxBox = gameSize.height - (boxTop > boxLeft ? boxTop : boxLeft);
    box.style.width = box.style.height = randomeBox(minBox, maxBox) + 'px';
    box.style.backgroundColor = getRandomColor();
    box.style.position = 'absolute';
    box.style.left = boxLeft + 'px';
    box.style.top = boxTop + 'px';
    box.style.cursor = 'pointer';
}

function randomeBox(min, max) {
    return Math.random() * (max - min) + min
}

function getRandomColor () {
    var hex = Math.floor(Math.random() * 0xFFFFFF);
    hex = hex.toString(16);
    hex = "000000" + hex;
    hex = hex.substr(-6);
    hex = "#"+hex;
    return hex;
}
