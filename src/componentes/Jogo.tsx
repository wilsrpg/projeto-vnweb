import React, { useRef, useEffect, useReducer, useCallback } from "react";
import { Acao, acoes, IVariaveis, contexto } from "./Sistema";
import TelaInicial from "./TelaInicial"
import { cenas } from "./mapeadores/Cenas";
import { musicas } from "./mapeadores/Musicas";
import { sons } from "./mapeadores/Sons";
import { personagens } from "./mapeadores/Personagens";
import Apresentacao from "./Apresentacao";
import BotaoSom from "./BotaoSom";

//variáveis do sistema; adicione ou modifique no arquivo Sistema.tsx
const estadoInicial: IVariaveis = {
  //sistemaOcupado: true,
  imagemDeFundo: "",
  musica: "",
  musicas: musicas,
  sons: sons,
  //audioHabilitado: true,
  cenaAtual: -1,
  eventoAtual: -1,
  personagens: personagens,
  ultimoPersonagemAdicionado: null,
  ultimoPersonagemRemovido: null,
  personagensNaTela : [null],
};

//central de comando das funções do reducer; normalmente, cada comando atualiza
//uma variável que ativa um effect para executar as ações necessárias
function redutor(variaveis: IVariaveis, acao: Acao) {
  switch (acao.tipo) {
    //case acoes.ocuparSistema:
    //  return { ...variaveis, sistemaOcupado : true };
    //  case acoes.desocuparSistema:
    //    return { ...variaveis, sistemaOcupado : false };
    case acoes.mudarImagemDeFundo:
      return { ...variaveis, imagemDeFundo : acao.endereco };
    case acoes.mudarMusica:
      return { ...variaveis, musica : acao.endereco };
    //case acoes.alternarAudio:
    //  if(acao.valor == 1)
    //    return { ...variaveis, audioHabilitado : true };
    //  if(acao.valor == 0)
    //    return { ...variaveis, audioHabilitado : false };
    //  if(acao.valor == -1)
    //    return { ...variaveis, audioHabilitado : !variaveis.audioHabilitado };
    case acoes.mudarCena:
      return { ...variaveis, cenaAtual : acao.valor };
    case acoes.mudarEvento:
      return { ...variaveis, eventoAtual: acao.valor };
    case acoes.adicionarPersonagem:
      if(acao.valor == -1)
        return { ...variaveis, ultimoPersonagemAdicionado: null };
      const pers = {endereco: acao.endereco, posicao: acao.valor};
      return { ...variaveis, ultimoPersonagemAdicionado : pers };
    case acoes.removerPersonagem:
      if(acao.valor == -1)
        return { ...variaveis, ultimoPersonagemRemovido: null };
      if(acao.valor >= variaveis.personagensNaTela.length || acao.valor < 0){
        console.log("Índice '"+acao.valor+"' inválido para a quantidade de personagens na tela.\n");
        return { ...variaveis };
      }
      return { ...variaveis, ultimoPersonagemRemovido: acao.valor };

    default:
      throw new Error("Opção '"+acao.tipo+"' não existe no redutor.\n");
  }
}

