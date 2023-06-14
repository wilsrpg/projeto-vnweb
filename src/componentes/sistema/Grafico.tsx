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
    if(!cenarioImg.current || sistema?.estado.imagemDeFundoAtual == undefined)
      return;
    transicionarImagemDeFundo();
  }, [sistema?.estado.imagemDeFundoAtual]);

  async function transicionarImagemDeFundo(tempo = 500) {
    if(cenarioImg.current){
      //if(sistema?.estado.imagemDeFundoAtual) //só oculta se existir e não for string vazia
        await sistema?.ocultarElemento(cenarioImg.current, tempo);
      if (sistema?.estado.imagemDeFundoAtual != undefined)
        cenarioImg.current.src = sistema.estado.imagemDeFundoAtual;
      await new Promise(r=>{cenarioImg.current?.addEventListener("load",r,{once: true})});
      if(cenarioImg.current.src)
        await sistema?.exibirElemento(cenarioImg.current, tempo);
    }
  }

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects && sistema?.estado.removendoTodosOsPersonagens)
      console.log("ef removTdsPers="+sistema?.estado.removendoTodosOsPersonagens);
    if(!sistema?.estado.removendoTodosOsPersonagens)
      return;
    if(sistema?.estado.personagensNaTela.length)
      sistema.estado.personagensNaTela.splice(0,sistema.estado.personagensNaTela.length);
    if(persDiv.current?.childElementCount)
      while(persDiv.current.childElementCount>0)
        persDiv.current.firstElementChild?.remove();
    sistema?.despachar({tipo: acoes.removerTodosOsPersonagens, opcao: false});
  }, [sistema?.estado.removendoTodosOsPersonagens]);

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef gráfico, personagensIdParaRemover.length="+sistema?.estado.personagensIdParaRemover.length);
    remPers();

    //return 
  }, [sistema?.estado.personagensIdParaRemover])

  async function remPers() {
    if(sistema?.estado.personagensIdParaRemover && sistema?.estado.personagensIdParaRemover.length>0){
      //sistema?.estado.personagensIdParaRemover.sort().reverse(); //por causa de persDiv.current.children
      let id = sistema?.estado.personagensIdParaRemover[0];
      sistema.estado.personagensIdParaRemover.shift();
      //console.log("em remPers, removendo pers="+sistema?.estado.personagensNaTela[id].nome);
      const img = document.getElementById("persImg-"+sistema?.estado.personagensNaTela[id].nome);
      if(img instanceof HTMLImageElement){
        await sistema.ocultarElemento(img);
        //console.log("em remPers, ocultou, vai remover");
        img.remove();
      }
      sistema.estado.personagensNaTela.splice(id,1);
      //console.log("em remPers, removeu, personagens na tela="+sistema?.estado.personagensNaTela.length);
      //console.log("em remPers, removido, pers restantes pra remover="+sistema?.estado.personagensIdParaRemover.length);
      if(sistema?.estado.personagensIdParaRemover.length>0)
        remPers();
    }
  }

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef gráfico, personagensParaAdicionar.length="+sistema?.estado.personagensParaAdicionar.length);
    if(sistema?.estado.personagensParaAdicionar)
      addPers(sistema?.estado.personagensParaAdicionar);
  }, [sistema?.estado.personagensParaAdicionar])

  async function addPers(perss: personagem[]) {
    if(perss.length>0){
      //console.log("entrou addpers");
      let pers = perss[0];
      perss.shift();
      const img = new Image();
      img.id = "persImg-"+pers.nome;
      img.src = pers.endereco;
      //console.log("em addPers, adicionando pers="+pers.nome);
      await new Promise(r=>img.addEventListener("load",r,{once: true}));
      let largPersRedimensionada = img.width * sistema!.estado.alturaTela/img.height;
      img.style.position = "absolute";
      img.style.width = "auto";
      img.style.height = "100%";
      img.style.left = (pers.posX - largPersRedimensionada/2)+"px";
      img.style.top = pers.posY+"px";
      if(pers.espelhado == true)
        img.style.transform = "rotateY(180deg)";
      pers.sprite = img;

      sistema?.estado.personagensNaTela.push(pers);
      if(pers.sprite && persDiv.current){
        persDiv.current.appendChild(pers.sprite);
        sistema?.exibirElemento(pers.sprite);
        //await sistema?.exibirElemento(pers.sprite);
        //console.log("em addPers, adicionou, vai exibir");
      }
      //console.log("em addPers, adicionou, personagens na tela="+sistema?.estado.personagensNaTela.length);
      //console.log("em addPers, adicionado, pers restantes="+sistema?.estado.personagensParaAdicionar.length);
      //if(perss.length>0)
        addPers(perss);
    }
  }

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef gráfico, adicionarPersonagensDoSalvo="+sistema?.estado.adicionandoPersonagensDoSalvo);
    if(!sistema?.estado.arquivoSalvoParaCarregar || !sistema?.estado.adicionandoPersonagensDoSalvo)
      return;
    else if(sistema.estado.arquivoSalvoParaCarregar.personagensNaTela.length){
      const perss = sistema.estado.arquivoSalvoParaCarregar.personagensNaTela;
      aux(perss);
    }
    sistema.despachar({tipo: acoes.adicionarPersonagensDoSalvo, opcao: false});
    sistema.despachar({tipo: acoes.carregar, opcao: false});
  }, [sistema?.estado.adicionandoPersonagensDoSalvo])
  
  async function aux(perss: personagem[]) {
    const tela = document.getElementById("gráfico");
    if(tela)
      await sistema?.ocultarElemento(tela,100);
    if(sistema?.estado.arquivoSalvoParaCarregar){
      //await adicionarPersonagensDoArquivoSalvo(perss,0);
      await addPers(perss);
      if(tela)
        sistema?.exibirElemento(tela,1000);
    }
  }
