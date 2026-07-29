const botao_como_jogar = document.querySelector("#botao-como-jogar");
const modal_como_jogar = document.querySelector("#modal-como-jogar");
const botao_fechar_como_jogar = document.querySelector("#botao-fechar-como-jogar");

const botao_creditos = document.querySelector("#botao-creditos");
const modal_creditos = document.querySelector("#modal-creditos");
const botao_fechar_creditos = document.querySelector("#botao-fechar-creditos");

const botao_start = document.querySelector("#botao-start");
const tela_inicial = document.querySelector(".tela-inicial");
const historia = document.querySelector("#historia");
const botao_voltar_historia = document.querySelector("#voltar-historia");

const texto_historia = document.querySelector("#texto-historia");
const botao_jogar = document.querySelector("#botao-jogar");

const selecao_nave = document.querySelector("#selecao-nave");
const botao_voltar_selecao = document.querySelector("#voltar-selecao");

const botao_escolher_escudo = document.querySelector("#escolher-escudo");
const botao_escolher_rajada = document.querySelector("#escolher-rajada");
const botao_escolher_barreira = document.querySelector("#escolher-barreira");
const botao_escolher_impacto = document.querySelector("#escolher-impacto");
const jogo = document.querySelector("#jogo");
const botao_voltar_jogo = document.querySelector("#voltar-jogo");

const nave_jogador = document.querySelector("#nave-jogador");
const hud_vidas = document.querySelector("#hud-vidas");
const hud_habilidade = document.querySelector("#hud-habilidade");
const hud_score = document.querySelector("#hud-score");
let score_fase = 0;  //let nesse caso é pq o score não é fixo (let para valores que podem mudar, const para valores que não mudam)
let score_total = 0;

let vidas = 3;
let protegido = false;

let gerador_obstaculos;

const imagens_tiro = {  //listinha de cada tiro de cada nave, para que o jogo saiba qual imagem usar para cada tiro
    escudo: "assets/images/ui/tiro-escudo.png",
    rajada: "assets/images/ui/tiro-rajada.png",
    barreira: "assets/images/ui/tiro-barreira.png",
    impacto: "assets/images/ui/tiro-impacto.png"
};

const detritos_fase_1 = [
    "assets/images/detritos/fase-1/detrito-pequeno.png",
    "assets/images/detritos/fase-1/detrito-medio.png",
    "assets/images/detritos/fase-1/detrito-grande.png"
];

const tempos_detritos = [
    "10s",
    "13s",
    "17s"
];

const tamanhos_detritos = ["48px", "64px", "80px"];

const faixas = document.querySelectorAll(".faixa");
let faixa_atual = 2; //começa em 0, ou seja, a primeira faixa é 0, a segunda é 1 e a terceira é 2, que é a faixa inicial do jogo

const historia_completa = texto_historia.textContent.replace(/\s+/g, " ").trim(); // remove espaços em branco extras e quebras de linha, \s sao espacos e + significa um ou mais, g significa global, trim remove espaços no inicio e no final
let letra = 0; //let porque as letras podem mudar, 0 porque começa do inicio
let digitando = false;
let temporizador_historia;

let nave_escolhida = ""; //escolha pode mudar ao reiniciar
let pode_atirar = true;

function escrever_historia() {
    if (!digitando) {
        return;
    }

    if (letra < historia_completa.length) { //verifica quantas letras tem na historia e faz um check p ver se ele ja terminou de escrever a historia, se for menor que o tamanho da historia ele continua escrevendo
        texto_historia.textContent += historia_completa[letra]; //adiciona a letra atual do texto da historia ao texto do elemento
        temporizador_historia = setTimeout(escrever_historia, 50); //chama a função novamente após 50 milissegundos, para dar o efeito de digitação
        letra++; //incrementa a letra, ou seja, passa para a proxima letra
    } else {
        digitando = false; //quando termina de digitar ele para a função
        botao_jogar.hidden = false; //exibe o botão de jogar quando termina de digitar a historia
    }
}
//----------------------------------------------------------------- criacao das funcoes teste para criar obstaculos e verificar colisao -------------------------------------------------
function criar_obstaculo() {
    const obstaculo = document.createElement("img");
    const faixa_sorteada = Math.floor(Math.random() * faixas.length);


    obstaculo.className = "obstaculo"; //
    const chance_obstaculo = Math.random() * 100;
    let imagem_sorteada;

    //a chance do obstaculo com mais vida aparecer é maior
    if (chance_obstaculo < 45) {
        imagem_sorteada = 0;
    } else if (chance_obstaculo < 80) {
        imagem_sorteada = 1;
    } else {
        imagem_sorteada = 2;
    }

    obstaculo.src = detritos_fase_1[imagem_sorteada];
    obstaculo.dataset.vida = imagem_sorteada + 1;
    obstaculo.style.animationDuration = tempos_detritos[imagem_sorteada];
    obstaculo.style.width = tamanhos_detritos[imagem_sorteada];
    obstaculo.style.height = tamanhos_detritos[imagem_sorteada];
    obstaculo.alt = "";

    obstaculo.addEventListener("animationend", function () {  //quando a animação do obstaculo termina, ele remove o obstaculo da tela
        obstaculo.remove();
    });

    faixas[faixa_sorteada].appendChild(obstaculo); //sorteia uma faixa e mete obstaculo nela
}

