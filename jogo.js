var vidas = 1
var tempo = 15
var criarMosquitos = null
var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

 if(nivel === 'facil'){
    criaMosquitoTempo = 2000
} else if(nivel === 'normal'){
    criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
    criaMosquitoTempo = 1000
} else if (nivel === 'impossivel') {
    criaMosquitoTempo = 1000
}

document.getElementById('cronometro').textContent = tempo

var cronometro = setInterval(function(){
    
    tempo -= 1

    if(tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criarMosquitos)
        window.location.href = './vitoria.html'
    } else {
        document.getElementById('cronometro').textContent = tempo
    }
}, 1000)

function iniciarJogo(){

    var criarMosquitos = setInterval(function(){
    
        if(document.getElementById('mosquito')) {
            if(vidas > 3) {
                window.location.href = 'fim_de_jogo.html';
            }
        
            document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png';
        
            vidas++;
        }

        let mosquito = new Mosquito();
        mosquito.criarMosquito();
    
    }, criaMosquitoTempo)
}

class Mosquito{
    
    constructor() {
        this.srcMosquito = './imagens/mosquito.png';
        this.tamanho = this.gerarTamanhoAleatorio();
        this.lado = this.gerarLadoAleatorio();
        this.posicaoX = this.gerarPosicaoAleatoria()['x'];
        this.posicaoY = this.gerarPosicaoAleatoria()['y'];
    }

    gerarTamanhoAleatorio(){
        let num = Math.floor(Math.random() * 3)
    
        switch(num){
            case 0:
                return 70;
            case 1:
                return 100;
            case 2:
                return 130;
        }
    }
    
    gerarLadoAleatorio(){
        let nun = Math.floor(Math.random() * 2)
    
        switch(nun){
            case 0:
                return 1;
            case 1:
                return -1;
        }
    }
    
    gerarPosicaoAleatoria(){
    
        let altura = window.innerHeight;
        let largura = window.innerWidth;
    
        let posicaoX = Math.floor(Math.random() * largura) - this.tamanho;
        let posicaoY = Math.floor(Math.random() * altura) - this.tamanho;
    
        posicaoX = posicaoX < 0 ? 0 : posicaoX;
        posicaoY = posicaoY < 0 ? 0 : posicaoY;

        let posicoes = { x: posicaoX, y: posicaoY };
    
        return posicoes;
    }
    
    criarMosquito(){
        this.removerMosquito();

        let mosquito = document.createElement('img');
        mosquito.src = this.srcMosquito;
        mosquito.style.width = this.tamanho + 'px';
        mosquito.style.height = this.tamanho + 'px';
        mosquito.style.transform = 'scaleX(' + this.lado + ')';
        mosquito.style.left = this.posicaoX + 'px';
        mosquito.style.top = this.posicaoY + 'px';
        mosquito.style.position = 'absolute';
        mosquito.id = 'mosquito';
        mosquito.onmousedown = () => {
            this.removerMosquito();
        }

        document.body.appendChild(mosquito);
    }

    removerMosquito(){
        let mosquitoExistente = document.getElementById('mosquito');
        
        if(mosquitoExistente){
            mosquitoExistente.remove();
        }
    }
}