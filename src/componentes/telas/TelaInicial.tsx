import { useContext, useEffect } from "react";
import { acoes } from "../sistema/Redutor";
import { contexto } from "../sistema/Contexto";
import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
import { musicas } from "../mapeadores/Musicas";
import Botao from "../interface/Botao";
import BotaoParaImportarRoteiro from "../interface/BotaoParaImportarRoteiro";

export default function TelaInicial() {
  const sistema = useContext(contexto);
  let menuInicial = document.getElementById("menu");
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou tela inicial");
  
  //configurações iniciais
  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef telainicial []");
    sistema?.despachar({tipo: acoes.mudarImagemDeFundo, endereco: imagensDeFundo.titulo});
    sistema?.despachar({tipo: acoes.tocarMusica, endereco: musicas.idk, numero1: 50});
    sistema?.despachar({tipo: acoes.aceitarInteracao, opcao: false});
    menuInicial = document.getElementById("menu");
    new Promise(r=>setTimeout(r,1000))
    .then(()=>{
      if(menuInicial)
        sistema?.exibirElemento(menuInicial);
    })
  }, [])

  function menuNovoJogo(){
    if(sistema) sistema.estado.eventoAtual = -1; //isso impede um bug q acontecia qd a psoa voltava pra tela inicial no meio d um evento de espera, q fazia o roteiro seguinte pular o 1o evento na hr da execução
    sistema?.despachar({tipo: acoes.mudarRoteiro, string: "capitulo1"});
    sistema?.despachar({tipo: acoes.mudarTela, string: "jogo"});
    sistema?.despachar({tipo: acoes.definirDataDeInicio, numero1: Date.now()});
    sistema?.despachar({tipo: acoes.definirTempoDeJogo, numero1: 0});
    sistema?.despachar({tipo: acoes.definirUltimaVezQueCarregou, numero1: Date.now()});
  }

  function menuTestarRoteiro(){
    sistema?.despachar({tipo: acoes.mudarRoteiro, string: "teste"});
    sistema?.despachar({tipo: acoes.mudarTela, string: "jogo"});
  }

  function menuOpcoes(){
    sistema?.despachar({tipo: acoes.exibirTelaDeOpcoes, opcao: true});
  }

  function menuArquivos(){
    sistema?.despachar({tipo: acoes.exibirTelaDeArquivos, opcao: true});
  }
  
  return (
    <>
    <div id="menu" style={{
        position: "absolute",
        width: "100%",
        height: "33%",
        bottom: "6%",
        display: "grid",
        grid: "auto/max-content",
        placeContent: "space-evenly center",
        opacity: 0,
      }}
    >
      <Botao nome="Novo jogo" func={menuNovoJogo}/>
      <BotaoParaImportarRoteiro nome="Importar roteiro e executar" func={menuTestarRoteiro}/>
      <Botao nome="Opções" func={menuOpcoes}/>
      <Botao nome="Gerenciar arquivos" func={menuArquivos}/>
    </div>
    </>
  )
}
