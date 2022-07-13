/*****
Script criado com ajuda dos seguintes colegas de classe:
- Vinicius Bortoletto - T24A\
****/
import { mathOne, mathTwo, logicOne } from './conteudo.js';

const campo = document.getElementById('questoes');
let temp = 0;
let qsort = [];
let rsort = [];
let optsort = [];

function respondeQuestao(arg) {
  let papaiDelas = this.parentElement;
  let tipoa = papaiDelas.getElementsByClassName('alternativa');
  let tipob = papaiDelas.getElementsByClassName('aIternativa');
  for (let i = 0; i < tipoa.length; i += 1) {
    tipoa[i].classList.add('errada');
  } if (arg.target.classList[0] === 'aIternativa') {
    arg.target.classList.add('certaacertou');
  } else {
    arg.target.classList.add('erradaerrou');
    tipob[0].classList.add('certa');
  }
}

function criaQuestao(arg1, arg2, arr) {
  /* Cria elemento Div com class e id 'questao' */
  let criaDiv = document.createElement('div');
  criaDiv.setAttribute('id', 'questao' + temp);
  criaDiv.classList.add('questao');
  campo.appendChild(criaDiv);
  let novoCampo = document.getElementById('questao' + temp);
  /* Cria elemento P com classe 'pergunta' */
  let criaP = document.createElement('p');
  criaP.classList.add('pergunta');
  criaP.innerHTML = arg1;
  /* Cria elemento Button com a classe 'aIternativa' para identificar ser a resposta certa, e prepara para inserção */
  let criaR = document.createElement('button');
  criaR.classList.add('aIternativa');
  criaR.addEventListener('click', respondeQuestao);
  criaR.innerHTML = arg2;
  /* Insere a pergunta na div */
  novoCampo.appendChild(criaP);
  /* Prepara array para randomizar as opções e já insere a correta */
  let alternativas = [criaR];
  /* Laço for para puxar as demais opções */
  for (let j = temp; j < (temp + 3); j += 1) {
    let criaAlt = document.createElement('button');
    criaAlt.classList.add('alternativa');
    criaAlt.addEventListener('click', respondeQuestao);
    criaAlt.innerHTML = arr[j];
    alternativas.push(criaAlt);
  }
  temp += 3;
  let opcoesVisualizadas = [];
  for (let i = 0; i < 4; i += 1) {
    let random = Math.floor(Math.random() * alternativas.length);
    opcoesVisualizadas.push(alternativas[random]);
    novoCampo.appendChild(opcoesVisualizadas[i]);
    alternativas.splice(random, 1);
  }
}

function sorteiaQuestao(arr) {
  const tpp = parseInt(sessionStorage.getItem('mkids-tarefasporpagina'));
  const divisor = Object.keys(arr).length / 2
  const sorteio = Math.floor(Math.random() * divisor);
  const qx = arr['q' + sorteio];
  const rx = arr['r' + sorteio];
  if (qsort.includes(qx) === false) {
    if (qsort.length === tpp || qsort.length === divisor) {
      return;
    }
    for (let i = 1; i < 4; i += 1) {
      let sortOp = 'op' + i;
      optsort.push(arr['r' + sorteio][sortOp]);
    }
    qsort.push(qx);
    rsort.push(rx.c);
    criaQuestao(qx, rx.c, optsort);
  }
  sorteiaQuestao(arr);
}

function tpp(arg) {
  sessionStorage.setItem('mkids-tarefasporpagina', arg);
}
tpp(4);

export default sorteiaQuestao;
