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
        console.log(linhas)

        vetorArquivo = linhas

        let contador = 0
        if(vetorArquivo === "" || vetorArquivo == null || vetorArquivo.length <= 1) {
            alert('Informe os dados.')
        }
        else {

            vetorDadosUpload = []
            let titulo = vetorArquivo.shift()
            dadoManual.value = ""
            dadoManual.readOnly = true
            nomeVariavel.value = titulo
            nomeVariavel.readOnly = true

            console.log('VetorArquivo ' + vetorArquivo)

            for(let i = 0; i < vetorArquivo.length; i++) {
                if(vetorArquivo[i] != '' && vetorArquivo[i] != null && vetorArquivo[i] != undefined && vetorArquivo[i].length != 0) {

                    let numero = parseFloat(vetorArquivo[i].replace(',', '.'))
                    if(!isNaN(numero)) {
                        vetorDadosUpload.push(numero)
                    }
                    else {
                        contador++
                    }          
                }
            }
        }

        if(contador == vetorArquivo.length - 1) {
            console.log('Vetor de string')
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

        console.log({contador})

        // Variável de controle
        houveUpload = true
    }
    leitorCSV.readAsText(inputArquivo.files[0]) // Lê arquivo como texto e especifica o arquivo a ser lido
}, false)


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


// Mudança do tipo de variável
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


// Mudança no input do dado manual
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

    console.log(valorIndex)
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
    console.log(somaTotalNOD)
    console.log(vetDadosNOD)
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
        console.log({posicaoQKDP})
        if(posicaoQKDP == 0) {
            resultMedSeparatriz.innerHTML = simboloQKDP + vetDadosNOD[posicaoQKDP]
            console.log({posicaoQKDP, simboloQKDP, somaTotalNOD})
        }
        else {
            resultMedSeparatriz.innerHTML = simboloQKDP + vetDadosNOD[posicaoQKDP - 1]
            console.log({posicaoQKDP, simboloQKDP, somaTotalNOD, vetDadosNOD})
        }
    }
}

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

/* Reordenar a tabela quando o tipo de variável for Qualitativa Ordinal */
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

/* Verifica a posição do elemento para fazer a reordenação */
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
        //console.log(distancia)

        if(distancia < 0 && distancia > proximo.distancia) {
            return {distancia: distancia, element: child}
        }
        else {
            return proximo
        }

    }, {distancia: Number.NEGATIVE_INFINITY}).element

}

