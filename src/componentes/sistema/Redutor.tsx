import { estadoInicial, iVariaveis } from "./Contexto";
import { Acao, personagem, salvo } from "./TiposDeObjetos";

export enum acoes {
  mudarTela = "mudarTela",
  definirDataDeInicio = "definirDataDeInicio",
  definirUltimaVezQueCarregou = "definirUltimaVezQueCarregou",
  mudarRoteiro = "mudarRoteiro",
  mudarEvento = "mudarEvento",
  proximoEvento = "proximoEvento",
  aceitarInteracao = "aceitarInteracao",
  pausarJogo = "pausarJogo",
  mudarImagemDeFundo = "mudarImagemDeFundo",
  alternarAudio = "alternarAudio",
  mudarVolume = "mudarVolume",
  tocarMusica = "tocarMusica",
  tocarSom = "tocarSom",
  adicionarPersonagem = "adicionarPersonagem",
  mudarSpritePersonagem = "mudarSprite",
  moverPersonagem = "moverPersonagem",
  virarPersonagem = "virarPersonagem",
  removerPersonagem = "removerPersonagem",
  //removerPersonagem2 = "removerPersonagem2",
  removerTodosOsPersonagens = "removerTodosOsPersonagens",
  exibirPainelInferior = "exibirPainelInferior",
  escreverMensagem = "escreverMensagem",
  digitarMensagem = "digitarMensagem",
  adicionarAoHistorico = "adicionarAoHistorico",
  limparHistorico = "limparHistorico",
  exibirTelaDoHistorico = "exibirTelaDoHistorico",
  exibirTelaDeOpcoes = "exibirTelaDeOpcoes",
  exibirTelaDeArquivos = "exibirTelaDeArquivos",
  mudarFonte = "mudarFonte",
  mudarCorDaFonte = "mudarCorDaFonte",
  mudarVelocidadeDoTexto = "mudarVelocidadeDoTexto",
  salvar = "salvar",
  carregar = "carregar",
  excluirSalvo = "excluirSalvo",
  definirTempoDeJogo = "definirTempoDeJogo",
  adicionarPersonagensDoSalvo = "adicionarPersonagensDoSalvo",
  redefinirEscolhas = "redefinirEscolhas",
};

