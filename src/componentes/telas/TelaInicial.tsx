import { useContext, useEffect, useState } from "react";
import { acoes } from "../sistema/Redutor";
import { contexto } from "../sistema/Contexto";
import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
import { personagens } from "../mapeadores/Personagens";
import { musicas } from "../mapeadores/Musicas";
import { sons } from "../mapeadores/Sons";
import Botao from "../interface/Botao";
import { roteiros } from "../roteiros/ListaDeRoteiros";

export default function TelaInicial() {
  const sistema = useContext(contexto);
  let menuInicial = document.getElementById("menu");
  const leitorDeArquivos = new FileReader();
  const [arqRoteiro,definirArqRoteiro] = useState<File>();
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou tela inicial");
  
  //configurações iniciais
  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef telainicial []");
    sistema?.despachar({tipo: acoes.mudarImagemDeFundo, endereco: imagensDeFundo.titulo});
    sistema?.despachar({tipo: acoes.mudarMusica, endereco: musicas.idk, numero1: 50});
    sistema?.despachar({tipo: acoes.aceitarInteracao, opcao: false});
    sistema?.despachar({tipo: acoes.mudarRoteiro, numero1: -1});
    sistema?.despachar({tipo: acoes.mudarEvento, numero1: -1});
    menuInicial = document.getElementById("menu");
    new Promise((resolve) => {setTimeout(() => {resolve("");}, 1000);})
    .then(()=>{
    if(menuInicial){
      sistema?.exibirElemento(menuInicial);}
    })
  }, [])

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef arqRoteiro="+arqRoteiro);
    if(arqRoteiro){
      leitorDeArquivos.readAsText(arqRoteiro);
      new Promise((r)=>leitorDeArquivos.addEventListener("load",r))
      .then(importarRoteiro);
    }
  }, [arqRoteiro]);

  function importarRoteiro() {
    if(arqRoteiro?.type == "application/json"){
      if(typeof leitorDeArquivos.result == "string"){
        let roteiroJson = JSON.parse(leitorDeArquivos.result,(chave,valor)=>{
          if(chave == "mudarCenario" || chave == "endereco" || chave == "mudarMusica" && typeof valor == "string"
              || chave == "tocarSom" && typeof valor == "string")
            valor = obterEndereco(valor);
          return valor;
        });
        console.log("Roteiro JSON para teste carregado.");
        console.log(roteiroJson);
        roteiros[0] = roteiroJson.roteiro;
        menuTestarRoteiro();
      }
    }
  }

  function obterEndereco(v: string){
    let tipo = v.slice(0, v.search("\\."));
    let midia = v.slice(v.search("\\.")+1);
    let arraysDeArquivos = {imagensDeFundo,personagens,musicas,sons};
    let array = tipo as keyof typeof arraysDeArquivos;
    if(arraysDeArquivos[array][midia])
      return arraysDeArquivos[array][midia];
    else
      throw new Error("Arquivo '"+v+"' não encontrado.");
  }

  function menuNovoJogo(){
    //tocarBip();
    sistema?.despachar({tipo: acoes.mudarRoteiro, numero1: 1});
    sistema?.despachar({tipo: acoes.mudarTela, string: "jogo"});
    sistema?.despachar({tipo: acoes.definirDataDeInicio, numero1: Date.now()});
  }

  function menuTestarRoteiro(){
    //tocarBip();
    sistema?.despachar({tipo: acoes.mudarRoteiro, numero1: 0});
    sistema?.despachar({tipo: acoes.mudarTela, string: "jogo"});
  }

  function menuOpcoes(){
    //tocarBip();
    sistema?.despachar({tipo: acoes.exibirTelaDeOpcoes, opcao: true});
  }

  function menuArquivos(){
    //tocarBip();
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

      <input type="file"
        accept=".json"
        id="adicionar roteiro"
        style={{display: "none"}}
        onChange={()=>{
          let arqElem = document.getElementById("adicionar roteiro");
          if(arqElem && arqElem instanceof HTMLInputElement && arqElem.files)
            definirArqRoteiro(arqElem.files[0]);
        }}
      />
      <Botao nome="Importar roteiro e executar"
        func={()=>{
          let arqElem = document.getElementById("adicionar roteiro");
          if(arqElem)
            arqElem.click();
        }}
        title="Antes de importar o roteiro, certifique-se de ter importado todos os arquivos que são utilizados nele."
      />

      <Botao nome="Opções" func={menuOpcoes}/>

      <Botao nome="Gerenciar arquivos" func={menuArquivos}/>
    </div>
    </>
  )
}
