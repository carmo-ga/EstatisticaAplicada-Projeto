const amostraSize = document.querySelector('#amostraSize')
const sucesso = document.querySelector('#sucesso')
const fracasso = document.querySelector('#fracasso')
const eventos = document.querySelector('#eventos')
const btnCalcBinomial = document.querySelector('#btnCalcBinomial')

const exibeProbabilidade = document.querySelector('#exibeProbabilidade')
const exibeMedia = document.querySelector('#exibeMediaBinomial')
const exibeDP = document.querySelector('#exibeDPBinomial')
const sectionExibeResultados = document.querySelector('#exibeResultados')

// Função responsável pelas características da página após ser (re)carregada
function iniciar() {
    sectionExibeResultados.style.display = 'none'
}

/* Validação do Input da Probabilidade de Sucesso -------- */
function sucessoChange() {
    if(isNaN(sucesso.value) || sucesso.value < 0 || sucesso.value > 100) {
        sucesso.value = ""
        sucesso.focus()
    }
    else {
        fracasso.value = 100 - sucesso.value
        eventos.focus()
    }
}

/* Validação do Input da Probabilidade de Fracasso -------- */
function fracassoChange() {
    if(isNaN(fracasso.value) || fracasso.value < 0 || fracasso.value > 100) {
        fracasso.value = ""
    }
    else {
        sucesso.value = 100 - fracasso.value
        eventos.focus()
    }
}

/* Calcular fatorial ---------- */
function calcularFatorial(numero) {
    let fatorial = 1
    for(let i = numero; i > 0; i--) {
        fatorial = fatorial * i
    }
    return fatorial
}

/* Calcular a combinação entre n e k ------- */
function calcularCombinacao(m, p) {
    let combinacao = 1
    if(m == p) {
        combinacao = 1
    }
    else if(m == (p + 1)) {
        combinacao = m
    }
    else {
        let numeradorComb = calcularFatorial(m)
        let denominadorComb = calcularFatorial(m - p) * calcularFatorial(p)
        combinacao = numeradorComb / denominadorComb
    }
    return combinacao
}

// Exibir resultados
function exibeResultados(prob, media, desvioPadrao) {
    exibeProbabilidade.innerHTML = 'Probabilidade: ' + prob.toFixed(2) + '%'
    exibeMedia.innerHTML = 'Média: ' + media.toFixed(2)
    exibeDP.innerHTML = 'Desvio Padrão: ' + desvioPadrao.toFixed(2)
}

// Efetuar cálculos
function calcularBinomial(n, p, q, vetorK) {
    p = p / 100   // Probabilidade de sucesso
    q = q / 100   // Probabilidade de fracasso
    let resultadoFinal = 0

    let resultCombinacao, pElevadoK, qElevadoNK, aux, resultPercentual, mediaBinomial, varianciaBinomial, desvioPadraoBinomial

    // Considera cada um dos elementos do vetor de eventos
    for(let i = 0; i < vetorK.length; i++) {
        resultCombinacao = calcularCombinacao(n, vetorK[i])

        pElevadoK = Math.pow(p, vetorK[i])

        qElevadoNK = Math.pow(q, n - vetorK[i])

        aux = resultCombinacao * pElevadoK

        resultPercentual = aux * qElevadoNK * 100

        resultadoFinal += resultPercentual
    }

    mediaBinomial = n * p

    varianciaBinomial = n * p * q

    desvioPadraoBinomial = Math.sqrt(varianciaBinomial)

    exibeResultados(resultadoFinal, mediaBinomial, desvioPadraoBinomial)
}

// Função responsável pela validação dos dados inseridos
function validarDados() {
    let valido = true
    let vetEventos = []
    let valorEventos = eventos.value
        
    if(isNaN(amostraSize.value) || amostraSize.value <= 0) {
        alert('Informe um tamanho de amostra válido.')
        valido = false
        amostraSize.focus()
    }
    else if(isNaN(sucesso.value) || sucesso.value == '') {
        alert('Informe a probabilidade de sucesso.')
        valido = false
        sucesso.focus()
    }
    else if(isNaN(fracasso.value) || fracasso.value == '') {
        alert('Informe a probabilidade de fracasso.')
        valido = false
        fracasso.focus()
    }
    else if(valorEventos == '') {
        alert('Informe o(s) evento(s).')
        valido = false
        eventos.focus()
    }
    else if(valorEventos !== "") {
        // Separando os eventos a cada ponto e vírgula e atribuindo o elemento ao vetor 
        vetEventos = valorEventos.split(';')

        // Descarta eventuais espaços nas strings
        for(let i = 0; i < vetEventos.length; i++) {
            vetEventos[i] = vetEventos[i].trim()

            if(vetEventos[i].indexOf(',')) {
                vetEventos[i] = vetEventos[i].replace(",", ".")  // Números decimais
                vetEventos[i] = parseFloat(vetEventos[i])
            }
            else {
                vetEventos[i] = parseInt(vetEventos[i])  // Números inteiros
            }
        }
    }

    if(valido === true) {  // Dados válidos - Prosseguir para os cálculos
        amostra = Number(amostraSize.value)
        sucessoProb = Number(sucesso.value)
        fracassoProb = Number(fracasso.value)

        sectionExibeResultados.style = "display: normal"
        calcularBinomial(amostra, sucessoProb, fracassoProb, vetEventos)
    }
}

// Atribuição dos eventos
window.onload = iniciar()
btnCalcBinomial.addEventListener('click', validarDados)
sucesso.addEventListener('change', sucessoChange)
fracasso.addEventListener('change', fracassoChange)