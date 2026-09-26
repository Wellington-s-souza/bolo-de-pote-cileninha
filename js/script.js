/* =========================================================
   1) MENU MOBILE (hambúrguer)
   Ideia: o botão .menu-toggle liga/desliga a classe "nav-open"
   no <body>. O CSS já sabe o que fazer com essa classe
   (mostrar o painel .nav e transformar as 3 barrinhas em "X").
   ========================================================= */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    // aria-expanded avisa leitores de tela se o menu está aberto ou não
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Fecha o menu automaticamente ao clicar em um link
  // (senão o usuário clica em "Sabores" e o menu continua aberto por cima)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =========================================================
   2) HEADER COM SOMBRA AO ROLAR
   Adiciona a classe "is-scrolled" no header assim que a página
   desce mais de 10px. O CSS usa essa classe para encolher a logo
   e mostrar uma sombra sutil — dá a sensação de header "flutuando".
   ========================================================= */
const header = document.getElementById('header');

function updateHeaderOnScroll() {
  if (window.scrollY > 0) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

if (header) {
  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
}

/* =========================================================
   4) GALERIA COM ROLAGEM AUTOMÁTICA E INFINITA (GSAP)
   Duplicamos o conjunto de fotos quantas vezes forem necessárias
   até a trilha ficar pelo menos 2x mais larga que a tela — assim,
   em qualquer tamanho de monitor, sempre existe foto suficiente
   pra preencher a tela e nunca sobra espaço em branco.
   A distância exata do loop é a posição (em pixels) de onde a
   PRIMEIRA CÓPIA começa. Ao mover a trilha por esse valor, a cena
   fica idêntica à inicial — e aí dá pra repetir pra sempre sem
   nenhuma "costura" visível.
   ========================================================= */
if (typeof gsap !== 'undefined') {
  const galeriaTrack = document.querySelector('.galeria-track');
 
  if (galeriaTrack) {
   const itensOriginais = Array.from(galeriaTrack.children);

do {
  itensOriginais.forEach((item) => {
    const copia = item.cloneNode(true);
    copia.setAttribute('aria-hidden', 'true');
    galeriaTrack.appendChild(copia);
  });
} while (galeriaTrack.scrollWidth < window.innerWidth * 2);
 
    const primeiraCopia = galeriaTrack.children[itensOriginais.length];
    const distanciaDoLoop = primeiraCopia.offsetLeft;
 
    gsap.to(galeriaTrack, {
      x: -distanciaDoLoop,
      ease: 'none',
      duration: 25,   // quanto MAIOR esse número, mais DEVAGAR as fotos passam
      repeat: -1        // -1 = repete para sempre
    });
  }
}