//central de comando das funções do reducer; normalmente, cada comando atualiza
//uma variável que ativa um effect para executar as ações necessárias
export function redutor(estado: iVariaveis, acao: Acao) {
  if(estado.msgsConsole.redutor)
    console.log("[entrou redutor, ação="+acao.tipo+"]");
  switch (acao.tipo) {
    case acoes.mudarTela:
      return { ...estado, telaAtual: acao.string! };
      
    case acoes.definirDataDeInicio:
      return { ...estado, dataDeInicio: acao.numero1! };
    
    case acoes.definirUltimaVezQueCarregou:
      return { ...estado, ultimaVezQueCarregou: acao.numero1! };

    case acoes.mudarRoteiro:
      return { ...estado, roteiroAtual: acao.string! };

    case acoes.mudarEvento:
      return { ...estado, eventoAtual: acao.numero1! };
      
      case acoes.proximoEvento:
        return { ...estado, eventoAtual: estado.eventoAtual+1 };

    case acoes.aceitarInteracao:
      return { ...estado, aceitandoInteracao: acao.opcao! };
      
    case acoes.pausarJogo:
      return { ...estado, jogoPausado: acao.opcao! };
    
    case acoes.mudarImagemDeFundo:
      if(!acao.endereco)
        return { ...estado, imagemDeFundoAtual: "" };
      return { ...estado, imagemDeFundoAtual: acao.endereco! };

    case acoes.alternarAudio:
      return { ...estado, audioHabilitado: !estado.audioHabilitado };

    case acoes.mudarVolume:
      return { ...estado, volumeGeral: acao.numero1! };

    case acoes.tocarMusica:
      if(!acao.endereco)
        return { ...estado, musicaAtual: null };
      let volumeMusica = 100;
      if(acao.numero1 != undefined)
        volumeMusica = acao.numero1;
      return { ...estado, musicaAtual: {endereco: acao.endereco, volume: volumeMusica} };

    case acoes.tocarSom:
      if(!acao.endereco)
        return { ...estado, somParaTocar: null };
      let volumeSom = 100;
      if(acao.numero1 != undefined)
        volumeSom = acao.numero1;
      return { ...estado, somParaTocar: {endereco: acao.endereco, volume: volumeSom} };

    case acoes.adicionarPersonagem:
      if(!acao.nome || !acao.endereco || !acao.string && acao.numero1 == undefined)
        return { ...estado, personagemParaAdicionar: null };

      let posX = 0;
      if(acao.numero1 != undefined)
        posX = acao.numero1;
      //prioridade pra string
      if(acao.string == "esquerda")
        posX = estadoInicial.larguraTela*0.25;
      else if(acao.string == "meio")
        posX = estadoInicial.larguraTela*0.5;
      else if(acao.string == "direita")
        posX = estadoInicial.larguraTela*0.75;

      //let posY = estadoInicial.alturaTela;
      let posY = 0;
      if(acao.numero2 != undefined)
        posY = acao.numero2;
      
      let espelhar = false;
      if(acao.opcao)
        espelhar = true;

      const persAdi: personagem = {
        nome: acao.nome,
        endereco: acao.endereco,
        posicao: acao.string,
        posX: posX,
        posY: posY,
        espelhado: espelhar,
      };
      return { ...estado, personagensParaAdicionar: [ ...estado.personagensParaAdicionar, persAdi] };

    case acoes.mudarSpritePersonagem:
      if(!acao.nome || !acao.endereco)
        return { ...estado };
      
      let persMud: personagem;
      let idMud = -1;
      estado.personagensNaTela.map((pers,i)=>{
        //console.log("redutor>mudarSpr>buscando id> pers["+i+"].nome="+pers.nome);
        if(acao.nome && pers.nome == acao.nome)
          idMud = i;
      })
      //console.log("mudando sprite do personagem "+acao.nome+", id="+idMud);
      //console.log("nome="+estado.personagensNaTela[idMud].nome);
      persMud = estado.personagensNaTela[idMud];
      persMud.endereco = acao.endereco;
      if(acao.opcao != undefined)
        persMud.espelhado = acao.opcao;
      //return { ...estado, personagemParaRemover: persMud.nome, personagemParaAdicionar: persMud };
      return { ...estado, personagensIdParaRemover: [ ...estado.personagensIdParaRemover, idMud ],
                          personagensParaAdicionar: [ ...estado.personagensParaAdicionar, persMud ] };

    case acoes.moverPersonagem:
      if(!acao.nome || !acao.string && acao.numero1 == undefined && acao.opcao == undefined)
        return { ...estado };
      
      let persMov: personagem;
      let idMov = -1;
      estado.personagensNaTela.map((pers,i)=>{
        if(acao.nome && pers.nome == acao.nome)
          idMov = i;
      })
      persMov = estado.personagensNaTela[idMov];

      if(acao.numero1 != undefined)
        persMov.posX = acao.numero1;
      //prioridade pra string
      if(acao.string == "esquerda" || acao.string == "meio" || acao.string == "direita")
        persMov.posicao = acao.string;
      if(acao.string == "esquerda")
        persMov.posX = estadoInicial.larguraTela*0.25;
      else if(acao.string == "meio")
        persMov.posX = estadoInicial.larguraTela*0.5;
      else if(acao.string == "direita")
        persMov.posX = estadoInicial.larguraTela*0.75;

      if(acao.numero2 != undefined)
        persMov.posY = acao.numero2;
      
      if(acao.opcao != undefined)
        persMov.espelhado = acao.opcao;
      
      //return { ...estado, personagemParaRemover: persMov.nome, personagemParaAdicionar: persMov };
      return { ...estado, personagensIdParaRemover: [ ...estado.personagensIdParaRemover, idMov ],
                          personagensParaAdicionar: [ ...estado.personagensParaAdicionar, persMov ] };

    case acoes.virarPersonagem:
      if(!acao.nome)
        return { ...estado };
      
      let persVir: personagem;
      let idVir = -1;
      estado.personagensNaTela.map((pers,i)=>{
        if(acao.nome && pers.nome == acao.nome)
          idVir = i;
      })
      persVir = {
        nome: estado.personagensNaTela[idVir].nome,
        endereco: estado.personagensNaTela[idVir].endereco,
        posicao: estado.personagensNaTela[idVir].posicao,
        posX: estado.personagensNaTela[idVir].posX,
        posY: estado.personagensNaTela[idVir].posY,
        sprite: estado.personagensNaTela[idVir].sprite,
        espelhado: false //tive q fazer assim pq a repetição de comandos do modo dev tava invertendo 2x esse valor, qd acao.opcao==undefined (ver abaixo)
      };
      
      //console.log("em redutor, acao.opcao="+acao.opcao);
      //console.log("em redutor ants, persVir.espelhado="+persVir.espelhado);
      if(acao.opcao == undefined)
        persVir.espelhado = !estado.personagensNaTela[idVir].espelhado; //o modo dev executa 2x essa instrução, por isso
        //persVir não pode ser atribuído com estado.personagensNaTela[idVir], senão persVir.espelhado será um referência a
        //estado.personagensNaTela[idVir].espelhado, oq faz com q seu valor seja invertido 2x aqui, voltando ao original ¬¬
        //por isso, precisei criar um novo personagem com tds as propriedades de estado.personagensNaTela[idVir], exceto espelhado
      else
        persVir.espelhado = acao.opcao;
      //console.log("em redutor dps, persVir.espelhado="+persVir.espelhado);
      //return { ...estado, personagemParaRemover: persVir.nome, personagemParaAdicionar: persVir };
      return { ...estado, personagensIdParaRemover: [ ...estado.personagensIdParaRemover, idVir ],
                          personagensParaAdicionar: [ ...estado.personagensParaAdicionar, persVir ] };

    //case acoes.removerPersonagem:
    //  if(!acao.nome)
    //    return { ...estado, personagemParaRemover: null };
    //  return { ...estado, personagemParaRemover: acao.nome };

    case acoes.removerPersonagem:
      if(!acao.nome)
        return { ...estado };
      let idRem = -1;
      estado.personagensNaTela.map((pers,i)=>{
        if(acao.nome && pers.nome == acao.nome)
        idRem = i;
      })
      return { ...estado, personagensIdParaRemover: [ ...estado.personagensIdParaRemover, idRem ] };
  
    case acoes.removerTodosOsPersonagens:
      if(acao.opcao == undefined)
        return { ...estado, removendoTodosOsPersonagens: true };
      else
        return { ...estado, removendoTodosOsPersonagens: acao.opcao };

    case acoes.exibirPainelInferior:
      if(acao.opcao == undefined)
        return { ...estado, exibindoPainelInferior: true };
      else
        return { ...estado, exibindoPainelInferior: acao.opcao };

    case acoes.escreverMensagem:
      let msg = "";
      if(acao.string)
        msg = acao.string;
      return { ...estado, mensagemParaEscrever: msg };

    case acoes.digitarMensagem:
      if(acao.opcao == undefined)
        return { ...estado, digitandoMensagem: true };
      else
        return { ...estado, digitandoMensagem: acao.opcao };

    case acoes.adicionarAoHistorico:
      if(!acao.string)
        return { ...estado };
      else
        return { ...estado, historicoDeMensagens: [ ...estado.historicoDeMensagens, acao.string ] };

    case acoes.limparHistorico:
      return { ...estado, historicoDeMensagens: [] };
    
    case acoes.exibirTelaDoHistorico:
      if(acao.opcao == undefined)
        return { ...estado, exibindoTelaDoHistorico: true };
      else
        return { ...estado, exibindoTelaDoHistorico: acao.opcao };
  
    case acoes.exibirTelaDeOpcoes:
      if(acao.opcao == undefined)
        return { ...estado, exibindoTelaDeOpcoes: true };
      else
        return { ...estado, exibindoTelaDeOpcoes: acao.opcao };

    case acoes.exibirTelaDeArquivos:
      if(acao.opcao == undefined)
        return { ...estado, exibindoTelaDeArquivos: true };
      else
        return { ...estado, exibindoTelaDeArquivos: acao.opcao };
  
    case acoes.mudarFonte:
      if(acao.string)
        return { ...estado, fonte: acao.string };
      else
        return { ...estado };
  
    case acoes.mudarCorDaFonte:
      if(acao.string)
        return { ...estado, corDaFonte: acao.string };
      else
        return { ...estado };
      
    case acoes.mudarVelocidadeDoTexto:
      if(acao.numero1){
        if(acao.numero1 > 3) acao.numero1 = 3;
        if(acao.numero1 < 1) acao.numero1 = 1;
        return { ...estado, velocidadeDoTexto: acao.numero1 };
      } else
        return { ...estado };

    case acoes.salvar:
      let salvar = false;
      if (localStorage.length == 0){
        salvar = true;
      } else {
        let arqSalvo = JSON.parse(localStorage.salvo);
        salvar = confirm("Sobrescrever o jogo salvo?"
          +"\nRoteiro: "+arqSalvo.roteiroAtual
          +"\nInício: "+converterEmData(arqSalvo.dataDeInicio)
          +"\nÚltimo vez que salvou: "+converterEmData(arqSalvo.ultimaVezQueSalvou)
          +"\nTempo de jogo: "+converterEmHoras(arqSalvo.tempoDeJogo)
        );
      }
      if(salvar){
        let arquivo: salvo = {
          dataDeInicio: estado.dataDeInicio,
          tempoDeJogo: estado.tempoDeJogo + Date.now() - estado.ultimaVezQueCarregou,
          ultimaVezQueSalvou: Date.now(),
          roteiroAtual: estado.roteiroAtual,
          eventoAtual: estado.eventoAtual,
          imagemDeFundoAtual: estado.imagemDeFundoAtual,
          audioHabilitado: estado.audioHabilitado,
          volumeGeral: estado.volumeGeral,
          musicaAtual: estado.musicaAtual,
          personagensNaTela: estado.personagensNaTela,
          mensagemParaEscrever: estado.mensagemParaEscrever,
          digitandoMensagem: estado.digitandoMensagem,
          historicoDeMensagens: estado.historicoDeMensagens,
          fonte: estado.fonte,
          corDaFonte: estado.corDaFonte,
          velocidadeDoTexto: estado.velocidadeDoTexto,
          escolhas: estado.escolhas,
        };
        localStorage.salvo = JSON.stringify(arquivo);
        //console.log(JSON.parse(localStorage.salvo));
        alert("O jogo foi salvo com sucesso.");
      }
      return { ...estado };
      
    case acoes.carregar:
      if(acao.opcao == false)
        return { ...estado, arquivoSalvoParaCarregar: null }
      if (localStorage.length == 0){
        alert("Não há jogo salvo.");
        return { ...estado };
      } else {
        let arqSalvo = JSON.parse(localStorage.salvo);
        let carregar = confirm("Carregar o jogo salvo?"
          +"\nRoteiro: "+arqSalvo.roteiroAtual
          +"\nInício: "+converterEmData(arqSalvo.dataDeInicio)
          +"\nÚltimo vez que salvou: "+converterEmData(arqSalvo.ultimaVezQueSalvou)
          +"\nTempo de jogo: "+converterEmHoras(arqSalvo.tempoDeJogo)
        );
        if(carregar)
          return { ...estado, arquivoSalvoParaCarregar: JSON.parse(localStorage.salvo), ultimaVezQueCarregou: Date.now(),
                  mensagemParaEscrever: "" }; //senão não escreve a msg do salvo, se a msg exibida no momento for igual a ela
        else
          return { ...estado };
      }

    case acoes.excluirSalvo:
      if (localStorage.length == 0){
        alert("Não há jogo salvo.");
      } else {
        let arqSalvo = JSON.parse(localStorage.salvo);
        let excluir = confirm("Excluir o jogo salvo?"
          +"\nRoteiro: "+arqSalvo.roteiroAtual
          +"\nInício: "+converterEmData(arqSalvo.dataDeInicio)
          +"\nÚltimo vez que salvou: "+converterEmData(arqSalvo.ultimaVezQueSalvou)
          +"\nTempo de jogo: "+converterEmHoras(arqSalvo.tempoDeJogo)
        );
        if(excluir){
          localStorage.removeItem("salvo");
          alert("O jogo foi excluído com sucesso.");
        }
      }
      return { ...estado };

    case acoes.adicionarPersonagensDoSalvo:
      let op = false;
      if(acao.opcao == undefined)
        op = true;
      else
        op = acao.opcao;
      return { ...estado, adicionandoPersonagensDoSalvo: op };

    case acoes.definirTempoDeJogo:
      return { ...estado, tempoDeJogo: acao.numero1! };
    
    case acoes.redefinirEscolhas:
      return { ...estado, escolhas: [] };
      
    default:
      // throw new Error("Opção '"+acao.tipo+"' não existe no redutor.\n");
      alert("Opção '"+acao.tipo+"' não existe no redutor.\n");
      return { ...estado };
  }
}

function converterEmData(t: number) {
  let data = new Date(t);
  let dataStr = (data.getDate()<10?"0":"")+data.getDate()
    +"/"+(1+data.getMonth()<10?"0":"")+(1+data.getMonth())
    +"/"+data.getFullYear()
    +" "+(data.getHours()<10?"0":"")+data.getHours()
    +":"+(data.getMinutes()<10?"0":"")+data.getMinutes()
    +":"+(data.getSeconds()<10?"0":"")+data.getSeconds();
  return dataStr;
}

function converterEmHoras(t: number) {
  let segundos = Math.floor(t)/1000;
  let horJogo = Number(Math.floor(segundos/3600).toFixed(0));
  let minJogo = Number((Math.floor(segundos/60)%60).toFixed(0));
  let segJogo = Number((segundos%60).toFixed(0));
  let tmpJgStr = horJogo+":"+(minJogo<10?"0":"")+minJogo+":"+(segJogo<10?"0":"")+segJogo;
  return tmpJgStr;
}