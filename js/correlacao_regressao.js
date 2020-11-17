const inputNomeVarX = document.querySelector('#inputNomeVarX')
const inputNomeVarY = document.querySelector('#inputNomeVarY')

const inputDadosEixoX = document.querySelector('#inputDadosEixoX')
const inputDadosEixoY = document.querySelector('#inputDadosEixoY')
const btnCalcCorrelacao = document.querySelector('#btnCalcCorrelacao')

const secaoexibeResultados = document.querySelector('#exibeResultadosCorrelacao')
const exibeCorrelacao = document.querySelector('#resultCoefCorrelacao')
const resultClassificacao = document.querySelector('#classificacao')
const resultadoRegressao = document.querySelector('#resultadoRegressao')
const eixoRegressao = document.querySelector('#eixoRegressao')
const valorEixoRegressao = document.querySelector('#valorEixoRegressao')
const resultEquacaoRegressao = document.querySelector('#resultEquacaoRegressao')

const divValorRegressao = document.querySelector('#divValorRegressao')
const divResultEquacaoRegressao = document.querySelector('#divResultEquacaoRegressao')
const chartDispersao = document.querySelector('#chartDispersao').getContext('2d')

// Função responsável pelas características da página após ser (re)carregada
function iniciar() {
    secaoexibeResultados.style.display = 'none'
    divValorRegressao.style.display = 'none'
    divResultEquacaoRegressao.style.display = 'none'
}

// Atribuir o nome da variável x ao select
function alterarNomeVariavelX() {
    let nomeVarX = inputNomeVarX.value
    if(nomeVarX !== "") eixoRegressao[1].innerText = nomeVarX
    else eixoRegressao[1].innerText = 'X'
}

// Atribuir o nome da variável y ao select
function alterarNomeVariavelY() {
    let nomeVarY = inputNomeVarY.value
    if(nomeVarY !== "") eixoRegressao[2].innerText = nomeVarY
    else eixoRegressao[2].innerText = 'Y'
}

// Seleção do eixo
function opcaoEixoRegressao() {
    if(eixoRegressao.selectedIndex !== 0) {
        divValorRegressao.style = 'display: normal'
        divResultEquacaoRegressao.style = 'display: normal'
    }
    else if(eixoRegressao.selectedIndex == 0) {
        divValorRegressao.style.display = 'none'
        divResultEquacaoRegressao.style.display = 'none'
    }
}

// Efetuar cálculo da equação da regressão considerando a variável e o valor escolhidos
function calcularEquacaoRegressao() {
    let variavelValor = valorEixoRegressao.value
    let resultadoEquacao = 0
    let index

    if(variavelValor !== '') {
        if(eixoRegressao.selectedIndex == 1) {
            resultadoEquacao = (a * variavelValor) + b
            index = 2
        }
        else if(eixoRegressao.selectedIndex == 2) {
            resultadoEquacao = (variavelValor - b) / a
            index = 1
        }
        resultEquacaoRegressao.innerText = eixoRegressao[index].innerText + ' = ' + resultadoEquacao.toFixed(2)
    }
    else {
        alert('Escolha o valor de ' + eixoRegressao[eixoRegressao.selectedIndex].innerText)
    }
}

// Validação dos campos de entrada
function validarDados() {
    let valido = true
    let dadosEixoX = (inputDadosEixoX.value).split(';')
    let dadosEixoY = (inputDadosEixoY.value).split(';')

    let vetorDadosEixoX = validarVetor(dadosEixoX)
    let vetorDadosEixoY = validarVetor(dadosEixoY)

    if(vetorDadosEixoX.length < 2) {
        alert('Os dados referentes à variável X são insuficientes para o cálculo.')
        valido = false
        inputDadosEixoX.focus()
    }
    else if(vetorDadosEixoY.length < 2) {
        alert('Os dados referentes à variável Y são insuficientes para o cálculo.')
        valido = false
        inputDadosEixoY.focus()
    }
    else if(vetorDadosEixoX.length !== vetorDadosEixoY.length) {
        alert('A quantidade de dados informados nas duas variáveis devem ser iguais.')
        valido = false
        inputDadosEixoY.focus()
    }
    
    if(valido === true) {   // Dados válidos - Atribuir valores e prosseguir para os cálculos
        secaoexibeResultados.style = 'display: normal'
        let nomeVarX = inputNomeVarX.value
        let nomeVarY = inputNomeVarY.value

        calcularCorrelacaoRegressao(vetorDadosEixoX, vetorDadosEixoY, nomeVarX, nomeVarY)
    }
}

// Validação dos valores de entrada das variáveis
function validarVetor(vetorEntrada) {
    let vetorValidado = []
    
    // Descarta eventuais espaços e valores não númericos
    for(let i = 0; i < vetorEntrada.length; i++) {
        vetorEntrada[i] = vetorEntrada[i].trim()
        // Verifica se há elementos vazios ou não númericos
        if(vetorEntrada[i] !== "" && (!isNaN(vetorEntrada[i]))) {
            vetorValidado.push(Number(vetorEntrada[i]))
        }
    }
    return vetorValidado
}

