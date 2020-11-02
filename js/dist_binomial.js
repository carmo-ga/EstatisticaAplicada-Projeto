const amostraSize = document.querySelector('#amostraSize')
const sucesso = document.querySelector('#sucesso')
const fracasso = document.querySelector('#fracasso')
const eventos = document.querySelector('#eventos')
const btnCalcBinomial = document.querySelector('#btnCalcBinomial')

const exibeProbabilidade = document.querySelector('#exibeProbabilidade')
const exibeMedia = document.querySelector('#exibeMediaBinomial')
const exibeDP = document.querySelector('#exibeDPBinomial')
const sectionExibeResultados = document.querySelector('#exibeResultados')

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

/* Definição de dados que podem ser inseridos no input 'Eventos' ---------- */
function teclasEventos(e) {
    /*
    tecla = e.keyCode
    if (tecla >= 48 && tecla <= 57) {
        return true
    }
    else {
        return false
    }*/
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
    console.log({m, p})
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

/* Exibir resultados */
function exibeResultados(prob, media, desvioPadrao) {
    exibeProbabilidade.innerHTML = 'Probabilidade: ' + prob.toFixed(2) + '%'
    exibeMedia.innerHTML = 'Média: ' + media.toFixed(2)
    exibeDP.innerHTML = 'Desvio Padrão: ' + desvioPadrao.toFixed(2)
}

/* Calcular os valores */
function calcularBinomial(n, p, q, vetorK) {
    p = p / 100
    q = q / 100
    let resultadoFinal = 0

    let resultCombinacao, pElevadoK, qElevadoNK, aux, resultPercentual, mediaBinomial, varianciaBinomial, desvioPadraoBinomial

    console.log({n, p, q, vetorK})

    /* Considera cada um dos elementos do vetor de eventos */
    for(let i = 0; i < vetorK.length; i++) {
        resultCombinacao = calcularCombinacao(n, vetorK[i])
        console.log({resultCombinacao})

        pElevadoK = Math.pow(p, vetorK[i])
        console.log({pElevadoK})

        qElevadoNK = Math.pow(q, n - vetorK[i])
        console.log({qElevadoNK})

        aux = resultCombinacao * pElevadoK

        resultPercentual = aux * qElevadoNK * 100
        console.log({resultPercentual})

        resultadoFinal += resultPercentual
    }

    mediaBinomial = n * p

    varianciaBinomial = n * p * q

    desvioPadraoBinomial = Math.sqrt(varianciaBinomial)
    
    console.log({resultadoFinal, mediaBinomial, varianciaBinomial, desvioPadraoBinomial})

    exibeResultados(resultadoFinal, mediaBinomial, desvioPadraoBinomial)
}

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
        vetEventos = valorEventos.split(';')

        // Descarta eventuais espaços nas strings
        for(let i = 0; i < vetEventos.length; i++) {
            vetEventos[i] = vetEventos[i].trim()

            if(vetEventos[i].indexOf(',')) {
                vetEventos[i] = vetEventos[i].replace(",", ".")
                vetEventos[i] = parseFloat(vetEventos[i])
            }
            else {
                vetEventos[i] = parseInt(vetEventos[i])
            }
        }
    }

    if(valido === true) {
        amostra = Number(amostraSize.value)
        sucessoProb = Number(sucesso.value)
        fracassoProb = Number(fracasso.value)

        sectionExibeResultados.style = "display: normal"
        calcularBinomial(amostra, sucessoProb, fracassoProb, vetEventos)
    }
}

window.onload = iniciar()
btnCalcBinomial.addEventListener('click', validarDados)
sucesso.addEventListener('change', sucessoChange)
fracasso.addEventListener('change', fracassoChange)
eventos.addEventListener('keypress', teclasEventos)