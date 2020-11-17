const exibeResultados = document.querySelector('#exibeResultados')
const inputArquivo = document.querySelector('#inputArquivo')
const dadoManual = document.querySelector('#inserirManual')
const botaoCalcular = document.querySelector('#botaoCalcular')
const nomeVariavel = document.querySelector('#nomeVariavel')
const tabela = document.querySelector('#tabela')
const tituloTabela = document.querySelector('#tituloTabela')
const corpoTabela = document.querySelector('#corpoTabela')
const tipoVariavel = document.querySelector('#tipoVariavel')
const freqSimples = document.querySelector('#freqSimples')
const linhaTotal = document.querySelector('#linhaTotal')
const cabecalhoTabela = document.querySelector('#cabecalhoTabela')
const rodapeTabela = document.querySelector('#rodapeTabela')
const freqRelativa = document.querySelector('#freqRelativa')
const freqAcumulada = document.querySelector('#freqAcumulada')
const freqAcumuladaPerc = document.querySelector('#freqAcumuladaPerc')
const resultMedia = document.querySelector('#media')
const resultModa = document.querySelector('#moda')
const resultMediana = document.querySelector('#mediana')
const divAmostraPop = document.querySelector('#amostraPopulacao')
const radAmostra = document.querySelector('#radAmostra')
const radPopulacao = document.querySelector('#radPopulacao')
const resultDesvioPadrao = document.querySelector('#resultDesvioPadrao')
const resultCoefVariacao = document.querySelector('#resultCoefVariacao')
const medidaSeparatriz = document.querySelector('#medidaSeparatriz')
const divMedidasDispersao = document.querySelector('#divMedidasDispersao')
const lblValMedSep = document.querySelector('#lblValMedSep')
const medidaQKD = document.querySelector('#medidaQKD')
const percentil = document.querySelector('#percentil')
const resultMedSeparatriz = document.querySelector('#resultMedSeparatriz')
const grafico = document.querySelector('#grafico').getContext('2d')

let houveUpload = false
let vetorDadosUpload = []
// Upload de arquivo
inputArquivo.addEventListener('change', function(evento) { // Carregou arquivo

    const leitorCSV = new FileReader()  // Ler arquivo

    leitorCSV.onload = function() { // Chama callback com o conteúdo do arquivo assim que a leitura terminar

        let vetorArquivo = []

        const linhas = leitorCSV.result.split('\n')

        vetorArquivo = linhas

        let contador = 0
        if(vetorArquivo === "" || vetorArquivo == null || vetorArquivo.length <= 1) {  // Verifica se o arquivo (vetor) está vazio
            alert('Informe os dados.')
        }
        else {
            vetorDadosUpload = []
            let titulo = vetorArquivo.shift() // Atribuição do nome da variável
            dadoManual.value = ""
            dadoManual.readOnly = true
            nomeVariavel.value = titulo
            nomeVariavel.readOnly = true

            for(let i = 0; i < vetorArquivo.length; i++) {
                if(vetorArquivo[i] != '' && vetorArquivo[i] != null && vetorArquivo[i] != undefined && vetorArquivo[i].length != 0) {

                    let numero = parseFloat(vetorArquivo[i].replace(',', '.'))
                    if(!isNaN(numero)) {      
                        vetorDadosUpload.push(numero)   // São dados númericos
                    }
                    else {
                        contador++   // Não são dados númericos
                    }          
                }
            }
        }

        if(contador == vetorArquivo.length - 1) {
            vetorDadosUpload = vetorArquivo.filter(elem => elem)

            tipoVariavel.innerHTML = ""

            let selecione = document.createElement('option')
            selecione.innerText = "(Selecione)"
            tipoVariavel.appendChild(selecione)

            let nominal = document.createElement('option')
            nominal.innerText = "Qualitativa Nominal"
            tipoVariavel.appendChild(nominal)

            let ordinal = document.createElement('option')
            ordinal.innerText = "Qualitativa Ordinal"
            tipoVariavel.appendChild(ordinal)
        }
        else {
            tipoVariavel.innerHTML = ""

            let selecione = document.createElement('option')
            selecione.innerText = "(Selecione)"
            tipoVariavel.appendChild(selecione)

            let discreta = document.createElement('option')
            discreta.innerText = "Quantitativa Discreta"
            tipoVariavel.appendChild(discreta)

            let continua = document.createElement('option')
            continua.innerText = "Quantitativa Contínua"
            tipoVariavel.appendChild(continua)
        }

        // Variável de controle
        houveUpload = true
    }
    leitorCSV.readAsText(inputArquivo.files[0]) // Lê arquivo como texto e especifica o arquivo a ser lido
}, false)

// Função responsável pelas características da página após ser (re)carregada
function iniciar() {
    lblValMedSep.style.display = 'none'
    medidaQKD.style.display = 'none'
    percentil.style.display = 'none'
    radAmostra.checked = true
    exibeResultados.style.display = 'none'
    divMedidasDispersao.style.display = 'none'
    tabela.innerHTML = ""
    tabela.style.display = 'none'
}

// Função para gerar cores aleatoriamente
function gerarCor(vetor) {
    let letras = '0123456789ABCDEF',
        cor = '#',
        j = 0,
        cores = []
    do {
        for (let i = 0; i < 6; i++) {
            cor += letras[Math.floor(Math.random() * 16)]
        }
        cores.push(cor)
        cor = '#'
        j++
    } while (j < vetor.length)
    return cores
}