export default function Jogo() {
  const [estado, despachar] = useReducer(redutor, estadoInicial);
  /*const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = canvasRef.current?.getContext('2d');
  if(canvasRef.current){
    canvasRef.current.width = 640;
    canvasRef.current.height = 480;
  }*/
  const bgiRef = useRef<HTMLImageElement>(null);
  //const bgmRef = useRef<HTMLAudioElement>(null);
  const persRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLPreElement>(null);
  //const audioHabilitado = useRef(true);
  const somAudio = new Audio();
  //const bip = useRef<HTMLAudioElement>();
  const exibindoCaixaDeDialogo = useRef(false);
  //const soletrando = useRef(false);
  let soletrando = false;
  const sistemaOcupado = useRef(false);
  //let sistemaOcupado = true;
  //const eventoAtual2 = useRef(-1);
  
  //function capturarClique(e: MouseEvent) {
  function capturarClique(e: React.MouseEvent) {
    //let botao = event.button;
    if (e.button == 0){
      //alert("capturou botão");
      console.log("clicou");
      interagir();
    }
  }
  //const capturarCliqueCB = useCallback(()=>
  //  document.getElementById("tela")?.addEventListener("click",capturarClique), []);

  const teclasCount = useRef(0);
  function capturarTecla(e: KeyboardEvent){
  //function capturarTecla(e: React.KeyboardEvent){
    if(e.repeat) return;
    teclasCount.current++;
    console.log("apertou '"+e.key+"'")
    console.log("teclasCount="+teclasCount.current);
    //ev.stopImmediatePropagation();
    //if(e.key=="m"){
    //  //botaoDeSom();
    //  alternarAudio();
    //  //ev.stopImmediatePropagation();
    //}
    if(e.key=="z" || e.key=="Enter"){
      interagir();
      //e.stopPropagation();
      //e.stopImmediatePropagation();
    }
    if(e.key=="Backspace"){
      console.log("cena="+estado.cenaAtual);
      if(estado.cenaAtual > 0){
        console.log("aee");
        interagir();
        removerPersonagem(0);
        interagir();
        mudarCena(0);
      }
    }
    //ev.stopPropagation();
    //ev.stopImmediatePropagation();
  }
  //const capturarTeclaCB = useCallback(()=>
  //  document.addEventListener("keydown",capturarTecla) ,[]);

  console.log("renderizou jogo");

  //funções de encapsulamento dos despaches do reducer
  //(obs.: futuramnt, passar pra componente de controle)
  function ocuparSistema(){
    console.log("ocuparSistema()");
    //despachar({tipo: acoes.ocuparSistema, endereco: "", valor: 0});
    sistemaOcupado.current = true;
    //sistemaOcupado = true;
  }
  function desocuparSistema(){
    console.log("desocuparSistema()");
    //despachar({tipo: acoes.desocuparSistema, endereco: "", valor: 0});
    sistemaOcupado.current = false;
    //sistemaOcupado = false;
  }
  function mudarImagemDeFundo(endereco: string){
    despachar({tipo: acoes.mudarImagemDeFundo, endereco: endereco, valor: 0});
  }
  function mudarMusica(endereco: string){
    despachar({tipo: acoes.mudarMusica, endereco: endereco, valor: 0});
  }
  //function alternarAudio() {
  //  despachar({tipo: acoes.alternarAudio, endereco: "", valor: -1});
  //  //audioHabilitado.current = !audioHabilitado.current; //verificar isso aki
  //  //console.log("audio: "+audioHabilitado.current);
  //  console.log("audio: "+estado.audioHabilitado);
  //}
  function mudarCena(cena: number){
    despachar({tipo: acoes.mudarCena, endereco: "", valor: cena});
  }
  function proximoEvento(){
    // alert("a");
    //if(!estado.sistemaOcupado)
    //if(!sistemaOcupado.current)
    //if(!sistemaOcupado){
      despachar({tipo: acoes.mudarEvento, endereco: "",
                valor: estado.eventoAtual+1});
    //eventoAtual2.current++;
    // sistemaOcupado = true;
    //}
    //console.log("entrou proximoEvento="+eventoAtual2.current);
    console.log("entrou proximoEvento="+estado.eventoAtual);
  }
  function irParaEvento(i: number){
    // alert("pulou pro evento "+i);
    despachar({tipo: acoes.mudarEvento, endereco: "", valor: i});
    //eventoAtual2.current = i;
  }
  function adicionarPersonagem(endereco: string, posicao: number){
    despachar({tipo: acoes.adicionarPersonagem,
               endereco: endereco, valor: posicao});
  }
  function removerPersonagem(indice: number){
    despachar({tipo: acoes.removerPersonagem, endereco: "", valor: indice});
  }
  function removerTodosOsPersonagens(){
    //let n = estado.personagensNaTela.length-1;
    //while(n >= 0) {
    //  // alert("removendo pers "+n);
    //  removerPersonagem(n);
    //  n--;
    //}
    //alert("persNaTela.length="+estado.personagensNaTela.length);
    if(estado.personagensNaTela.length>0)
      estado.personagensNaTela.splice(0,estado.personagensNaTela.length);
    //alert("persNaTela.length(dps d splice)="+estado.personagensNaTela.length);
    //alert("persRef.length="+persRef.current?.childNodes.length);
    if(persRef.current?.childElementCount)
      while(persRef.current.childElementCount>0){
        persRef.current.firstElementChild?.remove();
        //alert("removeu um child\npersRef.length="+persRef.current?.childNodes.length);
      }
  }

  function tocarSom(som: string){
    //if (audioHabilitado.current) {
    //if (estado.audioHabilitado) {
      somAudio.src = som;
      somAudio.play();
    //}
  }

  //configurações iniciais
  useEffect(()=>{
    console.log("ef jogo []");
    //if(!document.getElementById("tela")?.hasAttribute("onclick"))
    //  document.getElementById("tela")?.addEventListener("click",capturarClique);
    if(!document.body.hasAttribute("onkeydown"))
      document.body.addEventListener("keydown",capturarTecla);
    else alert("tem");
    // capturarCliqueCB();
    // capturarTeclaCB();
    // irParaEvento(-1);
    //esse array sempre começa com length 1 por causa do elemento null inicial;
    if(estado.personagensNaTela[0] === null) //então, pra não dar problemas,
      estado.personagensNaTela.splice(0,1); //o elemento inicial é removido
  }, [])

  //mudar a imagem de fundo (bgi)
  useEffect(() => {
    console.log("ef bgi");
    if(!bgiRef.current || !estado.imagemDeFundo)
      return;
    transicionarImagemDeFundo();
  }, [estado.imagemDeFundo]);

  //fade-out na bgi atual, fade-in na bgi seguinte
  async function transicionarImagemDeFundo(tempo = 0.5) {
    if(bgiRef.current){
      await ocultarElemento(bgiRef.current, tempo);
      if (estado.imagemDeFundo)
        bgiRef.current.src = estado.imagemDeFundo;
      await exibirElemento(bgiRef.current, tempo);
    }
  }

  //efeitos de fade-out e fade-in, podem ser usados com qualquer elemento;
  //retornam uma promise após o tempo de transição, que pode ser usada com
  //await na chamada da função para pausar a execução do código enquanto a
  //transição ocorre
  async function ocultarElemento(elem: HTMLElement, tempo=0.5) {
    let opacInicial = 1;
    if(elem.hasAttribute("opacity"))
      opacInicial = parseInt(elem.style.opacity);
    const fadeOut = [{ opacity: opacInicial },{ opacity: 0 }];
    elem.style.opacity = "0";
    return elem.animate(fadeOut, tempo*1000).finished;
  }

  async function exibirElemento(elem: HTMLElement, tempo=0.5, opacFinal=1) {
    const fadeIn = [{ opacity: 0 },{ opacity: opacFinal}];
    elem.style.opacity = ""+opacFinal;
    return elem.animate(fadeIn, tempo*1000).finished;
  }

  //mudar a música de fundo (bgm)
  //useEffect(() => {
  //  console.log("ef bgm/audio");
  //  if(!bgmRef.current || !estado.musica) return;
  //  bgmRef.current.src = estado.musica;
  //  if (estado.audioHabilitado){
  //  //if (audioHabilitado.current){
  //    //bgmRef.current.load();
  //    bgmRef.current.play();
  //  } else {
  //    bgmRef.current.pause();
  //    bgmRef.current.currentTime = 0;
  //  }
  ////}, [estado.musica, audioHabilitado.current]);
  //}, [estado.musica, estado.audioHabilitado]);
  
  //adicionar personagens
  useEffect(()=>{
    console.log("ef ultPersAdic");
    if(estado.ultimoPersonagemAdicionado != null){
      const pers = new Image();
      pers.src = estado.ultimoPersonagemAdicionado.endereco;
      estado.personagensNaTela?.push(pers);
      adicionarPersonagem2();
    }
  }, [estado.ultimoPersonagemAdicionado])

  function adicionarPersonagem2(){
    const pers = estado.personagensNaTela[estado.personagensNaTela.length-1];
    if(pers){
      pers.style.position = "absolute";
      pers.style.height = "100%";
      pers.style.width = "auto";
      pers.style.left = estado.ultimoPersonagemAdicionado?.posicao+"%";
      pers.style.top = "0";
    }
    if(pers && persRef.current){
      despachar({tipo: acoes.adicionarPersonagem, endereco: "", valor: -1}); //faz com q estado.ultimoPersonagemAdicionado = null
      persRef.current.appendChild(pers);
      exibirElemento(pers);
    }
  }

  //remover personagens
  useEffect(()=>{
    console.log("ef ultPersRemov");
    if(estado.ultimoPersonagemRemovido != null)
      removerPersonagem2(estado.ultimoPersonagemRemovido);
  }, [estado.ultimoPersonagemRemovido])

  async function removerPersonagem2(persId: number) {
    if(persRef.current?.children[persId]){
      const img = persRef.current?.children[persId];
      if(img instanceof HTMLImageElement){
        estado.personagensNaTela.splice(persId,1);
        despachar({tipo: acoes.removerPersonagem, endereco: "", valor: -1}); //faz com q estado.ultimoPersonagemRemovido = null
        persRef.current.parentElement?.appendChild(img);
        await ocultarElemento(img);
        img.remove();
      }
    }
  }

  //funções dos diálogos
  function apagarMensagem(){
    soletrando = false;
    if(dialRef.current)
      dialRef.current.innerHTML = "";
  }

  async function exibirCaixaDeDialogo(){
    //sistemaOcupado.current = true;
    //sistemaOcupado = true;
    apagarMensagem();
    if(dialRef.current && !exibindoCaixaDeDialogo.current){
      await exibirElemento(dialRef.current);
      //exibirOcultarCaixaDeDialogo(true);
      exibindoCaixaDeDialogo.current = true;
    }
  }

  async function ocultarCaixaDeDialogo(){
    if(dialRef.current && exibindoCaixaDeDialogo.current){
      apagarMensagem();
      exibindoCaixaDeDialogo.current = false;
      await ocultarElemento(dialRef.current);
    }
  }

  async function soletrarMensagem(texto: string){
    //sistemaOcupado = false;
    sistemaOcupado.current = false;
    apagarMensagem();
    //soletrando.current = true;
    soletrando = true;
    let i = 0;
    //while(i < texto.length && soletrando.current) {
    while(i < texto.length && soletrando) {
      await new Promise((resolve)=>{setTimeout(() => {
        if(dialRef.current && soletrando)
          dialRef.current.innerHTML += texto[i];
        i++;
        resolve("");
      }, 25)});
    }
    //alert(dialRef.current?.innerHTML);
    if(dialRef.current && i < texto.length && dialRef.current.innerHTML)
      dialRef.current.innerHTML = texto;
    //soletrando.current = false;
    soletrando = false;
  }

  async function escreverMensagem(texto: string){
    if(!exibindoCaixaDeDialogo.current){
      await exibirCaixaDeDialogo();
    }
    //if(!sistemaOcupado.current)
    await soletrarMensagem(texto);
  }

  function interagir(){
    //console.log("entrou interagir, sistemaOcupado="+sistemaOcupado.current);
    //if(exibindoCaixaDeDialogo.current && soletrando.current)
    if(exibindoCaixaDeDialogo.current && soletrando)
      //soletrando.current = false;
      soletrando = false;
    else
    if(!sistemaOcupado.current){
      sistemaOcupado.current = true;
      proximoEvento();
    }
  }

  //adicione as cenas no arquivo Cenas.tsx
  function selecionarCena(){
    //let ss = "cena"+estado.cenaAtual;
    //if(estado.cenaAtual == 0)
    //  return <TelaInicial />
    //else
    //  return cenas[ss];

    switch (estado.cenaAtual) {
      case -1:
        return <Apresentacao />;
      case 0:
        return <TelaInicial/>;
      case 1:
        return cenas.cena1;
      case 2:
        return cenas.cena2;
    
      default:
        throw new Error("Erro na seleção de cena, estado.cenaAtual="+estado.cenaAtual);
    }
  }

  //function botaoSom(e: React.MouseEvent) {
  //  //pra não passar as mensagens quando o som for desativado durante um diálogo
  //  e.stopPropagation();
  //  alternarAudio();
  //}

  //function capturarTeclaOnkeydown(e: React.KeyboardEvent) {
    //let tecla = e.key;
    //if (tecla == "Enter"){
    //  //alert("capturou tecla");
    //  console.log("capturou tecla");
    //  interagir();
    //}
    //capturarTecla(e);
  //}
  
  return (
    //<div id="tela" onClick={(event)=>{capturarClique(event)}} onKeyDown={(event)=>{capturarTeclaOnkeydown(event)}} style={{
    <div id="tela"
    onClick={(e)=>{capturarClique(e)}}
    //onKeyDown={(e)=>{capturarTeclaOnkeydown(e)}}
    style={{
      position: "relative",
      //maxWidth: "640px",
      //maxHeight: "480px",
      width: "640px",
      height: "480px",
      backgroundColor: "black", //pros fade-outs das bgi's
    }}>
      <img id="bgi" ref={bgiRef} style={{
        //backgroundColor: "magenta", //nunca deve aparecer
        position: "absolute",
        top: "0",
        width: "100%",
        height: "100%",
        display: "block",
      }} />
      
      {/*<canvas id="canvas" ref={canvasRef} style={{
        backgroundColor: "green",
        width: "100%",
        height: "100%",
        display: "block"
      }} />*/}
      
      <div id="personagens" ref={persRef} style={{
        //backgroundColor: "cyan",
        position: "absolute",
        top: "0",
        width: "100%",
        height: "100%",
      }}></div>
      
      <pre id="dialogo" ref={dialRef} style={{
        backgroundColor: "rgba(0,0,255,0.5)",
        position: "absolute",
        bottom: 0,
        margin: "2%",
        padding: "1% 2%",
        width: "90%",
        height: "25%",
        border: "0.2em ridge gray",
        fontFamily: "times new roman",
        fontSize: "1.5em",
        color: "white",
        opacity: 0,
        whiteSpace: "pre-wrap",
      }}></pre>

      <contexto.Provider value={{estado, despachar, ocuparSistema,
          //eventoAtual2:eventoAtual2.current,
          desocuparSistema, mudarImagemDeFundo, mudarMusica, mudarCena,
          tocarSom, adicionarPersonagem, removerPersonagem,
          removerTodosOsPersonagens, proximoEvento, irParaEvento,
          ocultarCaixaDeDialogo, escreverMensagem, interagir,
          apagarMensagem}}>
        {selecionarCena()}
        <BotaoSom/>
      </contexto.Provider>
      
      {/*<audio ref={bgmRef} loop />*/}
      
      {/*<input
        id="botaoSom"
        type="button"
        value="♫"
        onClick={(e)=>{botaoSom(e);}}
        //onKeyDown={(event)=>{if(event.key=="Enter")botaoSom(event)}}
        style={{ position: "absolute", top: 0, right: 0 }}
      />*/}
    </div>
  )
}
