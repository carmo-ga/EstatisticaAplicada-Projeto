const mediaNormal = document.querySelector('#mediaNormal')
const desvioPadrao = document.querySelector('#desvioPadraoNormal')
const botaoCalcNormal = document.querySelector('#btnCalcNormal')
const exibeProbabilidade = document.querySelector('#exibeProbabilidadeNormal')
const botaoTeste = document.querySelector('#btnTeste')

function desenvolveCalculos() {
    let valorMedia = mediaNormal.value
    let valorDesvioPadrao = desvioPadrao.value
    let total = 0

    total = valorMedia * valorDesvioPadrao
    console.log(total)
    alert('Qualquer coisa')
}

botaoCalcNormal.addEventListener('click', desenvolveCalculos())

botaoTeste.addEventListener('click', desenvolveCalculos)