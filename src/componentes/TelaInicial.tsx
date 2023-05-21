import { useContext, useEffect, useState } from "react";
import bgi from "../midias/bgi-titulo.png";
import bgm from "../midias/bgm-idk.ogg";
import bip from "../midias/som-confirmar.ogg";
import { acoes, contexto } from "./Sistema";

export default function TelaInicial() {
  const sistema = useContext(contexto);
  const [anexou, anexar] = useState(false);
  let menuInicial = document.getElementById("menu");;
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou tela inicial");
  
  //configurações iniciais
  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef telainicial []");
    sistema?.despachar({tipo: acoes.mudarImagemDeFundo, endereco: bgi});
    sistema?.despachar({tipo: acoes.mudarMusica, endereco: bgm, numero1: 50});
    sistema?.despachar({tipo: acoes.aceitarInteracao, opcao: false});
    sistema?.despachar({tipo: acoes.mudarRoteiro, numero1: -1});
    sistema?.despachar({tipo: acoes.mudarEvento, numero1: -1});
    anexar(true);
  }, [])

  useEffect(()=>{
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
  }

  function menuNovoJogo(){
    tocarBip();
    sistema?.despachar({tipo: acoes.mudarRoteiro, numero1: 0});
    sistema?.despachar({tipo: acoes.mudarTela, string: "jogo"});
  }

  function menuContinuar(){
    tocarBip();
    sistema?.despachar({tipo: acoes.mudarRoteiro, numero1: 1});
    sistema?.despachar({tipo: acoes.mudarTela, string: "jogo"});
  }

  function menuOpcoes(){
    tocarBip();
    sistema?.despachar({tipo: acoes.exibirTelaDeOpcoes, opcao: true});
  }

  function tocarBip(){
    sistema?.despachar({tipo: acoes.tocarSom, endereco: bip});
  }

  return (
    <div id="menu" style={{
        position: "absolute",
        width: "100%",
        height: "25%",
        bottom: "10%",
        display: "grid",
        grid: "auto/max-content",
        placeContent: "space-evenly center",
        // opacity: 0,
      }}>
    </div>
  )
}
