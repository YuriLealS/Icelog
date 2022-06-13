const botaoMenu = document.querySelector('.cabecalho__menu--cadastro');
const menu = document.querySelector('.menu__lateral');

botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('menu-lateral--ativo');
})
botao__voltar__menu.style.display = 'none';
function botao__voltar() {
    botoes__menu.style.display = 'flex';
    login__menu.style.display = 'none';
    cadastro__menu.style.display = 'none';
    botao__voltar__menu.style.display = 'none';
}
function botao__cadastro() {
    botoes__menu.style.display = 'none';
    botao__voltar__menu.style.display = 'flex';
    login__menu.style.display = 'none';
    cadastro__menu.style.display = 'flex';
}
function botao__login() {
    botoes__menu.style.display = 'none';
    cadastro__menu.style.display = 'none';
    botao__voltar__menu.style.display = 'flex';
    login__menu.style.display = 'flex';
}
