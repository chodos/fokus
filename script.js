const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarIcon = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');

const musicaBt = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const startSound = new Audio('sons/play.wav');
const pauseSound = new Audio('sons/pause.mp3');
const endSound = new Audio('sons/beep.mp3');

let tempoDecorridoSegundos = 1500;
let intervaloId= null;

musica.loop = true;
musicaBt.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }
    else {
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})
curtoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})
function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(botao) {
        botao.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br />
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar a superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoSegundos > 0) {
        tempoDecorridoSegundos -= 1;
        mostrarTempo();
    }
    else {
        zerarTemporizador();
        endSound.play();
    }
}

startPauseBt.addEventListener('click',controlaTemporizador);

function controlaTemporizador() {
    if(intervaloId){
        pauseSound.play();
        iniciarOuPausarBt.textContent = "Começar";
        iniciarOuPausarIcon.setAttribute('src', 'imagens/play_arrow.png');
        zerarTemporizador();
        return;
    }
    startSound.play();
    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarIcon.setAttribute('src', 'imagens/pause.png');
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerarTemporizador() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoSegundos * 1000).toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempo}`;
}

mostrarTempo();