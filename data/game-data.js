const PERSONAGENS = {
    edgar: {
nome: "Prof. Edgar",
// Para usar outra imagem, atualize o caminho em assets/images/.
imagem: "assets/images/edgard.png",
corBadge: "bg-cyan-600 border-cyan-300"
    },
    joao: {
nome: "Prof. João",
// Para usar outra imagem, atualize o caminho em assets/images/.
imagem: "assets/images/joao.png",
corBadge: "bg-fuchsia-600 border-fuchsia-300"
    }
};

/* ==========================================================================
   2. ROTEIRO DA VISUAL NOVEL (INTRODUÇÃO)
   ========================================================================== */
const roteiroVN = [
    {
personagem: "edgar",
texto: "Olá, estudante! Seja muito bem-vindo ao nosso Laboratório de ADS. Eu sou o Professor Edgar!"
    },
    {
personagem: "joao",
texto: "E eu sou o Professor João! Preparamos um teste prático sobre Inteligência Artificial para a nossa turma."
    },
    {
personagem: "edgar",
texto: "Com o avanço de ferramentas como Midjourney e DALL-E, identificar se uma imagem é real ou sintetizada se tornou um desafio crucial em TI e para as pessoas comuns no dia a dia."
    },
    {
personagem: "joao",
texto: "A dinâmica é estilo Kahoot: mostraremos 5 imagens. Você deve clicar em 'Gerada por IA' (▲ Vermelho) ou 'Imagem Real' (◆ Azul)."
    },
    {
personagem: "edgar",
texto: "Se acertar 3 ou mais das 5 imagens (60%), você é APROVADO! Caso contrário, terá que reiniciar o teste. Boa sorte!"
    }
];

/* ==========================================================================
   3. BANCO DE IMAGENS (REAL VS IA)
   Imagens locais em data/images/. Para expandir, adicione o arquivo e um item
   aqui (com isIA true/false). Cada jogo sorteia 5 imagens (ao menos uma real e uma IA).
   ========================================================================== */
