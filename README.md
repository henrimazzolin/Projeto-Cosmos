# Operação Órbita Limpa

Jogo 2D educativo em pixel art sobre o problema do lixo espacial. O jogador controla uma nave horizontal, alterna entre cinco faixas e utiliza pulsos de coleta para neutralizar detritos antes de enfrentar o obstáculo principal de cada região orbital.

Este repositório contém somente o início da interface e os assets visuais dos cenários e detritos. O código do jogo deverá ser escrito manualmente pelo grupo.

## Problema real

Satélites desativados, estágios de foguetes e fragmentos de colisões permanecem em órbita e podem ameaçar equipamentos em funcionamento. O jogo apresenta esse problema de maneira simples, com um card educativo antes de cada fase.

Os textos educativos devem ser curtos e revisados pelo integrante responsável pela pesquisa. Números e afirmações específicas só devem ser usados quando acompanhados de uma fonte confiável, como NASA ou ESA.

## Escopo da primeira versão

- Jogo para computador executado no navegador.
- Área de jogo em proporção 16:9.
- Uma nave permanece no lado esquerdo e aponta para a direita.
- Movimento limitado a cinco faixas horizontais.
- Três fases com paisagens e detritos próprios.
- Três tamanhos de detrito em cada fase.
- Quatro naves provisórias, ainda sem nomes e sem imagens.
- Um chefe por fase, representado inicialmente por uma forma provisória.
- Vitória depois do terceiro chefe.

Não fazem parte da primeira versão: celular, multiplayer, ranking on-line, loja, sistema de melhorias, salvamento e animações complexas.

## Controles planejados

| Tecla | Ação |
|---|---|
| W ou seta para cima | Subir uma faixa |
| S ou seta para baixo | Descer uma faixa |
| Espaço | Disparar um pulso de coleta |
| E | Ativar a habilidade das naves ativas |

## Sistema de cinco faixas

A nave não se movimenta livremente. Ela ocupa uma das cinco posições verticais possíveis e troca apenas para a faixa imediatamente superior ou inferior.

Os detritos surgem além da borda direita em uma faixa sorteada e seguem para a esquerda. As linhas devem ser desenhadas pela interface do jogo e não estão incorporadas aos fundos.

## Detritos

| Tamanho | Vida | Dano | Pontos | Velocidade relativa |
|---|---:|---:|---:|---:|
| Pequeno | 1 | 10 | 10 | 1,2× |
| Médio | 2 | 20 | 20 | 1× |
| Grande | 3 | 30 | 30 | 0,8× |

Cada fase começa com um intervalo de 900 milissegundos entre detritos. Aos 200 pontos, o intervalo passa para 800 milissegundos; aos 400, passa para 700. A velocidade também aumenta 15% em cada um desses marcos.

Ao alcançar 600 pontos dentro da fase, o surgimento comum é interrompido e o chefe aparece. A pontuação geral continua acumulada, mas a contagem usada para liberar o próximo chefe recomeça na fase seguinte.

## Fases

### Fase 1 — Órbita Baixa

- Paisagem azul e ciano com a curvatura da Terra.
- Detrito pequeno: parafuso e fragmentos metálicos.
- Detrito médio: painel solar quebrado.
- Detrito grande: parte do corpo de um satélite.
- Chefe provisório com 20 pontos de vida.
- Card educativo: definição de lixo espacial.

### Fase 2 — Órbita Média

- Paisagem azul-escura e violeta, com a Terra mais distante.
- Detrito pequeno: conjunto de antenas quebradas.
- Detrito médio: caixa eletrônica danificada.
- Detrito grande: tanque de estágio de foguete.
- Chefe provisório com 30 pontos de vida.
- Card educativo: colisões podem produzir novos fragmentos.

### Fase 3 — Campo Kessler

- Paisagem roxa, vermelha e âmbar, com atmosfera mais perigosa.
- Detrito pequeno: conglomerado de estilhaços metálicos.
- Detrito médio: módulo de comunicação quebrado.
- Detrito grande: grande massa de sucata orbital.
- Chefe provisório com 40 pontos de vida.
- Card educativo: risco de colisões em cascata e prevenção.

## Quatro naves provisórias

Todas as naves começam com 100 pontos de vida, causam 1 ponto de dano por projétil e possuem o mesmo tamanho e velocidade. Elas devem usar a mesma forma geométrica provisória até que nomes e imagens sejam definidos.

| Identificação temporária | Tipo | Habilidade |
|---|---|---|
| Nave 1 | Passiva defensiva | Recebe 20% menos dano durante toda a partida |
| Nave 2 | Passiva ofensiva | Reduz o intervalo entre disparos de 300 para 250 milissegundos |
| Nave 3 | Ativa defensiva | Fica invulnerável por 3 segundos, com recarga total de 15 segundos |
| Nave 4 | Ativa ofensiva | Causa dano dobrado por 3 segundos, com recarga total de 15 segundos |

