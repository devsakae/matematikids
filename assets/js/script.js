import { mathOne, mathTwo, logicOne } from './conteudo.js';

const campo = document.getElementById('questoes');
let temp = 0;
let qsort = [];
let rsort = [];
let optsort = [];

function criaQuestao(arg1, arg2, arr) {
  let criaP = document.createElement('p');
  criaP.classList.add('questao');
  criaP.innerHTML = arg1;
  let criaR = document.createElement('button');
  criaR.classList.add('option');
  criaR.classList.add('correct');
  criaR.innerHTML = arg2;
  campo.appendChild(criaP);

  let alternativas = [];
  alternativas.push(criaR);
  for (let j = temp; j < (temp + 3); j += 1) {
    let criaAlt = document.createElement('button');
    criaAlt.classList.add('option');
    criaAlt.innerHTML = arr[j];
    alternativas.push(criaAlt);
  }
  temp += 3;
  let opcoesVisualizadas = [];
  for (let i = 0; i < 4; i += 1) {
    let random = Math.floor(Math.random() * alternativas.length);
    opcoesVisualizadas.push(alternativas[random]);
    campo.appendChild(opcoesVisualizadas[i]);
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
      /* console.log('Questões')
      console.dir(qsort);
      console.log('Respostas corretas')
      console.dir(rsort);
      console.log('Opções')
      console.dir(optsort); */
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