/* Depois de todas as validações, chama-se esta função */
function efetuarCalculos(vetorDados) {
    exibeResultados.style.display = 'block'
    tabela.style.display = 'inline-block'

    criaCabecalhoTabela()

    // QUALITATIVA NOMINAL E ORDINAL -----------------------------------
    if(tipoVariavel.value == "Qualitativa Nominal" || tipoVariavel.value == "Qualitativa Ordinal") {
        divMedidasDispersao.style.display = "none"
        vetorDados.sort()
        console.log(vetorDados)

        let vetorVariavel = [],
            percentualTotal = 0
        for(let i = 0; i < vetorDados.length; i++) {
            if(vetorDados[i] !== vetorDados[i + 1]) {
                vetorVariavel.push(vetorDados[i])
            }
        }
        console.log('Vetor Variável: ' + vetorVariavel)

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
            // FREQUÊNCIA ACUMULADA
            celulaFreqAcum.innerHTML = somaTotal(vetorTotal)

            // FREQUÊNCIA ACUMULADA PERCENTUAL
            celulaFreqAcumPer.innerHTML = somaTotal(vetorFreqTotal).toFixed(2) + '%'

            corpoTabela.appendChild(linha)
            linha.appendChild(celulaVariavel)
            linha.appendChild(celulaFreqSim)
            linha.appendChild(celulaFreqRelativa)
            linha.appendChild(celulaFreqAcum)
            linha.appendChild(celulaFreqAcumPer)
        }
        
        tabela.appendChild(corpoTabela)

        let linhaTotal = document.createElement('tr')
        rodapeTabela.appendChild(linhaTotal)

        let textoTotal = document.createElement('td')
        textoTotal.innerHTML = "Total"
        linhaTotal.appendChild(textoTotal)
        
        let totalDados = document.createElement('td')
        totalDados.innerHTML = somaTotal(vetorTotal)
        linhaTotal.appendChild(totalDados)

        console.log(somaTotal(vetorTotal))

        let totalPercentual = document.createElement('td')
        totalPercentual.innerHTML = percentualTotal.toFixed(2) + '%'
        linhaTotal.appendChild(totalPercentual)

        tabela.appendChild(rodapeTabela)

        // MEDIANA
        let mediana,
            mediana1,
            mediana2,
            posicao = 0
        if((vetorDados.length % 2) === 0) {
            posicao = vetorDados.length / 2
            console.log('É par. Posição: ' + posicao + ' e ' + (posicao + 1))
            mediana1 = vetorDados[posicao - 1]
            mediana2 = vetorDados[posicao]

            if(mediana1 == mediana2) {
                mediana = mediana1
            }
            else {
                mediana = mediana1 + " e " + mediana2
            }
            console.log(posicao)  
            console.log('Mediana 2: ' + mediana2)                          
        }
        else {
            posicao = ((vetorDados.length - 1) / 2)
            console.log('É ímpar. Posição: ' + posicao)
            mediana = vetorDados[posicao]
        }

        resultMediana.innerHTML = 'Mediana: ' + mediana

        // MODA
        console.log(vetorTotal)

        let moda = false
        for(let j = 1; j < vetorTotal.length; j++) {
            if(vetorTotal[0] !== vetorTotal[j]) {
                moda = true
                break
            }
        }
        console.log({moda})

        if(moda === true) {
            let maior = vetorTotal[0]
            for(let i = 1; i < vetorTotal.length; i++) {
                if(vetorTotal[i] > maior) {
                    maior = vetorTotal[i]
                }
            } 
            console.log(maior)
            let vetorModa = []
            for(let i = 0; i < vetorTotal.length; i++) {
                if(vetorTotal[i] === maior) {
                    vetorModa.push(vetorVariavel[i])
                }
            }
            console.log({maior, vetorModa})
            
            resultModa.innerHTML = 'Moda: ' + vetorModa
        }
        else {
            resultModa.innerHTML = 'Moda: Amodal'                                
        }

        // MEDIDAS SEPARATRIZES ----------------------
        calcMedSepNOD(somaTotal(vetorTotal), vetorDados)

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


    // QUANTITATIVA DISCRETA -------------------------------------------------
    if(tipoVariavel.value == "Quantitativa Discreta") {

        if(houveUpload === false) {
            for(let i = 0; i < vetorDados.length; i++) {

                if(vetorDados[i].indexOf(',')) {
                    vetorDados[i] = vetorDados[i].replace(",", ".")
                    vetorDados[i] = parseFloat(vetorDados[i])
                }
                else {
                    vetorDados[i] = parseInt(vetorDados[i])
                    console.log(i)
                }
            }
        }

        vetorDados.sort(function(a, b) {
            return a - b
        })

        console.log(vetorDados)

        let vetorVariavel = [],
            percentualTotal = 0,
            vetorFac = []
        for(let i = 0; i < vetorDados.length; i++) {
            if(vetorDados[i] !== vetorDados[i + 1]) {
                vetorVariavel.push(vetorDados[i])
            }
        }
        console.log('Vetor Variável: ' + vetorVariavel)

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

            // FREQUÊNCIA RELATIVA
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
            // FREQUÊNCIA ACUMULADA
            celulaFreqAcum.innerHTML = somaTotal(vetorTotal)
            vetorFac.push(somaTotal(vetorTotal))

            // FREQUÊNCIA ACUMULADA PERCENTUAL
            celulaFreqAcumPer.innerHTML = somaTotal(vetorFreqTotal).toFixed(2) + '%'

            corpoTabela.appendChild(linha)
            linha.appendChild(celulaVariavel)
            linha.appendChild(celulaFreqSim)
            linha.appendChild(celulaFreqRelativa)
            linha.appendChild(celulaFreqAcum)
            linha.appendChild(celulaFreqAcumPer)
        }
    
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
        
        // MÉDIA PONDERADA SIMPLES
        let somaMedia = 0
        for(let i = 0; i < vetorVariavel.length; i++) {
            somaMedia += vetorVariavel[i] * vetorTotal[i]
        }
        
        let media = somaMedia / somaTotal(vetorTotal)

        resultMedia.innerHTML = 'Média: ' + media.toFixed(2)


        // MEDIANA
        let mediana1,
            mediana2,
            mediana,
            posicao = 0
        if((vetorDados.length % 2) === 0) {
            posicao = vetorDados.length / 2
            console.log('É par. Posição: ' + posicao + ' e ' + (posicao + 1))
            mediana1 = vetorDados[posicao - 1]
            mediana2 = vetorDados[posicao]

            if(mediana1 == mediana2) {
                mediana = mediana1
            }
            else {
                mediana = mediana1 + " e " + mediana2
            }
            console.log({posicao})                            
        }
        else {
            posicao = ((vetorDados.length - 1) / 2)
            console.log('É ímpar. Posição: ' + posicao)
            mediana = vetorDados[posicao]
        }

        resultMediana.innerHTML = 'Mediana: ' + mediana 
        
        // MODA
        let moda = false
        for(let j = 1; j < vetorTotal.length; j++) {
            if(vetorTotal[0] !== vetorTotal[j]) {
                moda = true
                break
            }
        }
        console.log({moda})

        if(moda === true) {
            let maior = vetorTotal[0]
            for(let i = 1; i < vetorTotal.length; i++) {
                if(vetorTotal[i] > maior) {
                    maior = vetorTotal[i]
                }
            } 
            console.log(maior)
            let vetorModa = []
            for(let i = 0; i < vetorTotal.length; i++) {
                if(vetorTotal[i] === maior) {
                    vetorModa.push(vetorVariavel[i])
                }
            }
            console.log({maior, vetorModa})
            
            resultModa.innerHTML = 'Moda: ' + vetorModa
        }
        else {
            resultModa.innerHTML = 'Moda: Amodal'           
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
            console.log({amostra, somatoria, desvioPadrao})
        }
        else {
            let populacao = somaTotal(vetorTotal)
            desvioPadrao = Math.sqrt(somatoria / populacao)
            console.log({populacao, somatoria, desvioPadrao})
        }
        resultDesvioPadrao.innerHTML = "Desvio Padrão: " + desvioPadrao.toFixed(2)

        // CÁLCULO DO COEFICIENTE DE VARIAÇÃO
        let coefVariacao = (desvioPadrao / media) * 100
        resultCoefVariacao.innerHTML = "Coeficiente de Variação: " + coefVariacao.toFixed(2) + "%"
        console.log({coefVariacao, media})


        // MEDIDAS SEPARATRIZES ----------------------  
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

    // QUANTITATIVA CONTÍNUA -----------------------------------------------
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
        });

        console.log('Vetor Dados: ' + vetorDados)

        // AMPLITUDE TOTAL DA SEQUÊNCIA (MAIOR NÚMERO DA DISTRIBUIÇÃO - MENOR NÚMERO DA DISTRIBUIÇÃO)
        let amplitude = Math.round((vetorDados[vetorDados.length - 1]) - vetorDados[0])
        console.log(amplitude) 

        // QUANTIDADE DE CLASSES (QUANTIDADE DE LINHAS)
        let k = Math.trunc(Math.sqrt(vetorDados.length)), // Raiz quadrada de n, n é a quantidade total pesquisada
            kMenos1 = k - 1,
            kMais1 = k + 1
    
        console.log(kMenos1, k, kMais1)

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
        console.table({amplitude, qtLinhas, intervalo})
        console.log(vetorDados)


        let vetorVariavel = []
        for(let i = 0; i < vetorDados.length; i++) {
            if(vetorDados[i] !== vetorDados[i + 1]) {
                vetorVariavel.push(vetorDados[i])
            }
        }
        console.log('Vetor Variável: ' + vetorVariavel)

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

            // FREQUÊNCIA ACUMULADA
            let celulaFreqAcum = document.createElement('td')
            celulaFreqAcum.innerHTML = somaTotal(vetorTotal)
            vetorFac.push(somaTotal(vetorTotal))
            
            linha.appendChild(celulaFreqAcum)

            // FREQUÊNCIA ACUMULADA PERCENTUAL
            let celulaFreqAcumPer = document.createElement('td')
            celulaFreqAcumPer.innerHTML = somaTotal(vetorFreqTotal).toFixed(2) + '%'

            linha.appendChild(celulaFreqAcumPer)

            vetorLimites.push(inferior)

            inferior = superior
        }

        tabela.appendChild(corpoTabela)

        console.log(vetorVarLimites)

        vetorLimites.push(inferior)
        console.log('Versão final: ' + vetorLimites)

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
        
        // MÉDIA PONDERA SIMPLES
        let prodSum = 0
        let media = 0
        for(let i = 0; i < vetorMediaIC.length; i++) {
            prodSum += vetorMediaIC[i] * vetorTotal[i]
        }

        media = prodSum / somaTotal(vetorTotal)

        resultMedia.innerHTML = 'Média: ' + media.toFixed(2)

        // MEDIANA
        let mediana,
            limiteInferior,
            freqAcAnterior,
            aux,
            fiMediana
        if((vetorDados.length % 2) === 0) {
            let posicao2 = vetorDados.length / 2,
                posicao1 = posicao2 - 1
            console.log('É par. Posição: ' + posicao1 + ' e ' + (posicao2))

            let i
            for(i = 0; i < vetorFac.length; i++) {
                if(posicao1 <= vetorFac[i]) {
                    console.log('Está na posição ' + i)
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

            console.log('vetorTotal ' + vetorTotal)
            // Determina a Frequência Absoluta da Mediana 
            fiMediana = vetorTotal[i]
            aux = ((vetorDados.length / 2) - freqAcAnterior) / fiMediana
            mediana = limiteInferior + (aux * intervalo)
            console.log({i, limiteInferior, freqAcAnterior, intervalo, fiMediana, aux, mediana})
        }
        else {
            let posicao = ((vetorDados.length - 1) / 2)
            console.log('É ímpar. Posição.')
            mediana = vetorDados[posicao]
            console.log({posicao, mediana})


            let i
            for(i = 0; i < vetorFac.length; i++) {
                if(posicao <= vetorFac[i]) {
                    console.log({i})
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
            console.log({limiteInferior, freqAcAnterior, intervalo, fiMediana, aux, mediana})
        }

        resultMediana.innerHTML = 'Mediana: ' + mediana.toFixed(2)



        // MEDIDAS SEPARATRIZES ----------------------
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
                    console.log('Está na posição ' + posicaoLinha)
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
            console.log({posicaoMedSep, posicaoLinha, limiteInfMedSep, freqAcAntMedSep, intervalo, fiMedSep, auxMedSep, valMedSep})
        }


        // MODA
        console.log({vetorTotal})

        let moda = false
        for(let j = 1; j < vetorTotal.length; j++) {
            if(vetorTotal[0] !== vetorTotal[j]) {
                moda = true
                break
            }
        }
        console.log({moda})

        if(moda === true) {

            let maior = vetorTotal[0]
            for(let i = 1; i < vetorTotal.length; i++) {
                if(vetorTotal[i] > maior) {
                    maior = vetorTotal[i]
                }
            }
            console.log(maior)

            let vetorModa = []
            for(let i = 0; i < vetorTotal.length; i++) {
                if(vetorTotal[i] === maior) {
                    vetorModa.push(vetorMediaIC[i])
                }
            }

            resultModa.innerHTML = 'Moda: ' + vetorModa

            console.log({vetorMediaIC, maior, vetorModa})
        }
        else {
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
            console.log({amostra, somatoria, desvioPadrao})
        }
        else {
            let populacao = somaTotal(vetorTotal)
            desvioPadrao = Math.sqrt(somatoria / populacao)
            console.log({populacao, somatoria, desvioPadrao})
        }
        resultDesvioPadrao.innerHTML = "Desvio Padrão: " + desvioPadrao.toFixed(2)

        // CÁLCULO DO COEFICIENTE DE VARIAÇÃO
        let coefVariacao = (desvioPadrao / media) * 100
        resultCoefVariacao.innerHTML = "Coeficiente de Variação: " + coefVariacao.toFixed(2) + "%"
        console.log({coefVariacao, media})


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

/* Clique no botão calcular */
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

window.onload = iniciar()
medidaSeparatriz.addEventListener('change', exibeMedSeparatriz)
tipoVariavel.addEventListener('change', changeTipoVariavel)
medidaQKD.addEventListener('change', exibirManual)
percentil.addEventListener('change', exibirManual)
botaoCalcular.addEventListener('click', exibirManual)
dadoManual.addEventListener('change', inputDadoManual)

corpoTabela.addEventListener('mousedown', reordenar)
corpoTabela.addEventListener('mouseover', mouseGrab)