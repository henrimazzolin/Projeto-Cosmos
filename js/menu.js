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
const arena = document.querySelector(".arena");
const campo = document.querySelector(".campo");
const botao_voltar_jogo = document.querySelector("#voltar-jogo");

const modal_fase = document.querySelector("#modal-fase");
const titulo_modal_fase = document.querySelector("#titulo-modal-fase");
const texto_modal_fase = document.querySelector("#texto-modal-fase");
const score_total_modal = document.querySelector("#score-total-modal");
const botao_proxima_fase = document.querySelector("#botao-proxima-fase");

const nave_jogador = document.querySelector("#nave-jogador");
const hud_vidas = document.querySelector("#hud-vidas");
const hud_habilidade = document.querySelector("#hud-habilidade");
const hud_score = document.querySelector("#hud-score");
const hud_fase = document.querySelector("#hud-fase");

const modal_final = document.querySelector("#modal-final");
const titulo_modal_final = document.querySelector("#titulo-modal-final");
const texto_modal_final = document.querySelector("#texto-modal-final");
const score_total_final = document.querySelector("#score-total-final");
const botao_reiniciar = document.querySelector("#botao-reiniciar");
const botao_menu = document.querySelector("#botao-menu");

let score_fase = 0;  //let nesse caso é pq o score não é fixo (let para valores que podem mudar, const para valores que não mudam)
let score_total = 0;

let fase_atual = 1; //esse começa em 1 e vai aumentando a cada fase, para que o jogador saiba em qual fase ele está

let vidas = 3;
let protegido = false;
let habilidade_pronta = true;

let barreira_ativa = false;
let dano_dobrado = false;

let fim_habilidade;
let fim_recarga;

let gerador_obstaculos;

let boss;
let boss_ativo = false;
let vida_boss = 0;
let quadro_boss = 0;
let animacao_boss;
let movimento_boss;
let faixa_boss = 2;
let direcao_boss = 1;

const posicoes_boss = [
    "31%",
    "40%",
    "50%",
    "60%",
    "69%"
]

const imagens_tiro = {  //listinha de cada tiro de cada nave, para que o jogo saiba qual imagem usar para cada tiro
    escudo: "assets/images/ui/tiro-escudo.png",
    rajada: "assets/images/ui/tiro-rajada.png",
    barreira: "assets/images/ui/tiro-barreira.png",
    impacto: "assets/images/ui/tiro-impacto.png"
};

const nomes_fases = [
    "",
    "Órbita Baixa",
    "Órbita Média",
    "Campo Kessler"
];

const fundos_fases = [
    "",
    'url("assets/images/backgrounds/orbita-baixa-v2.png")',
    'url("assets/images/backgrounds/orbita-media-v2.png")',
    'url("assets/images/backgrounds/campo-kessler-v2.png")'
];

const detritos_fase_1 = [
    "assets/images/detritos/fase-1/detrito-pequeno.png",
    "assets/images/detritos/fase-1/detrito-medio.png",
    "assets/images/detritos/fase-1/detrito-grande.png"
];

const detritos_fase_2 = [
    "assets/images/detritos/fase-2/detrito-pequeno.png",
    "assets/images/detritos/fase-2/detrito-medio.png",
    "assets/images/detritos/fase-2/detrito-grande.png"
];

const detritos_fase_3 = [
    "assets/images/detritos/fase-3/detrito-pequeno.png",
    "assets/images/detritos/fase-3/detrito-medio.png",
    "assets/images/detritos/fase-3/detrito-grande.png"
];

const detritos_fases = [
    [],
    detritos_fase_1,
    detritos_fase_2,
    detritos_fase_3
];

const sprites_bosses = [
    [],
    [
        "assets/images/bosses/boss-fase-1-sprite-1.png",
        "assets/images/bosses/boss-fase-1-sprite-2.png",
        "assets/images/bosses/boss-fase-1-sprite-3.png"
    ],
    [
        "assets/images/bosses/boss-fase-2-sprite-1.png",
        "assets/images/bosses/boss-fase-2-sprite-2.png",
        "assets/images/bosses/boss-fase-2-sprite-3.png"
    ],
    [
        "assets/images/bosses/boss-fase-3-sprite-1.png",
        "assets/images/bosses/boss-fase-3-sprite-2.png",
        "assets/images/bosses/boss-fase-3-sprite-3.png"
    ]
];

