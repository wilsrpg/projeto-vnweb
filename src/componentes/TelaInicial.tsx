import { useContext, useEffect, useRef, useState } from "react";
import { contexto } from "./Sistema";
import bgi from "../midias/bgi-titulo.png";
//import bgm from "../midias/bgm-titulo.ogg";
import bgm from "../midias/bgm-idk.ogg";
import { sons } from "./mapeadores/Sons";
//import BotaoDeMenu from "./BotaoDeMenu";

export default function TelaInicial() {
  const sistema = useContext(contexto);
  const [anexou, anexar] = useState(false);
  //const anexar = useRef(false);
  //let anexou2 = false;
  let menuInicial = document.getElementById("menu");;
  console.log("renderizou telainicial");
  
  //configurações iniciais
  useEffect(()=>{
    console.log("ef telainicial []");
    sistema?.mudarImagemDeFundo(bgi);
    sistema?.mudarMusica(bgm);
    sistema?.ocuparSistema();
    sistema?.irParaEvento(-1);
    //const menuInicial = document.getElementById("menu");
    //anexarMenu();
    anexar(true);
    //anexar.current = true;
    // anexou2 = true;
  }, [])

  useEffect(()=>{
    if(anexou)
      anexarMenu();
  }, [anexou]);

  //useEffect(()=>{
  //  if(anexar.current)
  //    anexarMenu();
  //}, [anexar.current]);

  function tocarBip(){
    // if (sistema?.estado.audioHabilitado) {
    //   const bip = new Audio(sons.confirmar);
    //   //const bip = new Audio(sistema.estado.sons.confirmar);
    //   bip.play();
    // }
    sistema?.tocarSom(sons.confirmar);
  }

  //async function menu2() {
  //  return (
  //    <>
  //    {await new Promise((resolve) => setTimeout(() => resolve(""), 3000))}
  //      <button /*style={{justifySelf: "center"}}*/ onClick={menuNovoJogo}>Novo Jogo</button>
  //      <button /*style={{justifySelf: "center"}}*/ onClick={menuContinuar}>Continuar</button>
  //      <button /*style={{justifySelf: "center"}}*/ onClick={menuOpcoes}>Opções</button>
  //    </>
  //  )
  //}

  function menuNovoJogo() {
    tocarBip();
    sistema?.mudarCena(1);
  }

  function menuContinuar() {
    tocarBip();
    // sistema?.mudarCena(2);
  }

  function menuOpcoes() {
    tocarBip();
  }

  function criarBotaoDeMenu(desc:string, func:()=>void) {
    const botao = document.createElement("input");
    botao.type = "button";
    botao.value = desc;
    botao.onclick = func;
    //botao.parentElement?.appendChild(botao);
    return botao;
  }

  async function anexarMenu(){
    // if(anexou)
    //   return;
    // setAnexou(true);
    //anexou = true;

    await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
    console.log("entrou anexarmenu");
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
    //botaoSom?.addEventListener("keydown",(e)=>{
    //  if(e.key == "ArrowDown") botaoNovoJogo.focus();
    //  if(e.key == "ArrowRight") botaoNovoJogo.focus();
    //});
    
    //var btnNovoJogo = document.createElement("input");
    //btnNovoJogo.type = "button";
    //btnNovoJogo.value = "Novo Jogo";
    //// btnNovoJogo.setAttribute("onClick","menuNovoJogo");
    //btnNovoJogo.onclick = menuNovoJogo;
    //menuInicial?.appendChild(btnNovoJogo);
    
    //var btnContinuar = document.createElement("input");
    //btnContinuar.type = "button";
    //btnContinuar.value = "Continuar";
    //// btnContinuar.setAttribute("onClick","menuContinuar");
    //btnContinuar.onclick = menuContinuar;
    //menuInicial?.appendChild(btnContinuar);
    
    //var btnOpcoes = document.createElement("input");
    //btnOpcoes.type = "button";
    //btnOpcoes.value = "Opções";
    //// btnOpcoes.setAttribute("onClick","menuOpcoes");
    //btnOpcoes.onclick = menuOpcoes;
    //menuInicial?.appendChild(btnOpcoes);

    // .then
    // return (
    //   <>
    //   {menu2}
    //   </>
    // )
  }

  function definirSetasPara(b: HTMLElement) {
    b.addEventListener("keydown",setasBotao1);
    //if(e.key == "ArrowUp")
    //  e;
  }

  function setasBotao1(e: KeyboardEvent) {
    if(e.key == "ArrowUp")
      e;
  }

  function setaBaixo(e: KeyboardEvent) {
    if(e.key == "ArrowDown")
      e;
  }

  function setasLados(e: KeyboardEvent) {
    if(e.key == "ArrowRight" || e.key == "ArrowLeft")
      e;
  }

  //botões do menu, exibidos em grid (css);
  //o código comentado dá no mesmo resultado, mas usando flex
  return (
    //<div id="menu" style={{
    //  position: "relative",
    //  width: "100%",
    //  height: "auto",
    //}}>
      /*<img src={bgTitulo} style={{
        width: "100%",
        height: "auto",
        display: "block",
      }} />*/

      <div id="menu" style={{
        position: "absolute",
        width: "100%",
        height: "25%",
        bottom: "10%",
        display: "grid",
        grid: "auto/max-content",
        placeContent: "space-evenly center",
      }}>

      </div>

      /*<div style={{
        position: "absolute",
        width: "100%",
        height: "25%",
        bottom: "10%",
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}>
          <button value="Novo Jogo" style={{alignSelf: "stretch"}}>Novo Jogo</button>
          <button value="Continuar" style={{alignSelf: "stretch"}}>Continuar</button>
          <button value="Opções" style={{alignSelf: "stretch"}}>Opções</button>
        </div>
      </div>*/

    /*</div>*/
  )
}
