import { useContext, useEffect, useState } from "react";
import { contexto } from "../sistema/Contexto";
import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
import { personagens } from "../mapeadores/Personagens";
import { musicas } from "../mapeadores/Musicas";
import { sons } from "../mapeadores/Sons";
import Botao from "./Botao";
import { roteiros } from "../roteiros/ListaDeRoteiros";
import { evento, propsAlternativa, propsAlternativas, propsAudios, propsEscolhas, propsEventos, propsPersonagens } from "../sistema/TiposDeObjetos";

export default function BotaoParaImportarRoteiro(prop:{nome: string,func: ()=>void}) {
  const sistema = useContext(contexto);
  const leitorDeArquivos = new FileReader();
  const [arqRoteiro,definirArqRoteiro] = useState<File>();

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef arqRoteiro="+arqRoteiro);
    if(arqRoteiro){
      leitorDeArquivos.readAsText(arqRoteiro);
      new Promise(r=>leitorDeArquivos.addEventListener("load",r,{once: true}))
      .then(importarRoteiro);
    }
  }, [arqRoteiro]);

  function importarRoteiro() {
    if(arqRoteiro?.type == "application/json"){
      if(typeof leitorDeArquivos.result == "string")
        try {
        let roteiroJson = JSON.parse(leitorDeArquivos.result); //sem validação de chaves, só pra checar estrutura
        //console.log(Object.entries(roteiroJson).length);
        if(!roteiroJson.roteiro || Object.entries(roteiroJson).length != 1)
          throw new Error("O roteiro JSON deve conter apenas um array de objetos chamado 'roteiro'.");
        //agora com validação de chaves
        roteiroJson = JSON.parse(leitorDeArquivos.result, (chave,valor)=>{
          //console.log(chave+" ("+typeof chave+"): "+valor+" ("+typeof valor+"): ");
          if(typeof valor != "object"){
          let achouEvento = false;
          let todasProps = propsEventos.concat(propsPersonagens,propsAudios,propsEscolhas,propsAlternativas,propsAlternativa);
          todasProps.map((nomeDoEvento)=>{
            //console.log(nomeDoEvento);
            if(chave == nomeDoEvento){
              achouEvento = true;
              return;
              //console.log("achou");
            }
          });
          if(!achouEvento)
            throw new Error("Instrução '"+chave+"' inválida.");
          }
          if(chave == "mudarCenario" || chave == "endereco" || chave == "tocarMusica" && typeof valor == "string"
              || chave == "tocarSom" && typeof valor == "string")
            valor = obterEndereco(valor);
          return valor;
        });
        let evs: evento[] = roteiroJson.roteiro;
        evs.map((ev)=>{
          //console.log("entrou, ev="+Object.keys(ev));
          Object.entries(ev).map(([chave,valor])=>{
            if(!propsEventos.some((nomeDoEvento) => chave == nomeDoEvento))
              throw new Error("Instrução '"+chave+"' não é uma instrução válida de evento.");

            if(propsEventos.some(() => chave.includes("Personagem") && typeof valor == "object")){
              Object.entries(valor).map(([prop])=>{
                if(!propsPersonagens.some((nomeDaProp) => prop == nomeDaProp))
                  throw new Error("Propriedade '"+prop+"' não é uma propriedade válida de evento de personagem.");
              });
            }
            if(propsEventos.some(() => chave.includes("tocar") && typeof valor == "object")){
              Object.entries(valor).map(([prop])=>{
                if(!propsAudios.some((nomeDaProp) => prop == nomeDaProp))
                  throw new Error("Propriedade '"+prop+"' não é uma propriedade válida de evento de áudio.");
              });
            }
            if(propsEventos.some(() => chave == "exibirAlternativas")){
              Object.entries(valor).map(([prop])=>{
                //console.log("prop="+prop);
                if(!propsAlternativas.some((nomeDaProp) => prop == nomeDaProp))
                  throw new Error("Propriedade '"+prop+"' não é uma propriedade válida de evento de escolha.");
              });
            }
            if(propsEventos.some(() => chave == "alternativas")){
              Object.entries(valor).map(([prop])=>{
                if(!propsAlternativas.some((nomeDaProp) => prop == nomeDaProp))
                  throw new Error("Propriedade '"+prop+"' não é uma propriedade válida de alternativa.");
              });
            }
            if(propsEventos.some(() => chave == "seEscolha")){
              Object.entries(valor).map(([prop])=>{
                if(!propsEscolhas.some((nomeDaProp) => prop == nomeDaProp))
                  throw new Error("Propriedade '"+prop+"' não é uma propriedade válida de evento condicional.");
              });
            }
            let propDesnecessaria = propsEventos.some(() => typeof valor == "object"
              && (!chave.includes("Personagem") && !chave.includes("tocar") || chave.includes("remover"))
              && chave != "seEscolha" && chave != "exibirAlternativas");
            if(propDesnecessaria)
              throw new Error("Instrução '"+chave+"' não possui propriedades, mas está recebendo a propriedade '"
                              +Object.entries(valor)[0][0]+"'."); //valor é o objeto com as props,
                              //o 1o [0] eh a primeira prop com seu par [chave,valor], o 2o [0] eh a chave dela
          });
        });

        console.log("Roteiro JSON para teste carregado.");
        console.log(roteiroJson.roteiro);
        roteiros.roteiroImportado = roteiroJson.roteiro;

        prop.func();
      } catch(e) {
        if(e instanceof Error)
          alert("Importação falhou:\n"+e.message)
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

  return (
    <>
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
    <Botao nome={prop.nome}
      func={()=>{
        let arqElem = document.getElementById("adicionar roteiro");
        if(arqElem)
          arqElem.click();
      }}
      title="Antes de importar o roteiro, certifique-se de ter importado todos os arquivos que são utilizados nele."
    />
    </>
  )
}
