import { useContext, useEffect, useRef, useState } from "react"
import { acoes } from "../sistema/Redutor";
import { contexto } from "../sistema/Contexto";

export default function CaixaDeDialogo(prop:{largura: string}){
  const sistema = useContext(contexto);
  const dialDiv = useRef<HTMLPreElement>(null);
  const [caracsDigitados,digitarCarac] = useState(0);

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef cxDiag msgPraEscr="+sistema?.estado.mensagemParaEscrever);
    if(sistema?.estado.mensagemParaEscrever.length){
      sistema?.despachar({tipo: acoes.aceitarInteracao, opcao: true});
      sistema?.despachar({tipo: acoes.digitarMensagem, opcao: true});
      digitarCarac(1);
    } else
      apagarMensagem();
  }, [sistema?.estado.mensagemParaEscrever]);

  useEffect(()=>{
    let msg = sistema?.estado.mensagemParaEscrever;
    const msgLength = msg?.length;
    if(!msg || !msgLength)
      return;
    
    if(sistema?.estado.digitandoMensagem){
      setTimeout(() => {
        let mensagemDigitada = msg?.slice(0,caracsDigitados);
        if(dialDiv.current && mensagemDigitada)
          dialDiv.current.innerHTML = mensagemDigitada;
        if(caracsDigitados < msgLength)
          digitarCarac(caracsDigitados+1);
        else {
          sistema?.despachar({tipo: acoes.digitarMensagem, opcao: false});
          sistema?.despachar({tipo: acoes.adicionarAoHistorico, string: msg});
        }
      }, sistema.estado.velocidadeDoTexto*10);
    } else if(dialDiv.current && sistema){
        dialDiv.current.innerHTML = msg;
        sistema.despachar({tipo: acoes.adicionarAoHistorico, string: msg});
    }
  }, [caracsDigitados]);

  function apagarMensagem(){
    if(dialDiv.current)
      dialDiv.current.innerHTML = "";
  }

  return (
    <pre id="dialogo"
      ref={dialDiv}
      style={{
        // backgroundColor: "rgba(0,0,255,0.5)",
        position: "absolute",
        top: 0,
        margin: 0,
        padding: "1% 2%",
        boxSizing: "border-box",
        width: prop.largura,
        height: "100%",
        // border: "0.2em ridge gray",
        fontFamily: sistema?.estado.fonte,
        fontSize: "1.5em",
        color: sistema?.estado.corDaFonte,
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        overflowX: "hidden",
        overflowY: "auto",
        // overflowWrap: "anywhere",
      }}
    ></pre>
  )
}