const perguntas = [
    {
id: 1,
imagem: "data/images/photo-1514888286974-6c03e2ca1dba.jpg",
isIA: false,
titulo: "Gato doméstico descansando",
explicacao: "IMAGEM REAL: Apresenta reflexos ópticos autênticos nos olhos, pelos individuais definidos por foco de câmera real e fios de bigode naturais."
    },
    {
id: 2,
imagem: "data/images/photo-1618005182384-a83a8bd57fbe.jpg",
isIA: true,
titulo: "Arte conceitual fluida",
explicacao: "GERADA POR IA: Apresenta padrões de gradiente impossíveis fisicamente, simetria computacional perfeita e dobras sem lógica estrutural de relevo."
    },
    {
id: 3,
imagem: "data/images/photo-1541781774459-bb2af2f05b55.jpg",
isIA: false,
titulo: "Xícara de café sobre madeira",
explicacao: "IMAGEM REAL: Imperfeições naturais no grão da madeira, profundidade de campo óptica suave e vapor real fotografado com obturador rápido."
    },
    {
id: 4,
imagem: "data/images/photo-1620712943543-bcc4688e7485.jpg",
isIA: true,
titulo: "Cérebro digital com redes neurais",
explicacao: "GERADA POR IA: Ilustração sintetizada por computador combinando nós de luz não-físicos e circuitos sem conectividade elétrica real."
    },
    {
id: 5,
imagem: "data/images/photo-1507003211169-0a1dd7228f2d.jpg",
isIA: false,
titulo: "Retrato de homem sorrindo",
explicacao: "IMAGEM REAL: Textura de pele humana com poros visíveis, iluminação solar natural consistente nos dois lados do rosto e fundo naturalmente desfocado."
    },
    {
id: 6,
imagem: "data/images/photo-1682687220063-4742bd7fd538.jpg",
isIA: true,
titulo: "Paisagem surrealista cintilante",
explicacao: "GERADA POR IA: Mistura de estilos artísticos com aberrações cromáticas sintéticas e reflexos d'água que não obedecem às leis da física."
    },
    {
id: 7,
imagem: "data/images/photo-1486406146926-c627a92ad1ab.jpg",
isIA: false,
titulo: "Arranha-céu espelhado",
explicacao: "IMAGEM REAL: Linhas de perspectiva arquitetônica matematicamente exatas para uma lente grande-angular real e reflexos consistentes."
    },
    {
id: 8,
imagem: "data/images/photo-1618172193763-c511deb635ca.jpg",
isIA: true,
titulo: "Esferas de vidro flutuantes",
explicacao: "GERADA POR IA: Refração de luz incoerente dentro das esferas, ausência de sombras de contato e artefatos de renderização algorítmica."
    },
    {
id: 9,
imagem: "data/images/photo-1568602471122-7832951cc4c5.jpg",
isIA: false,
titulo: "Homem de óculos em ambiente urbano",
explicacao: "IMAGEM REAL: Micro-reflexos reais nas lentes dos óculos, dobras autênticas no tecido da jaqueta e grão ISO característico de fotografia."
    },
    {
id: 10,
imagem: "data/images/photo-1633167606207-d840b5070fc2.jpg",
isIA: true,
titulo: "Robô humanóide com neon",
explicacao: "GERADA POR IA: Texturas plásticas hiper-suavizadas sem desgaste mecânico real e linhas de contorno onduladas típicas de difusão."
    },
    {
id: 11,
imagem: "data/images/photo-1757437677475-4e08c6128862.jpg",
isIA: true,
titulo: "Urso em uma colina com montanhas ao fundo",
autor: "snap wander",
urlFonte: "https://unsplash.com/photos/GvY3h1jZyPE",
explicacao: "GERADA POR IA: Repare na pose muito ereta e quase humana do urso e em como ele parece colocado no meio da trilha; compare o contorno do animal com o terreno e a luz ao redor."
    },
    {
id: 12,
imagem: "data/images/photo-1548802673-380ab8ebc7b7.jpg",
isIA: false,
titulo: "Gato dormindo em uma cama",
autor: "PhilCreates",
urlFonte: "https://unsplash.com/photos/pdALzg0yN-8",
explicacao: "IMAGEM REAL: Os pelos, bigodes e marcas do gato continuam nítidos no primeiro plano, enquanto a janela e o quarto perdem foco ao fundo; as dobras e sombras da roupa de cama também parecem naturais."
    },
    {
id: 13,
imagem: "data/images/photo-1780317307778-a853511d11e7.jpg",
isIA: false,
titulo: "Poltrona, café e bolo em um cômodo aconchegante",
autor: "Ionut Vlad",
urlFonte: "https://unsplash.com/photos/iL9Ucm18HCE",
explicacao: "IMAGEM REAL: A luz quente da luminária cria sombras coerentes na parede, nas plantas e na poltrona; observe também as texturas e os objetos em diferentes planos da sala."
    },
    {
id: 14,
imagem: "data/images/photo-1676487861497-621848f548a6.jpg",
isIA: false,
titulo: "Gatos sentados nos degraus de um edifício",
autor: "nella n.",
urlFonte: "https://unsplash.com/photos/A1uBOTg-ak8",
explicacao: "IMAGEM REAL: Cada gato tem pelagem e postura próprias, e todos se apoiam nos mesmos degraus; as sombras, a perspectiva da escada e os grãos de ração reforçam a cena fotografada."
    },
    {
id: 15,
imagem: "data/images/photo-1727062052407-82ca83f702c2.jpg",
isIA: false,
titulo: "Gato preto e branco sobre uma rocha",
autor: "Gabriel Bodhi",
urlFonte: "https://unsplash.com/photos/1hb-2P0kYQA",
explicacao: "IMAGEM REAL: Repare nos fios de pelo contra o fundo desfocado, nas diferenças de luz refletidas nos olhos e nas patas apoiadas na rocha, com sombras compatíveis com a iluminação."
    },
    {
id: 16,
imagem: "data/images/photo-1674238923886-58c5ee7823aa.jpg",
isIA: false,
titulo: "Pessoa e cão no topo de uma montanha",
autor: "Brayden Prato",
urlFonte: "https://unsplash.com/photos/0MW4pkjRo7E",
explicacao: "IMAGEM REAL: A pessoa e o cão têm tamanho compatível com a distância e com a paisagem; a luz baixa projeta sombras sobre as rochas, enquanto as montanhas ao fundo ficam mais suaves."
    },
    {
id: 17,
imagem: "data/images/photo-1515488764276-beab7607c1e6.jpg",
isIA: false,
titulo: "Paisagem urbana de Zurique",
autor: "Ricardo Gomez Angel",
urlFonte: "https://unsplash.com/photos/Qgph3PrfOFY",
explicacao: "IMAGEM REAL: Observe os edifícios alinhados à margem, os barcos em escalas diferentes e seus reflexos quebrados na água; a perspectiva e a luz acompanham a paisagem."
    },
    {
id: 18,
imagem: "data/images/photo-1752775386309-0078dbbd391d.jpg",
isIA: false,
titulo: "Estufa com plantas e arquitetura",
autor: "Ryan Waldman",
urlFonte: "https://unsplash.com/photos/yiGKtvHBHnk",
explicacao: "IMAGEM REAL: A estrutura arqueada do teto mantém a perspectiva até o fundo, e as plantas e visitantes variam de forma e tamanho; luz e sombras atravessam a cobertura de modo coerente."
    },
    {
id: 19,
imagem: "data/images/photo-1674384389198-8b445b560489.jpg",
isIA: false,
titulo: "Pessoa lendo em um campo de flores",
autor: "Evita Tomševica",
urlFonte: "https://unsplash.com/photos/pjdjZMDVuXk",
explicacao: "IMAGEM REAL: As linhas impressas acompanham a curvatura das páginas, e os dedos seguram o livro junto à borda; flores, mão e folhas mostram detalhes em planos diferentes."
    },
    {
id: 20,
imagem: "data/images/photo-1758438919146-f3f59a6d2544.jpg",
isIA: false,
titulo: "Pessoa caminhando por uma floresta enevoada",
autor: "Zetong Li",
urlFonte: "https://unsplash.com/photos/tShk_bW2PtU",
explicacao: "IMAGEM REAL: Os raios de luz atravessam os espaços entre as árvores e iluminam a vegetação em diferentes intensidades; a pessoa acompanha a escala e a perspectiva do caminho."
    },
    {
id: 21,
imagem: "data/images/photo-1744708820019-f39b9df4488e.jpg",
isIA: false,
titulo: "Arquitetura moderna e antiga em Baku",
autor: "Zulfugar Karimov",
urlFonte: "https://unsplash.com/photos/F8unTaz5uWU",
explicacao: "IMAGEM REAL: As fachadas antigas e as torres modernas mantêm linhas de perspectiva consistentes; árvores e edifícios projetam sombras na mesma direção sob a luz do dia."
    },
    {
id: 22,
imagem: "data/images/pixabay-ai-orange-chick.jpg",
isIA: true,
titulo: "Pássaro feito de casca de laranja",
autor: "jbooba",
urlFonte: "https://pixabay.com/illustrations/ai-generated-orange-chick-bird-8637800/",
explicacao: "GERADA POR IA: O pássaro parece construído com gomos, casca e polpa de laranja, mas conserva olhos, bico e penas de ave; essa mistura impossível de materiais e anatomia é a principal pista."
    },
    {
id: 23,
imagem: "data/images/pixabay-ai-giraffe.jpg",
isIA: true,
titulo: "Girafa em estilo de ilustração",
autor: "Alan_Frijns",
urlFonte: "https://pixabay.com/illustrations/ai-generated-giraffe-animal-cute-7845395/",
explicacao: "GERADA POR IA: A girafa está centralizada com simetria quase perfeita, e seu rosto combina traços muito humanos — como cílios longos e expressão de retrato — com focinho e manchas de animal; observe também o acabamento excessivamente liso."
    },
    {
id: 24,
imagem: "data/images/pixabay-ai-dolphin.png",
isIA: true,
titulo: "Golfinho em uma cena marinha",
autor: "Auvryon",
urlFonte: "https://pixabay.com/illustrations/ai-generated-dolphin-nature-sea-8762319/",
explicacao: "GERADA POR IA: O golfinho tem aspecto metálico e polido, com focinho e olhos de brinquedo; os contornos e as marcas da pele parecem esculpidos, não molhados como os de um animal submerso."
    },
    {
id: 25,
imagem: "data/images/pixabay-ai-tuxedo-kitten.png",
isIA: true,
titulo: "Gatinho dormindo em um cenário cósmico",
autor: "Boy-Employee",
urlFonte: "https://pixabay.com/illustrations/ai-generated-cat-mystic-kitten-9419220/",
explicacao: "GERADA POR IA: O gatinho foi transformado em ilustração, com contornos e pinceladas uniformes, olhos e focinho simplificados e faixas douradas e estrelas formando um cenário cósmico impossível."
    },
    {
id: 26,
imagem: "data/images/pixabay-ai-arctic-landscape.png",
isIA: true,
titulo: "Paisagem ártica ao amanhecer",
autor: "Auvryon",
urlFonte: "https://pixabay.com/illustrations/ai-generated-arctic-landscape-dawn-8762318/",
explicacao: "GERADA POR IA: O céu combina estrelas nítidas e nuvens luminosas cor-de-rosa como uma nebulosa, ao mesmo tempo que ilumina montanhas nevadas; esse aspecto de galáxia sobre uma paisagem terrestre é fantástico."
    },
    {
id: 27,
imagem: "data/images/pixabay-ai-beach-waves.png",
isIA: true,
titulo: "Praia com ondas ao pôr do sol",
autor: "Auvryon",
urlFonte: "https://pixabay.com/illustrations/ai-generated-beach-waves-landscape-8746753/",
explicacao: "GERADA POR IA: As ondas e os reflexos aparecem em faixas muito regulares e brilhantes, quase desenhadas; compare a repetição das linhas na água com a espuma e os contornos igualmente estilizados."
    },
    {
id: 28,
imagem: "data/images/pixabay-ai-woman-portrait.jpg",
isIA: true,
titulo: "Retrato de mulher sorrindo",
autor: "pedroml",
urlFonte: "https://pixabay.com/illustrations/ai-generated-woman-beauty-smiling-8611554/",
explicacao: "GERADA POR IA: A pele e o sorriso têm acabamento muito uniforme, com poucos poros ou pequenas marcas, e o cabelo forma mechas largas e contínuas; observe essa aparência alisada em um retrato extremamente nítido."
    },
    {
id: 29,
imagem: "data/images/pixabay-ai-boy-portrait.png",
isIA: true,
titulo: "Retrato ilustrado de um menino",
autor: "susan-lu4esm",
urlFonte: "https://pixabay.com/illustrations/ai-generated-boy-guy-childhood-8635685/",
explicacao: "GERADA POR IA: Os olhos grandes e brilhantes, a pele sem textura e o cabelo composto por mechas esculpidas dão ao rosto proporções e acabamento de personagem 3D, não de fotografia."
    },
    {
id: 30,
imagem: "data/images/pixabay-ai-gemstones.jpg",
isIA: true,
titulo: "Corações de pedra e gemas",
autor: "PixelLabs",
urlFonte: "https://pixabay.com/illustrations/ai-generated-stone-hearts-gemstones-9054164/",
explicacao: "GERADA POR IA: Muitas pedras têm formato de coração quase idêntico, mas as veias, reflexos e bordas se fundem de maneiras inconsistentes; procure os contornos derretidos e padrões de pedra repetidos."
    }
];

const TOTAL_PERGUNTAS = 5;
const MINIMO_ACERTOS = 3;
