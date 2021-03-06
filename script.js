let order = [];
let clickOrder = [];
let score = 0;

//[0] - verde
//[1] - vermelho
//[2] - amarelo
//[3] - azul

//cores
const blue = document.querySelector('.blue'), 
red = document.querySelector('.red'), 
green = document.querySelector('.green'), 
yellow = document.querySelector('.yellow');

//seleciona notas musicais
const c4 = 261.6,
d4 = 293.7,
e4 = 329.6,
f4 = 349.2;

//define o tipo
let context,
oscillator,
contextGain,
x = 1,
type = 'sine',
frequency;

//cria som
function start(){
    context = new AudioContext();
    oscillator = context.createOscillator();
    contextGain = context.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    oscillator.connect(contextGain);
    contextGain.connect(context.destination);
    oscillator.start(0);
}

//para o som
function stop(){
    start();
    contextGain.gain.exponentialRampToValueAtTime(
        0.00001, context.currentTime + x
        )
}

//som com o click
blue.addEventListener('click', function(){
	frequency = c4;
  stop();
});
red.addEventListener('click', function(){
	frequency = d4;
  stop();
});
green.addEventListener('click', function(){
	frequency = e4;
  stop();
});
yellow.addEventListener('click', function(){
	frequency = f4;
  stop();
});


//cria ordem aleatoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
    setTimeout(() =>{
        element.classList.add('selected-rv');
    }, number + 250);
    setTimeout(() =>{
        element.classList.remove('selected-rv');
    }, number - 250);
}

//checa se os botoes clicados s??o os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontua????o: ${score}\nVoc?? acertou! Iniciando pr??ximo nivel!`);
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2){
        return yellow;
    } else if(color == 3){
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    alert(`Pontua????o: ${score}!\nVoc?? perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//funcao de inicio do jogo
let playGame = () => {
    alert('Bem vindo ao G??nius! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inico do jogo
playGame();