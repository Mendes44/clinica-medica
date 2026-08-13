/* ================================================================
   INTERAÇÕES GERAIS
   O arquivo não guarda dados sensíveis e não contém chaves de backend.
   ================================================================ */

// Seleciona os elementos do menu apenas quando existirem na página.
const menuButton = document.querySelector('.menu-botao');
const menu = document.querySelector('.menu');

// Abre e fecha a navegação móvel, atualizando atributos de acessibilidade.
function setMenu(open) {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('ativo', open);
    document.body.classList.toggle('menu-aberto', open);
}

menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

// Fecha o menu após a escolha de um link ou ao pressionar Escape.
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
});

// Atualiza o ano automaticamente em todos os rodapés.
document.querySelectorAll('[data-ano]').forEach((item) => {
    item.textContent = new Date().getFullYear();
});
