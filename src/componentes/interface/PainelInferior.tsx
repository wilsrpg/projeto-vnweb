import { useContext, useEffect } from "react";
import { contexto } from "../sistema/Contexto";
import CaixaDeBotoes from "./CaixaDeBotoes";
import CaixaDeDialogo from "./CaixaDeDialogo";

export default function PainelInferior(){
  const sistema = useContext(contexto);
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou painel inferior");
  
  //configurações iniciais
  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef painel inferior []");
    const controles = document.getElementById("controles");
    if(controles)
      sistema?.exibirElemento(controles);
  }, [])

  return (
    <div id="painel inferior"
      style={{
        backgroundColor: "black",
        position: "absolute",
        bottom: 0,
        margin: 0,
        width: "100%",
        height: "25%",
        //opacity: 0,
      }}
    >
      <CaixaDeDialogo largura="85%"/>
      <CaixaDeBotoes largura="15%"/>
    </div>
  )
}