As quatro habilidades representam aproximadamente 20% de benefício teórico. As passivas são constantes; as ativas dependem do momento escolhido pelo jogador. Os valores deverão ser confirmados durante os testes.

## Assets disponíveis

### Fundos opacos — 1280×720

| Fase | Arquivo |
|---|---|
| Órbita Baixa | `assets/images/backgrounds/orbita-baixa.png` |
| Órbita Média | `assets/images/backgrounds/orbita-media.png` |
| Campo Kessler | `assets/images/backgrounds/campo-kessler.png` |

### Sprites transparentes

| Fase | Tamanho | Resolução | Arquivo |
|---|---|---:|---|
| 1 | Pequeno | 64×64 | `assets/images/detritos/fase-1/detrito-pequeno.png` |
| 1 | Médio | 128×128 | `assets/images/detritos/fase-1/detrito-medio.png` |
| 1 | Grande | 128×128 | `assets/images/detritos/fase-1/detrito-grande.png` |
| 2 | Pequeno | 64×64 | `assets/images/detritos/fase-2/detrito-pequeno.png` |
| 2 | Médio | 128×128 | `assets/images/detritos/fase-2/detrito-medio.png` |
| 2 | Grande | 128×128 | `assets/images/detritos/fase-2/detrito-grande.png` |
| 3 | Pequeno | 64×64 | `assets/images/detritos/fase-3/detrito-pequeno.png` |
| 3 | Médio | 128×128 | `assets/images/detritos/fase-3/detrito-medio.png` |
| 3 | Grande | 128×128 | `assets/images/detritos/fase-3/detrito-grande.png` |

As imagens das naves e dos chefes ainda não existem. Projéteis, linhas, partículas, barra de vida e formas provisórias podem ser desenhados diretamente pelo Canvas.

## Ordem rápida para desenvolver manualmente

1. Criar a área do jogo e desenhar cinco linhas temporárias.
2. Desenhar uma nave provisória com uma forma simples.
3. Fazer a nave trocar entre as cinco posições.
4. Adicionar o disparo básico e seu intervalo.
5. Criar um detrito provisório atravessando a tela.
6. Implementar colisão entre projétil e detrito.
7. Implementar colisão entre nave e detrito.
8. Adicionar vida, pontuação e tela de derrota.
9. Sortear faixas e tamanhos dos detritos.
10. Adicionar os marcos de dificuldade de 200 e 400 pontos.
11. Criar as quatro configurações de habilidade.
12. Implementar duração e recarga das duas habilidades ativas.
13. Criar a troca de fase aos 600 pontos e os chefes provisórios.
14. Adicionar cards educativos, seleção de nave e tela de vitória.
15. Integrar os fundos e sprites somente depois que as regras funcionarem.
16. Ajustar valores com base nos testes do grupo.

Trabalhar nessa ordem evita perder tempo com imagens e interface antes de confirmar que movimento, disparos e colisões funcionam.

## Divisão sugerida do grupo

- Jogo e imagens: programação manual, integração e direção visual.
- Apresentação: slides, roteiro, capturas e demonstração.
- Documentação: regras, tecnologias e diário de desenvolvimento.
- Pesquisa e validação: fontes sobre lixo espacial, revisão dos cards, testes e balanceamento.

## Checklist de testes

- A nave nunca sai das cinco faixas.
- O jogador não consegue ultrapassar a faixa superior ou inferior.
- O intervalo impede disparos ilimitados no mesmo instante.
- Cada projétil acerta somente os alvos previstos.
- Cada tamanho de detrito aplica vida, dano e pontos corretos.
- Os detritos sempre surgem em uma faixa válida.
- As mudanças de dificuldade acontecem aos 200 e 400 pontos.
- O chefe aparece aos 600 pontos e pausa os detritos comuns.
- As passivas funcionam sem precisar pressionar E.
- As ativas duram 3 segundos e voltam após 15 segundos.
- A vida nunca ultrapassa 100 nem fica exibida abaixo de zero.
- O terceiro chefe abre a tela de vitória.
- A derrota e o reinício funcionam sem atualizar a página.
- Todos os fundos e sprites aparecem sem distorção.
- Nenhum sprite mostra fundo verde ou bordas coloridas indesejadas.
- O jogo funciona no Chrome e no Edge sem erros no console.

## Uso de inteligência artificial

As paisagens e os sprites de detritos deste projeto foram produzidos com auxílio de inteligência artificial e depois preparados nas resoluções finais.

O código do jogo não deve ser gerado por IA. A IA poderá ser usada apenas para explicar conceitos, revisar pequenos trechos escritos pelo grupo ou ajudar a localizar erros específicos. Toda utilização deve ser registrada na documentação do projeto.
