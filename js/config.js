// Edite este arquivo para personalizar o presente.
// As fotos ficam em assets/images. Para trocar qualquer imagem, altere apenas o campo src.
const CONFIG = {
  girlfriendName: "Suelen",
  signature: "Matheus",
  relationshipStart: "2023-07-04T00:00:00",
  letterDate: "Dia dos Namorados",
  letter: `Suelen,

eu remontei esse pequeno universo usando pedacinhos reais da nossa vida: nossas fotos bobas, nossos passeios, seu sorriso, o gato fiscalizando tudo, e ate uma participacao especial do Michael Jackson porque, convenhamos, isso tem muito a nossa cara.

Eu gosto de olhar para essas imagens porque cada uma parece guardar um tipo diferente de saudade. Tem foto que me faz rir, foto que me deixa quietinho, foto que me lembra o quanto eu gosto do nosso jeito simples de existir juntos.

Voce tem essa mistura rara de beleza, carinho, humor e presenca. Voce deixa os dias mais leves, os momentos mais memoraveis e ate as coisas comuns parecem ganhar um brilho diferente quando voce esta perto.

Esse site nao e so uma pagina. E uma tentativa, feita com codigo e coracao, de dizer que voce importa muito para mim.

Obrigado por ser voce. Obrigado por ser meu amor.`,
  memories: [
    {
      title: "Nosso dia no parque",
      note: "Aquela energia leve de sentar na grama e esquecer um pouco do mundo.",
      emoji: "🌿",
      alt: "Matheus e Suelen sentados juntos no parque em um dia ensolarado",
      src: "assets/images/foto-nossa-no-parque.jpg",
      position: "center 58%",
      featured: true
    },
    {
      title: "Saudade boa",
      note: "Um brinde simples, mas com cara de memoria que fica.",
      emoji: "🥂",
      alt: "Matheus e Suelen segurando tacas em uma mesa",
      src: "assets/images/foto-saudade-boa.jpg",
      position: "center"
    },
    {
      title: "Nosso jeito",
      note: "A prova oficial de que romance tambem combina com careta.",
      emoji: "😝",
      alt: "Matheus e Suelen fazendo uma foto divertida de rosto",
      src: "assets/images/foto-nosso-jeito.jpg",
      position: "center"
    },
    {
      title: "Sorriso que melhora tudo",
      note: "Esse sorriso tem um poder absurdo sobre mim.",
      emoji: "✨",
      alt: "Suelen sorrindo em uma foto espontanea",
      src: "assets/images/foto-suelen-sorriso.jpg",
      position: "center"
    },
    {
      title: "Retrato favorito dela",
      note: "Bonita daquele jeito que faz a gente olhar duas vezes.",
      emoji: "❤️",
      alt: "Suelen com cabelo loiro, blusa preta e jeans",
      src: "assets/images/IMG-20250226-WA0029.jpg",
      position: "center 36%"
    },
    {
      title: "Cabelo rosa, olhar lindo",
      note: "Uma foto com cara de Pinterest e personalidade.",
      emoji: "🌸",
      alt: "Suelen com cabelo loiro e pontas rosas",
      src: "assets/images/IMG-20250107-WA0031.jpg",
      position: "center 28%"
    },
    {
      title: "De oculos",
      note: "Aquele charme calmo que deixa qualquer foto especial.",
      emoji: "🤍",
      alt: "Suelen usando oculos em uma selfie",
      src: "assets/images/IMG-20250314-WA0072.jpg",
      position: "center 35%"
    },
    {
      title: "Selfie no parque",
      note: "Dois bobos, uma tarde boa e uma fotita",
      emoji: "📸",
      alt: "Matheus e Suelen fazendo selfie em um parque",
      src: "assets/images/IMG_20250217_181454368.jpg",
      position: "center",
      featured: true
    },
    {
      title: "Nos dois no nosso mundo",
      note: "Aquele tipo de foto que nao precisa ser perfeita para ser perfeita.",
      emoji: "🏠",
      alt: "Matheus e Suelen juntos em uma foto descontraida em casa",
      src: "assets/images/IMG_20251120_210929379_HDR.jpg",
      position: "center"
    },
    {
      title: "O gato dela em close",
      note: "O fiscal oficial do namoro, em modo cinema.",
      emoji: "🐱",
      alt: "Close do gato de Suelen",
      src: "assets/images/IMG-20231130-WA0034.jpg",
      position: "center"
    },
    {
      title: "O gato sendo ele mesmo",
      note: "Uma foto que tem exatamente a energia caotica e fofa dele.",
      emoji: "🐾",
      alt: "Gato de Suelen mostrando a lingua",
      src: "assets/images/IMG-20240906-WA0045.jpg",
      position: "center 35%"
    },
    {
      title: "O gato de touquinha",
      note: "Norman sendo um bobão e ao mesmo tempo o gatinho mais fofo do mundo, puxou a mãe esse fela.",
      emoji: "🧸",
      alt: "Gato de Suelen usando uma touca fofa",
      src: "assets/images/IMG-20250310-WA0041.jpg",
      position: "center 45%"
    },
    {
      title: "Participacao especial",
      note: "Ele tinha que aparecer né, é o homi.",
      emoji: "🎵",
      alt: "Imagem divertida inspirada em Michael Jackson e Suelen",
      src: "assets/images/Gemini_Generated_Image_aj5yv4aj5yv4aj5y.png",
      position: "center 28%"
    }
  ],
  reminders: [
    ["🐸", "Sapinhos", "Sempre que vejo um sapo, penso em vc kkkkkk"],
    ["🦫", "Capivaras", "Calmas, unicas e impossiveis de nao amar. Em outras palavras, VOCÊ"],
    ["🐱", "O gato dela", "O guardiao oficial das nossas memorias."],
    ["🌸", "Flores", "Delicadas, bonitas e com cara de momento guardado."],
    ["🎵", "Michael Jackson", "Porque as vezes o amor tambem precisa de um moonwalk."],
    ["❤️", "Nos dois", "Minha combinacao favorita em qualquer universo."]
  ],
  manual: {
    Nome: "Suelen",
    Classe: "Pessoa Incrivel",
    Raridade: "Lendaria ⭐⭐⭐⭐⭐",
    Habilidades: ["Fazer eu sorrir", "Melhorar meus dias", "Ser linda sem tentar"],
    Fraquezas: ["Nenhuma encontrada"],
    "Poder especial": "Roubar meu coracao"
  },
  stats: [
    ["Carinho", "100%", 100],
    ["Fofura", "999%", 100],
    ["Beleza", "100%", 100],
    ["Capacidade de me deixar apaixonado", "∞", 100]
  ],
  reasons: [
    "Voce tem um jeito unico de deixar tudo mais leve.",
    "Só o seu sorriso ja ilumina meu dia.",
    "Voce é linda nos detalhes que talvez nem perceba.",
    "Voce me faz querer ser melhor.",
    "Com voce, ate o silencio fica confortavel.",
    "Voce e meu lugar favorito quando o mundo fica barulhento.",
    "Sua alegria tem uma energia que fica comigo.",
    "Voce transforma momentos simples em memoria.",
    "Voce combina carinho, beleza e humor de um jeito só seu.",
    "O nosso jeito bobo e uma das minhas coisas favoritas.",
    "Ate uma foto simples com voce vira lembranca importante.",
    "Voce faz esse pequeno universo inteiro fazer sentido."
  ],
  finalMessage:
    "Eu te amo, Suelen. Obrigado por ser a pessoa maravilhosa que voce é e por compartilhar esse amor comigo. Espero que esse presente seja so um pedacinho do quanto voce significa para mim, hoje e sempre."
};
