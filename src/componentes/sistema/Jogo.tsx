import React, { useEffect, useReducer } from "react";
import { contexto, estadoInicial } from "./Contexto";
import Grafico from "./Grafico";
import Som from "./Som";
import { acoes, redutor } from "./Redutor";
import { salvo } from "./TiposDeObjetos";

export default function Jogo() {
  const [estado, despachar] = useReducer(redutor, estadoInicial);
  if(estado.msgsConsole.renderizacoes)
    console.log("renderizou jogo");

  //configurações iniciais
  useEffect(()=>{
    if(estado.msgsConsole.effects)
      console.log("ef jogo []");
    document.body.onkeydown = (e)=>{capturarTeclaOnKeyDown(e);};
    // document.body.onclick=(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{capturarClique(e)};
  }, [])

  useEffect(()=>{
    if(!estado.arquivoSalvoParaCarregar)
      return;
    let arquivo: salvo = estado.arquivoSalvoParaCarregar;
    despachar({tipo: acoes.definirDataDeInicio, numero1: arquivo.dataDeInicio});
    despachar({tipo: acoes.definirTempoDeJogo, numero1: arquivo.tempoDeJogo});
    estado.escolhas = arquivo.escolhas;
    despachar({tipo: acoes.mudarTela, string: "jogo"});
    despachar({tipo: acoes.removerTodosOsPersonagens});
    despachar({tipo: acoes.adicionarPersonagensDoSalvo});
    despachar({tipo: acoes.mudarRoteiro, string: arquivo.roteiroAtual});
    despachar({tipo: acoes.mudarEvento, numero1: arquivo.eventoAtual});
    despachar({tipo: acoes.mudarImagemDeFundo, endereco: arquivo.imagemDeFundoAtual});
    if(estado.audioHabilitado != arquivo.audioHabilitado)
      despachar({tipo: acoes.alternarAudio});
    despachar({tipo: acoes.mudarVolume, numero1: arquivo.volumeGeral});
    despachar({tipo: acoes.tocarMusica, endereco: arquivo.musicaAtual?.endereco, numero1: arquivo.musicaAtual?.volume});
    despachar({tipo: acoes.mudarFonte, string: arquivo.fonte});
    despachar({tipo: acoes.mudarCorDaFonte, string: arquivo.corDaFonte});
    despachar({tipo: acoes.mudarVelocidadeDoTexto, numero1: arquivo.velocidadeDoTexto});
    despachar({tipo: acoes.limparHistorico});
    arquivo.historicoDeMensagens.map((msg: string, i: number)=>{
      if(i < arquivo.historicoDeMensagens.length-1)
        despachar({tipo: acoes.adicionarAoHistorico, string: msg});
    });
    if(!estado.digitandoMensagem)
      despachar({tipo: acoes.escreverMensagem, string: arquivo.mensagemParaEscrever});
  }, [estado.arquivoSalvoParaCarregar])

  //efeitos de fade-out e fade-in, podem ser usados com qualquer elemento;
  //retornam uma promise após o tempo de transição, que pode ser usada com
  //await na chamada da função para pausar a execução do código enquanto a
  //transição ocorre
  function ocultarElemento(elem: HTMLElement, tempo=500) {
    let opacInicial = 1;
    if(elem.hasAttribute("opacity"))
      opacInicial = parseInt(elem.style.opacity);
    const fadeOut = [{ opacity: opacInicial },{ opacity: 0 }];
    elem.style.opacity = "0";
    return elem.animate(fadeOut, tempo).finished;
  }

  function exibirElemento(elem: HTMLElement, tempo=500, opacFinal=1) {
    const fadeIn = [{ opacity: 0 },{ opacity: opacFinal}];
    elem.style.opacity = ""+opacFinal;
    return elem.animate(fadeIn, tempo).finished;
  }

  //funções úteis
  function voltarParaTelaInicial() {
    despachar({tipo: acoes.removerTodosOsPersonagens});
    despachar({tipo: acoes.limparHistorico});
    despachar({tipo: acoes.redefinirEscolhas});
    despachar({tipo: acoes.escreverMensagem, string: ""});
    despachar({tipo: acoes.mudarRoteiro, string: ""});
    despachar({tipo: acoes.mudarEvento, numero1: -1});
    despachar({tipo: acoes.mudarTela, string: "menu inicial"});
  }

  //?
  function aguardar(ms: number) {
    let minimo = 10;
    if(ms>0 && estado.telaAtual == "jogo")
      setTimeout(()=>aguardar(ms-minimo), minimo);
  }

  function interagir(){
    if(estado.aceitandoInteracao && !estado.exibindoTelaDeOpcoes && !estado.exibindoTelaDoHistorico)
      if(estado.digitandoMensagem)
        despachar({tipo: acoes.digitarMensagem, opcao: false});
      else {
        despachar({tipo: acoes.aceitarInteracao, opcao: false});
        despachar({tipo: acoes.proximoEvento});
      }
  }

  //function capturarCliqueOnClick(e: MouseEvent) {
  function capturarCliqueOnClick(e: React.MouseEvent) {
    if (e.button == 0){
      if(estado.msgsConsole.mouseTeclado)
        console.log("clicou");
        interagir();
    }
  }

  function capturarTecla(e: KeyboardEvent){
  //function capturarTecla(e: React.KeyboardEvent){
    if(e.repeat) return;
      if(estado.msgsConsole.mouseTeclado)
        console.log("apertou '"+e.key+"'")
    //if(e.key=="m"){
    //  alternarAudio();
    //}
    if(e.key=="z" || e.key=="Enter"){
        interagir();
    }
    /*if(e.key=="Backspace"){
      console.log("cena="+sistema.telaAtual());
      if(sistema.telaAtual() != "menu inicial"){
        alert("voltando pro menu inicial pela tecla backspace");
        interagir();
        sistema.removerTodosOsPersonagens();
        interagir();
        sistema.mudarTela("menu inicial");
      }
    }*/
  }

  function capturarTeclaOnKeyDown(e: KeyboardEvent) {
    if(e.repeat)
      return;
    if(estado.msgsConsole.mouseTeclado)
      console.log("apertou '"+e.key+"'")
    //if(e.key=="z" || e.key=="Enter")
    //  interagir();
    /*if(e.key=="x" || e.key=="Escape"){
      if(estado.exibindoTelaDeOpcoes)
        despachar({tipo: acoes.exibirTelaDeOpcoes, opcao: false})
      else if(estado.exibindoTelaDoHistorico)
        despachar({tipo: acoes.exibirTelaDoHistorico, opcao: false})
      // else if(!estado.exibindoTelaDeOpcoes && !estado.exibindoTelaDoHistorico && estado.telaAtual == "jogo")
      else if(estado.telaAtual == "jogo")
        voltarParaTelaInicial();
    }*/
  }
  
  return (
    <div id="tela"
      onClick={(e)=>{capturarCliqueOnClick(e)}}
      // onKeyDown={(e)=>{capturarTeclaOnkeydown(e)}}
      style={{
        position: "relative",
        //maxWidth: "640px",
        //maxHeight: "480px",
        width: "640px",
        height: "480px",
        backgroundColor: "black", //pros fade-outs das bgi's
        userSelect: "none",
      }}
    >
      <contexto.Provider value={{
        estado, despachar, exibirElemento, ocultarElemento, voltarParaTelaInicial
      }}>
        <Grafico/>
        <Som/>
      </contexto.Provider>
    </div>
  )
}