const vidas_bosses = [
    0,
    20,
    30,
    40
];

const sprites_explosao = [
    "assets/images/efeitos/explosao-boss-sprite-1.png",
    "assets/images/efeitos/explosao-boss-sprite-2.png",
    "assets/images/efeitos/explosao-boss-sprite-3.png"
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

    obstaculo.src = detritos_fases[fase_atual][imagem_sorteada];
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

function criar_boss() {
    if (boss_ativo) {
        return;
    }

    boss_ativo = true;

    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;

    document.querySelectorAll(".obstaculo").forEach(function (obstaculo) {
        obstaculo.remove();
    });

    quadro_boss = 0;
    vida_boss = vidas_bosses[fase_atual];

    boss = document.createElement("img");
    boss.className = "boss";
    boss.src = sprites_bosses[fase_atual][quadro_boss];
    boss.alt = "boss";

    campo.appendChild(boss);
    animar_boss();
    mover_boss();
}

function animar_boss() {
    clearInterval(animacao_boss);

    animacao_boss = setInterval(function () {
        quadro_boss++;

        if (quadro_boss > 2) {
            quadro_boss = 0;
        }

        boss.src = sprites_bosses[fase_atual][quadro_boss];
    }, 300);
}

function mover_boss() {
    clearInterval(movimento_boss);

    faixa_boss = 2;
    direcao_boss = 1;
    boss.style.top = posicoes_boss[faixa_boss];

    movimento_boss = setInterval(function () {
        faixa_boss = faixa_boss + direcao_boss;

        if (faixa_boss === 4) {
            direcao_boss = -1;
        } else if (faixa_boss === 0) {
            direcao_boss = 1;
        }

        boss.style.top = posicoes_boss[faixa_boss];
    }, 900);
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
                if (dano_dobrado) {
                    vida_obstaculo = vida_obstaculo - 2;
                } else {
                    vida_obstaculo = vida_obstaculo - 1;
                }
                obstaculo.dataset.vida = vida_obstaculo;

                if (vida_obstaculo <= 0) {
                    obstaculo.remove();

                    score_fase++;  //soma pontos a cada obstaculo destruido
                    score_total++;
                    hud_score.textContent = score_fase;
                    if (score_fase === 30) {
                        criar_boss();
                    }
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

function atualizar_vidas() { //atualiza as vidas de acordo c quantas vidas o jogador tem
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(vidas);
}

function perder_vida() {
    if (protegido || barreira_ativa || jogo.hidden) { //evita que o jogador perca vida se ele estiver protegido, se a barreira estiver ativa ou se o jogo estiver escondido
        return;
    }

    protegido = true;
    vidas--;
    atualizar_vidas();

    setTimeout(function () {
        protegido = false;
    }, 1000);
}

function ativar_barreira() {
    if (nave_escolhida !== "barreira" || !habilidade_pronta) {
        return;
    }

    habilidade_pronta = false;
    barreira_ativa = true;
    nave_jogador.classList.add("barreira-ativa"); //css da barreira
    hud_habilidade.textContent = "barreira ativa";

    fim_habilidade = setTimeout(function () {
        barreira_ativa = false;
        nave_jogador.classList.remove("barreira-ativa"); //css da barreira
        hud_habilidade.textContent = "recarregando";
    }, 3000);

    fim_recarga = setTimeout(function () {
        habilidade_pronta = true;
        hud_habilidade.textContent = "pronta";
    }, 15000);
}

function ativar_impacto() {
    if (nave_escolhida !== "impacto" || !habilidade_pronta) {
        return;
    }

    habilidade_pronta = false;
    dano_dobrado = true;
    nave_jogador.classList.add("impacto-ativo");
    hud_habilidade.textContent = "dano dobrado ativo por 6 segundos";

    fim_habilidade = setTimeout(function () {
        dano_dobrado = false;
        nave_jogador.classList.remove("impacto-ativo");
        hud_habilidade.textContent = "recarregando";
    }, 6000);

    fim_recarga = setTimeout(function () {
        habilidade_pronta = true;
        hud_habilidade.textContent = "pronta";
    }, 15000);
}

function limpar_habilidade() { //serve para limpar a habilidade ativa, caso o jogador mude de nave ou reinicie o jogo
    clearTimeout(fim_habilidade);
    clearTimeout(fim_recarga);

    habilidade_pronta = true;
    barreira_ativa = false;
    dano_dobrado = false;

    nave_jogador.classList.remove("barreira-ativa", "impacto-ativo");
}

function abrir_modal_fase() {
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    limpar_habilidade();

    document.querySelectorAll(".obstaculo, .tiro").forEach(function (elemento) {
        elemento.remove();
    });

    titulo_modal_fase.textContent = "fase " + fase_atual + " concluída";
    texto_modal_fase.textContent = "A região foi limpa com sucesso.";
    score_total_modal.textContent = score_total;

    modal_fase.hidden = false;
}

function mostrar_vitoria() {
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    limpar_habilidade();

    document.querySelectorAll(".obstaculo, .tiro, .boss, .tiro-boss").forEach(function (elemento) {
        elemento.remove();
    });

    titulo_modal_final.textContent = "missão concluída";
    texto_modal_final.textContent =
        "Parabéns! Você limpou as três regiões e protegeu as órbitas da Terra.";
    score_total_final.textContent = score_total;

    modal_fase.hidden = true;
    modal_final.hidden = false;
}

function reiniciar_campanha() {
    fase_atual = 1;
    score_fase = 0;
    score_total = 0;

    hud_fase.textContent = nomes_fases[fase_atual];
    hud_score.textContent = score_fase;
    arena.style.backgroundImage = fundos_fases[fase_atual];

    if (nave_escolhida === "escudo") {
        vidas = 4;
    } else {
        vidas = 3;
    }

    atualizar_vidas();
    limpar_habilidade();

    if (nave_escolhida === "barreira" || nave_escolhida === "impacto") {
        hud_habilidade.textContent = "pronta";
    }

    protegido = false;
    pode_atirar = true;
    faixa_atual = 2;
    mover_nave();

    modal_final.hidden = true;
    jogo.hidden = false;

    iniciar_obstaculos();
}

function iniciar_proxima_fase() {
    fase_atual++;
    score_fase = 0;

    hud_score.textContent = score_fase;
    hud_fase.textContent = nomes_fases[fase_atual];
    arena.style.backgroundImage = fundos_fases[fase_atual];

    if (nave_escolhida === "escudo") {
        vidas = 4;
    } else {
        vidas = 3;
    }

    atualizar_vidas();

    protegido = false;
    pode_atirar = true;
    faixa_atual = 2;
    mover_nave();

    modal_fase.hidden = true;
    iniciar_obstaculos();
}

function mover_nave() {
    faixas[faixa_atual].appendChild(nave_jogador);
}

botao_como_jogar.addEventListener("click", function () {
    modal_como_jogar.hidden = false;  // exibe o modal de como jogar - hidden = false
});
botao_reiniciar.addEventListener("click", function () {
    reiniciar_campanha();
});

botao_menu.addEventListener("click", function () {
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    clearTimeout(temporizador_historia);
    limpar_habilidade();

    document.querySelectorAll(".obstaculo, .tiro, .boss, .tiro-boss").forEach(function (elemento) {
        elemento.remove();
    });

    fase_atual = 1;
    score_fase = 0;
    score_total = 0;
    nave_escolhida = "";

    hud_fase.textContent = nomes_fases[fase_atual];
    hud_score.textContent = score_fase;
    arena.style.backgroundImage = fundos_fases[fase_atual];

    protegido = false;
    pode_atirar = true;
    faixa_atual = 2;
    mover_nave();

    modal_final.hidden = true;
    jogo.hidden = true;
    historia.hidden = true;
    selecao_nave.hidden = true;
    tela_inicial.hidden = false;
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

botao_proxima_fase.addEventListener("click", function () {
    iniciar_proxima_fase();
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
    limpar_habilidade();
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
    vidas = 4;

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
    vidas = 3;

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
    vidas = 3;

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
    vidas = 3;

    nave_jogador.src = "assets/images/naves/nave-impacto.png";
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(3);
    hud_habilidade.textContent = "dano dobrado por 6 segundos";

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
    if (evento.key.toLowerCase() === "e") {
        ativar_barreira();
        ativar_impacto();
    }
});
