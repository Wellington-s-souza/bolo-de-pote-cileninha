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
  if (window.scrollY > 0.5) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

if (header) {
  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
}