/*
  async function adicionarPersonagensDoArquivoSalvo(perss: personagem[], n: number){
    if(n < perss.length){
      if(sistema?.estado.msgsConsole.effects)
        console.log("ef gráfico>salvo> adicionando pers="+perss[n].nome+", id="+n);
      await adicionarPers2(perss[n]);
      adicionarPersonagensDoArquivoSalvo(perss,n+1);
    }
  }*/
/*
  async function adicionarPers2(persParaAdic: personagem) {
    if(!sistema)
      return;
    const persImg = new Image();
    persImg.src = persParaAdic.endereco;
    await new Promise(r=>persImg.addEventListener("load",r,{once: true}));
    persImg.style.position = "absolute";
    persImg.style.height = "100%";
    persImg.style.width = "auto";
    if(persParaAdic.espelhado == true)
      persImg.style.transform = "rotateY(180deg)";

    //centralizar no ponto escolhido
    let largPersRedimensionada = persImg.width * estadoInicial.alturaTela/persImg.height;
    let posX = persParaAdic.posX - largPersRedimensionada/2;
    let posY = persParaAdic.posY;
    persImg.style.top = posY+"px";
    persImg.style.left = posX+"px";

    sistema.estado.personagensNaTela.push(persParaAdic);
    sistema.estado.personagensNaTelaImg.push(persImg);
    if(persDiv.current){
      persDiv.current.appendChild(persImg);
      sistema.exibirElemento(persImg);
    }
    sistema.despachar({tipo: acoes.adicionarPersonagem, opcao: false});
    return Promise.resolve;
  }*/
  
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
      
      {sistema?.estado.exibindoPainelInferior && <PainelInferior/>}
      {sistema?.estado.exibindoTelaDeOpcoes && <TelaDeOpcoes/>}
      {sistema?.estado.exibindoTelaDoHistorico && <TelaDoHistorico/>}
      {sistema?.estado.exibindoTelaDeArquivos && <TelaDeArquivos/>}
    </div>
  )
}