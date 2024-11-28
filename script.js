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


// importação de etiquetas

let importacao = JSON.parse(localStorage.getItem('importacao')) || []; // Carrega dados do localStorage ou cria um array vazio

// Carrega a tabela com os dados armazenados no localStorage
window.onload = function() {
    importacao.forEach(rastreio => {
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
            <td>${rastreio}</td>
            <td>Cliente</td>
            <td>${h}:${m}:${s}</td>
            <td>${dia}/${mes}/${ano}</td>
            <td>Não Coletado</td>
            <td><span onclick="deletarImportacao(this)">🗑️</span></td>
        `;
        document.querySelector("tbody").appendChild(tr);
    });
};

function importar() {
    let tbRastreio = document.querySelector('#rastreio').value.toUpperCase();
    let cliente = document.querySelector('#cliente').value.toUpperCase();

    if (tbRastreio === "" || tbRastreio.length < 9) {
        alert('[ERRO] DIGITE UM RASTREIO VÁLIDO!');
        return;
    }

    if (cliente === "") {
        alert('[ERRO] DIGITE UM CLIENTE VÁLIDO!');
        return;
    }

    if (importacao.includes(tbRastreio)) {
        alert(`Rastreio já importado: ${tbRastreio}`);
        return;
    } else {
        importacao.push(tbRastreio); // Adiciona o rastreio ao array

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
            <td>${tbRastreio}</td>
            <td>${cliente}</td>
            <td>${h}:${m}:${s}</td>
            <td>${dia}/${mes}/${ano}</td>
            <td>Não Coletado</td>
            <td><span onclick="deletarImportacao(this)">🗑️</span></td>
        `;
        document.querySelector("tbody").appendChild(tr);

        // Salva o array no localStorage
        localStorage.setItem('importacao', JSON.stringify(importacao));

        // Limpa os campos de entrada
        document.querySelector('#rastreio').value = '';
    }
}

function deletarImportacao(td) {
    let rastreio = td.parentElement.parentElement.querySelector('td').textContent;
    importacao = importacao.filter(item => item !== rastreio); // Remove o rastreio do array
    td.parentElement.parentElement.remove(); // Remove a linha da tabela

    // Salva o array atualizado no localStorage
    localStorage.setItem('importacao', JSON.stringify(importacao));
}

