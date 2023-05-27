import { useContext, useEffect, useRef } from "react";
import { contexto, estadoInicial } from "./Contexto";
import Apresentacao from "../telas/Apresentacao";
import TelaInicial from "../telas/TelaInicial";
import EmJogo from "../telas/EmJogo";
import PainelInferior from "../interface/PainelInferior";
import TelaDeOpcoes from "../telas/TelaDeOpcoes";
import TelaDoHistorico from "../telas/TelaDoHistorico";
import { acoes } from "./Redutor";
import { personagem } from "./TiposDeObjetos";
import TelaDeArquivos from "../telas/TelaDeArquivos";

export default function Grafico(){
  const sistema = useContext(contexto);
  const cenarioImg = useRef<HTMLImageElement>(null);
  const persDiv = useRef<HTMLDivElement>(null);
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou gráfico");

  useEffect(() => {
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef gráfico, bgi="+sistema?.estado.imagemDeFundoAtual);
    if(!cenarioImg.current || !sistema?.estado.imagemDeFundoAtual)
      return;
    transicionarImagemDeFundo();
  }, [sistema?.estado.imagemDeFundoAtual]);

  async function transicionarImagemDeFundo(tempo = 500) {
    if(cenarioImg.current){
      await sistema?.ocultarElemento(cenarioImg.current, tempo);
      if (sistema?.estado.imagemDeFundoAtual)
        cenarioImg.current.src = sistema.estado.imagemDeFundoAtual;
      await new Promise(resolve=>{
        cenarioImg.current?.addEventListener("load", ()=>resolve(""))
      })
      //aki; passar esse trecho pro sistema \
      if(sistema?.estado.telaAtual == "jogo")
        sistema?.despachar({tipo: acoes.exibirPainelInferior, opcao: true});
      else
        sistema?.despachar({tipo: acoes.exibirPainelInferior, opcao: false});
      //passar esse trecho pro sistema /
      if(cenarioImg.current.src)
        await sistema?.exibirElemento(cenarioImg.current, tempo);
    }
  }

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects && sistema?.estado.removendoTodosOsPersonagens)
      console.log("ef removTdsPers="+sistema?.estado.removendoTodosOsPersonagens);
    if(!sistema?.estado.removendoTodosOsPersonagens)
      return;
    if(sistema?.estado.personagensNaTelaImg.length)
      sistema.estado.personagensNaTelaImg.splice(0,sistema.estado.personagensNaTelaImg.length);
    if(sistema?.estado.personagensNaTela.length)
      sistema.estado.personagensNaTela.splice(0,sistema.estado.personagensNaTela.length);
    if(persDiv.current?.childElementCount)
      while(persDiv.current.childElementCount>0)
        persDiv.current.firstElementChild?.remove();
    sistema?.despachar({tipo: acoes.removerTodosOsPersonagens, opcao: false});
  }, [sistema?.estado.removendoTodosOsPersonagens]);

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef persPraRemov="+sistema?.estado.personagemParaRemover);
    if(!sistema?.estado.personagemParaRemover)
      return;
    let id = -1;
    sistema.estado.personagensNaTela.map((pers,i)=>{
      if(pers.nome == sistema?.estado.personagemParaRemover)
        id = i;
    });
    if(persDiv.current?.children[id]){
      const img = persDiv.current?.children[id];
      if(img instanceof HTMLImageElement && sistema){
        sistema.estado.personagensNaTela.splice(id,1);
        sistema.estado.personagensNaTelaImg.splice(id,1);
        sistema.ocultarElemento(img).then(()=> img.remove() );
        sistema.despachar({tipo: acoes.removerPersonagem, opcao: false});
      }
    }
  }, [sistema?.estado.personagemParaRemover])

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef persPraAdic="+sistema?.estado.personagemParaAdicionar?.endereco+", "+sistema?.estado.personagemParaAdicionar?.posicao);
    if(!sistema?.estado.personagemParaAdicionar)
      return;
      const pers = new Image();
      pers.src = sistema.estado.personagemParaAdicionar.endereco;
      new Promise(resolve=>
        pers.addEventListener("load", ()=>resolve("")))
      .then(()=>{
        if(sistema.estado.personagemParaAdicionar?.espelhado == true)
          pers.style.transform = "rotateY(180deg)";
        sistema.estado.personagensNaTelaImg?.push(pers);
        if(sistema?.estado.personagemParaAdicionar)
          sistema.estado.personagensNaTela?.push(sistema?.estado.personagemParaAdicionar);
        //centralizar no ponto escolhido
        let largPersRedimensionada = pers.width * estadoInicial.alturaTela/pers.height;
        let posX = 0;
        if(sistema?.estado.personagemParaAdicionar?.posX)
          posX = sistema?.estado.personagemParaAdicionar?.posX - largPersRedimensionada/2;
        let posY = 0;
        if(sistema?.estado.personagemParaAdicionar?.posY)
          posY = sistema?.estado.personagemParaAdicionar?.posY;
        adicionarPersonagem(posX, posY);
        sistema.despachar({tipo: acoes.adicionarPersonagem, opcao: false});
      })
  }, [sistema?.estado.personagemParaAdicionar])

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef gráfico, adicionarPersonagensDoSalvo="+sistema?.estado.adicionandoPersonagensDoSalvo);
    if(sistema?.estado.arquivoSalvoPraCarregar && sistema.estado.arquivoSalvoPraCarregar.personagensNaTela.length
       && sistema?.estado.adicionandoPersonagensDoSalvo){
      const perss = sistema.estado.arquivoSalvoPraCarregar.personagensNaTela;
      aux(perss);
      sistema.despachar({tipo: acoes.adicionarPersonagensDoSalvo, opcao: false});
      sistema.despachar({tipo: acoes.carregar, opcao: false});
    }
  }, [sistema?.estado.adicionandoPersonagensDoSalvo])
  
  async function aux(perss: personagem[]) {
    const tela = document.getElementById("gráfico");
    if(tela)
      await sistema?.ocultarElemento(tela,100);
    if(sistema?.estado.arquivoSalvoPraCarregar){
      //const perss = sistema.estado.arquivoSalvoPraCarregar.personagensNaTela;
      await adicionarPersonagensDoArquivoSalvo(perss,0);
      if(tela)
        sistema?.exibirElemento(tela,1000);
    }
  }

  async function adicionarPersonagensDoArquivoSalvo(perss: personagem[], n: number){
    if(n < perss.length){
      if(sistema?.estado.msgsConsole.effects)
        console.log("ef gráfico>salvo> adicionando pers="+perss[n].nome+", id="+n);
      await adicionarPers2(perss[n]);
      adicionarPersonagensDoArquivoSalvo(perss,n+1);
    }
  }

  async function adicionarPers2(persPraAd: personagem) {
    if(!sistema)
      return;
    const persImg = new Image();
    persImg.src = persPraAd.endereco;
    await new Promise(resolve=>persImg.addEventListener("load", ()=>resolve("")));
    persImg.style.position = "absolute";
    persImg.style.height = "100%";
    persImg.style.width = "auto";
    if(persPraAd.espelhado == true)
      persImg.style.transform = "rotateY(180deg)";

    //centralizar no ponto escolhido
    let largPersRedimensionada = persImg.width * estadoInicial.alturaTela/persImg.height;
    let posX = persPraAd.posX - largPersRedimensionada/2;
    let posY = persPraAd.posY;
    persImg.style.top = posY+"px";
    persImg.style.left = posX+"px";
    sistema.estado.personagensNaTela.push(persPraAd);
    sistema.estado.personagensNaTelaImg.push(persImg);
    if(persDiv.current){
      persDiv.current.appendChild(persImg);
      sistema.exibirElemento(persImg);
    }
    sistema.despachar({tipo: acoes.adicionarPersonagem, opcao: false});
    return Promise.resolve;
  }
  
  function adicionarPersonagem(posX: number, posY = 0){
    const persImg = sistema?.estado.personagensNaTelaImg[sistema?.estado.personagensNaTelaImg.length-1];
    if(persImg){
      persImg.style.position = "absolute";
      persImg.style.height = "100%";
      persImg.style.width = "auto";
      persImg.style.top = posY+"px";
      persImg.style.left = posX+"px";
    }
    if(persImg && persDiv.current){
      persDiv.current.appendChild(persImg);
      sistema.exibirElemento(persImg);
    }
  }

  return (
    <div id="gráfico">
      <img id="cenário" ref={cenarioImg}
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          //height: "100%",
          display: "block",
        }}
      />
      <div id="personagens" ref={persDiv}
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          height: "100%",
        }}
      />
      {sistema?.estado.telaAtual == "apresentação" ? <Apresentacao/> : ""}
      {sistema?.estado.telaAtual == "menu inicial" ? <TelaInicial/> : ""}
      {sistema?.estado.telaAtual == "jogo" ? <EmJogo/> : ""}
      {/*{sistema?.estado.telaAtual == "opções" ? <TelaDeOpcoes/> : ""}*/}
      {/*{sistema?.estado.telaAtual == "arquivos" ? <TelaDeArquivos/> : ""}*/}
      
      {sistema?.estado.exibindoPainelInferior && <PainelInferior/>}
      {sistema?.estado.exibindoTelaDeOpcoes && <TelaDeOpcoes/>}
      {sistema?.estado.exibindoTelaDoHistorico && <TelaDoHistorico/>}
      {sistema?.estado.exibindoTelaDeArquivos && <TelaDeArquivos/>}
    </div>
  )
}