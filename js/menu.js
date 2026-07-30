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

const tela_carregamento = document.querySelector("#tela-carregamento");
const status_carregamento = document.querySelector("#status-carregamento");
const barra_carregamento = document.querySelector(".barra-carregamento");
const progresso_carregamento = document.querySelector("#progresso-carregamento");
const botao_tentar_novamente = document.querySelector("#botao-tentar-novamente");

const musica_jogo = new Audio("audios/musica-opcional.mp3");
const som_tiro = new Audio("audios/shoot.mp3");
const som_nave_morreu = new Audio("audios/nave-morreu.mp3"); // Som da derrota.
const som_alerta_boss = new Audio("audios/game-start.mp3"); // Som da entrada do boss.
const som_raio_boss = new Audio("audios/raio-boss.mp3"); // Som do raio dos bosses.
const som_explosao_boss = new Audio("audios/explosao-boss.mp3"); // Som da explosão do boss.
musica_jogo.loop = true;

let musica_ligada = true;
let som_ligado = true;

let score_fase = 0;
let score_total = 0;

let fase_atual = 1;

let vidas = 3;
let protegido = false;
let habilidade_pronta = true;

let barreira_ativa = false;
let dano_dobrado = false;

// SOMENTE PARA TESTE DE DESENVOLVIMENTO: ATIVE ESTA CHAVE PELO CONSOLE PARA TRIPLICAR O DANO.
let dano_triplicado = false;

// SOMENTE PARA TESTE DE DESENVOLVIMENTO: ATIVE ESTA CHAVE PELO CONSOLE PARA RECEBER CINCO PONTOS POR INIMIGO.
let score_5 = false;

let fim_habilidade;
let fim_recarga;

let gerador_obstaculos;

let boss;
let boss_ativo = false;
let vida_boss = 0;
let barra_vida_boss;
let vida_atual_boss;
let nome_boss;
let quadro_boss = 0;
let animacao_boss;
let boss_invocando = false;
let boss_protegido = false;
let tempo_iniciar_invocacao;
let gerador_invocacao;
let detritos_criados = 0;
let detritos_ativos = 0;
let limite_detritos_invocacao = 3;
let movimento_boss;
let animacao_explosao_boss;
let tempo_entrada_boss;
let aviso_boss;
let faixa_boss = 2;
let direcao_boss = 1;
let boss_segunda_forma = false;
let boss_transformando = false;
let tempo_transformacao_boss;
let tempo_recuperar_vida_boss;

let tempo_agendar_raio_boss;
let tempo_disparo_raio_boss;
let animacao_raio_boss;
let mira_raio_boss;
let raio_boss;
let faixa_alvo_raio = 2;

let tempo_agendar_raio_final;
let tempo_disparo_raio_final;
let animacao_raio_final;
let miras_raio_final = [];
let raios_boss_final = [];
let faixas_alvo_raio_final = [];

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

