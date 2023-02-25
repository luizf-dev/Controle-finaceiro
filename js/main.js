const transacoesUl = document.querySelector('#transactions');
const listarReceitas = document.querySelector('#money-plus');
const listarDespesas = document.querySelector('#money-minus');
const listarSaldoAtual = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputNome = document.querySelector('#text');
const inputValor = document.querySelector('#amount');
const checkboxDespesa = document.querySelector('#despesa');
const checkboxReceita = document.querySelector('#receita');

checkboxDespesa.addEventListener('click', () => {
  checkboxReceita.checked = false;
});

checkboxReceita.addEventListener('click', () => {
  checkboxDespesa.checked = false;
});


const localStorageTransacoes = JSON.parse(localStorage.getItem('transacoes'));
let transacoes = localStorage.getItem('transacoes') !== null ? localStorageTransacoes : [];

const removeTransacao = ID => {
    transacoes = transacoes.filter(transacao => transacao.id !== ID);
    atualizarLocalStorage();
    init();
}

const addvaloresDom = transacao => {

    const converteValor = transacao.valor.toLocaleString('pt-br', {minimumFractionDigits:2});
    const valorReal = converteValor;
    //const operador = transacao.valor < 0 ? '-' : '+';
    const classeCss = transacao.valor < 0 ? 'minus' : 'plus';
    const li = document.createElement('li');

    li.classList.add(classeCss);
    li.innerHTML = `
        ${transacao.nome}
        <span>  ${valorReal}</span>
        <button class="delete-btn" onClick="removeTransacao(${transacao.id})">
            x
        </button> 
    `;

    transacoesUl.append(li);
}

const atualizaValores = () => {
    const valoresTransacoes = transacoes.map(transacao => transacao.valor);
    const total = valoresTransacoes.reduce((acumulado, transacao) => acumulado + transacao, 0);
    const receitas = valoresTransacoes
        .filter((value => value > 0))
        .reduce((acumulado, value) => acumulado + value, 0);
    const despesas = Math.abs(valoresTransacoes
        .filter((value => value < 0))
        .reduce((acumulado, value) => acumulado + value, 0));


    var totalFormat = total;

    if(totalFormat > 0){
        var cor = '#2ecc71';
    }else if(totalFormat == 0){
        var cor = 'gray';
    }else{
        var cor = '#c0392b';
    }
    
    const totalReal = total.toLocaleString('pt-br', {minimumFractionDigits:2});
    const receitasReal = receitas.toLocaleString('pt-br', {minimumFractionDigits:2});
    const despesasReal = despesas.toLocaleString('pt-br', {minimumFractionDigits:2});

    listarSaldoAtual.style.color = cor;

    
    listarSaldoAtual.textContent = `R$ ${totalReal}`;
    listarReceitas.textContent = `R$ ${receitasReal}`;
    listarDespesas.textContent = `R$ ${despesasReal}`;    

}

const init = () => {
    transacoesUl.innerHTML = '';
    transacoes.forEach(addvaloresDom)
    atualizaValores();
}

init();

const atualizarLocalStorage = () => {
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
}

const gerarID = () => Math.round(Math.random() * 1000);

/*======EVENTOS=============*/

form.addEventListener('submit', evento => {
    evento.preventDefault();

    let tipoSelecionado;
    const nomeTransacao = inputNome.value.trim();
    const valorTransacao = inputValor.value.trim();
    const despesa = checkboxDespesa.value.trim();
    const receita = checkboxReceita.value.trim();
    const valorTransacaoSemMask = valorTransacao.replace(/\./g, '').replace(',', '.');
    const valorTransacaoReal = parseFloat(valorTransacaoSemMask);
    

    if(checkboxDespesa.checked){
        tipoSelecionado = despesa;
    }else if (checkboxReceita.checked){
        tipoSelecionado = receita;
    }      
    

    if(nomeTransacao === '' || valorTransacaoReal === ''){
        alert('Digite todos os campos!');
        return;
    }

    if(checkboxDespesa.checked == false && checkboxReceita.checked == false){
        alert('Selecione o tipo para registrar despesa ou receita!');
        return;
    }

    const valor = tipoSelecionado + valorTransacaoReal;
    
    
    const transacao = {id: gerarID(), nome: nomeTransacao, valor: Number(valor), tipo: tipoSelecionado};

    transacoes.push(transacao);
    init();
    atualizarLocalStorage();

    inputNome.value = '';
    inputValor.value = '';
});


//MOSTRA A DATA NA TELA 

    monName = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",  "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro")
    now = new Date

    const mesAno =  (monName [now.getMonth() ]   +  " / "  +     now.getFullYear ());

    // Exibe na tela usando a div#data-ano
    document.getElementById('mes-ano').innerHTML = mesAno;