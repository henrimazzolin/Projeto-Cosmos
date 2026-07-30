const botao_como_jogar = document.querySelector("#botao-como-jogar");
const modal_como_jogar = document.querySelector("#modal-como-jogar");
const botao_fechar_como_jogar = document.querySelector("#botao-fechar-como-jogar");
const botao_musica = document.querySelector("#botao-musica");
const botao_som = document.querySelector("#botao-som");

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

const apresentacao_fase = document.querySelector("#apresentacao-fase");
const numero_fase = document.querySelector("#numero-fase");
const nome_fase = document.querySelector("#nome-fase");
const descricao_fase = document.querySelector("#descricao-fase");

const modal_final = document.querySelector("#modal-final");
const titulo_modal_final = document.querySelector("#titulo-modal-final");
const texto_modal_final = document.querySelector("#texto-modal-final");
const score_total_final = document.querySelector("#score-total-final");
const emblema_vitoria = document.querySelector("#emblema-vitoria");
const botao_reiniciar = document.querySelector("#botao-reiniciar");
const botao_menu = document.querySelector("#botao-menu");

const musica_jogo = new Audio("audios/musica-opcional.mp3");
const som_tiro = new Audio("audios/shoot.mp3");
const som_nave_morreu = new Audio("audios/nave-morreu.mp3"); //som usado somente na derrota
const som_alerta_boss = new Audio("audios/game-start.mp3"); //aviso usado na entrada do boss
musica_jogo.loop = true;

let musica_ligada = true; //guarda se a musica pode tocar
let som_ligado = true; //guarda se os efeitos podem tocar

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
let barra_vida_boss; //guarda a barra grande de vida do boss
let vida_atual_boss; //guarda a parte colorida q diminui
let quadro_boss = 0;
let animacao_boss;
let boss_invocando = false; //serve p saber se o boss ta invocando
let boss_protegido = false; //serve p impedir q o boss perca vida durante o escudo
let tempo_iniciar_invocacao; //guarda o tempo ate o boss comecar a invocar
let gerador_invocacao; //guarda o intervalo q vai criar os detritos
let detritos_criados = 0; //guarda quantos detritos o boss ja criou
let detritos_ativos = 0; //guarda quantos detritos invocados ainda estao na tela
let movimento_boss;
let animacao_explosao_boss; //guarda o intervalo da explosao grande
let tempo_entrada_boss; //guarda o tempo da entrada cinematografica
let aviso_boss; //guarda o texto de perigo criado na tela
let faixa_boss = 2;
let direcao_boss = 1;

let tempo_apresentacao_fase;

const posicoes_boss = [
    "31%",
    "40%",
    "50%",
    "60%",
    "69%"
]

const nomes_bosses = [
    "",
    "sentinela da órbita baixa",
    "colosso da órbita média",
    "núcleo do campo kessler"
];

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