// Imagem do tiro de cada nave.
const imagens_tiro = {
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
    "", // A primeira posição fica vazia porque as fases começam em 1.
    "assets/images/bosses/boss-fase-1-invocacao.png",
    "assets/images/bosses/boss-fase-2-invocacao.png",
    "assets/images/bosses/boss-fase-3-invocacao.png"
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

const sprites_raio_boss = [
    "assets/images/efeitos/raio-boss-sprite-1.png",
    "assets/images/efeitos/raio-boss-sprite-2.png",
    "assets/images/efeitos/raio-boss-sprite-3.png"
];

const sprites_boss_fase_3_forma_2 = [
    "assets/images/bosses/boss-fase-3-forma-2-sprite-1.png",
    "assets/images/bosses/boss-fase-3-forma-2-sprite-2.png",
    "assets/images/bosses/boss-fase-3-forma-2-sprite-3.png"
];

const sprite_transformacao_boss_fase_3 =
    "assets/images/bosses/boss-fase-3-transformacao.png";

const sprite_invocacao_boss_fase_3_forma_2 =
    "assets/images/bosses/boss-fase-3-forma-2-invocacao.png";

const sprites_raio_boss_fase_3 = [
    "assets/images/efeitos/raio-boss-fase-3-sprite-1.png",
    "assets/images/efeitos/raio-boss-fase-3-sprite-2.png",
    "assets/images/efeitos/raio-boss-fase-3-sprite-3.png"
];

// Lista tudo que deve carregar antes do jogo começar.
const imagens_precarregamento = [...new Set([
    ...Array.from(document.images, function (imagem) {
        return imagem.getAttribute("src");
    }).filter(Boolean),
    "assets/images/backgrounds/fundo-estelar-oficial.png",
    "assets/images/backgrounds/orbita-baixa-v2.png",
    "assets/images/backgrounds/orbita-media-v2.png",
    "assets/images/backgrounds/campo-kessler-v2.png",
    ...Object.values(imagens_tiro),
    ...detritos_fases.flat(),
    ...sprites_bosses.flat(),
    ...sprites_invocacao.filter(Boolean),
    ...sprites_explosao,
    ...sprites_explosao_detrito,
    ...sprites_raio_boss,
    ...sprites_boss_fase_3_forma_2,
    sprite_transformacao_boss_fase_3,
    sprite_invocacao_boss_fase_3_forma_2,
    ...sprites_raio_boss_fase_3
])];

const audios_precarregamento = [
    musica_jogo,
    som_tiro,
    som_nave_morreu,
    som_alerta_boss,
    som_raio_boss,
    som_explosao_boss
];

// Carrega uma imagem antes da partida.
function carregar_imagem(caminho) {
    return new Promise(function (resolver, rejeitar) {
        const imagem = new Image();

        imagem.addEventListener("load", resolver, { once: true });
        imagem.addEventListener("error", function () {
            rejeitar(new Error("Não foi possível carregar a imagem: " + caminho));
        }, { once: true });

        imagem.src = caminho;
    });
}

// Carrega um áudio antes da partida.
function carregar_audio(audio) {
    return new Promise(function (resolver, rejeitar) {
        function concluir() {
            audio.removeEventListener("canplaythrough", concluir);
            audio.removeEventListener("error", falhar);
            resolver();
        }

        function falhar() {
            audio.removeEventListener("canplaythrough", concluir);
            audio.removeEventListener("error", falhar);
            rejeitar(new Error("Não foi possível carregar o áudio: " + audio.src));
        }

        if (audio.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
            resolver();
            return;
        }

        audio.preload = "auto";
        audio.addEventListener("canplaythrough", concluir, { once: true });
        audio.addEventListener("error", falhar, { once: true });
        audio.load();
    });
}

// Atualiza o progresso do carregamento.
function atualizar_progresso_carregamento(concluidos, total) {
    const porcentagem = Math.round((concluidos / total) * 100);

    status_carregamento.textContent = "carregando recursos... " + porcentagem + "%";
    progresso_carregamento.style.width = porcentagem + "%";
    barra_carregamento.setAttribute("aria-valuenow", String(porcentagem));
}

// Libera o menu quando todos os arquivos terminam de carregar.
async function iniciar_precarregamento() {
    const total = imagens_precarregamento.length + audios_precarregamento.length;
    let concluidos = 0;

    tela_carregamento.hidden = false;
    botao_tentar_novamente.hidden = true;
    botao_start.disabled = true;
    document.body.setAttribute("aria-busy", "true");
    atualizar_progresso_carregamento(0, total);

    const tarefas = [
        ...imagens_precarregamento.map(carregar_imagem),
        ...audios_precarregamento.map(carregar_audio)
    ].map(function (tarefa) {
        return tarefa.then(function () {
            concluidos++;
            atualizar_progresso_carregamento(concluidos, total);
        });
    });

    try {
        await Promise.all(tarefas);
        status_carregamento.textContent = "missão pronta!";
        progresso_carregamento.style.width = "100%";
        barra_carregamento.setAttribute("aria-valuenow", "100");
        botao_start.disabled = false;
        document.body.setAttribute("aria-busy", "false");

        // Mostra a conclusão por um instante.
        setTimeout(function () {
            tela_carregamento.hidden = true;
        }, 250);
    } catch (erro) {
        console.error(erro);
        status_carregamento.textContent = "falha ao carregar os recursos";
        botao_tentar_novamente.hidden = false;
    }
}

const tempos_detritos = [
    "10s",
    "13s",
    "17s"
];

// A velocidade aumenta em cada fase.
const multiplicadores_velocidade_detritos = [0, 1, 1.1, 1.2];

const tamanhos_detritos = ["48px", "64px", "80px"];

const faixas = document.querySelectorAll(".faixa");
let faixa_atual = 2; // A nave começa na faixa do meio.

const historia_completa = texto_historia.textContent.replace(/\s+/g, " ").trim(); // Remove os espaços extras do texto.
let letra = 0;
let digitando = false;
let temporizador_historia;

let nave_escolhida = "";
let pode_atirar = true;
let espaco_pressionado = false;
let tiro_segurado;

function trocar_musica() {
    musica_ligada = !musica_ligada;
    musica_jogo.muted = !musica_ligada;
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
    som_ligado = !som_ligado;
    som_tiro.muted = !som_ligado;
    som_nave_morreu.muted = !som_ligado;
    som_alerta_boss.muted = !som_ligado;
    som_raio_boss.muted = !som_ligado;
    som_explosao_boss.muted = !som_ligado;
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

    if (letra < historia_completa.length) {
        texto_historia.textContent += historia_completa[letra];
        temporizador_historia = setTimeout(escrever_historia, 50); // Cria o efeito de digitação.
        letra++;
    } else {
        digitando = false;
        botao_jogar.hidden = false;
    }
}

function parar_apresentacao_fase() {
    clearTimeout(tempo_apresentacao_fase);
    apresentacao_fase.hidden = true;
}

function mostrar_apresentacao_fase() {
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
// Cria e controla os detritos.
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

    // Sorteia o tamanho e a vida do detrito.
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
    // Um tempo menor deixa o detrito mais rápido.
    const tempo_original = parseFloat(tempos_detritos[imagem_sorteada]);
    const tempo_da_fase = tempo_original / multiplicadores_velocidade_detritos[fase_atual];
    obstaculo.style.animationDuration = tempo_da_fase + "s";
    obstaculo.style.width = tamanhos_detritos[imagem_sorteada];
    obstaculo.style.height = tamanhos_detritos[imagem_sorteada];

    barra_vida.appendChild(vida_atual);
    obstaculo.appendChild(barra_vida);
    obstaculo.appendChild(imagem_obstaculo);

    obstaculo.addEventListener("animationend", function () {
        remover_detrito_invocado(obstaculo);
        obstaculo.remove();
        perder_vida();
    });

    faixas[faixa_sorteada].appendChild(obstaculo);

    return obstaculo;
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

    faixa.appendChild(explosao);
    remover_detrito_invocado(obstaculo);
    obstaculo.remove();

    const animacao_explosao = setInterval(function () {
        quadro_explosao++;

        if (quadro_explosao >= sprites_explosao_detrito.length) {
            clearInterval(animacao_explosao);
            explosao.remove();
            return;
        }

        explosao.src = sprites_explosao_detrito[quadro_explosao];
    }, 90); // A explosão do detrito é rápida.
}

// Limpa o raio do segundo boss.
function limpar_raio_boss() {
    clearTimeout(tempo_agendar_raio_boss);
    clearTimeout(tempo_disparo_raio_boss);
    clearInterval(animacao_raio_boss);

    if (mira_raio_boss) {
        mira_raio_boss.remove();
        mira_raio_boss = null;
    }

    if (raio_boss) {
        raio_boss.remove();
        raio_boss = null;
    }

    faixas.forEach(function (faixa) {
        faixa.classList.remove("faixa-marcada-raio");
    });
}

// Agenda o raio do segundo boss.
function agendar_raio_boss() {
    clearTimeout(tempo_agendar_raio_boss);

    if (fase_atual !== 2 || !boss_ativo) {
        return;
    }

    tempo_agendar_raio_boss = setTimeout(function () {
        iniciar_mira_raio_boss();
    }, 1200);
}

// Marca a faixa onde o jogador estava.
function iniciar_mira_raio_boss() {
    if (fase_atual !== 2 || !boss_ativo || boss_invocando) {
        return;
    }

    faixa_alvo_raio = faixa_atual;
    mira_raio_boss = document.createElement("div");
    mira_raio_boss.className = "mira-raio-boss";
    faixas[faixa_alvo_raio].classList.add("faixa-marcada-raio");
    faixas[faixa_alvo_raio].appendChild(mira_raio_boss);

    // O jogador tem 1,2 segundo para sair da faixa.
    tempo_disparo_raio_boss = setTimeout(function () {
        disparar_raio_boss();
    }, 1200);
}

function verificar_acerto_raio_boss() {
    if (faixa_atual === faixa_alvo_raio) {
        perder_vida();
    }
}

function disparar_raio_boss() {
    if (fase_atual !== 2 || !boss_ativo || boss_invocando) {
        limpar_raio_boss();
        return;
    }

    if (mira_raio_boss) {
        mira_raio_boss.remove();
        mira_raio_boss = null;
    }

    faixas[faixa_alvo_raio].classList.remove("faixa-marcada-raio");

    raio_boss = document.createElement("img");
    raio_boss.className = "raio-boss";
    raio_boss.src = sprites_raio_boss[0];
    raio_boss.alt = "";
    faixas[faixa_alvo_raio].appendChild(raio_boss);

    som_raio_boss.currentTime = 0;
    som_raio_boss.play();
    verificar_acerto_raio_boss();

    // Faz a animação do raio avançar e voltar.
    const sequencia_quadros = [0, 1, 2, 1, 0];
    let quadro_raio = 0;

    clearInterval(animacao_raio_boss);
    animacao_raio_boss = setInterval(function () {
        quadro_raio++;

        if (quadro_raio >= sequencia_quadros.length) {
            limpar_raio_boss();
            return;
        }

        raio_boss.src = sprites_raio_boss[sequencia_quadros[quadro_raio]];
        verificar_acerto_raio_boss();
    }, 90);
}

// Limpa os raios do boss final.
function limpar_raio_boss_final() {
    clearTimeout(tempo_agendar_raio_final);
    clearTimeout(tempo_disparo_raio_final);
    clearInterval(animacao_raio_final);

    miras_raio_final.forEach(function (mira) {
        mira.remove();
    });

    raios_boss_final.forEach(function (raio) {
        raio.remove();
    });

    miras_raio_final = [];
    raios_boss_final = [];
    faixas_alvo_raio_final = [];

    faixas.forEach(function (faixa) {
        faixa.classList.remove("faixa-marcada-raio-final");
    });
}

function agendar_raio_boss_final() {
    clearTimeout(tempo_agendar_raio_final);

    if (fase_atual !== 3 || !boss_ativo || !boss_segunda_forma || boss_transformando) {
        return;
    }

    tempo_agendar_raio_final = setTimeout(function () {
        iniciar_mira_raio_boss_final();
    }, 1200);
}

// Marca três faixas sem repetir nenhuma.
function escolher_faixas_raio_final() {
    const escolhidas = [faixa_atual];

    while (escolhidas.length < 3) {
        const faixa_sorteada = Math.floor(Math.random() * faixas.length);

        if (!escolhidas.includes(faixa_sorteada)) {
            escolhidas.push(faixa_sorteada);
        }
    }

    return escolhidas;
}

function iniciar_mira_raio_boss_final() {
    if (
        fase_atual !== 3 ||
        !boss_ativo ||
        !boss_segunda_forma ||
        boss_transformando ||
        boss_invocando
    ) {
        return;
    }

    faixas_alvo_raio_final = escolher_faixas_raio_final();

    faixas_alvo_raio_final.forEach(function (indice_faixa) {
        const mira = document.createElement("div");
        mira.className = "mira-raio-boss mira-raio-boss-final";
        faixas[indice_faixa].classList.add("faixa-marcada-raio-final");
        faixas[indice_faixa].appendChild(mira);
        miras_raio_final.push(mira);
    });

    // O jogador tem 1,2 segundo para buscar uma faixa segura.
    tempo_disparo_raio_final = setTimeout(function () {
        disparar_raio_boss_final();
    }, 1200);
}

function verificar_acerto_raio_boss_final() {
    if (faixas_alvo_raio_final.includes(faixa_atual)) {
        perder_vida();
    }
}

function disparar_raio_boss_final() {
    if (
        fase_atual !== 3 ||
        !boss_ativo ||
        !boss_segunda_forma ||
        boss_transformando ||
        boss_invocando
    ) {
        limpar_raio_boss_final();
        return;
    }

    miras_raio_final.forEach(function (mira) {
        mira.remove();
    });
    miras_raio_final = [];

    faixas_alvo_raio_final.forEach(function (indice_faixa) {
        const raio = document.createElement("img");
        faixas[indice_faixa].classList.remove("faixa-marcada-raio-final");
        raio.className = "raio-boss raio-boss-final";
        raio.src = sprites_raio_boss_fase_3[0];
        raio.alt = "";
        faixas[indice_faixa].appendChild(raio);
        raios_boss_final.push(raio);
    });

    som_raio_boss.currentTime = 0;
    som_raio_boss.play();
    verificar_acerto_raio_boss_final();

    const sequencia_quadros = [0, 1, 2, 1, 0];
    let quadro_raio = 0;

    clearInterval(animacao_raio_final);
    animacao_raio_final = setInterval(function () {
        quadro_raio++;

        if (quadro_raio >= sequencia_quadros.length) {
            limpar_raio_boss_final();
            return;
        }

        raios_boss_final.forEach(function (raio) {
            raio.src = sprites_raio_boss_fase_3[sequencia_quadros[quadro_raio]];
        });
        verificar_acerto_raio_boss_final();
    }, 90);
}

function obter_sprites_boss_atuais() {
    if (fase_atual === 3 && boss_segunda_forma) {
        return sprites_boss_fase_3_forma_2;
    }

    return sprites_bosses[fase_atual];
}

// Ativa a segunda forma do boss final com 40% de vida.
function ativar_segunda_forma_boss() {
    boss_segunda_forma = true;
    boss_transformando = true;
    boss_protegido = true;
    boss_invocando = false;

    clearInterval(animacao_boss);
    clearInterval(movimento_boss);
    clearInterval(gerador_invocacao);
    clearTimeout(tempo_iniciar_invocacao);
    limpar_raio_boss();
    limpar_raio_boss_final();

    document.querySelectorAll(".obstaculo, .tiro").forEach(function (elemento) {
        elemento.remove();
    });
    detritos_criados = 0;
    detritos_ativos = 0;

    vida_boss = Math.ceil(vidas_bosses[fase_atual] * 0.4);
    vida_atual_boss.style.width = "0%";
    vida_atual_boss.classList.add("vida-atual-boss-forma-2");
    barra_vida_boss.classList.add("barra-vida-boss-forma-2");
    nome_boss.textContent = "núcleo kessler reativado";

    // Espera um pouco antes de recuperar a barra.
    clearTimeout(tempo_recuperar_vida_boss);
    tempo_recuperar_vida_boss = setTimeout(function () {
        if (boss_ativo && boss_segunda_forma) {
            vida_atual_boss.style.width = "40%";
        }
    }, 280);

    boss.classList.remove("boss-atingido", "boss-escudo-atingido", "escudo-boss-final-atingido", "boss-invocacao-forma-2");
    boss.classList.add("boss-transformando");
    boss.style.transition = "none";
    boss.src = sprite_transformacao_boss_fase_3;

    if (aviso_boss) {
        aviso_boss.remove();
    }

    const titulo_aviso = document.createElement("strong");
    const nome_aviso = document.createElement("span");
    aviso_boss = document.createElement("div");
    aviso_boss.className = "aviso-boss aviso-segunda-forma";
    titulo_aviso.textContent = "núcleo reativado";
    nome_aviso.textContent = "segunda forma";
    aviso_boss.appendChild(titulo_aviso);
    aviso_boss.appendChild(nome_aviso);
    campo.appendChild(aviso_boss);

    campo.classList.add("campo-alerta");
    arena.classList.add("arena-alerta");
    musica_jogo.volume = 0.3;
    som_alerta_boss.currentTime = 0;
    som_alerta_boss.play();

    clearTimeout(tempo_transformacao_boss);
    tempo_transformacao_boss = setTimeout(function () {
        if (!boss_ativo) {
            return;
        }

        if (aviso_boss) {
            aviso_boss.remove();
            aviso_boss = null;
        }

        campo.classList.remove("campo-alerta");
        arena.classList.remove("arena-alerta");
        musica_jogo.volume = 1;
        boss_transformando = false;
        boss_protegido = false;
        boss.classList.remove("boss-transformando");
        boss.style.transition = "";
        quadro_boss = 0;
        boss.src = sprites_boss_fase_3_forma_2[quadro_boss];

        animar_boss();
        mover_boss();
        agendar_raio_boss_final();

        tempo_iniciar_invocacao = setTimeout(function () {
            iniciar_invocacao();
        }, 4500);
    }, 1900);
}

function criar_boss() {
    if (boss_ativo) {
        return;
    }

    boss_ativo = true;
    boss_protegido = true;
    boss_segunda_forma = false;
    boss_transformando = false;

    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;

    document.querySelectorAll(".obstaculo, .tiro").forEach(function (elemento) {
        elemento.remove();
    });

    quadro_boss = 0;
    vida_boss = vidas_bosses[fase_atual];

    boss = document.createElement("img");
    boss.className = "boss boss-entrando";
    boss.src = sprites_bosses[fase_atual][quadro_boss];
    boss.alt = "boss";

    barra_vida_boss = document.createElement("div");
    vida_atual_boss = document.createElement("div");
    nome_boss = document.createElement("strong");
    barra_vida_boss.className = "barra-vida-boss barra-vida-boss-entrada";
    vida_atual_boss.className = "vida-atual-boss";
    nome_boss.className = "nome-boss nome-boss-entrada";
    nome_boss.textContent = nomes_bosses[fase_atual];
    barra_vida_boss.appendChild(vida_atual_boss);

    campo.appendChild(boss);
    campo.appendChild(nome_boss);
    campo.appendChild(barra_vida_boss);

    faixa_boss = 2;
    direcao_boss = 1;
    boss.style.top = posicoes_boss[faixa_boss];

    mostrar_entrada_boss();
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

    campo.classList.add("campo-alerta");
    arena.classList.add("arena-alerta");
    musica_jogo.volume = 0.35;
    som_alerta_boss.currentTime = 0;
    som_alerta_boss.play();

    tempo_entrada_boss = setTimeout(function () {
        if (!boss_ativo) {
            return;
        }

        aviso_boss.remove();
        aviso_boss = null;
        campo.classList.remove("campo-alerta");
        arena.classList.remove("arena-alerta");
        boss.classList.remove("boss-entrando");
        barra_vida_boss.classList.remove("barra-vida-boss-entrada");
        nome_boss.classList.remove("nome-boss-entrada");
        musica_jogo.volume = 1;
        boss_protegido = false;

        animar_boss();
        mover_boss();
        agendar_raio_boss();

        tempo_iniciar_invocacao = setTimeout(function () {
            iniciar_invocacao();
        }, 4000);
    }, 2200); // Tempo do aviso do boss.
}

function animar_boss() {
    clearInterval(animacao_boss);
    const sprites_atuais = obter_sprites_boss_atuais();

    animacao_boss = setInterval(function () {
        quadro_boss++;

        if (quadro_boss > 2) {
            quadro_boss = 0;
        }

        boss.src = sprites_atuais[quadro_boss];
    }, 300);
}

function mover_boss() {
    clearInterval(movimento_boss);
    const intervalo_movimento = boss_segunda_forma ? 650 : 900;

    movimento_boss = setInterval(function () {
        faixa_boss = faixa_boss + direcao_boss;

        if (faixa_boss === 4) {
            direcao_boss = -1;
        } else if (faixa_boss === 0) {
            direcao_boss = 1;
        }

        boss.style.top = posicoes_boss[faixa_boss];
    }, intervalo_movimento);
}

function iniciar_invocacao() {
    if (!boss_ativo || boss_invocando || boss_transformando) {
        return;
    }

    limpar_raio_boss();
    limpar_raio_boss_final();

    boss_invocando = true;
    boss_protegido = true;
    detritos_criados = 0;
    detritos_ativos = 0;
    limite_detritos_invocacao =
        fase_atual === 3 && boss_segunda_forma ? 6 : 3;

    clearInterval(animacao_boss);

    const area_boss = boss.getBoundingClientRect();
    const area_campo = campo.getBoundingClientRect();

    clearInterval(movimento_boss);
    boss.style.transition = "none";
    boss.style.top = area_boss.top - area_campo.top + area_boss.height / 2 + "px";
    if (fase_atual === 3 && boss_segunda_forma) {
        boss.src = sprite_invocacao_boss_fase_3_forma_2;
        boss.classList.add("boss-invocacao-forma-2");
    } else {
        boss.src = sprites_invocacao[fase_atual];
    }

    invocar_detritos();
}

function invocar_detritos() {
    clearInterval(gerador_invocacao);

    gerador_invocacao = setInterval(function () {
        if (!boss_invocando) {
            clearInterval(gerador_invocacao);
            return;
        }

        const detrito = criar_obstaculo();
        detrito.dataset.invocado = "sim";
        detritos_criados++;
        detritos_ativos++;

        if (detritos_criados === limite_detritos_invocacao) {
            clearInterval(gerador_invocacao);
            verificar_fim_invocacao();
        }
    }, 600); // Cria um detrito a cada 600 milissegundos.
}

function remover_detrito_invocado(obstaculo) {
    if (obstaculo.dataset.invocado !== "sim") {
        return;
    }

    obstaculo.dataset.invocado = "removido";
    detritos_ativos--;
    verificar_fim_invocacao();
}

function verificar_fim_invocacao() {
    if (
        boss_invocando &&
        detritos_criados === limite_detritos_invocacao &&
        detritos_ativos === 0
    ) {
        terminar_invocacao();
    }
}

function terminar_invocacao() {
    if (!boss_ativo) {
        return;
    }

    clearInterval(gerador_invocacao);

    boss_invocando = false;
    boss_protegido = false;

    quadro_boss = 0;
    boss.classList.remove("boss-invocacao-forma-2");
    boss.src = obter_sprites_boss_atuais()[quadro_boss];
    boss.style.transition = "";

    animar_boss();
    mover_boss();
    agendar_raio_boss();
    agendar_raio_boss_final();

    tempo_iniciar_invocacao = setTimeout(function () {
        iniciar_invocacao();
    }, boss_segunda_forma ? 4500 : 4000);
}

function parar_boss() {
    boss_ativo = false;
    boss_invocando = false;
    boss_protegido = false;
    boss_transformando = false;

    clearInterval(animacao_boss);
    clearInterval(movimento_boss);
    clearInterval(gerador_invocacao);
    clearInterval(animacao_explosao_boss);
    clearTimeout(tempo_iniciar_invocacao);
    clearTimeout(tempo_entrada_boss);
    clearTimeout(tempo_transformacao_boss);
    clearTimeout(tempo_recuperar_vida_boss);
    limpar_raio_boss();
    limpar_raio_boss_final();

    campo.classList.remove("campo-alerta");
    arena.classList.remove("arena-alerta", "arena-impacto");
    musica_jogo.volume = 1;
    som_alerta_boss.pause();
    som_alerta_boss.currentTime = 0;
    som_raio_boss.pause();
    som_raio_boss.currentTime = 0;
    som_explosao_boss.pause();
    som_explosao_boss.currentTime = 0;

    if (aviso_boss) {
        aviso_boss.remove();
        aviso_boss = null;
    }

    detritos_criados = 0;
    detritos_ativos = 0;
    limite_detritos_invocacao = 3;

    if (boss) {
        boss.classList.remove("boss-transformando", "boss-invocacao-forma-2", "escudo-boss-final-atingido");
    }

    if (barra_vida_boss) {
        barra_vida_boss.remove();
    }

    if (nome_boss) {
        nome_boss.remove();
        nome_boss = null;
    }

    boss_segunda_forma = false;

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
                return;
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

                let vida_obstaculo = Number(obstaculo.dataset.vida);
                const dano_tiro = dano_triplicado ? 3 : dano_dobrado ? 2 : 1;
                vida_obstaculo = vida_obstaculo - dano_tiro;
                obstaculo.dataset.vida = vida_obstaculo;

                const vida_maxima = Number(obstaculo.dataset.vidaMaxima);
                const barra_vida = obstaculo.querySelector(".vida-atual-detrito");
                barra_vida.style.width = Math.max(vida_obstaculo, 0) / vida_maxima * 100 + "%";

                if (vida_obstaculo <= 0) {
                    explodir_detrito(obstaculo);

                    const pontos_inimigo = score_5 ? 5 : 1;
                    score_fase = score_fase + pontos_inimigo;
                    score_total = score_total + pontos_inimigo;
                    hud_score.textContent = score_fase;
                    if (score_fase >= 15) {
                        criar_boss();
                    }
                } else {
                    obstaculo.classList.add("detrito-atingido");

                    setTimeout(function () {
                        obstaculo.classList.remove("detrito-atingido");
                    }, 150);
                }
            }
        });
    });
}