function iniciar_obstaculos() {
    criar_obstaculo();

    gerador_obstaculos = setInterval(criar_obstaculo, 1200);
}

function verificar_colisao() {
    const obstaculos = document.querySelectorAll(".obstaculo");
    const tiros = document.querySelectorAll(".tiro");

    obstaculos.forEach(function (obstaculo) {
        tiros.forEach(function (tiro) {
            if (tiro.parentElement !== obstaculo.parentElement) {
                return;
            }

            const area_tiro = tiro.getBoundingClientRect();
            const area_obstaculo = obstaculo.getBoundingClientRect();

            if (
                area_tiro.right >= area_obstaculo.left &&
                area_tiro.left <= area_obstaculo.right
            ) {
                tiro.remove();

                let vida_obstaculo = Number(obstaculo.dataset.vida);  //logica p denifiçao de vidas diferentes p cada asteróide
                vida_obstaculo--;
                obstaculo.dataset.vida = vida_obstaculo;

                if (vida_obstaculo <= 0) {
                    obstaculo.remove();

                    score_fase++;  //soma pontos a cada obstaculo destruido
                    score_total++;
                    hud_score.textContent = score_fase;
                }
            }
        });
    });
}

setInterval(verificar_colisao, 20);
//-----------------------------------------------------------------------------------------------------

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
    clearTimeout(temporizador_historia);
    tela_inicial.hidden = true; //começã escondido
    historia.hidden = false; //mostra a historia primeiro antes de permitir começar o jogo

    texto_historia.textContent = "";
    botao_jogar.hidden = true; //esconde o botão de jogar enquanto a historia está sendo digitada
    letra = 0; //reinicia a letra para 0, para que a historia seja digitada do inicio
    digitando = true; //indica que a historia está sendo digitada

    escrever_historia(); //chama a função
});

botao_voltar_historia.addEventListener("click", function (evento) {
    evento.stopPropagation();
    clearTimeout(temporizador_historia);
    digitando = false;
    historia.hidden = true;
    tela_inicial.hidden = false;
});

historia.addEventListener("click", function () {
    if (digitando) {
        clearTimeout(temporizador_historia);
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

botao_voltar_selecao.addEventListener("click", function () {
    selecao_nave.hidden = true;
    historia.hidden = false;
    digitando = false;
    texto_historia.textContent = historia_completa;
    botao_jogar.hidden = false;
});

botao_voltar_jogo.addEventListener("click", function () {
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    document.querySelectorAll(".obstaculo, .tiro").forEach(function (elemento) {
        elemento.remove();
    });

    faixa_atual = 2;
    mover_nave();
    jogo.hidden = true;
    selecao_nave.hidden = false;
});


botao_escolher_escudo.addEventListener("click", function () {
    nave_escolhida = "escudo";

    nave_jogador.src = "assets/images/naves/nave-escudo.png";
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(4);
    hud_habilidade.textContent = "coração extra";

    selecao_nave.hidden = true;
    jogo.hidden = false;
    iniciar_obstaculos();
});

botao_escolher_rajada.addEventListener("click", function () {
    nave_escolhida = "rajada";

    nave_jogador.src = "assets/images/naves/nave-rajada.png";
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(3);
    hud_habilidade.textContent = "tiro rápido";

    selecao_nave.hidden = true;
    jogo.hidden = false;
    iniciar_obstaculos();
});

botao_escolher_barreira.addEventListener("click", function () {
    nave_escolhida = "barreira";

    nave_jogador.src = "assets/images/naves/nave-barreira.png";
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(3);
    hud_habilidade.textContent = "barreira protetora";

    selecao_nave.hidden = true;
    jogo.hidden = false;
    iniciar_obstaculos();
});

botao_escolher_impacto.addEventListener("click", function () {
    nave_escolhida = "impacto";

    nave_jogador.src = "assets/images/naves/nave-impacto.png";
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(3);
    hud_habilidade.textContent = "dano dobrado";

    selecao_nave.hidden = true;
    jogo.hidden = false;
    iniciar_obstaculos();
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

document.addEventListener("keydown", function (evento) {  //adiciona um evento de teclado para atirar
    if (jogo.hidden) {
        return;
    }

    if (evento.key === " ") {  //verifica se a tecla pressionada é espaço, que é a tecla para atirar
        evento.preventDefault();
        atirar();
    }
});