// Mudança do select Tipo de Variável
function changeTipoVariavel() {

    if(tipoVariavel.value == "Qualitativa Nominal" || tipoVariavel.value == "Qualitativa Ordinal") {
        divAmostraPop.style.display = "none"
        divMedidasDispersao.style.display = 'none'
    }
    else if(tipoVariavel.value == "Quantitativa Discreta" || tipoVariavel.value == "Quantitativa Contínua") {
        divAmostraPop.style = "display: normal"
        divMedidasDispersao.style = "display: normal"
    }
    else {
        exibeResultados.style.display = 'none'
        cabecalhoTabela.innerHTML = ""
        corpoTabela.innerHTML = ""
        rodapeTabela.innerHTML = ""
        resultMedia.innerHTML = ""
        resultModa.innerHTML = ""
        resultMediana.innerHTML = ""
        resultMedSeparatriz.innerHTML = ""
        resultDesvioPadrao.innerHTML = ""
        resultCoefVariacao.innerHTML = ""
    }
}

// Mudança no input para inserir dados manualmente. Gera o select do Tipo de Variável
function inputDadoManual() {

    nomeVariavel.value = ""
    tipoVariavel.innerHTML = ""
    nomeVariavel.focus()

    let selecione = document.createElement('option')
    selecione.innerText = "(Selecione)"
    tipoVariavel.appendChild(selecione)

    let nominal = document.createElement('option')
    nominal.innerText = "Qualitativa Nominal"
    tipoVariavel.appendChild(nominal)

    let ordinal = document.createElement('option')
    ordinal.innerText = "Qualitativa Ordinal"
    tipoVariavel.appendChild(ordinal)

    let discreta = document.createElement('option')
    discreta.innerText = "Quantitativa Discreta"
    tipoVariavel.appendChild(discreta)

    let continua = document.createElement('option')
    continua.innerText = "Quantitativa Contínua"
    tipoVariavel.appendChild(continua)

    houveUpload = false
}

// Alteração no select do tipo de Medida Separatriz. Exibe o campo para informar o valor a ser calculado.
function exibeMedSeparatriz() {

    let valorIndex = medidaSeparatriz.selectedIndex

    if(valorIndex <= 0) {
        resultMedSeparatriz.innerHTML = ""
        lblValMedSep.style.display = 'none'
        medidaQKD.style.display = 'none'
        percentil.style.display = 'none'

    }
    else if(valorIndex == 1) {
        lblValMedSep.style.display = 'inline-block'        
        percentil.style.display = 'none'
        medidaQKD.style.display = 'inline-block'
        medidaQKD.innerText = ""
        resultMedSeparatriz.innerHTML = ""

        let primeiro = document.createElement('option')
        primeiro.innerText = "(Selecione)"
        medidaQKD.appendChild(primeiro)

        for(i = 1; i <= 4; i++) {
            let option = document.createElement('option')
            option.innerText = i
            medidaQKD.appendChild(option)
        }
    }
    else if(valorIndex == 2) {
        lblValMedSep.style.display = 'inline-block'
        percentil.style.display = 'none'
        medidaQKD.style.display = 'inline-block'
        medidaQKD.innerText = ""

        let primeiro = document.createElement('option')
        primeiro.innerText = "(Selecione)"
        medidaQKD.appendChild(primeiro)
        resultMedSeparatriz.innerHTML = ""

        
        for(let i = 1; i <= 5; i++) {
            let option = document.createElement('option')
            option.innerText = i
            medidaQKD.appendChild(option)
        }
    }
    else if(valorIndex == 3) {
        lblValMedSep.style.display = 'inline-block'
        percentil.style.display = 'none'
        medidaQKD.style.display = 'inline-block'
        medidaQKD.innerText = ""
        resultMedSeparatriz.innerHTML = ""

        let primeiro = document.createElement('option')
        primeiro.innerText = "(Selecione)"
        medidaQKD.appendChild(primeiro)

        
        for(let i = 1; i <= 10; i++) {
            let option = document.createElement('option')
            option.innerText = i
            medidaQKD.appendChild(option)
        }
    }
    else if(valorIndex == 4) {
        lblValMedSep.style.display = 'inline-block'
        medidaQKD.style.display = 'none'
        percentil.style.display = 'inline-block' 
        resultMedSeparatriz.innerHTML = ""
        percentil.value = ""
        percentil.focus()            
    }
}

// Função para criação do cabeçalho da tabela
function criaCabecalhoTabela() {
    tituloTabela.innerHTML = nomeVariavel.value
    cabecalhoTabela.appendChild(tituloTabela)

    freqSimples.innerHTML = "Freq. Simples"
    cabecalhoTabela.appendChild(freqSimples)

    freqRelativa.innerHTML = "Freq. Relativa (%)"
    cabecalhoTabela.appendChild(freqRelativa)

    freqAcumulada.innerHTML = "Freq. Acumulada"
    cabecalhoTabela.appendChild(freqAcumulada)

    freqAcumuladaPerc.innerHTML = "Freq. Acumulada (%)"
    cabecalhoTabela.appendChild(freqAcumuladaPerc)

    tabela.appendChild(cabecalhoTabela)
}

