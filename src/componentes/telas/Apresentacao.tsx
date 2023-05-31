import { useContext, useEffect, useRef } from "react";
import { contexto } from "../sistema/Contexto";
import { acoes } from "../sistema/Redutor";
import { sons } from "../mapeadores/Sons";

export default function Apresentacao() {
  const sistema = useContext(contexto);
  let titulo = document.getElementById("título");
  const pulou = useRef(false);
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou apresentação");
  
  //configurações iniciais
  useEffect(()=>{
    titulo = document.getElementById("título");
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef apresentação []");
    executar();
  }, [])

  async function executar() {
    if(titulo){
      await sistema?.exibirElemento(titulo, 1500);
      if(pulou.current == false)
        sistema?.despachar({tipo: acoes.tocarSom, endereco: sons.plem});
      if(pulou.current == false)
        await new Promise(r=>setTimeout(r,2000))
      if(pulou.current == false)
        sistema?.despachar({tipo: acoes.tocarSom, endereco: sons.plem});
      if(pulou.current == false)
        await sistema?.ocultarElemento(titulo, 1500);
      if(pulou.current == false)
        sistema?.despachar({tipo: acoes.mudarTela, string: "menu inicial"});
    }
  }
  
  //pular apresentação
  useEffect(()=>{
    let e = sistema?.estado.eventoAtual;
    //if(sistema?.estado.msgsConsole.effects)
    //  console.log("ef apresentação eventoAtual="+e)
    if(e != undefined && e >= 0){
      pulou.current = true;
      if(sistema?.estado.msgsConsole.effects)
        console.log("ef apresentação pulou apresentação");
      sistema?.despachar({tipo: acoes.mudarTela, string: "menu inicial"});
    }
  }, [sistema?.estado.eventoAtual])

  return (
    <div id="apresentação" style={{
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
      <p id="título" style={{opacity: 0}}>
        Estúdio Nome Temporário
      </p>
    </div>
  )
}
