import { useContext, useEffect, useRef, useState } from "react"
import { acoes, contexto } from "./Sistema";

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
      }, 30);
    } else if(dialDiv.current && sistema){
        dialDiv.current.innerHTML = msg;
        sistema.despachar({tipo: acoes.adicionarAoHistorico, string: msg});
    }
  }, [caracsDigitados]);

  // useEffect(()=>{
  //   console.log("");
  //   if(dialDiv.current)
  //     dialDiv.current.innerHTML = mensagemDigitada;
    
  // }, [mensagemDigitada]);

  //funções dos diálogos
  function apagarMensagem(){
    // sistema?.despachar({tipo: acoes.soletrarMensagem, opcao: false});
    // soletrando = false;
    if(dialDiv.current)
      dialDiv.current.innerHTML = "";
  }

  /*async function exibirCaixaDeDialogo(){
    //sistemaOcupado.current = true;
    //sistemaOcupado = true;
    apagarMensagem();
    // if(dialDiv.current && !exibindoCaixaDeDialogo.current && executandoCena.current){
    if(dialDiv.current && !exibindoCaixaDeDialogo.current){
      await exibirElemento(dialDiv.current);
      //exibirOcultarCaixaDeDialogo(true);
      exibindoCaixaDeDialogo.current = true;
    }
  }

  async function ocultarCaixaDeDialogo(){
    if(dialDiv.current && exibindoCaixaDeDialogo.current){
      apagarMensagem();
      exibindoCaixaDeDialogo.current = false;
      await ocultarElemento(dialDiv.current);
    }
  }*/
  
  // function aceitarInteracao(op: boolean){
  //   console.log("em aceitarInteração, ANTS do dispatch="+sistema?.estado.aceitandoInteracao);
  //   sistema?.despachar({tipo: acoes.aceitarInteracao, opcao: op});
  //   console.log("em aceitarInteração, DPS do dispatch="+sistema?.estado.aceitandoInteracao);
  // }

  // async function soletrarMensagem(texto: string){
  /*async function escreverMensagem(){
    //sistemaOcupado = false;
    apagarMensagem();
    // sistema?.desocuparSistema();
    // console.log("em soletrarMsg, ANTS d chamar aceitarInteração="+sistema?.estado.aceitandoInteracao);
    // aceitarInteracao(true);
    sistema?.despachar({tipo: acoes.aceitarInteracao, opcao: true});
    // console.log("em soletrarMsg, DPS d chamar aceitarInteração="+sistema?.estado.aceitandoInteracao);
    // sistema.aceitarInteracao(true);
    soletrando = true;
    //soletrando.current = true;
    let i = 0;
    //while(i < texto.length && soletrando.current) {
    // while(i < texto.length && soletrando) {
    if(sistema?.estado.mensagemParaEscrever)
    while(i < sistema?.estado.mensagemParaEscrever.length && soletrando) {
      await new Promise((resolve)=>{setTimeout(() => {
        if(dialDiv.current && soletrando)
          // dialDiv.current.innerHTML += texto[i];
          dialDiv.current.innerHTML += sistema?.estado.mensagemParaEscrever[i];
        i++;
        resolve("");
      }, 25)});
      // renderizar(!a);
    }
    //alert(dialRef.current?.innerHTML);
    // if(dialDiv.current && i < texto.length && dialDiv.current.innerHTML)
    // dialDiv.current.innerHTML = texto;
    if(sistema?.estado.mensagemParaEscrever)
      if(dialDiv.current && i < sistema?.estado.mensagemParaEscrever.length && dialDiv.current.innerHTML)
        dialDiv.current.innerHTML = sistema?.estado.mensagemParaEscrever;
    //soletrando.current = false;
    soletrando = false;
  }*/

  // async function escreverMensagem(texto: string){
    // if(!exibindoCaixaDeDialogo.current){
    //   await exibirCaixaDeDialogo();
    // }
    //if(!sistemaOcupado.current)
    // await soletrarMensagem(texto);
  // }

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