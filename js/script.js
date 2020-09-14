let engine = {
    "cores": ['green','purple','pink','red','yellow','orange','grey','blue','black'],
    "hexadecimais":{
        'green': '#02ef00',
        'purple': '#790093',
        'pink': '#db2a88',
        'red': '#E90808',
        'yellow': '#E7D703',
        'orange': '#F16529',
        'grey': '#EBEBEB',
        'blue': '#223e99',
        'black': '#000000',
    },
    "moedas": 0
}

const audioMoeda = new Audio('audio/moeda.mp3')
const audioErrou = new Audio('audio/errou.mp3')

function sortearCor(){
    let indexCorSorteada = Math.floor(Math.random() * engine.cores.length)
    let legendaCorDaCaixa = document.querySelector('#cor-na-caixa')
    let nomeCorSorteada = engine.cores[indexCorSorteada]
    
    legendaCorDaCaixa.innerText = engine.cores[indexCorSorteada].toUpperCase()
    
    return engine.hexadecimais[nomeCorSorteada]
}

function aplicarCorNaCaixa(nomeDaCor){
    let caixaDasCores = document.querySelector('#cor-atual')
    
    
    caixaDasCores.style.backgroundColor = nomeDaCor
    caixaDasCores.style.backgroundImage = "url('/img/caixa-fechada.png')"
    caixaDasCores.style.backgroundSize = "100%";
}

function atualizaPontuacao(valor){
    let pontuacao = document.querySelector('#pontuacao-atual')

    engine.moedas +=valor;

    if(valor<0){
        audioErrou.play()
    }else{
        audioMoeda.play()
    }

    pontuacao.innerText = engine.moedas
}

aplicarCorNaCaixa(sortearCor())
//API DE RECONHECIMENTO DE VOZ
let btnGravador = document.getElementById("btn-responder");
let transcricaoAudio =  " ";
let respostaCorreta = document.querySelector('#cor-na-caixa')


if(window.SpeechRecognition || window.webkitSpeechRecognition){
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();

    gravador.continuos = false;
    gravador.lang = "en-US";

    gravador.onstart = function(){
        btnGravador.innerText = "Estou ouvindo";
        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
    }

    gravador.onend = function(){
        btnGravador.innerText = "Responder";
        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white";
    }

    gravador.onresult = function(event){
        transcricaoAudio = event.results[0][0].transcript.toUpperCase()
        respostaCorreta = document.querySelector('#cor-na-caixa').innerText.toUpperCase()
        
        if(transcricaoAudio === respostaCorreta){
            atualizaPontuacao(1)
        }else{
            atualizaPontuacao(-1)
        }
        aplicarCorNaCaixa(sortearCor())
    }

}else{
    alert('Não tem suporte')
}


btnGravador.addEventListener('click', function(){
    gravador.start()
})