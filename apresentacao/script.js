const cenas = Array.from(document.querySelectorAll("[data-cena]"));
const linksNavegacao = Array.from(document.querySelectorAll("[data-nav]"));
const passoAtual = document.querySelector("#passo-atual");
const retornoEscolha = document.querySelector("#retorno-escolha");
const continuarEscolha = document.querySelector("#continuar-escolha");

let cenaAtual = 0;

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

function irParaCena(indice) {
    const destino = Math.max(0, Math.min(indice, cenas.length - 1));
    cenas[destino].scrollIntoView({ behavior: "smooth", block: "start" });
}

function atualizarCenaAtiva(indice) {
    cenaAtual = indice;
    passoAtual.textContent = String(indice + 1).padStart(2, "0");

    cenas.forEach(function (cena, posicao) {
        cena.classList.toggle("ativa", posicao === indice);
    });

    linksNavegacao.forEach(function (link, posicao) {
        link.classList.toggle("ativo", posicao === indice);
        if (posicao === indice) {
            link.setAttribute("aria-current", "step");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

const observador = new IntersectionObserver(function (entradas) {
    const entradaVisivel = entradas
        .filter(function (entrada) {
            return entrada.isIntersecting;
        })
        .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
        })[0];

    if (entradaVisivel) {
        atualizarCenaAtiva(Number(entradaVisivel.target.dataset.cena));
    }
}, {
    threshold: [0.45, 0.65, 0.85]
});

cenas.forEach(function (cena) {
    observador.observe(cena);
});

document.querySelectorAll("[data-proxima]").forEach(function (botao) {
    botao.addEventListener("click", function () {
        irParaCena(cenaAtual + 1);
    });
});

document.querySelectorAll("[data-resposta]").forEach(function (botao) {
    botao.addEventListener("click", function () {
        const resposta = botao.dataset.resposta;

        document.querySelectorAll("[data-resposta]").forEach(function (alternativa) {
            alternativa.classList.remove("correta", "errada");
        });

        if (resposta === "b") {
            botao.classList.add("correta");
            retornoEscolha.textContent = "RESPOSTA CERTA: INFORMAÇÃO EXPLICA. EXPERIÊNCIA FAZ LEMBRAR.";
            retornoEscolha.className = "retorno-escolha sucesso";
            continuarEscolha.hidden = false;
        } else {
            botao.classList.add("errada");
            retornoEscolha.textContent = "QUASE. EXPLICAR INFORMA — MAS PARTICIPAR CRIA ENVOLVIMENTO.";
            retornoEscolha.className = "retorno-escolha falha";
            continuarEscolha.hidden = true;
        }
    });
});

document.addEventListener("keydown", function (evento) {
    const tagAtiva = document.activeElement && document.activeElement.tagName;
    const interagindo = tagAtiva === "BUTTON" || tagAtiva === "A";

    if (["ArrowDown", "PageDown"].includes(evento.key) || (evento.key === " " && !interagindo)) {
        evento.preventDefault();
        irParaCena(cenaAtual + 1);
    }

    if (["ArrowUp", "PageUp"].includes(evento.key)) {
        evento.preventDefault();
        irParaCena(cenaAtual - 1);
    }

    if (evento.key === "Home") {
        evento.preventDefault();
        irParaCena(0);
    }

    if (evento.key === "End") {
        evento.preventDefault();
        irParaCena(cenas.length - 1);
    }
});

atualizarCenaAtiva(0);
window.scrollTo({ top: 0, left: 0, behavior: "auto" });

window.addEventListener("pageshow", function () {
    window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            atualizarCenaAtiva(0);
        });
    });
}, { once: true });
