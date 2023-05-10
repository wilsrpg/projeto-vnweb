import { useContext, useEffect, useRef, useState } from "react";
import { sons } from "./mapeadores/Sons";
import { contexto } from "./Sistema";

export default function Apresentacao() {
  const sistema = useContext(contexto);
  let titulo = document.getElementById("titulo");
  //let pulou = false;
  const pulou = useRef(false);
  //const [pulou, pular] = useState(false);
  console.log("renderizou apresentação");
  
  //configurações iniciais
  useEffect(()=>{
    titulo = document.getElementById("titulo");
    console.log("ef apresentação []");
    abertura();
  }, [])

  async function abertura() {
    if(titulo){
      //console.log("entrou abertura, pulou="+pulou.current);
      await exibirElemento(titulo,1.5);
      //console.log("ants som1, pulou="+pulou.current);
      if(pulou.current == false)
        sistema?.tocarSom(sons.confirmar2);
      if(pulou.current == false)
        await new Promise((resolve) => setTimeout(() => resolve(""), 2000))
      //console.log("ants som2, pulou="+pulou.current);
      if(pulou.current == false)
        sistema?.tocarSom(sons.confirmar2);
      if(pulou.current == false)
        await ocultarElemento(titulo,1.5);
      if(pulou.current == false)
        sistema?.mudarCena(0);
    }
  }
  
  async function exibirElemento(elem: HTMLElement, tempo=0.5, opacFinal=1) {
    const fadeIn = [{ opacity: 0 },{ opacity: opacFinal}];
    elem.style.opacity = ""+opacFinal;
    return elem.animate(fadeIn, tempo*1000).finished;
  }
  async function ocultarElemento(elem: HTMLElement, tempo=0.5) {
    let opacInicial = 1;
    if(elem.hasAttribute("opacity"))
      opacInicial = parseInt(elem.style.opacity);
    const fadeOut = [{ opacity: opacInicial },{ opacity: 0 }];
    elem.style.opacity = "0";
    return elem.animate(fadeOut, tempo*1000).finished;
  }

  //pular abertura
  useEffect(()=>{
    let e = sistema?.estado.eventoAtual;
    //let e = sistema?.eventoAtual2;
    console.log("apresentação ef eventoAtual="+e)
    if(e !== undefined && e >= 0){
      pulou.current = true;
      //pular(true);
      console.log("pulou abertura");
      sistema?.mudarCena(0);
    }
  }, [sistema?.estado.eventoAtual])
  //}, [sistema?.eventoAtual2])

  return (
    <div style={{
      position: "absolute",
      width: "640px",
      height: "480px",
      backgroundColor: "black",
      fontSize: "300%",
      color: "white",
      display: "grid",
      grid: "auto/max-content",
      placeContent: "center center",
    }}>
      <label id="titulo" style={{opacity: 0}}>Estúdio Nome Temporário</label>
    </div>
  )
}
