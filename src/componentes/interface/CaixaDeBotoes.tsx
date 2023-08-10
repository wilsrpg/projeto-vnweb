import { useContext, useEffect, useRef } from "react";
import { acoes } from "../sistema/Redutor";
import { contexto } from "../sistema/Contexto";
import Botao from "./Botao";

export default function CaixaDeBotoes(prop:{largura: string}){
  const sistema = useContext(contexto);
  const botoesHabilitados = useRef(true);
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou cxBotões");

  useEffect(()=>{
    const controles = document.getElementById("controles");
    if(controles)
      if(sistema?.estado.exibindoTelaDeOpcoes || sistema?.estado.exibindoTelaDoHistorico)
        controles.style.display = "none";
      else
        controles.style.display = "grid";
  }, [sistema?.estado.exibindoTelaDeOpcoes, sistema?.estado.exibindoTelaDoHistorico])

  return (
    <div id="controles"
      style={{
        position: "absolute",
        right: 0,
        width: prop.largura,
        height: "100%",
        display: "grid",
        grid: "auto / 50% 50%",
        opacity: 0,
      }}
    >
      <Botao nome="Áudio"
        func={()=>{
          if(botoesHabilitados.current)
            sistema?.despachar({tipo: acoes.alternarAudio});
        }}
        style={{
          textDecorationLine: sistema?.estado.audioHabilitado ? "none" : "line-through",
        }}
      />
      <Botao nome="sem função" func={()=>{}}/>
      <Botao nome="Salvar"
        func={()=>{
          if(botoesHabilitados.current)
            sistema?.despachar({tipo: acoes.salvar});
        }}
      />
      <Botao nome="Carregar"
        func={()=>{
          if(botoesHabilitados.current)
            sistema?.despachar({tipo: acoes.carregar});
        }}
      />
      <Botao nome="nada" func={()=>{}}/>
      <Botao nome="Histórico"
        func={()=>{
          if(botoesHabilitados.current)
            sistema?.despachar({tipo: acoes.exibirTelaDoHistorico, opcao: true});
        }}
      />
      <Botao nome="Opções"
        func={()=>{
          if(botoesHabilitados.current)
            sistema?.despachar({tipo: acoes.exibirTelaDeOpcoes, opcao: true});
        }}
      />
      <Botao nome="Voltar"
        func={()=>{
          if(botoesHabilitados.current){
            botoesHabilitados.current = false;
            sistema?.voltarParaTelaInicial();
          }
        }}
      />
    </div>
  )
}