// Função para cálculo das Medidas Separatrizes das variáveis qualitativa nominal, ordinal e quantitativa discreta
function calcMedSepNOD(somaTotalNOD, vetDadosNOD) {
    let posicaoQKDP = 0,
        simboloQKDP = ""
    if(medidaSeparatriz.selectedIndex === 0) {
        resultMedSeparatriz.innerHTML = ""
        medidaQKD.focus()
    }                      
    else if(medidaSeparatriz.selectedIndex === 1) {     //   QUARTIL
        if(medidaQKD.selectedIndex === 0) {
            resultMedSeparatriz.innerHTML = ""
            medidaQKD.focus()
        }
        else {
            simboloQKDP = 'Q<sub>'+ medidaQKD.selectedIndex +'</sub>: '
            posicaoQKDP = Math.round(medidaQKD.selectedIndex * 0.25 * somaTotalNOD)
        }
    }
    else if(medidaSeparatriz.selectedIndex === 2) {   //   QUINTIL
        if(medidaQKD.selectedIndex === 0) {
            resultMedSeparatriz.innerHTML = ""
            medidaQKD.focus()
        }
        else {
            simboloQKDP = 'K<sub>'+medidaQKD.selectedIndex+'</sub>: '
            posicaoQKDP = Math.round(medidaQKD.selectedIndex * 0.2 * somaTotalNOD)
        }                    
    }
    else if(medidaSeparatriz.selectedIndex === 3) {    //   DECIL
        if(medidaQKD.selectedIndex === 0) {
            resultMedSeparatriz.innerHTML = ""
            medidaQKD.focus()
        }
        else {
            simboloQKDP = 'D<sub>'+ medidaQKD.selectedIndex +'</sub>: '
            posicaoQKDP = Math.round(medidaQKD.selectedIndex * 0.1 * somaTotalNOD)
        }
    }
    else if(medidaSeparatriz.selectedIndex === 4) {      //   PERCENTIL
        if(percentil.value > 0 && percentil.value < 101) {
            simboloQKDP = 'P<sub>'+ percentil.value +'</sub>: '
            posicaoQKDP = Math.round(percentil.value * 0.01 * somaTotalNOD)                         
        }
        else {
            resultMedSeparatriz.innerHTML = ""
            percentil.value.focus()
        }
    }
    
    if(simboloQKDP !== "") {
        if(posicaoQKDP == 0) {
            resultMedSeparatriz.innerHTML = simboloQKDP + vetDadosNOD[posicaoQKDP]
        }
        else {
            resultMedSeparatriz.innerHTML = simboloQKDP + vetDadosNOD[posicaoQKDP - 1]
        }
    }
}

// Função para gerar o somatório de todos os valores de um vetor
function somaTotal(vetor) {
    let soma = 0
    for(let i in vetor) {
            soma += vetor[i]
    }
    return soma
}

function mouseGrab() {
    if(tipoVariavel.value == "Qualitativa Ordinal") {
        corpoTabela.classList.add('mouseGrab')
    }
}

// Reordenar a tabela quando o tipo de variável for Qualitativa Ordinal
function reordenar() {

    if(tipoVariavel.value == "Qualitativa Ordinal") {
        const linhas = document.querySelectorAll(".draggableRow")
        
        linhas.forEach(linha => {
            linha.draggable = true
            linha.addEventListener('dragstart', dragstart)
            linha.addEventListener('dragend', dragend)

            corpoTabela.addEventListener('dragover', dragover)
        })
    }
}

function dragstart() {
    this.classList.add('dragging')
}

function dragend() {

    const rows = document.querySelectorAll(".draggableRow")

    let vetorFreqSim = [],
        vetorFreqRelativa = [],
        vetorFreqAcumulada = [],
        vetorFreqAcumuladaPer = []
    rows.forEach(row => {
        vetorFreqSim.push(Number(row.children[1].innerText))
        vetorFreqRelativa.push(Number((row.children[2].innerText).slice(0, -1)))
    })    

    let freqAcumulada = 0
    for(let i = 0; i < vetorFreqSim.length; i++) {
        freqAcumulada += vetorFreqSim[i]
        vetorFreqAcumulada.push(freqAcumulada)
    }

    let freqAcumuladaPercen = 0
    for(let i = 0; i < vetorFreqRelativa.length; i++) {
        freqAcumuladaPercen += vetorFreqRelativa[i]
        vetorFreqAcumuladaPer.push(freqAcumuladaPercen)
    }

    rows.forEach(row => {
        row.children[3].innerText = vetorFreqAcumulada.shift()
        row.children[4].innerText = (vetorFreqAcumuladaPer.shift()).toFixed(2) + '%'
    })

    this.classList.remove('dragging')
}

// Verifica a posição do elemento para fazer a reordenação
function dragover(e) {
    e.preventDefault()

    const proximoElemento = elementoPosterior(corpoTabela, e.clientY)
    const arrasta = document.querySelector('.dragging')

    if(proximoElemento == null) {
        corpoTabela.appendChild(arrasta)
    }
    else {
        corpoTabela.insertBefore(arrasta, proximoElemento)
    }
}

function elementoPosterior(corpoTabela, y) {
    const elementos = [...corpoTabela.querySelectorAll('.draggableRow:not(.dragging)')]

    return elementos.reduce((proximo, child) => {
        const limites = child.getBoundingClientRect()
        const distancia = y - limites.top - limites.height / 2

        if(distancia < 0 && distancia > proximo.distancia) {
            return {distancia: distancia, element: child}
        }
        else {
            return proximo
        }

    }, {distancia: Number.NEGATIVE_INFINITY}).element

}

