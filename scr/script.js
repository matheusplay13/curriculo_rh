// Estado do formulário
let dadosCurriculo = {
    idade: null,
    tipoContratacao: null,
    nome: '',
    email: '',
    telefone: ''
};

let passoAtual = 1;

// Validar idade e definir opções de contratação
function validarIdade() {
    const idadeInput = document.getElementById('idade');
    const idade = parseInt(idadeInput.value);
    const errorDiv = document.getElementById('idade-error');

    // Remover erro anterior se existir
    if (errorDiv) {
        errorDiv.remove();
    }

    // Validação
    if (!idade || idade < 14 || idade > 100) {
        const error = document.createElement('div');
        error.id = 'idade-error';
        error.className = 'error show';
        error.textContent = 'Por favor, insira uma idade válida entre 14 e 100 anos.';
        idadeInput.parentNode.insertBefore(error, idadeInput.nextSibling);
        return;
    }

    dadosCurriculo.idade = idade;
    mostrarOpcoesContratacao(idade);
    irParaPasso(2);
}

// Mostrar opções de contratação baseadas na idade
function mostrarOpcoesContratacao(idade) {
    const container = document.getElementById('opcoes-contratacao');
    container.innerHTML = '';

    let opcoes = [];

    if (idade >= 14 && idade <= 17) {
        opcoes = [
            { valor: 'menor_aprendiz', texto: 'Menor Aprendiz' }
        ];
    } else if (idade >= 18 && idade <= 25) {
        opcoes = [
            { valor: 'jovem_aprendiz', texto: 'Jovem Aprendiz' },
            { valor: 'clt', texto: 'CLT' }
        ];
    } else {
        opcoes = [
            { valor: 'clt', texto: 'CLT' }
        ];
    }

    opcoes.forEach((opcao, index) => {
        const label = document.createElement('label');
        label.className = 'opcao-contratacao';
        label.innerHTML = `
            <input type="radio" name="contratacao" value="${opcao.valor}">
            ${opcao.texto}
        `;
        label.onclick = function() {
            document.querySelectorAll('.opcao-contratacao').forEach(el => el.classList.remove('selected'));
            this.classList.add('selected');
            dadosCurriculo.tipoContratacao = opcao.valor;
        };
        container.appendChild(label);
    });
}

// Validar seleção de contratação
function validarContratacao() {
    if (!dadosCurriculo.tipoContratacao) {
        alert('Por favor, selecione um tipo de contratação.');
        return;
    }
    irParaPasso(3);
}

// Validar dados pessoais
function validarDadosPessoais() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (!nome) {
        alert('Por favor, preencha o nome completo.');
        return;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
        alert('Por favor, preencha um e-mail válido.');
        return;
    }

    if (!telefone) {
        alert('Por favor, preencha o telefone.');
        return;
    }

    dadosCurriculo.nome = nome;
    dadosCurriculo.email = email;
    dadosCurriculo.telefone = telefone;

    mostrarResumo();
    irParaPasso(4);
}

// Mostrar resumo do cadastro
function mostrarResumo() {
    const resumoDiv = document.getElementById('resumo-cadastro');
    
    const tipoContratacaoTexto = {
        'menor_aprendiz': 'Menor Aprendiz',
        'jovem_aprendiz': 'Jovem Aprendiz',
        'clt': 'CLT'
    };

    resumoDiv.innerHTML = `
        <div class="resumo-item">
            <div class="resumo-label">Idade:</div>
            <div class="resumo-valor">${dadosCurriculo.idade} anos</div>
        </div>
        <div class="resumo-item">
            <div class="resumo-label">Tipo de Contratação:</div>
            <div class="resumo-valor">${tipoContratacaoTexto[dadosCurriculo.tipoContratacao]}</div>
        </div>
        <div class="resumo-item">
            <div class="resumo-label">Nome Completo:</div>
            <div class="resumo-valor">${dadosCurriculo.nome}</div>
        </div>
        <div class="resumo-item">
            <div class="resumo-label">E-mail:</div>
            <div class="resumo-valor">${dadosCurriculo.email}</div>
        </div>
        <div class="resumo-item">
            <div class="resumo-label">Telefone:</div>
            <div class="resumo-valor">${dadosCurriculo.telefone}</div>
        </div>
    `;
}

// Navegação entre passos
function irParaPasso(passo) {
    document.getElementById(`step-${passoAtual}`).style.display = 'none';
    document.getElementById(`step-${passo}`).style.display = 'block';
    passoAtual = passo;
    document.getElementById('step-indicator').textContent = `Passo ${passo} de 4`;
}

function voltarPasso(passo) {
    irParaPasso(passo);
}

// Submeter formulário
document.getElementById('curriculo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aqui você pode enviar os dados para um servidor
    console.log('Dados do currículo:', dadosCurriculo);
    
    alert('Cadastro realizado com sucesso!\n\nDados:\n' + 
          'Nome: ' + dadosCurriculo.nome + '\n' +
          'Idade: ' + dadosCurriculo.idade + '\n' +
          'Tipo: ' + dadosCurriculo.tipoContratacao + '\n' +
          'E-mail: ' + dadosCurriculo.email + '\n' +
          'Telefone: ' + dadosCurriculo.telefone);
    
    // Resetar formulário
    this.reset();
    dadosCurriculo = {
        idade: null,
        tipoContratacao: null,
        nome: '',
        email: '',
        telefone: ''
    };
    passoAtual = 1;
    document.getElementById('step-4').style.display = 'none';
    document.getElementById('step-1').style.display = 'block';
    document.getElementById('step-indicator').textContent = 'Passo 1 de 4';
});
