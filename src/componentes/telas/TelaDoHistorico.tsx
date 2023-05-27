import { useContext, useEffect } from "react"
import { contexto } from "../sistema/Contexto";
import Botao from "../interface/Botao";
import { acoes } from "../sistema/Redutor";

export default function TelaDoHistorico(){
  const sistema = useContext(contexto);
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou TelaDoHistorico");
  
  useEffect(()=>{
    const hist = document.getElementById("histórico");
    hist?.scrollTo(0,hist.scrollHeight);
  }, [])

  return (
    <div id="tela do histórico"
      style={{
        backgroundColor: "darkslateblue",
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: "1%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        fontFamily: sistema?.estado.fonte,
        color: sistema?.estado.corDaFonte,
    }}>
      <h3 style={{margin: "1%", textAlign: "center"}}>
        Histórico de mensagens
      </h3>
      <div id="histórico"
        style={{
          height: "80%",
          display: "flex",
          flexDirection: "column",
          //overflowX: "hidden",
          overflowY: "auto",
          wordBreak: "break-word",
        }}
      >
        {sistema?.estado.historicoDeMensagens.map((msg,i)=>(
          <p key={i} style={{margin: "1%"}}>{msg}</p>
        ))}
      </div>

      <Botao nome="Voltar"
        func={()=>sistema?.despachar({tipo: acoes.exibirTelaDoHistorico, opcao: false})}
        style={{
          position: "absolute",
          right: "1%",
          bottom: "1%",
          padding: "1%",
        }}
      />
    </div>
  )
}