// Depois de todas as validações, chama-se esta função para efetivação dos cálculos
function efetuarCalculos(vetorDados) {
    exibeResultados.style.display = 'block'
    tabela.style.display = 'inline-block'

    criaCabecalhoTabela()

    // PROCESSOS REFERENTES ÀS VARIÁVEIS QUALITATIVA NOMINAL E ORDINAL -----------------------------------
    if(tipoVariavel.value == "Qualitativa Nominal" || tipoVariavel.value == "Qualitativa Ordinal") {
        divMedidasDispersao.style.display = "none"
        //vetorDados.sort()       

        quickSort(vetorDados)   // Chamada do algoritmo de ordenação OBRIGATÓRIO

        let vetorVariavel = [],
            percentualTotal = 0
        for(let i = 0; i < vetorDados.length; i++) {
            if(vetorDados[i] !== vetorDados[i + 1]) {
                vetorVariavel.push(vetorDados[i])
            }
        }

        let vetorTotal = [],
            vetorFreqTotal = []
        for(let i = 0; i < vetorVariavel.length; i++) {
            
            let linha = document.createElement('tr')
            linha.classList.add("draggableRow")

            let cont = 0
            for(let j = 0; j < vetorDados.length; j++) {

                if (vetorVariavel[i] == vetorDados[j]) {
                    cont = cont + 1
                }                            
            }

            // FREQUÊNCIA RELATIVA
            let freqRelativa = (cont / vetorDados.length) * 100
            percentualTotal = percentualTotal + freqRelativa

            vetorTotal.push(cont)
            vetorFreqTotal.push(freqRelativa)
            
            let celulaVariavel = document.createElement('td'),
                celulaFreqSim = document.createElement('td'),
                celulaFreqRelativa = document.createElement('td'),
                celulaFreqAcum = document.createElement('td'),
                celulaFreqAcumPer = document.createElement('td')
            
            celulaVariavel.innerHTML = vetorVariavel[i]
            celulaFreqSim.innerHTML = cont
            celulaFreqRelativa.innerHTML = freqRelativa.toFixed(2) + '%'
            // CÁLCULO DA FREQUÊNCIA ACUMULADA
            celulaFreqAcum.innerHTML = somaTotal(vetorTotal)

            // CÁLCULO DA FREQUÊNCIA ACUMULADA PERCENTUAL
            celulaFreqAcumPer.innerHTML = somaTotal(vetorFreqTotal).toFixed(2) + '%'

            corpoTabela.appendChild(linha)
            linha.appendChild(celulaVariavel)
            linha.appendChild(celulaFreqSim)
            linha.appendChild(celulaFreqRelativa)
            linha.appendChild(celulaFreqAcum)
            linha.appendChild(celulaFreqAcumPer)
        }
        // Construindo a tabela
        tabela.appendChild(corpoTabela)

        let linhaTotal = document.createElement('tr')
        rodapeTabela.appendChild(linhaTotal)

        let textoTotal = document.createElement('td')
        textoTotal.innerHTML = "Total"
        linhaTotal.appendChild(textoTotal)
        
        let totalDados = document.createElement('td')
        totalDados.innerHTML = somaTotal(vetorTotal)
        linhaTotal.appendChild(totalDados)

        let totalPercentual = document.createElement('td')
        totalPercentual.innerHTML = percentualTotal.toFixed(2) + '%'
        linhaTotal.appendChild(totalPercentual)

        tabela.appendChild(rodapeTabela)

        // CÁLCULO DA MEDIANA
        let mediana,
            mediana1,
            mediana2,
            posicao = 0
        if((vetorDados.length % 2) === 0) {
            posicao = vetorDados.length / 2
            mediana1 = vetorDados[posicao - 1]
            mediana2 = vetorDados[posicao]

            if(mediana1 == mediana2) {
                mediana = mediana1
            }
            else {
                mediana = mediana1 + " e " + mediana2
            }                        
        }
        else {
            posicao = ((vetorDados.length - 1) / 2)
            mediana = vetorDados[posicao]
        }

        resultMediana.innerHTML = 'Mediana: ' + mediana

        // CÁLCULO DA MODA
        let moda = false
        // Verifica se existe moda
        for(let j = 1; j < vetorTotal.length; j++) {
            if(vetorTotal[0] !== vetorTotal[j]) {
                moda = true
                break
            }
        }

        if(moda === true) {    // Existe moda
            let maior = vetorTotal[0]
            for(let i = 1; i < vetorTotal.length; i++) {
                if(vetorTotal[i] > maior) {
                    maior = vetorTotal[i]
                }
            } 

            let vetorModa = []
            for(let i = 0; i < vetorTotal.length; i++) {
                if(vetorTotal[i] === maior) {
                    vetorModa.push(vetorVariavel[i])
                }
            }
            resultModa.innerHTML = 'Moda: ' + vetorModa
        }
        else {
            resultModa.innerHTML = 'Moda: Amodal'     // Não existe moda                             
        }

        // CÁLCULO DAS MEDIDAS SEPARATRIZES ----------------------
        calcMedSepNOD(somaTotal(vetorTotal), vetorDados)   // Chamada da função que efetua os cálculos

        // GRÁFICO
        new Chart(grafico, {
            type: 'pie',
            data: {
                labels: vetorVariavel,
                datasets: [{
                    label: vetorVariavel,
                    data: vetorFreqTotal,
                    backgroundColor: gerarCor(vetorVariavel)
                }]
            },
            options: {
                title: {
                    display: true,
                    text: nomeVariavel.value,
                    fontColor: "black",
                    fontSize: 20
                }
            }
        })
    }


    // PROCESSOS REFERENTES À VARIÁVEL QUANTITATIVA DISCRETA -------------------------------------------------
    if(tipoVariavel.value == "Quantitativa Discreta") {

        if(houveUpload === false) {   // Dados inseridos manualmente
            for(let i = 0; i < vetorDados.length; i++) {

                if(vetorDados[i].indexOf(',')) {  // Números decimais
                    vetorDados[i] = vetorDados[i].replace(",", ".")
                    vetorDados[i] = parseFloat(vetorDados[i])
                }
                else {
                    vetorDados[i] = parseInt(vetorDados[i])  // Números inteiros
                }
            }
        }

        vetorDados.sort(function(a, b) {
            return a - b
        })

        let vetorVariavel = [],
            percentualTotal = 0,
            vetorFac = []
        for(let i = 0; i < vetorDados.length; i++) {
            if(vetorDados[i] !== vetorDados[i + 1]) {
                vetorVariavel.push(vetorDados[i])
            }
        }

        let vetorTotal = [],
            vetorFreqTotal = []
        for(let i = 0; i < vetorVariavel.length; i++) {
            
            let linha = document.createElement('tr')

            let cont = 0
            for(let j = 0; j < vetorDados.length; j++) {

                if (vetorVariavel[i] == vetorDados[j]) {
                    cont = cont + 1
                }                            
            }

            vetorTotal.push(cont)

            // CÁLCULO DA FREQUÊNCIA RELATIVA
            let freqRelativa = (cont / vetorDados.length) * 100
            percentualTotal = percentualTotal + freqRelativa

            vetorFreqTotal.push(freqRelativa)

            let celulaVariavel = document.createElement('td'),
                celulaFreqSim = document.createElement('td'),
                celulaFreqRelativa = document.createElement('td'),
                celulaFreqAcum = document.createElement('td'),
                celulaFreqAcumPer = document.createElement('td')
            
            celulaVariavel.innerHTML = vetorVariavel[i]
            celulaFreqSim.innerHTML = cont
            celulaFreqRelativa.innerHTML = freqRelativa.toFixed(2) + '%'
            // CÁLCULO DA FREQUÊNCIA ACUMULADA
            celulaFreqAcum.innerHTML = somaTotal(vetorTotal)
            vetorFac.push(somaTotal(vetorTotal))

            // CÁLCULO DA FREQUÊNCIA ACUMULADA PERCENTUAL
            celulaFreqAcumPer.innerHTML = somaTotal(vetorFreqTotal).toFixed(2) + '%'

            corpoTabela.appendChild(linha)
            linha.appendChild(celulaVariavel)
            linha.appendChild(celulaFreqSim)
            linha.appendChild(celulaFreqRelativa)
            linha.appendChild(celulaFreqAcum)
            linha.appendChild(celulaFreqAcumPer)
        }
        // Construindo a tabela
        tabela.appendChild(corpoTabela)

        let linhaTotal = document.createElement('tr')
        rodapeTabela.appendChild(linhaTotal)

        let textoTotal = document.createElement('td')
        textoTotal.innerHTML = "Total"
        linhaTotal.appendChild(textoTotal)
        
        let total = document.createElement('td')
        total.innerHTML = somaTotal(vetorTotal)
        linhaTotal.appendChild(total)

        let totalPercentual = document.createElement('td')
        totalPercentual.innerHTML = Math.round(percentualTotal) + '%'
        linhaTotal.appendChild(totalPercentual)

        tabela.appendChild(rodapeTabela)
        
        // CÁLCULO DA MÉDIA PONDERADA SIMPLES
        let somaMedia = 0
        for(let i = 0; i < vetorVariavel.length; i++) {
            somaMedia += vetorVariavel[i] * vetorTotal[i]
        }
        
        let media = somaMedia / somaTotal(vetorTotal)

        resultMedia.innerHTML = 'Média: ' + media.toFixed(2)


        // CÁLCULO DA MEDIANA
        let mediana1,
            mediana2,
            mediana,
            posicao = 0
        if((vetorDados.length % 2) === 0) {
            posicao = vetorDados.length / 2
            mediana1 = vetorDados[posicao - 1]
            mediana2 = vetorDados[posicao]

            if(mediana1 == mediana2) {
                mediana = mediana1
            }
            else {
                mediana = mediana1 + " e " + mediana2
            }                            
        }
        else {
            posicao = ((vetorDados.length - 1) / 2)
            mediana = vetorDados[posicao]
        }

        resultMediana.innerHTML = 'Mediana: ' + mediana 
        
        // CÁLCULO DA MODA
        let moda = false
        // Verifica se existe moda
        for(let j = 1; j < vetorTotal.length; j++) {
            if(vetorTotal[0] !== vetorTotal[j]) {
                moda = true
                break
            }
        }

        if(moda === true) {    // Existe moda
            let maior = vetorTotal[0]
            for(let i = 1; i < vetorTotal.length; i++) {
                if(vetorTotal[i] > maior) {
                    maior = vetorTotal[i]
                }
            } 

            let vetorModa = []
            for(let i = 0; i < vetorTotal.length; i++) {
                if(vetorTotal[i] === maior) {
                    vetorModa.push(vetorVariavel[i])
                }
            }
            resultModa.innerHTML = 'Moda: ' + vetorModa
        }
        else {
            resultModa.innerHTML = 'Moda: Amodal'   // Não existe moda        
        }

        // CÁLCULO DO DESVIO PADRÃO
        let somatoria = 0,
            desvioPadrao = 0
        for(let i = 0; i < vetorVariavel.length; i++) {
            somatoria += (Math.pow((vetorVariavel[i] - media), 2)) * vetorTotal[i]
        }
        
        if(radAmostra.checked === true) {
            let amostra = somaTotal(vetorTotal) - 1
            desvioPadrao = Math.sqrt(somatoria / amostra)
        }
        else {
            let populacao = somaTotal(vetorTotal)
            desvioPadrao = Math.sqrt(somatoria / populacao)
        }
        resultDesvioPadrao.innerHTML = "Desvio Padrão: " + desvioPadrao.toFixed(2)

        // CÁLCULO DO COEFICIENTE DE VARIAÇÃO
        let coefVariacao = (desvioPadrao / media) * 100
        resultCoefVariacao.innerHTML = "Coeficiente de Variação: " + coefVariacao.toFixed(2) + "%"


        // CÁLCULO DAS MEDIDAS SEPARATRIZES ----------------------  
        calcMedSepNOD(somaTotal(vetorTotal), vetorDados)

        // GRÁFICO
        new Chart(grafico, {
            type: 'bar',
            data: {
                labels: vetorVariavel,
                datasets: [{
                    //label: nomeVariavel.value,
                    data: vetorFreqTotal,
                    backgroundColor: gerarCor(vetorVariavel)
                }]
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: nomeVariavel.value,
                    fontColor: "black",
                    fontSize: 20
                },
                scales: {
                    xAxes: [{
                        display: true,
                        barPercentage: 1,
                    }]
                }
            }
        })
    } 

    // PROCESSOS REFERENTES À VARIÁVEL QUANTITATIVA CONTÍNUA -----------------------------------------------
    if(tipoVariavel.value == "Quantitativa Contínua") {
        
        if(houveUpload === false) {
        
            for(let i = 0; i < vetorDados.length; i++) {

                if(vetorDados[i].indexOf(',')) {
                    vetorDados[i] = vetorDados[i].replace(",", ".")
                    vetorDados[i] = parseFloat(vetorDados[i])
                }
                else {
                    vetorDados[i] = parseInt(vetorDados[i])
                }
            }
        }

        vetorDados.sort(function(a, b) {
            return a - b;
        })

        // AMPLITUDE TOTAL DA SEQUÊNCIA (MAIOR NÚMERO DA DISTRIBUIÇÃO - MENOR NÚMERO DA DISTRIBUIÇÃO)
        let amplitude = Math.round((vetorDados[vetorDados.length - 1]) - vetorDados[0]) 

        // QUANTIDADE DE CLASSES (QUANTIDADE DE LINHAS)
        let k = Math.trunc(Math.sqrt(vetorDados.length)), // Raiz quadrada de n, n é a quantidade total pesquisada
            kMenos1 = k - 1,
            kMais1 = k + 1

        // INTERVALO DE CLASSE = AMPLITUDE + 1(PELO MENOS) / QUANTIDADE DE CLASSES                            
        let intervalo,
            qtLinhas,
            controle = false
        while(controle === false) {

            amplitude = amplitude + 1

            if(amplitude % k === 0) {
                intervalo = amplitude / k
                qtLinhas = k
                controle = true
            }
            else if(amplitude % kMenos1 === 0) {
                intervalo = amplitude / kMenos1
                qtLinhas = kMenos1
                controle = true
            }
            else if(amplitude % kMenos1 === 0) {
                intervalo = amplitude / kMais1
                qtLinhas = kMais1
                controle = true
            }                                
        }


        let vetorVariavel = []
        for(let i = 0; i < vetorDados.length; i++) {
            if(vetorDados[i] !== vetorDados[i + 1]) {
                vetorVariavel.push(vetorDados[i])
            }
        }

        let inferior = vetorDados[0],
            vetorTotal = [],
            vetorFreqTotal = [],
            percentualTotal = 0,
            vetorMediaIC = [],
            vetorLimites = [],
            vetorTeste = [],
            vetorFac = [],
            vetorVarLimites = []
        for(let i = 0; i < qtLinhas; i++) {
            let superior = inferior + intervalo

            let mediaIC = (inferior + superior) / 2
            vetorMediaIC.push(mediaIC)

            function contTotal() {
                let cont = 0

                for(let i = 0; i < vetorDados.length; i++) {
                    if((vetorDados[i] >= inferior) && (vetorDados[i] < superior)) {
                        cont = cont + 1
                    }
                }
                return cont
            }

            vetorTotal.push(contTotal())

            // FREQUÊNCIA RELATIVA
            let freqRelativa = (contTotal() / vetorDados.length) * 100
            percentualTotal = percentualTotal + freqRelativa

            vetorFreqTotal.push(freqRelativa)

            let linha = document.createElement('tr')
            let celula = document.createElement('td')

            celula.innerHTML = inferior + " &#8866; " + superior
            corpoTabela.appendChild(linha)
            linha.appendChild(celula)

            vetorVarLimites.push(inferior + " |-- " + superior)

            vetorTeste.push(inferior, superior)

            let celulaCont = document.createElement('td')
            celulaCont.innerHTML = contTotal()
            
            linha.appendChild(celulaCont)

            let celulaFreqRelativa = document.createElement('td')
            celulaFreqRelativa.innerHTML = freqRelativa.toFixed(2) + '%'

            linha.appendChild(celulaFreqRelativa)

            // SOMATÓRIO DA FREQUÊNCIA ACUMULADA
            let celulaFreqAcum = document.createElement('td')
            celulaFreqAcum.innerHTML = somaTotal(vetorTotal)
            vetorFac.push(somaTotal(vetorTotal))
            
            linha.appendChild(celulaFreqAcum)

            // SOMATÓRIO DA FREQUÊNCIA ACUMULADA PERCENTUAL
            let celulaFreqAcumPer = document.createElement('td')
            celulaFreqAcumPer.innerHTML = somaTotal(vetorFreqTotal).toFixed(2) + '%'

            linha.appendChild(celulaFreqAcumPer)

            vetorLimites.push(inferior)

            inferior = superior
        }
        // Construindo a tabela
        tabela.appendChild(corpoTabela)

        vetorLimites.push(inferior)

        let linhaTotal = document.createElement('tr')
        rodapeTabela.appendChild(linhaTotal)

        let textoTotal = document.createElement('td')
        textoTotal.innerHTML = "Total"
        linhaTotal.appendChild(textoTotal)
        
        let total = document.createElement('td')
        total.innerHTML = somaTotal(vetorTotal)
        linhaTotal.appendChild(total)

        let totalPercentual = document.createElement('td')
        totalPercentual.innerHTML = percentualTotal.toFixed(2) + '%'
        linhaTotal.appendChild(totalPercentual)

        tabela.appendChild(rodapeTabela)
        
        // CÁLCULO DA MÉDIA PONDERA SIMPLES
        let prodSum = 0
        let media = 0
        for(let i = 0; i < vetorMediaIC.length; i++) {
            prodSum += vetorMediaIC[i] * vetorTotal[i]
        }

        media = prodSum / somaTotal(vetorTotal)

        resultMedia.innerHTML = 'Média: ' + media.toFixed(2)

        // CÁLCULO DA MEDIANA
        let mediana,
            limiteInferior,
            freqAcAnterior,
            aux,
            fiMediana
        if((vetorDados.length % 2) === 0) {
            let posicao2 = vetorDados.length / 2,
                posicao1 = posicao2 - 1

            let i
            for(i = 0; i < vetorFac.length; i++) {
                if(posicao1 <= vetorFac[i]) {
                    break
                }
            }

            // Verifica se existe a Frequência Absoluta Acumulada anterior
            if(i === 0) {
                freqAcAnterior = 0
            }
            else {
                freqAcAnterior = vetorFac[i - 1]
            }

            // Determina o limite inferior da classe da mediana
            limiteInferior = vetorLimites[i]

            // Determina a Frequência Absoluta da Mediana 
            fiMediana = vetorTotal[i]
            aux = ((vetorDados.length / 2) - freqAcAnterior) / fiMediana
            mediana = limiteInferior + (aux * intervalo)
        }
        else {
            let posicao = ((vetorDados.length - 1) / 2)
            mediana = vetorDados[posicao]

            let i
            for(i = 0; i < vetorFac.length; i++) {
                if(posicao <= vetorFac[i]) {
                    break
                }
            }

            // Verifica se existe a Frequência Absoluta Acumulada anterior
            if(i === 0) {
                freqAcAnterior = 0
            }
            else {
                freqAcAnterior = vetorFac[i - 1]
            }

            limiteInferior = vetorLimites[i]
            fiMediana = vetorTotal[i]
            aux = ((vetorDados.length / 2) - freqAcAnterior) / fiMediana
            mediana = limiteInferior + (aux * intervalo)
        }

        resultMediana.innerHTML = 'Mediana: ' + mediana.toFixed(2)



        // CÁLCULO DAS MEDIDAS SEPARATRIZES ----------------------
        let posicaoMedSep = 0,
            simbolo = ""                
        if(medidaSeparatriz.selectedIndex === 1) {    //   QUARTIL 
            if(medidaQKD.selectedIndex === 0) {
                resultMedSeparatriz.innerHTML = ""
                medidaQKD.focus()
            }
            else {
                simbolo = 'Q<sub>'+medidaQKD.selectedIndex+'</sub>: '
                posicaoMedSep = medidaQKD.selectedIndex * 0.25 * somaTotal(vetorTotal)                                  
            }
        }
        else if(medidaSeparatriz.selectedIndex === 2) {      //   QUINTIL
            if(medidaQKD.selectedIndex === 0) {
                resultMedSeparatriz.innerHTML = ""
                medidaQKD.focus()
            }
            else {
                simbolo = 'K<sub>'+medidaQKD.selectedIndex+'</sub>: '
                posicaoMedSep = medidaQKD.selectedIndex * 0.2 * somaTotal(vetorTotal)                                    
            }
        }
        else if(medidaSeparatriz.selectedIndex === 3) {      //   DECIL
            if(medidaQKD.selectedIndex === 0) {
                resultMedSeparatriz.innerHTML = ""
                medidaQKD.focus()
            }
            else {
                simbolo = 'D<sub>'+medidaQKD.selectedIndex+'</sub>: '
                posicaoMedSep = medidaQKD.selectedIndex * 0.1 * somaTotal(vetorTotal)                                    
            }
        }
        else if(medidaSeparatriz.selectedIndex === 4) {      //   PERCENTIL
            if(percentil.value > 0 && percentil.value < 101) {
                simbolo = 'P<sub>'+percentil.value+'</sub>: '
                posicaoMedSep = percentil.value * 0.01 * somaTotal(vetorTotal)
            }
            else {
                resultMedSeparatriz.innerHTML = ""
                percentil.focus()                                    
            }
        }

        if(simbolo !== "") {
            let posicaoLinha
            for(posicaoLinha = 0; posicaoLinha < vetorFac.length; posicaoLinha++) {
                if(Math.round(posicaoMedSep) <= vetorFac[posicaoLinha]) {
                    break
                }
            }

            // Verifica se existe a Frequência Absoluta Acumulada anterior
            if(posicaoLinha === 0) {
                freqAcAntMedSep = 0
            }
            else {
                freqAcAntMedSep = vetorFac[posicaoLinha - 1]
            }

            let limiteInfMedSep = vetorLimites[posicaoLinha]
            let fiMedSep = vetorTotal[posicaoLinha]
            let auxMedSep = (posicaoMedSep - freqAcAntMedSep) / fiMedSep
            let valMedSep = limiteInfMedSep + auxMedSep * intervalo
            resultMedSeparatriz.innerHTML = simbolo + valMedSep.toFixed(2)
        }


        // CÁLCULO DA MODA
        let moda = false
        // Verifica se existe moda
        for(let j = 1; j < vetorTotal.length; j++) {
            if(vetorTotal[0] !== vetorTotal[j]) {
                moda = true
                break
            }
        }

        if(moda === true) {  // Existe moda
            let maior = vetorTotal[0]
            for(let i = 1; i < vetorTotal.length; i++) {
                if(vetorTotal[i] > maior) {
                    maior = vetorTotal[i]
                }
            }

            let vetorModa = []
            for(let i = 0; i < vetorTotal.length; i++) {
                if(vetorTotal[i] === maior) {
                    vetorModa.push(vetorMediaIC[i])
                }
            }

            resultModa.innerHTML = 'Moda: ' + vetorModa
        }
        else {  // Não existe moda
            resultModa.innerHTML = 'Moda: Amodal'
        }
        
        
        // CÁLCULO DO DESVIO PADRÃO
        let somatoria = 0,
            desvioPadrao = 0
        for(let i = 0; i < vetorMediaIC.length; i++) {
            somatoria += (Math.pow((vetorMediaIC[i] - media), 2)) * vetorTotal[i]
        }
        
        if(radAmostra.checked === true) {
            let amostra = somaTotal(vetorTotal) - 1
            desvioPadrao = Math.sqrt(somatoria / amostra)
        }
        else {
            let populacao = somaTotal(vetorTotal)
            desvioPadrao = Math.sqrt(somatoria / populacao)
        }
        resultDesvioPadrao.innerHTML = "Desvio Padrão: " + desvioPadrao.toFixed(2)

        // CÁLCULO DO COEFICIENTE DE VARIAÇÃO
        let coefVariacao = (desvioPadrao / media) * 100
        resultCoefVariacao.innerHTML = "Coeficiente de Variação: " + coefVariacao.toFixed(2) + "%"


        // GRÁFICO
        new Chart(grafico, {
            type: 'bar',
            data: {
                labels: vetorVarLimites,
                datasets: [{
                    data: vetorFreqTotal,
                    backgroundColor: gerarCor(vetorVarLimites)
                }]
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: nomeVariavel.value,
                    fontColor: "black",
                    fontSize: 20
                },
                scales: {
                    xAxes: [{
                        display: true,
                        barPercentage: 1.25,
                    }]
                }
            }
        })
    } 
    // FIM DA QUANTITATIVA CONTÍNUA

    dadoManual.readOnly = false
    nomeVariavel.readOnly = false
    exibeResultados.scrollIntoView()
    //exibeResultados.scrollIntoView({block: 'start', behavior:'smooth', inline:'start'})
}