function derrotar_boss() {
    parar_boss();

    let quadro_explosao = 0;

    som_explosao_boss.currentTime = 0;
    som_explosao_boss.play();

    boss.classList.remove("boss-atingido", "boss-escudo-atingido", "escudo-boss-final-atingido");
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

function verificar_colisao_boss() {
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

        if (
            area_tiro.right >= area_boss.left &&
            area_tiro.left <= area_boss.right &&
            area_tiro.bottom >= area_boss.top &&
            area_tiro.top <= area_boss.bottom
        ) {
            tiro.remove();

            if (boss_protegido) {
                const classe_impacto_escudo = fase_atual === 3 && boss_segunda_forma
                    ? "escudo-boss-final-atingido"
                    : "boss-escudo-atingido";

                boss.classList.add(classe_impacto_escudo);

                setTimeout(function () {
                    boss.classList.remove(classe_impacto_escudo);
                }, 160);

                return;
            }

            boss.classList.add("boss-atingido");
            arena.classList.add("arena-impacto");

            setTimeout(function () {
                boss.classList.remove("boss-atingido");
                arena.classList.remove("arena-impacto");
            }, 160);

            const dano_tiro = dano_triplicado ? 3 : dano_dobrado ? 2 : 1;
            vida_boss = vida_boss - dano_tiro;

            vida_atual_boss.style.width =
                Math.max(vida_boss, 0) / vidas_bosses[fase_atual] * 100 + "%";

            if (vida_boss <= 0) {
                if (fase_atual === 3 && !boss_segunda_forma) {
                    ativar_segunda_forma_boss();
                } else {
                    derrotar_boss();
                }
            }
        }
    });
}

