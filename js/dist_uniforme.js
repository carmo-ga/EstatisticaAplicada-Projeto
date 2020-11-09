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

function iniciar() {
    inputMenorUniforme.style.display = 'none'
    inputMaiorUniforme.style.display = 'none'
    inputValorInicialUniforme.style.display = 'none'
    inputValorFinalUniforme.style.display = 'none'
    divEntreUniforme.style.display = 'none'
    exibeProbabilidadeUniforme.innerHTML = ""
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
    }
}

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


    if(valido === true) {
        let a = limiteMinimo
        let b = limiteMaximo
        let pontoIntervalo = []

        switch(escolherValorUniforme.value) {
            case "Menor que":
                pontoIntervalo = [valorMenor]
                console.log(pontoIntervalo)
                break
            case "Maior que":
                pontoIntervalo = [valorMaior]
                console.log(pontoIntervalo)
                break
            case "Entre":
                pontoIntervalo = [valorInicial, valorFinal]
                console.log(pontoIntervalo)
                break
        }
        exibeResultadosUniforme.style = "display: normal"
        calcularProbabUniforme(a, b, pontoIntervalo)
    }
}

function calcularProbabUniforme(a, b, pontoIntervalo) {
    let probabilidade, diferenca

    diferenca = calcularDistancia(a, b, pontoIntervalo)

    probabilidade = ((1 / (b - a)) * diferenca) * 100

    exibeProbabilidadeUniforme.innerHTML = probabilidade.toFixed(2) + '%'
}

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

window.onload = iniciar()
btnCalcUniforme.addEventListener('click', validarDados)
escolherValorUniforme.addEventListener('change', escolherOpcaoSelect)