const descricoes_fases = [
    "",
    "detritos metálicos e satélites quebrados ocupam esta região",
    "antigos satélites e partes de foguetes ocupam esta região",
    "uma tempestade de fragmentos ameaça formar o Campo Kessler"
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

const sprites_invocacao = [
    "", //fica vazio pq as fases comecam no numero 1
    "assets/images/bosses/boss-fase-1-invocacao.png", //sprite de invocacao da fase 1
    "assets/images/bosses/boss-fase-2-invocacao.png", //sprite de invocacao da fase 2
    "assets/images/bosses/boss-fase-3-invocacao.png" //sprite de invocacao da fase 3
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

const sprites_explosao_detrito = [
    "assets/images/efeitos/explosao-detrito-sprite-1.png",
    "assets/images/efeitos/explosao-detrito-sprite-2.png",
    "assets/images/efeitos/explosao-detrito-sprite-3.png"
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

function trocar_musica() {
    musica_ligada = !musica_ligada; //troca entre ligado e desligado
    musica_jogo.muted = !musica_ligada; //silencia somente a musica
    botao_musica.classList.toggle("audio-desligado", !musica_ligada);
    botao_musica.setAttribute("aria-pressed", String(!musica_ligada));

    if (musica_ligada) {
        botao_musica.title = "Música ligada";
        botao_musica.setAttribute("aria-label", "Desligar música");
    } else {
        botao_musica.title = "Música desligada";
        botao_musica.setAttribute("aria-label", "Ligar música");
    }
}

function trocar_som() {
    som_ligado = !som_ligado; //troca todos os efeitos ao mesmo tempo
    som_tiro.muted = !som_ligado;
    som_nave_morreu.muted = !som_ligado;
    som_alerta_boss.muted = !som_ligado;
    botao_som.classList.toggle("audio-desligado", !som_ligado);
    botao_som.setAttribute("aria-pressed", String(!som_ligado));

    if (som_ligado) {
        botao_som.title = "Efeitos sonoros ligados";
        botao_som.setAttribute("aria-label", "Desligar efeitos sonoros");
    } else {
        botao_som.title = "Efeitos sonoros desligados";
        botao_som.setAttribute("aria-label", "Ligar efeitos sonoros");
    }
}

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

function parar_apresentacao_fase() {
    clearTimeout(tempo_apresentacao_fase);
    apresentacao_fase.hidden = true;
}

function mostrar_apresentacao_fase() { //mostra a fase antes de liberar o jogo
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    musica_jogo.pause();

    hud_fase.textContent = nomes_fases[fase_atual];
    arena.style.backgroundImage = fundos_fases[fase_atual];
    numero_fase.textContent = "fase " + fase_atual;
    nome_fase.textContent = nomes_fases[fase_atual];
    descricao_fase.textContent = descricoes_fases[fase_atual];
    apresentacao_fase.hidden = false;

    clearTimeout(tempo_apresentacao_fase);
    tempo_apresentacao_fase = setTimeout(function () {
        apresentacao_fase.hidden = true;

        if (!jogo.hidden) {
            iniciar_obstaculos();
        }
    }, 2000);
}
//----------------------------------------------------------------- criacao das funcoes teste para criar obstaculos e verificar colisao -------------------------------------------------
function criar_obstaculo() {
    const obstaculo = document.createElement("div");
    const imagem_obstaculo = document.createElement("img");
    const barra_vida = document.createElement("div");
    const vida_atual = document.createElement("div");
    const faixa_sorteada = Math.floor(Math.random() * faixas.length);

    obstaculo.className = "obstaculo";
    imagem_obstaculo.className = "imagem-obstaculo";
    barra_vida.className = "barra-vida-detrito";
    vida_atual.className = "vida-atual-detrito";
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

    const vida_maxima = imagem_sorteada + 1;

    imagem_obstaculo.src = detritos_fases[fase_atual][imagem_sorteada];
    imagem_obstaculo.alt = "";
    obstaculo.dataset.vida = vida_maxima;
    obstaculo.dataset.vidaMaxima = vida_maxima;
    obstaculo.style.animationDuration = tempos_detritos[imagem_sorteada];
    obstaculo.style.width = tamanhos_detritos[imagem_sorteada];
    obstaculo.style.height = tamanhos_detritos[imagem_sorteada];

    barra_vida.appendChild(vida_atual); //coloca a parte colorida dentro da barra
    obstaculo.appendChild(barra_vida); //coloca a barra em cima do detrito
    obstaculo.appendChild(imagem_obstaculo); //coloca a imagem dentro do obstaculo

    obstaculo.addEventListener("animationend", function () {  //quando a animação do obstaculo termina, ele remove o obstaculo da tela
        remover_detrito_invocado(obstaculo); //avisa se um detrito do boss saiu da tela
        obstaculo.remove();
        perder_vida(); //perde vida se o detrito conseguir escapar pela esquerda
    });

    faixas[faixa_sorteada].appendChild(obstaculo); //sorteia uma faixa e mete obstaculo nela

    return obstaculo; //devolve o detrito p outras funcoes poderem usar ele
}

function explodir_detrito(obstaculo) {
    const faixa = obstaculo.parentElement;
    const area_obstaculo = obstaculo.getBoundingClientRect();
    const area_faixa = faixa.getBoundingClientRect();
    const explosao = document.createElement("img");
    let quadro_explosao = 0;

    explosao.className = "explosao-detrito";
    explosao.src = sprites_explosao_detrito[quadro_explosao];
    explosao.alt = "";
    explosao.style.left = area_obstaculo.left - area_faixa.left + area_obstaculo.width / 2 + "px";

    faixa.appendChild(explosao); //coloca a explosao no lugar do detrito
    remover_detrito_invocado(obstaculo); //avisa se um detrito invocado foi destruido
    obstaculo.remove(); //remove o detrito depois de guardar a posicao dele

    const animacao_explosao = setInterval(function () {
        quadro_explosao++;

        if (quadro_explosao >= sprites_explosao_detrito.length) {
            clearInterval(animacao_explosao);
            explosao.remove();
            return;
        }

        explosao.src = sprites_explosao_detrito[quadro_explosao];
    }, 90); //troca rapido pq a explosao do detrito e pequena
}

function criar_boss() {
    if (boss_ativo) {
        return;
    }

    boss_ativo = true;
    boss_protegido = true; //protege o boss durante a entrada

    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;

    document.querySelectorAll(".obstaculo, .tiro").forEach(function (elemento) {
        elemento.remove(); //limpa o campo antes da entrada do boss
    });

    quadro_boss = 0;
    vida_boss = vidas_bosses[fase_atual];

    boss = document.createElement("img");
    boss.className = "boss boss-entrando";
    boss.src = sprites_bosses[fase_atual][quadro_boss];
    boss.alt = "boss";

    barra_vida_boss = document.createElement("div");
    vida_atual_boss = document.createElement("div");
    barra_vida_boss.className = "barra-vida-boss barra-vida-boss-entrada";
    vida_atual_boss.className = "vida-atual-boss";
    barra_vida_boss.appendChild(vida_atual_boss);

    campo.appendChild(boss);
    campo.appendChild(barra_vida_boss); //coloca a barra grande no topo do campo

    faixa_boss = 2;
    direcao_boss = 1;
    boss.style.top = posicoes_boss[faixa_boss];

    mostrar_entrada_boss(); //comeca a entrada cinematografica
}

function mostrar_entrada_boss() {
    const titulo_aviso = document.createElement("strong");
    const nome_aviso = document.createElement("span");

    aviso_boss = document.createElement("div");
    aviso_boss.className = "aviso-boss";
    titulo_aviso.textContent = "perigo";
    nome_aviso.textContent = nomes_bosses[fase_atual];

    aviso_boss.appendChild(titulo_aviso);
    aviso_boss.appendChild(nome_aviso);
    campo.appendChild(aviso_boss);

    campo.classList.add("campo-alerta"); //escurece o campo
    arena.classList.add("arena-alerta"); //faz a arena tremer
    musica_jogo.volume = 0.35; //abaixa a musica durante o aviso
    som_alerta_boss.currentTime = 0;
    som_alerta_boss.play();

    tempo_entrada_boss = setTimeout(function () {
        if (!boss_ativo) {
            return; //para se o jogador sair durante a entrada
        }

        aviso_boss.remove();
        aviso_boss = null;
        campo.classList.remove("campo-alerta");
        arena.classList.remove("arena-alerta");
        boss.classList.remove("boss-entrando");
        barra_vida_boss.classList.remove("barra-vida-boss-entrada");
        musica_jogo.volume = 1;
        boss_protegido = false; //deixa o boss vulneravel depois da entrada

        animar_boss();
        mover_boss();

        tempo_iniciar_invocacao = setTimeout(function () {
            iniciar_invocacao(); //primeiro escudo depois da entrada
        }, 4000);
    }, 2200); //tempo total do aviso na tela
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

function iniciar_invocacao() {
    if (!boss_ativo || boss_invocando) { //verifica se o boss ta vivo ou se ele ja ta invocando
        return; //se nao puder invocar, para a funcao
    }

    boss_invocando = true; //avisa q a invocacao comecou
    boss_protegido = true; //ativa a protecao do boss
    detritos_criados = 0; //zera a contagem da nova invocacao
    detritos_ativos = 0; //comeca sem nenhum detrito ativo

    clearInterval(animacao_boss); //para o loop dos sprites normais

    const area_boss = boss.getBoundingClientRect(); //pega a posicao exata do boss
    const area_campo = campo.getBoundingClientRect(); //pega a posicao do campo

    clearInterval(movimento_boss); //para o movimento durante o escudo
    boss.style.transition = "none"; //impede o boss de continuar deslizando
    boss.style.top = area_boss.top - area_campo.top + area_boss.height / 2 + "px"; //segura ele no mesmo lugar
    boss.src = sprites_invocacao[fase_atual]; //troca a imagem normal pela imagem c escudo

    invocar_detritos(); //chama a funcao q cria os detritos
}

function invocar_detritos() {
    clearInterval(gerador_invocacao); //evita ter dois geradores funcionando juntos

    gerador_invocacao = setInterval(function () { //cria um detrito de tempo em tempo
        if (!boss_invocando) { //verifica se o boss ainda ta invocando
            clearInterval(gerador_invocacao); //para de criar os detritos
            return; //encerra essa parte da funcao
        }

        const detrito = criar_obstaculo(); //usa a mesma funcao dos detritos normais
        detrito.dataset.invocado = "sim"; //marca q esse detrito foi criado pelo boss
        detritos_criados++; //soma um na quantidade criada
        detritos_ativos++; //soma um na quantidade q ainda ta na tela

        if (detritos_criados === 3) { //verifica se ja criou os 3 detritos
            clearInterval(gerador_invocacao); //para o gerador
            verificar_fim_invocacao(); //confere se algum deles ja foi destruido
        }
    }, 600); //cria um detrito a cada 600 milissegundos
}

function remover_detrito_invocado(obstaculo) {
    if (obstaculo.dataset.invocado !== "sim") { //verifica se o detrito veio do boss
        return; //para se for um detrito normal
    }

    obstaculo.dataset.invocado = "removido"; //impede a mesma contagem duas vezes
    detritos_ativos--; //tira um da quantidade q ainda ta na tela
    verificar_fim_invocacao(); //confere se os tres ja sumiram
}

function verificar_fim_invocacao() {
    if (boss_invocando && detritos_criados === 3 && detritos_ativos === 0) {
        terminar_invocacao(); //tira o escudo somente depois dos tres sumirem
    }
}

function terminar_invocacao() {
    if (!boss_ativo) { //verifica se o boss ainda ta vivo
        return; //se ele nao tiver vivo, nao precisa voltar p animacao
    }

    clearInterval(gerador_invocacao); //garante q nenhum outro detrito vai ser criado

    boss_invocando = false; //avisa q a invocacao terminou
    boss_protegido = false; //faz o boss voltar a receber dano

    quadro_boss = 0; //volta o loop p primeira sprite
    boss.src = sprites_bosses[fase_atual][quadro_boss]; //coloca a sprite normal
    boss.style.transition = ""; //volta a deixar o movimento suave

    animar_boss(); //reinicia o movimento das 3 sprites normais
    mover_boss(); //faz o boss voltar a subir e descer

    tempo_iniciar_invocacao = setTimeout(function () { //espera antes do proximo escudo
        iniciar_invocacao(); //repete a invocacao enquanto o boss tiver vivo
    }, 4000); //o boss fica vulneravel por 4 segundos
}

function parar_boss() {
    boss_ativo = false; //avisa q o boss nao ta mais ativo
    boss_invocando = false; //para o estado de invocacao
    boss_protegido = false; //desliga a protecao

    clearInterval(animacao_boss); //para os sprites normais
    clearInterval(movimento_boss); //para o movimento
    clearInterval(gerador_invocacao); //para a criacao de detritos
    clearInterval(animacao_explosao_boss); //para a explosao se o jogador sair
    clearTimeout(tempo_iniciar_invocacao); //cancela a proxima invocacao
    clearTimeout(tempo_entrada_boss); //cancela a entrada cinematografica

    campo.classList.remove("campo-alerta");
    arena.classList.remove("arena-alerta", "arena-impacto");
    musica_jogo.volume = 1;
    som_alerta_boss.pause();
    som_alerta_boss.currentTime = 0;

    if (aviso_boss) {
        aviso_boss.remove(); //remove o texto de perigo se ele ainda existir
        aviso_boss = null;
    }

    detritos_criados = 0; //limpa a contagem criada
    detritos_ativos = 0; //limpa a contagem ativa

    if (barra_vida_boss) {
        barra_vida_boss.remove(); //remove a barra de vida do boss
    }

}

function iniciar_obstaculos() {
    clearInterval(gerador_obstaculos);
    musica_jogo.play();
    criar_obstaculo();

    gerador_obstaculos = setInterval(criar_obstaculo, 1200);
}

function verificar_colisao() {
    const obstaculos = document.querySelectorAll(".obstaculo");
    const tiros = document.querySelectorAll(".tiro");

    obstaculos.forEach(function (obstaculo) {
        tiros.forEach(function (tiro) {
            if (!obstaculo.isConnected) {
                return; //para se outro tiro ja destruiu esse detrito
            }

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

                const vida_maxima = Number(obstaculo.dataset.vidaMaxima);
                const barra_vida = obstaculo.querySelector(".vida-atual-detrito");
                barra_vida.style.width = Math.max(vida_obstaculo, 0) / vida_maxima * 100 + "%";

                if (vida_obstaculo <= 0) {
                    explodir_detrito(obstaculo);

                    score_fase++;  //soma pontos a cada obstaculo destruido
                    score_total++;
                    hud_score.textContent = score_fase;
                    if (score_fase === 15) {
                        criar_boss();
                    }
                } else {
                    obstaculo.classList.add("detrito-atingido"); //faz o detrito piscar branco

                    setTimeout(function () {
                        obstaculo.classList.remove("detrito-atingido");
                    }, 150);
                }
            }
        });
    });
}

function derrotar_boss() {
    parar_boss(); //para todos os tempos e remove a barra

    let quadro_explosao = 0;

    boss.classList.remove("boss-atingido", "boss-escudo-atingido");
    boss.classList.add("explosao-boss");
    boss.src = sprites_explosao[quadro_explosao];
    boss.alt = "";

    animacao_explosao_boss = setInterval(function () {
        quadro_explosao++;

        if (quadro_explosao >= sprites_explosao.length) {
            clearInterval(animacao_explosao_boss);
            boss.remove();

            if (fase_atual === 3) {
                mostrar_vitoria();
            } else {
                abrir_modal_fase();
            }

            return;
        }

        boss.src = sprites_explosao[quadro_explosao];
    }, 120);
}

function verificar_colisao_boss() {  //
    if (!boss_ativo || !boss) {
        return;
    }

    const tiros = document.querySelectorAll(".tiro");
    const area_boss = boss.getBoundingClientRect();

    tiros.forEach(function (tiro) {
        if (!boss_ativo) {
            return;
        }

        const area_tiro = tiro.getBoundingClientRect();

        if ( //verifica se o tiro colidiu com o boss, usando a função getBoundingClientRect() para pegar as coordenadas do tiro e do boss
            area_tiro.right >= area_boss.left &&
            area_tiro.left <= area_boss.right &&
            area_tiro.bottom >= area_boss.top &&
            area_tiro.top <= area_boss.bottom
        ) {
            tiro.remove();

            if (boss_protegido) { //verifica se o boss ta protegido
                boss.classList.add("boss-escudo-atingido");

                setTimeout(function () {
                    boss.classList.remove("boss-escudo-atingido");
                }, 160);

                return; //o tiro some mas nao tira vida do boss
            }

            boss.classList.add("boss-atingido"); //faz o boss piscar vermelho
            arena.classList.add("arena-impacto"); //treme a arena durante o acerto

            setTimeout(function () {
                boss.classList.remove("boss-atingido");
                arena.classList.remove("arena-impacto");
            }, 160);

            if (dano_dobrado) {
                vida_boss = vida_boss - 2;
            } else {
                vida_boss = vida_boss - 1;
            }

            vida_atual_boss.style.width =
                Math.max(vida_boss, 0) / vidas_bosses[fase_atual] * 100 + "%";

            if (vida_boss <= 0) {
                derrotar_boss();
            }
        }
    });
}

setInterval(verificar_colisao, 20); //essa função serve para verificar a colisão entre os tiros e os obstáculos, ela é chamada a cada 20 milissegundos
setInterval(verificar_colisao_boss, 20); //essa função serve para verificar a colisão entre os tiros e o boss, ela é chamada a cada 20 milissegundos

function verificar_colisao_nave() {
    if (jogo.hidden) {
        return; //nao verifica colisao fora da tela do jogo
    }

    const obstaculos = document.querySelectorAll(".obstaculo");
    const area_nave = nave_jogador.getBoundingClientRect();

    obstaculos.forEach(function (obstaculo) {
        if (obstaculo.parentElement !== nave_jogador.parentElement) {
            return; //para se o detrito estiver em outra faixa
        }

        const area_obstaculo = obstaculo.getBoundingClientRect();

        if (
            area_nave.right >= area_obstaculo.left &&
            area_nave.left <= area_obstaculo.right &&
            area_nave.bottom >= area_obstaculo.top &&
            area_nave.top <= area_obstaculo.bottom
        ) {
            remover_detrito_invocado(obstaculo); //avisa se era um detrito do boss
            obstaculo.remove(); //remove o detrito q bateu na nave
            perder_vida(); //tira uma vida do jogador
        }
    });
}

setInterval(verificar_colisao_nave, 20); //confere a colisao da nave varias vezes por segundo
//-----------------------------------------------------------------------------------------------------

function atirar() {
    if (!pode_atirar) {
        return;
    }

    pode_atirar = false;
    som_tiro.currentTime = 0;
    som_tiro.play();

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

    if (vidas <= 0) {
        mostrar_derrota(); //abre a derrota qdo todas as vidas acabam
        return;
    }

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
    musica_jogo.pause();
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    limpar_habilidade();

    document.querySelectorAll(".obstaculo, .tiro, .explosao-detrito, .barra-vida-boss").forEach(function (elemento) {
        elemento.remove();
    });

    titulo_modal_fase.textContent = "fase " + fase_atual + " concluída";
    texto_modal_fase.textContent = "A região foi limpa com sucesso.";
    score_total_modal.textContent = score_total;

    modal_fase.hidden = false;
}

function mostrar_vitoria() {
    musica_jogo.pause();
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    limpar_habilidade();

    document.querySelectorAll(".obstaculo, .tiro, .boss, .tiro-boss, .explosao-detrito, .barra-vida-boss").forEach(function (elemento) {
        elemento.remove();
    });

    titulo_modal_final.textContent = "missão concluída";
    texto_modal_final.textContent =
        "Parabéns! Você limpou as três regiões e protegeu as órbitas da Terra.";
    score_total_final.textContent = score_total;
    emblema_vitoria.hidden = false;
    modal_final.classList.add("modal-vitoria");

    modal_fase.hidden = true;
    modal_final.hidden = false;
}

function mostrar_derrota() {
    musica_jogo.pause();
    som_nave_morreu.currentTime = 0; //faz o som comecar do inicio
    som_nave_morreu.play(); //toca qdo a nave fica sem vidas
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    limpar_habilidade();
    parar_boss();

    document.querySelectorAll(".obstaculo, .tiro, .boss, .explosao-detrito, .barra-vida-boss").forEach(function (elemento) {
        elemento.remove(); //limpa os elementos q ficaram no campo
    });

    titulo_modal_final.textContent = "missão encerrada";
    texto_modal_final.textContent = "Sua nave ficou sem vidas. Tente novamente e continue limpando as órbitas.";
    score_total_final.textContent = score_total;
    emblema_vitoria.hidden = true;
    modal_final.classList.remove("modal-vitoria");

    modal_fase.hidden = true;
    modal_final.hidden = false;
}

function reiniciar_campanha() {
    som_nave_morreu.pause(); //para o som se o jogador reiniciar rapido
    som_nave_morreu.currentTime = 0;
    parar_apresentacao_fase();
    parar_boss(); //garante q nenhum tempo antigo continue funcionando
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

    mostrar_apresentacao_fase();
}

function iniciar_proxima_fase() {
    parar_apresentacao_fase();
    parar_boss(); //limpa os dados do boss da fase anterior
    limpar_habilidade(); //deixa a habilidade pronta na nova fase
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

    if (nave_escolhida === "barreira" || nave_escolhida === "impacto") {
        hud_habilidade.textContent = "pronta"; //atualiza a informacao depois do modal
    }

    protegido = false;
    pode_atirar = true;
    faixa_atual = 2;
    mover_nave();

    modal_fase.hidden = true;
    mostrar_apresentacao_fase();
}

function mover_nave() {
    faixas[faixa_atual].appendChild(nave_jogador);
}

botao_musica.addEventListener("click", function () {
    trocar_musica(); //liga ou desliga somente a musica
});

botao_som.addEventListener("click", function () {
    trocar_som(); //liga ou desliga os efeitos do jogo
});

botao_como_jogar.addEventListener("click", function () {
    modal_como_jogar.hidden = false;  // exibe o modal de como jogar - hidden = false
});
botao_reiniciar.addEventListener("click", function () {
    reiniciar_campanha();
});

botao_menu.addEventListener("click", function () {
    musica_jogo.pause();
    som_nave_morreu.pause();
    som_nave_morreu.currentTime = 0;
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    clearTimeout(temporizador_historia);
    parar_apresentacao_fase();
    limpar_habilidade();
    parar_boss();

    document.querySelectorAll(".obstaculo, .tiro, .boss, .tiro-boss, .explosao-detrito, .barra-vida-boss").forEach(function (elemento) {
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
    musica_jogo.pause();
    parar_apresentacao_fase();
    limpar_habilidade();
    parar_boss();
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    document.querySelectorAll(".obstaculo, .tiro, .boss, .explosao-detrito, .barra-vida-boss").forEach(function (elemento) {
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
    atualizar_vidas();
    hud_habilidade.textContent = "coração extra";

    selecao_nave.hidden = true;
    jogo.hidden = false;
    mostrar_apresentacao_fase();
});

botao_escolher_rajada.addEventListener("click", function () {
    nave_escolhida = "rajada";
    vidas = 3;

    nave_jogador.src = "assets/images/naves/nave-rajada.png";
    atualizar_vidas();
    hud_habilidade.textContent = "tiro rápido";

    selecao_nave.hidden = true;
    jogo.hidden = false;
    mostrar_apresentacao_fase();
});

botao_escolher_barreira.addEventListener("click", function () {
    nave_escolhida = "barreira";
    vidas = 3;

    nave_jogador.src = "assets/images/naves/nave-barreira.png";
    atualizar_vidas();
    hud_habilidade.textContent = "barreira protetora";

    selecao_nave.hidden = true;
    jogo.hidden = false;
    mostrar_apresentacao_fase();
});

botao_escolher_impacto.addEventListener("click", function () {
    nave_escolhida = "impacto";
    vidas = 3;

    nave_jogador.src = "assets/images/naves/nave-impacto.png";
    atualizar_vidas();
    hud_habilidade.textContent = "dano dobrado por 6 segundos";

    selecao_nave.hidden = true;
    jogo.hidden = false;
    mostrar_apresentacao_fase();
});

document.addEventListener("keydown", function (evento) {
    if (jogo.hidden || !modal_fase.hidden || !modal_final.hidden || !apresentacao_fase.hidden || evento.repeat) { //impede movimento c alguma tela aberta
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
    if (jogo.hidden || !modal_fase.hidden || !modal_final.hidden || !apresentacao_fase.hidden) {
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
