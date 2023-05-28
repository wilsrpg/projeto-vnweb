import { useContext, useEffect, useState } from "react";
import { acoes } from "../sistema/Redutor";
import { contexto } from "../sistema/Contexto";
import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
import { musicas } from "../mapeadores/Musicas";
import { sons } from "../mapeadores/Sons";
import Botao from "../interface/Botao";

export default function TelaInicial() {
  const sistema = useContext(contexto);
  //const [anexou, anexar] = useState(false);
  let menuInicial = document.getElementById("menu");
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou tela inicial");
  
  //configurações iniciais
  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef telainicial []");
    sistema?.despachar({tipo: acoes.mudarImagemDeFundo, endereco: imagensDeFundo.titulo});
    sistema?.despachar({tipo: acoes.mudarMusica, endereco: musicas.idk, numero1: 50});
    sistema?.despachar({tipo: acoes.aceitarInteracao, opcao: false});
    sistema?.despachar({tipo: acoes.mudarRoteiro, numero1: -1});
    sistema?.despachar({tipo: acoes.mudarEvento, numero1: -1});
    //anexar(true);
    menuInicial = document.getElementById("menu");
    new Promise((resolve) => {setTimeout(() => {resolve("");}, 1000);})
    .then(()=>{
    if(menuInicial){
      sistema?.exibirElemento(menuInicial);}
    })
  }, [])

  /*useEffect(()=>{
    if(anexou){
      while(menuInicial?.childElementCount)
        menuInicial.firstChild?.remove();
      anexarMenu();
    }
  }, [anexou]);

  async function anexarMenu(){
    await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef telainicial, entrou função anexarmenu");
    menuInicial = document.getElementById("menu");
    
    const botaoNovoJogo = criarBotaoDeMenu("Novo Jogo",menuNovoJogo);
    const botaoContinuar = criarBotaoDeMenu("Continuar",menuContinuar);
    const botaoOpcoes = criarBotaoDeMenu("Opções",menuOpcoes);
    menuInicial?.appendChild(botaoNovoJogo);
    menuInicial?.appendChild(botaoContinuar);
    menuInicial?.appendChild(botaoOpcoes);
    botaoNovoJogo.focus();
    //const botaoSom = document.getElementById("botão de som");

    botaoNovoJogo?.addEventListener("keydown",(e)=>{
      if(e.key == "ArrowUp") botaoOpcoes.focus();
      if(e.key == "ArrowDown") botaoContinuar.focus();
      //if(e.key == "ArrowRight" && botaoSom) botaoSom.focus();
    });
    botaoContinuar?.addEventListener("keydown",(e)=>{
      if(e.key == "ArrowUp") botaoNovoJogo.focus();
      if(e.key == "ArrowDown") botaoOpcoes.focus();
      //if(e.key == "ArrowRight" && botaoSom) botaoSom.focus();
    });
    botaoOpcoes?.addEventListener("keydown",(e)=>{
      if(e.key == "ArrowUp") botaoContinuar.focus();
      if(e.key == "ArrowDown") botaoNovoJogo.focus();
      //if(e.key == "ArrowRight" && botaoSom) botaoSom.focus();
    });
  }

  function criarBotaoDeMenu(desc: string, func: ()=>void) {
    const botao = document.createElement("input");
    botao.type = "button";
    botao.value = desc;
    botao.onclick = func;
    return botao;
  }*/

  function menuNovoJogo(){
    //tocarBip();
    sistema?.despachar({tipo: acoes.mudarRoteiro, numero1: 1});
    sistema?.despachar({tipo: acoes.mudarTela, string: "jogo"});
    sistema?.despachar({tipo: acoes.definirDataDeInicio, numero1: Date.now()});
  }

  function menuTestarRoteiro(){
    //tocarBip();
    sistema?.despachar({tipo: acoes.mudarRoteiro, numero1: 0});
    sistema?.despachar({tipo: acoes.mudarTela, string: "jogo"});
  }

  function menuOpcoes(){
    //tocarBip();
    sistema?.despachar({tipo: acoes.exibirTelaDeOpcoes, opcao: true});
    //sistema?.despachar({tipo: acoes.mudarTela, string: "opções"});
  }

  function menuArquivos(){
    //tocarBip();
    sistema?.despachar({tipo: acoes.exibirTelaDeArquivos, opcao: true});
    //sistema?.despachar({tipo: acoes.mudarMusica, endereco: ""});
    //sistema?.despachar({tipo: acoes.mudarTela, string: "opções"});
  }
  
  //function tocarBip(){
  //  sistema?.despachar({tipo: acoes.tocarSom, endereco: sons.bip});
  //}

  return (
    <>
    {/*{!sistema?.estado.exibindoTelaDeOpcoes &&*/}
      <div id="menu" style={{
          position: "absolute",
          width: "100%",
          height: "33%",
          bottom: "6%",
          display: "grid",
          grid: "auto/max-content",
          placeContent: "space-evenly center",
          opacity: 0,
        }}>
        {/*<button onClick={menuNovoJogo}>Novo Jogo</button>
        <button onClick={menuContinuar}>Continuar</button>
        <button onClick={menuOpcoes}>Opções</button>*/}
        <Botao nome="Novo jogo" func={menuNovoJogo}/>
        <Botao nome="Testar roteiro" func={menuTestarRoteiro}/>
        <Botao nome="Opções" func={menuOpcoes}/>
        <Botao nome="Gerenciar arquivos" func={menuArquivos}/>
        {/*<Botao nome="Novo Jogo" func={menuNovoJogo} style={{opacity: 0}}/>
        <Botao nome="Continuar" func={menuContinuar} style={{opacity: 0}}/>
        <Botao nome="Opções" func={menuOpcoes} style={{opacity: 0}}/>*/}
      </div>
    {/*}*/}
    </>
  )
}
