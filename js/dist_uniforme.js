const valorMinimoUniforme = document.querySelector('#valorMinimoUniforme')
const valorMaximoUniforme = document.querySelector('#valorMaximoUniforme')
const btnCalcUniforme = document.querySelector('#btnCalcUniforme')

const escolherValorUniforme = document.querySelector('#escolherValorUniforme')
const inputMenorUniforme = document.querySelector('#inputMenorUniforme')
const inputMaiorUniforme = document.querySelector('#inputMaiorUniforme')
const inputValorInicialUniforme = document.querySelector('#inputValorInicialUniforme')
const inputValorFinalUniforme = document.querySelector('#inputValorFinalUniforme')
const divEntreUniforme = document.querySelector('#grupoValoresEntreUniforme')

const exibeResultadosUniforme = document.querySelector('#exibeResultadosUniforme')
const exibeProbabilidadeUniforme = document.querySelector('#exibeProbabilidadeUniforme')
const exibeMediaUniforme = document.querySelector('#exibeMediaUniforme')
const exibeDesvioPadraoUniforme = document.querySelector('#exibeDesvioPadraoUniforme')

// Função responsável pelas características da página após ser (re)carregada
function iniciar() {
    inputMenorUniforme.style.display = 'none'
    inputMaiorUniforme.style.display = 'none'
    inputValorInicialUniforme.style.display = 'none'
    inputValorFinalUniforme.style.display = 'none'
    divEntreUniforme.style.display = 'none'
    exibeProbabilidadeUniforme.innerHTML = ""
    exibeMediaUniforme.innerHTML = ""
    exibeDesvioPadraoUniforme.innerHTML = ""
    exibeResultadosUniforme.style.display = 'none'
    valorMinimoUniforme.focus()
}

function escolherOpcaoSelect() {
    if(escolherValorUniforme.value == '(Selecione)') {
        inputMenorUniforme.style.display = 'none'
        inputMaiorUniforme.style.display = 'none'
        inputValorInicialUniforme.style.display = 'none'
        inputValorFinalUniforme.style.display = 'none'
        divEntreUniforme.style.display = 'none'
        exibeProbabilidadeUniforme.innerHTML = ""
        exibeMediaUniforme.innerHTML = ""
        exibeDesvioPadraoUniforme.innerHTML = ""
    }
    else if(escolherValorUniforme.value == "Menor que") {
        inputMenorUniforme.style = "display: normal"
        inputMenorUniforme.value = ""
        inputMenorUniforme.focus()
        inputMaiorUniforme.style.display = 'none'
        inputValorInicialUniforme.style.display = 'none'
        inputValorFinalUniforme.style.display = 'none'
        divEntreUniforme.style.display = 'none'
        exibeProbabilidadeUniforme.innerHTML = ""
        exibeMediaUniforme.innerHTML = ""
        exibeDesvioPadraoUniforme.innerHTML = ""
    }
    else if(escolherValorUniforme.value == "Maior que") {
        inputMenorUniforme.style.display = 'none'
        inputValorInicialUniforme.style.display = 'none'
        inputValorFinalUniforme.style.display = 'none'
        inputMaiorUniforme.style = "display: normal"
        inputMaiorUniforme.value = ""
        inputMaiorUniforme.focus()
        divEntreUniforme.style.display = 'none'
        exibeProbabilidadeUniforme.innerHTML = ""
        exibeMediaUniforme.innerHTML = ""
        exibeDesvioPadraoUniforme.innerHTML = ""
    }
    else if(escolherValorUniforme.value == "Entre") {
        inputMenorUniforme.style.display = 'none'
        inputMaiorUniforme.style.display = 'none'
        inputValorInicialUniforme.style = "display: normal"
        inputValorFinalUniforme.style = "display: normal"
        inputValorInicialUniforme.value = ""
        inputValorFinalUniforme.value = ""
        divEntreUniforme.style = "display: normal"
        inputValorInicialUniforme.focus()
        exibeProbabilidadeUniforme.innerHTML = ""
        exibeMediaUniforme.innerHTML = ""
        exibeDesvioPadraoUniforme.innerHTML = ""
    }
}

