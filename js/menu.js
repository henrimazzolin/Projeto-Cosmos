const botao_como_jogar = document.querySelector("#botao-como-jogar");
const modal_como_jogar = document.querySelector("#modal-como-jogar");
const botao_fechar_como_jogar = document.querySelector("#botao-fechar-como-jogar");

const botao_creditos = document.querySelector("#botao-creditos");
const modal_creditos = document.querySelector("#modal-creditos");
const botao_fechar_creditos = document.querySelector("#botao-fechar-creditos");

const botao_start = document.querySelector("#botao-start");
const tela_inicial = document.querySelector(".tela-inicial");
const historia = document.querySelector("#historia");

const texto_historia = document.querySelector("#texto-historia");
const botao_jogar = document.querySelector("#botao-jogar");

const selecao_nave = document.querySelector("#selecao-nave");

const historia_completa = texto_historia.textContent.replace(/\s+/g, " ").trim(); // remove espaços em branco extras e quebras de linha, \s sao espacos e + significa um ou mais, g significa global, trim remove espaços no inicio e no final
let letra = 0; //let porque as letras podem mudar, 0 porque começa do inicio
let digitando = false;

function escrever_historia() {
    if (letra < historia_completa.length) { //verifica quantas letras tem na historia e faz um check p ver se ele ja terminou de escrever a historia, se for menor que o tamanho da historia ele continua escrevendo
        texto_historia.textContent += historia_completa[letra]; //adiciona a letra atual do texto da historia ao texto do elemento
        setTimeout(escrever_historia, 50); //chama a função novamente após 50 milissegundos, para dar o efeito de digitação
        letra++; //incrementa a letra, ou seja, passa para a proxima letra
    } else {
        digitando = false; //quando termina de digitar ele para a função
        botao_jogar.hidden = false; //exibe o botão de jogar quando termina de digitar a historia
    }
}

botao_como_jogar.addEventListener("click", function () {
    modal_como_jogar.hidden = false;  // exibe o modal de como jogar - hidden = false
});

botao_fechar_como_jogar.addEventListener("click", function () {
    modal_como_jogar.hidden = true;  // esconde o modal de como jogar - hidden = true
});

botao_creditos.addEventListener("click", function () {
    modal_creditos.hidden = false;  // exibe o modal de créditos - hidden = false
});

botao_fechar_creditos.addEventListener("click", function () {
    modal_creditos.hidden = true;  // esconde o modal de créditos - hidden = true
});

botao_start.addEventListener("click", function () {
    tela_inicial.hidden = true; //começã escondido
    historia.hidden = false; //mostra a historia primeiro antes de permitir começar o jogo

    texto_historia.textContent = ""; 
    botao_jogar.hidden = true; //esconde o botão de jogar enquanto a historia está sendo digitada
    letra = 0; //reinicia a letra para 0, para que a historia seja digitada do inicio
    digitando = true; //indica que a historia está sendo digitada

    escrever_historia(); //chama a função
});

historia.addEventListener("click", function () {
    if (digitando) {
        texto_historia.textContent = historia_completa; //se ja tiver escrevido tudo
        letra = historia_completa.length; //supondo que a frase tenha 50 caracteres, quando a letra chegar ao numero 50, ele para d escrever
        digitando = false; //para de digitar
        botao_jogar.hidden = false; //botão de jogar aparece 
    }
});

botao_jogar.addEventListener("click", function () {
    historia.hidden = true; //se a historia estiver completa, ele esconde a historia
    selecao_nave.hidden = false; //mostra a tela de seleção de naves
});