let a, b // Variáveis globais
function  calcularCorrelacaoRegressao(vetorEixoX, vetorEixoY, nomeVarX, nomeVarY) {   // Efetuar cálculos
    let somaX = somatorio(vetorEixoX)
    let somaY = somatorio(vetorEixoY)
    let somaXY = 0
    let somaX2 = somatorioAoQuadrado(vetorEixoX)
    let somaY2 = somatorioAoQuadrado(vetorEixoY)
    let numerador = 0
    let aux1, aux2
    let denominador = 0
    let r = 0
    let classificacao = ''
    let y = somaY / vetorEixoX.length
    let x = somaX / vetorEixoX.length

    // Fazer somatória do x * y
    for(let i = 0; i < vetorEixoX.length; i++) {
        somaXY += vetorEixoX[i] * vetorEixoY[i]
    }

    numerador = (vetorEixoX.length * somaXY) - (somaX * somaY)
    aux1 = Math.sqrt((vetorEixoX.length * somaX2) - (somaX * somaX))
    aux2 = Math.sqrt((vetorEixoX.length * somaY2) - (somaY * somaY))
    denominador = aux1 * aux2

    // Evitar divisão por zero
    if(denominador !== 0) {
        r = numerador / denominador
    }

    classificacao = classificarCorrelacao(r)

    // Cálculo da Regressão ----------------------------------
    a = numerador / ((vetorEixoX.length * somaX2) - (somaX * somaX))
    b = y - (a * x)

    exibeCorrelacao.innerHTML = 'Correlação: ' + (r * 100).toFixed(2) + '%'
    resultClassificacao.innerHTML = 'Grau: ' + classificacao
    resultadoRegressao.innerHTML = 'Equação:  y = ' + a.toFixed(3) + 'x + ' + b.toFixed(3)

    gerarGrafico(vetorEixoX, vetorEixoY, nomeVarX, nomeVarY)
}

// Função para somar todos os valores do vetor
function somatorio(vetorSoma) {
    let totalSoma = 0
    for(let i = 0; i < vetorSoma.length; i++) {
        totalSoma += vetorSoma[i]
    }
    return totalSoma
}

// Função para elevar os valores ao quadrado e somar os resultados
function somatorioAoQuadrado(vetorQuadrado) {
    let totalSomaQuadrado = 0
    for(let i = 0; i < vetorQuadrado.length; i++) {
        totalSomaQuadrado += vetorQuadrado[i] * vetorQuadrado[i]
    }
    return totalSomaQuadrado
}

// Função que retorna o tipo de classificação da correlação
function classificarCorrelacao(coeficiente) {
    if(coeficiente == 1) return 'Perfeita Positiva'
    if(coeficiente == -1) return 'Perfeita Negativa'
    if(coeficiente == 0) return 'Variáveis Não Correlacionadas'
    if(Math.abs(coeficiente) > 0 && Math.abs(coeficiente) < 0.30) return 'Fraca'
    if(Math.abs(coeficiente) >= 0.30 && Math.abs(coeficiente) < 0.70) return 'Moderada'
    if(Math.abs(coeficiente) >= 0.70 && Math.abs(coeficiente) < 1) return 'Forte'
}

// Gerar o gráfico
function gerarGrafico(vetorEixoX, vetorEixoY, nomeVarX, nomeVarY) {
    new Chart(chartDispersao, {
        type: 'scatter',
        data: {
            labels: nomeVarX,
            datasets: [{
                data: gerarObjetos(vetorEixoX, vetorEixoY),
                backgroundColor: 'green',
                fill: false,
                tension: 0,
                showLine: true
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
            scales: {
                responsive: true,
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontColor: 'black',
                        fontSize: 14,
                        labelString: nomeVarX
                    }
                }],
                yAxes: [ {
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontColor: 'black',
                        fontSize: 14,
                        labelString: nomeVarY
                    }
                }]
            }
        }
    })
}

// Gerar vetor de objetos que contém cada coordenada. São os pontos a serem exibidos no gráfico
function gerarObjetos(vetorEixoX, vetorEixoY) {
    let coordenadas = {}
    let x
    let y
    let pontos = []

    for(let i = 0; i < vetorEixoX.length; i++) {
        x = vetorEixoX[i]
        y = vetorEixoY[i]
        coordenadas = {x , y}
        pontos.push(coordenadas)
    }
    return pontos
}

// Atribuição dos eventos
window.onload = iniciar()
inputNomeVarX.addEventListener('keyup', alterarNomeVariavelX)
inputNomeVarY.addEventListener('keyup', alterarNomeVariavelY)
btnCalcCorrelacao.addEventListener('click', validarDados)
eixoRegressao.addEventListener('change', opcaoEixoRegressao)
valorEixoRegressao.addEventListener('change', calcularEquacaoRegressao)