// Clique no botão calcular
function exibirManual() {

    cabecalhoTabela.innerHTML = ""
    corpoTabela.innerHTML = ""
    rodapeTabela.innerHTML = ""
    resultMedia.innerHTML = ""
    resultModa.innerHTML = ""
    resultMediana.innerHTML = ""
    resultMedSeparatriz.innerHTML = ""
    resultDesvioPadrao.innerHTML = ""
    resultCoefVariacao.innerHTML = ""
    grafico.innerHTML = ""

    let valido = true
    let vetorDados = []
    if(houveUpload === false) {
        
        // Inserção Manual
        let stringManual = dadoManual.value
        //let vetorDados = []
        if(stringManual !== "") {
            vetorDados = stringManual.split(';')

            // Descarta eventuais espaços nas strings
            for(let i = 0; i < vetorDados.length; i++) {
                vetorDados[i] = vetorDados[i].trim()
            }

            if(nomeVariavel.value == '') {
                alert('Informe o nome da variável.')
                nomeVariavel.focus()
                exibeResultados.style.display = 'none'
                valido = false
            }
            else if(tipoVariavel.selectedIndex <= 0) {
                alert('Selecione o tipo de variável.')
                tipoVariavel.focus()
                exibeResultados.style.display = 'none'
                valido = false
            }
        }
        else {
            alert('Informe os dados.')
            dadoManual.focus()
            valido = false
        }
    }
    else if(houveUpload === true) {
        if(tipoVariavel.selectedIndex <= 0) {
            alert('Selecione o tipo de variável.')
            tipoVariavel.focus()
            valido = false
        }
        else {
            vetorDados = vetorDadosUpload
        }
    }

    if(valido === true) {
        efetuarCalculos(vetorDados)        
    }
}


