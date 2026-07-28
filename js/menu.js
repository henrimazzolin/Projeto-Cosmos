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

const botao_escolher_escudo = document.querySelector("#escolher-escudo");
const botao_escolher_rajada = document.querySelector("#escolher-rajada");
const botao_escolher_barreira = document.querySelector("#escolher-barreira");
const botao_escolher_impacto = document.querySelector("#escolher-impacto");
const jogo = document.querySelector("#jogo");

const nave_jogador = document.querySelector("#nave-jogador");
const hud_vidas = document.querySelector("#hud-vidas");
const hud_habilidade = document.querySelector("#hud-habilidade");

const imagens_tiro = {  //listinha de cada tiro de cada nave, para que o jogo saiba qual imagem usar para cada tiro
    escudo: "assets/images/ui/tiro-escudo.png",
    rajada: "assets/images/ui/tiro-rajada.png",
    barreira: "assets/images/ui/tiro-barreira.png",
    impacto: "assets/images/ui/tiro-impacto.png"
};

const faixas = document.querySelectorAll(".faixa");
let faixa_atual = 2; //começa em 0, ou seja, a primeira faixa é 0, a segunda é 1 e a terceira é 2, que é a faixa inicial do jogo

const historia_completa = texto_historia.textContent.replace(/\s+/g, " ").trim(); // remove espaços em branco extras e quebras de linha, \s sao espacos e + significa um ou mais, g significa global, trim remove espaços no inicio e no final
let letra = 0; //let porque as letras podem mudar, 0 porque começa do inicio
let digitando = false;

let nave_escolhida = ""; //escolha pode mudar ao reiniciar
let pode_atirar = true;

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
//----------------------------------------------------------------- criacao das funcoes teste para criar obstaculos e verificar colisao-------------------------------------------------
function criar_obstaculo_teste() {
    const obstaculo = document.createElement("img");

    obstaculo.className = "obstaculo"; //
    obstaculo.src = "assets/images/detritos/fase-1/detrito-pequeno.png";
    obstaculo.alt = "";

    obstaculo.addEventListener("animationend", function () {
        obstaculo.remove();
    });

    faixas[2].appendChild(obstaculo);
}

function verificar_colisao_teste() {
    const obstaculo = document.querySelector(".obstaculo");
    const tiros = document.querySelectorAll(".tiro");

    if (!obstaculo) {
        return;
    }

    tiros.forEach(function (tiro) {
        if (tiro.parentElement !== obstaculo.parentElement) {
            return;
        }
        const area_tiro = tiro.getBoundingClientRect();  //pega a area do tiro, ou seja, a posição e o tamanho do tiro na tela
        const area_obstaculo = obstaculo.getBoundingClientRect();  //pega a area do obstaculo, ou seja, a posição e o tamanho do obstaculo na tela
        if (
            area_tiro.right >= area_obstaculo.left &&
            area_tiro.left <= area_obstaculo.right
        ) {
            tiro.remove();
            obstaculo.remove();
        }
    });
} setInterval(verificar_colisao_teste, 20);
//--------------------------------------------------------------------------------------------------------------------------------------------------

function atirar() {
    if (!pode_atirar) {
        return;
    }

    pode_atirar = false;

    const tiro = document.createElement("img"); //cria um elemento img para o tiro

    tiro.className = "tiro";
    tiro.src = imagens_tiro[nave_escolhida]; //pega a imagem do tiro da nave escolhida
    tiro.alt = "";

    tiro.addEventListener("animationend", function () { //quando a animação do tiro termina, ele remove o tiro da tela
        tiro.remove(); //remove o tiro da tela
    });
    faixas[faixa_atual].appendChild(tiro);  //adiciona o tiro na faixa atual da nave

    let intervalo_tiro = 300;

    if (nave_escolhida === "rajada") {
        intervalo_tiro = 250;
    }

    setTimeout(function () { //essa funcao serve p definir o intervalo de tempo entre os tiros, para que o jogador não possa atirar infinitamente
        pode_atirar = true;
    }, intervalo_tiro);
}

function mover_nave() {


    faixas[faixa_atual].appendChild(nave_jogador);
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


botao_escolher_escudo.addEventListener("click", function () {
    nave_escolhida = "escudo";

    nave_jogador.src = "assets/images/naves/nave-escudo.png";
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(4);
    hud_habilidade.textContent = "coração extra";

    selecao_nave.hidden = true;
    jogo.hidden = false;
    criar_obstaculo_teste();
});

botao_escolher_rajada.addEventListener("click", function () {
    nave_escolhida = "rajada";

    nave_jogador.src = "assets/images/naves/nave-rajada.png";
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(3);
    hud_habilidade.textContent = "tiro rápido";

    selecao_nave.hidden = true;
    jogo.hidden = false;
});

botao_escolher_barreira.addEventListener("click", function () {
    nave_escolhida = "barreira";

    nave_jogador.src = "assets/images/naves/nave-barreira.png";
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(3);
    hud_habilidade.textContent = "barreira protetora";

    selecao_nave.hidden = true;
    jogo.hidden = false;
});

botao_escolher_impacto.addEventListener("click", function () {
    nave_escolhida = "impacto";

    nave_jogador.src = "assets/images/naves/nave-impacto.png";
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(3);
    hud_habilidade.textContent = "dano dobrado";

    selecao_nave.hidden = true;
    jogo.hidden = false;
});

document.addEventListener("keydown", function (evento) {
    if (jogo.hidden || evento.repeat) { //verifica se o jogo está escondido ou se a tecla está sendo pressionada repetidamente
        return;  //se o jogo estiver escondido ou se a tecla estiver sendo pressionada repetidamente, ele não faz nada
    }

    const tecla = evento.key.toLowerCase();  //converte a tecla pressionada para minúscula, para que não haja diferença entre maiúscula e minúscula

    if ((tecla === "w" || tecla === "arrowup") && faixa_atual > 0) {  //verifica se a tecla é w ou setinha e se a faixa é maior q 0, ou seja, se ela estiver na primeira não tem como mover para cima
        evento.preventDefault();
        faixa_atual--;
        mover_nave(); //chama a função para mover a nave para a faixa atual
    } else if ((tecla === "s" || tecla === "arrowdown") && faixa_atual < faixas.length - 1) { //mesmo esquema p seta de baixo e tecla s
        evento.preventDefault();
        faixa_atual++;
        mover_nave();
    }
});

document.addEventListener("keydown", function (evento) {
    if (jogo.hidden) {
        return;
    }

    if (evento.key === " ") {
        evento.preventDefault();
        atirar();
    }
});