// Validação dos dados de entrada
function validarDados() {
    let valido = true
    let limiteMinimo = Number(valorMinimoUniforme.value)
    let limiteMaximo = Number(valorMaximoUniforme.value)
    let valorMenor= Number(inputMenorUniforme.value)
    let valorMaior = Number(inputMaiorUniforme.value)
    let valorInicial = Number(inputValorInicialUniforme.value)
    let valorFinal = Number(inputValorFinalUniforme.value)

    if(limiteMinimo <= 0 || limiteMinimo.value == "") {
        alert('Informe um limite mínimo válido.')
        valido = false
        valorMinimoUniforme.focus()
    }
    else if(limiteMaximo <= 0 || limiteMaximo == "") {
        alert('Informe um limite máximo válido.')
        valido = false
        valorMaximoUniforme.focus()
    }
    else if(escolherValorUniforme.selectedIndex == 0) {
        alert('Selecione uma das opção.')
        valido = false
        escolherValorUniforme.focus()
    }
    else if(escolherValorUniforme.value == "Menor que" && valorMenor == "") {
        alert('Informe um valor válido.')
        valido = false
        inputMenorUniforme.focus()
    }
    else if(escolherValorUniforme.value == "Maior que" && valorMaior == "") {
        alert('Informe um valor válido.')
        valido = false
        inputMaiorUniforme.focus()
    }
    else if(escolherValorUniforme.value == "Entre" && valorInicial == "") {
        alert('Informe o valor inicial.')
        valido = false
        inputValorInicialUniforme.focus()
    }
    else if(escolherValorUniforme.value == "Entre" && valorFinal == "") {
        alert('Informe o valor final.')
        valido = false
        inputValorFinalUniforme.focus()
    }
    else if(escolherValorUniforme.value == "Entre" && (valorInicial >= valorFinal)) {
        alert('Informe um intervalo válido.')
        valido = false
        inputValorInicialUniforme.focus()
    }
    else if(limiteMinimo >= limiteMaximo) {
        alert('Limite mínimo igual ou maior que limite máximo.')
        valido = false
        valorMinimoUniforme.focus()
    }

    if(valido === true) {   // Dados válidos - Atribuir valores e prosseguir para os cálculos
        let a = limiteMinimo
        let b = limiteMaximo
        let pontoIntervalo = []

        switch(escolherValorUniforme.value) {
            case "Menor que":
                pontoIntervalo = [valorMenor]
                break
            case "Maior que":
                pontoIntervalo = [valorMaior]
                break
            case "Entre":
                pontoIntervalo = [valorInicial, valorFinal]
                break
        }
        exibeResultadosUniforme.style = "display: normal"
        calcularProbabUniforme(a, b, pontoIntervalo)
    }
}

// Calcular o resultado da probabilidade
function calcularProbabUniforme(a, b, pontoIntervalo) {
    let media = (b + a) / 2
    
    let diferenca = calcularDistancia(a, b, pontoIntervalo)

    let probabilidade = ((1 / (b - a)) * diferenca) * 100

    let variancia = (Math.pow((b - a), 2)) / 12

    let desvioPadrao = Math.sqrt(variancia)

    exibeMediaUniforme.innerHTML = 'Média: ' + media
    exibeProbabilidadeUniforme.innerHTML = 'Probabilidade: ' + probabilidade.toFixed(2) + '%'
    exibeDesvioPadraoUniforme.innerHTML = 'Desvio Padrão: ' + desvioPadrao.toFixed(2)
}

// Calcular o valor da distância entre os pontos a e b
function calcularDistancia(a, b, pontoIntervalo) {
    let distancia
    if(escolherValorUniforme.value == "Menor que") {
        distancia = Number(pontoIntervalo[0]) - a
    }
    else if(escolherValorUniforme.value == "Maior que") {
        distancia = b - Number(pontoIntervalo[0])
    }
    else if(escolherValorUniforme.value == "Entre") {
        distancia = Number(pontoIntervalo[1]) - Number(pontoIntervalo[0])
    }
    return distancia
}

// Atribuição dos eventos
window.onload = iniciar()
btnCalcUniforme.addEventListener('click', validarDados)
escolherValorUniforme.addEventListener('change', escolherOpcaoSelect)