// Verifica as colisões várias vezes por segundo.
setInterval(verificar_colisao, 20);
setInterval(verificar_colisao_boss, 20);

function verificar_colisao_nave() {
    if (jogo.hidden) {
        return;
    }

    const obstaculos = document.querySelectorAll(".obstaculo");
    const area_nave = nave_jogador.getBoundingClientRect();

    obstaculos.forEach(function (obstaculo) {
        if (obstaculo.parentElement !== nave_jogador.parentElement) {
            return;
        }

        const area_obstaculo = obstaculo.getBoundingClientRect();

        if (
            area_nave.right >= area_obstaculo.left &&
            area_nave.left <= area_obstaculo.right &&
            area_nave.bottom >= area_obstaculo.top &&
            area_nave.top <= area_obstaculo.bottom
        ) {
            remover_detrito_invocado(obstaculo);
            obstaculo.remove();
            perder_vida();
        }
    });
}

setInterval(verificar_colisao_nave, 20);

function atirar() {
    if (!pode_atirar || jogo.hidden || !modal_fase.hidden || !modal_final.hidden || !apresentacao_fase.hidden) {
        return;
    }

    pode_atirar = false;
    som_tiro.currentTime = 0;
    som_tiro.play();

    const tiro = document.createElement("img");

    tiro.className = "tiro";
    tiro.src = imagens_tiro[nave_escolhida];
    tiro.alt = "";

    tiro.addEventListener("animationend", function () {
        tiro.remove();
    });
    faixas[faixa_atual].appendChild(tiro);

    let intervalo_tiro = 300;

    if (nave_escolhida === "rajada") {
        intervalo_tiro = 250;
    }

    setTimeout(function () {
        pode_atirar = true;
    }, intervalo_tiro);
}