// Uso OBRIGATÓRIO de um algoritmo de ordenação
function quickSort(vetor, inicio = 0, fim = vetor.length - 1) {
    if(fim > inicio) {
        let posDiv = inicio - 1
        let posPivot = fim
        for(let i = inicio; i < fim; i++) {
            if(vetor[i] < vetor[posPivot]) {
                posDiv++
                [vetor[i], vetor[posDiv]] = [vetor[posDiv], vetor[i]]
            }
        }
        posDiv++
        [vetor[posDiv], vetor[posPivot]] = [vetor[posPivot], vetor[posDiv]]

        quickSort(vetor, inicio, posDiv - 1) // Lado esquerdo (números menores que o pivot)
        quickSort(vetor, incio = posDiv + 1, fim) // Lado direito (números maiores que o pivot)
    }
}

// Atribuição dos eventos
window.onload = iniciar()
medidaSeparatriz.addEventListener('change', exibeMedSeparatriz)
tipoVariavel.addEventListener('change', changeTipoVariavel)
medidaQKD.addEventListener('change', exibirManual)
percentil.addEventListener('change', exibirManual)
botaoCalcular.addEventListener('click', exibirManual)
dadoManual.addEventListener('change', inputDadoManual)

corpoTabela.addEventListener('mousedown', reordenar)
corpoTabela.addEventListener('mouseover', mouseGrab)