// Função de login
function login() {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#senha').value;

    if (email === 'importacao@enviai.com.br' && password === 'enviai@2021') {
        alert('Seja Bem-Vindo');

        localStorage.setItem('loggedIn', 'true'); // Salva o estado de login no localStorage
        window.location.href = 'sistema.html'; // Redireciona para o sistema

    } else {
        alert('Usuário ou senha inválida');
    }
}

// Função de logout
function sair() {
    alert('Você saiu do sistema!');
    localStorage.removeItem('loggedIn'); // Remove o estado de login
    window.location.href = 'login.html'; // Redireciona para a página de login
}

function verificarLogin() {
    if (window.location.pathname.includes('sistema.html') && !localStorage.getItem('loggedIn')) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
    }
}

// Chama a função de verificação de login ao carregar o script
verificarLogin();

// Importação de etiquetas
let importacao = JSON.parse(localStorage.getItem('importacao')) || []; // Agora é um array de objetos

// Variáveis de controle de paginação
const ITEMS_PER_PAGE = 10;
let currentPage = 1;

// Função para exibir itens com paginação
function renderTable() {
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Limpa a tabela

    let start = (currentPage - 1) * ITEMS_PER_PAGE;
    let end = start + ITEMS_PER_PAGE;
    let paginatedItems = importacao.slice(start, end);

    paginatedItems.forEach(item => {
        let hora = new Date();
        let h = hora.getHours();
        let m = hora.getMinutes();
        let s = hora.getSeconds();

        let dataAtual = new Date();
        let dia = dataAtual.getDate();
        let mes = dataAtual.getMonth() + 1;
        let ano = dataAtual.getFullYear();

        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.rastreio}</td>
            <td>${item.cliente}</td>
            <td>${h}:${m}:${s}</td>
            <td>${dia}/${mes}/${ano}</td>
            <td>Não Coletado</td>
            <td><span onclick="deletarImportacao(this)">🗑️</span></td>
        `;
        tbody.appendChild(tr);
    });

    renderPagination();
}

// Função para renderizar botões de paginação
function renderPagination() {
    let paginationContainer = document.querySelector("#pagination");
    paginationContainer.innerHTML = ""; // Limpa os botões existentes

    let totalPages = Math.ceil(importacao.length / ITEMS_PER_PAGE);

    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement("button");
        button.textContent = i;
        button.className = i === currentPage ? "active" : "";
        button.onclick = () => {
            currentPage = i;
            renderTable();
        };
        paginationContainer.appendChild(button);
    }
}

window.onload = function () {
    renderTable();
};

function importar() {
    let tbRastreio = document.querySelector('#rastreio').value.toUpperCase();
    let cliente = document.querySelector('#cliente').value.toUpperCase();

    if (tbRastreio === "" || tbRastreio.length < 13) {
        alert('[ERRO] DIGITE UM RASTREIO VÁLIDO!');
        return;
    }

    if (cliente === "") {
        alert('[ERRO] DIGITE UM CLIENTE VÁLIDO!');
        return;
    }

    if (importacao.some(item => item.rastreio === tbRastreio)) {
        alert(`Rastreio já importado: ${tbRastreio}`);
        return;
    } else {
        // Adiciona o item no início do array
        importacao.unshift({ rastreio: tbRastreio, cliente }); // Salva rastreio e cliente como objeto

        // Salva o array no localStorage
        localStorage.setItem('importacao', JSON.stringify(importacao));

        // Limpa os campos de entrada
        document.querySelector('#rastreio').value = '';

        // Re-renderiza a tabela
        renderTable();

        alert('Rastreio Importado com sucesso!');

    }
}

function deletarImportacao(td) {
    let rastreio = td.parentElement.parentElement.querySelector('td').textContent;
    importacao = importacao.filter(item => item.rastreio !== rastreio); // Remove o rastreio do array

    // Salva o array atualizado no localStorage
    localStorage.setItem('importacao', JSON.stringify(importacao));

    // Re-renderiza a tabela
    renderTable();

    alert('Rastreio removido com sucesso!')
}