function iniciar_tiro_segurado() {
    if (espaco_pressionado) {
        return;
    }

    espaco_pressionado = true;
    atirar();
    tiro_segurado = setInterval(atirar, 30);
}

function parar_tiro_segurado() {
    espaco_pressionado = false;
    clearInterval(tiro_segurado);
}

function atualizar_vidas() {
    hud_vidas.innerHTML =
        '<img class="icone-vida" src="assets/images/ui/coracao-pixel.png" alt="">'.repeat(vidas);
}

function perder_vida() {
    if (protegido || barreira_ativa || jogo.hidden) {
        return;
    }

    protegido = true;
    vidas--;
    atualizar_vidas();
    nave_jogador.classList.add("nave-protegida");

    if (vidas <= 0) {
        nave_jogador.classList.remove("nave-protegida");
        mostrar_derrota();
        return;
    }

    setTimeout(function () {
        protegido = false;
        nave_jogador.classList.remove("nave-protegida");
    }, 1000);
}

function ativar_barreira() {
    if (nave_escolhida !== "barreira" || !habilidade_pronta) {
        return;
    }

    habilidade_pronta = false;
    barreira_ativa = true;
    nave_jogador.classList.add("barreira-ativa");
    hud_habilidade.textContent = "barreira ativa";

    fim_habilidade = setTimeout(function () {
        barreira_ativa = false;
        nave_jogador.classList.remove("barreira-ativa");
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

function limpar_habilidade() {
    clearTimeout(fim_habilidade);
    clearTimeout(fim_recarga);

    habilidade_pronta = true;
    barreira_ativa = false;
    dano_dobrado = false;

    nave_jogador.classList.remove("barreira-ativa", "impacto-ativo", "nave-protegida");
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
    som_nave_morreu.currentTime = 0;
    som_nave_morreu.play();
    clearInterval(gerador_obstaculos);
    gerador_obstaculos = null;
    limpar_habilidade();
    parar_boss();

    document.querySelectorAll(".obstaculo, .tiro, .boss, .explosao-detrito, .barra-vida-boss").forEach(function (elemento) {
        elemento.remove();
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
    som_nave_morreu.pause();
    som_nave_morreu.currentTime = 0;
    parar_apresentacao_fase();
    parar_boss();
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
    parar_boss();
    limpar_habilidade();
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
        hud_habilidade.textContent = "pronta";
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
    trocar_musica();
});

botao_som.addEventListener("click", function () {
    trocar_som();
});

botao_como_jogar.addEventListener("click", function () {
    modal_como_jogar.hidden = false;
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
    modal_como_jogar.hidden = true;
});

botao_creditos.addEventListener("click", function () {
    modal_creditos.hidden = false;
});

botao_fechar_creditos.addEventListener("click", function () {
    modal_creditos.hidden = true;
});

botao_proxima_fase.addEventListener("click", function () {
    iniciar_proxima_fase();
});

botao_start.addEventListener("click", function () {
    clearTimeout(temporizador_historia);
    tela_inicial.hidden = true;
    historia.hidden = false;

    texto_historia.textContent = "";
    botao_jogar.hidden = true;
    letra = 0;
    digitando = true;

    escrever_historia();
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
        texto_historia.textContent = historia_completa;
        letra = historia_completa.length;
        digitando = false;
        botao_jogar.hidden = false;
    }
});

botao_jogar.addEventListener("click", function () {
    historia.hidden = true;
    selecao_nave.hidden = false;
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
    if (jogo.hidden || !modal_fase.hidden || !modal_final.hidden || !apresentacao_fase.hidden || evento.repeat) {
        return;
    }

    const tecla = evento.key.toLowerCase();

    if ((tecla === "w" || tecla === "arrowup") && faixa_atual > 0) {
        evento.preventDefault();
        faixa_atual--;
        mover_nave();
    } else if ((tecla === "s" || tecla === "arrowdown") && faixa_atual < faixas.length - 1) {
        evento.preventDefault();
        faixa_atual++;
        mover_nave();
    }
});

document.addEventListener("keydown", function (evento) {
    if (jogo.hidden || !modal_fase.hidden || !modal_final.hidden || !apresentacao_fase.hidden) {
        return;
    }

    if (evento.key === " ") {
        evento.preventDefault();
        iniciar_tiro_segurado();
    }
    if (evento.key.toLowerCase() === "e") {
        ativar_barreira();
        ativar_impacto();
    }
});

document.addEventListener("keyup", function (evento) {
    if (evento.key === " ") {
        parar_tiro_segurado();
    }
});

window.addEventListener("blur", function () {
    parar_tiro_segurado();
});

botao_tentar_novamente.addEventListener("click", function () {
    iniciar_precarregamento();
});

// Começa a carregar os arquivos do jogo.
iniciar_precarregamento();
