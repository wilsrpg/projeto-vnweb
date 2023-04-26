import { useContext, useEffect, useRef, useState } from "react";
import { contexto } from "./Sistema";
import bgi from "../arquivos/bgi-titulo.png";
//import bgm from "../arquivos/bgm-titulo.ogg";
import bgm from "../arquivos/bgm-idk.ogg";
import { sons } from "./mapeadores/Sons";

export default function TelaInicial() {
  const sistema = useContext(contexto);
  const [anexou,setAnexou] = useState(false);
  let anexou2 = false;
  console.log("renderizou telainicial");
  
  //configurações iniciais
  useEffect(()=>{
    console.log("ef telainicial []");
    sistema?.mudarImagemDeFundo(bgi);
    sistema?.mudarMusica(bgm);
    sistema?.irParaEvento(-1);
    //const menuInicial = document.getElementById("menu");
    //anexarMenu();
    setAnexou(true);
    // anexou2 = true;
  }, [])

  useEffect(()=>{
    if(anexou)
      anexarMenu();
  }, [anexou]);

  function tocarBip(){
    // if (sistema?.estado.audioHabilitado) {
    //   const bip = new Audio(sons.confirmar);
    //   //const bip = new Audio(sistema.estado.sons.confirmar);
    //   bip.play();
    // }
    sistema?.tocarSom(sons.confirmar);
  }

  async function menu2() {
    return (
      <>
      {await new Promise((resolve) => setTimeout(() => resolve(""), 3000))}
        <button /*style={{justifySelf: "center"}}*/ onClick={menuNovoJogo}>Novo Jogo</button>
        <button /*style={{justifySelf: "center"}}*/ onClick={menuContinuar}>Continuar</button>
        <button /*style={{justifySelf: "center"}}*/ onClick={menuOpcoes}>Opções</button>
      </>
    )
  }

  function menuNovoJogo() {
    tocarBip();
    sistema?.mudarCena(1);
  }

  function menuContinuar() {
    tocarBip();
     sistema?.mudarCena(2);
  }

  function menuOpcoes() {
    tocarBip();
  }

  async function anexarMenu(){
    // if(anexou)
    //   return;
    // setAnexou(true);
    //anexou = true;

    await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
    console.log("entrou anexarmenu");
    const menuInicial = document.getElementById("menu");
    
    var btnNovoJogo = document.createElement("input");
    btnNovoJogo.type = "button";
    btnNovoJogo.value = "Novo Jogo";
    // btnNovoJogo.setAttribute("onClick","menuNovoJogo");
    btnNovoJogo.onclick = menuNovoJogo;
    menuInicial?.appendChild(btnNovoJogo);
    
    var btnContinuar = document.createElement("input");
    btnContinuar.type = "button";
    btnContinuar.value = "Continuar";
    // btnContinuar.setAttribute("onClick","menuContinuar");
    btnContinuar.onclick = menuContinuar;
    menuInicial?.appendChild(btnContinuar);
    
    var btnOpcoes = document.createElement("input");
    btnOpcoes.type = "button";
    btnOpcoes.value = "Opções";
    // btnOpcoes.setAttribute("onClick","menuOpcoes");
    btnOpcoes.onclick = menuOpcoes;
    menuInicial?.appendChild(btnOpcoes);

    // .then
    // return (
    //   <>
    //   {menu2}
    //   </>
    // )
  }

  //botões do menu, exibidos em grid (css);
  //o código comentado dá no mesmo resultado, mas usando flex
  return (
    //<div id="menu" style={{
    //  position: "relative",
    //  width: "100%",
    //  height: "auto"
    //}}>
      /*<img src={bgTitulo} style={{
        width: "100%",
        height: "auto",
        display: "block"
      }} />*/

      <div id="menu" style={{
        position: "absolute",
        width: "100%",
        height: "25%",
        bottom: "10%",
        display: "grid",
        grid: "auto/max-content",
        placeContent: "space-evenly center"
      }}>

      </div>

      /*<div style={{
        position: "absolute",
        width: "100%",
        height: "25%",
        bottom: "10%",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}>
          <button value="Novo Jogo" style={{alignSelf: "stretch"}}>Novo Jogo</button>
          <button value="Continuar" style={{alignSelf: "stretch"}}>Continuar</button>
          <button value="Opções" style={{alignSelf: "stretch"}}>Opções</button>
        </div>
      </div>*/

    /*</div>*/
  )
}
