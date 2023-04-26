import React, { useRef, useEffect, useReducer, useCallback } from "react";
import { Acao, acoes, IVariaveis, contexto } from "./Sistema";
import TelaInicial from "./TelaInicial"
import { cenas } from "./mapeadores/Cenas";
import { musicas } from "./mapeadores/Musicas";
import { sons } from "./mapeadores/Sons";
import { personagens } from "./mapeadores/Personagens";

//variáveis do sistema; adicione ou modifique no arquivo Sistema.tsx
const estadoInicial: IVariaveis = {
  imagemDeFundo: "",
  musica: "",
  musicas: musicas,
  sons: sons,
  audioHabilitado: true,
  cenaAtual: 0,
  eventoAtual: -1,
  personagens: personagens,
  ultimoPersonagemAdicionado: {endereco: "", posicao: 0 },
  ultimoPersonagemRemovido: null,
  personagensNaTela : [null],
};

//central de comando das funções do reducer; normalmente, cada comando atualiza
//uma variável que ativa um effect para executar as ações necessárias
function redutor(variaveis: IVariaveis, acao: Acao) {
  switch (acao.tipo) {
    case acoes.mudarImagemDeFundo:
      return { ...variaveis, imagemDeFundo : acao.endereco };
    case acoes.mudarMusica:
      return { ...variaveis, musica : acao.endereco };
    case acoes.alternarAudio:
      if(acao.valor == 1)
        return { ...variaveis, audioHabilitado : true };
      if(acao.valor == 0)
        return { ...variaveis, audioHabilitado : false };
      if(acao.valor == -1)
        return { ...variaveis, audioHabilitado : !variaveis.audioHabilitado };
    case acoes.mudarCena:
      return { ...variaveis, cenaAtual : acao.valor };
      case acoes.mudarEvento:
        return { ...variaveis, eventoAtual: acao.valor };
    case acoes.adicionarPersonagem:
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
  const bgmRef = useRef<HTMLAudioElement>(null);
  const persRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLPreElement>(null);
  const audioHabilitado = useRef(true);
  const som = new Audio(sons.confirmar);
  const bip = useRef<HTMLAudioElement>();
  const exibindoCaixaDeDialogo = useRef(false);
  const soletrando = useRef(false);

  const teclasCount = useRef(0);
  function capturarTecla(ev: KeyboardEvent){
    if(ev.repeat) return;
    teclasCount.current++;
    console.log("apertou '"+ev.key+"'")
    console.log("teclasCount="+teclasCount.current);
    //ev.stopImmediatePropagation();
    if(ev.key=="m"){
      botaoDeSom();
      //ev.stopImmediatePropagation();
    }
    if(ev.key=="z" || ev.key=="Enter"){
      passarMensagem();
      //ev.stopPropagation();
      //ev.stopImmediatePropagation();
    }
    if(ev.key=="Backspace"){
      console.log("cena="+estado.cenaAtual);
      if(estado.cenaAtual !== 0){
        console.log("aee");
        passarMensagem();
        removerPersonagem(0);
        passarMensagem();
        mudarCena(0);
      }
    }
    //ev.stopPropagation();
    //ev.stopImmediatePropagation();
  }
  const capturarTeclaCB = useCallback(()=>
  document.addEventListener("keydown",
    //(ev)=>{}
    capturarTecla
  ) ,[]);
  console.log("Jogo: renderizou");

  //funções de encapsulamento dos despaches do reducer
  //(obs.: futuramnt, passar pra componente de controle)
  function mudarImagemDeFundo(endereco: string){
    despachar({tipo: acoes.mudarImagemDeFundo, endereco: endereco, valor: 0});
  }
  function mudarMusica(endereco: string){
    despachar({tipo: acoes.mudarMusica, endereco: endereco, valor: 0});
  }
  function alternarAudio() {
    despachar({tipo: acoes.alternarAudio, endereco: "", valor: -1});
    audioHabilitado.current = !audioHabilitado.current;
    console.log("audio: "+audioHabilitado.current);
  }
  function mudarCena(cena: number){
    despachar({tipo: acoes.mudarCena, endereco: "", valor: cena});
  }
  function proximoEvento(){
    // alert("a");
    despachar({tipo: acoes.mudarEvento, endereco: "",
               valor: estado.eventoAtual+1});
  }
  function irParaEvento(i: number){
    // alert("pulou pro evento "+i);
    despachar({tipo: acoes.mudarEvento, endereco: "", valor: i});
  }
  function adicionarPersonagem(endereco: string, posicao: number){
    despachar({tipo: acoes.adicionarPersonagem,
               endereco: endereco, valor: posicao});
  }
  function removerPersonagem(indice: number){
    despachar({tipo: acoes.removerPersonagem, endereco: "", valor: indice});
  }
  function removerTodosOsPersonagens(){
    let n = estado.personagensNaTela.length-1;
    while(n >= 0) {
      // alert("removendo pers "+n);
      removerPersonagem(n);
      n--;
    }
  }
  function tocarSom(som2: string){
    if (estado.audioHabilitado) {
      som.src = som2;
      //const bip = new Audio(sistema.estado.sons.confirmar);
      // if(bip.current)
      //   bip.current.src = som2;
      som.play();
      // bip.current?.play();
    }
  }

  //configurações iniciais
  useEffect(()=>{
    console.log("ef jogo []");
    capturarTeclaCB();
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
    //await img.animate(fadeOut, tempo*1000).finished;
    elem.style.opacity = "0";
    return elem.animate(fadeOut, tempo*1000).finished;
  }

  async function exibirElemento(elem: HTMLElement, tempo=0.5, opacFinal=1) {
    const fadeIn = [{ opacity: 0 },{ opacity: opacFinal}];
    //await img.animate(fadeIn, tempo*1000).finished;
    elem.style.opacity = ""+opacFinal;
    return elem.animate(fadeIn, tempo*1000).finished;
  }

  //mudar a música de fundo (bgm)
  useEffect(() => {
    console.log("ef bgm/audio");
    if(!bgmRef.current || !estado.musica) return;
    bgmRef.current.src=estado.musica;
    if (audioHabilitado.current){
      //bgmRef.current.load();
      bgmRef.current.play();
    } else {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
  }, [estado.musica,estado.audioHabilitado,audioHabilitado.current]);
  
  //adicionar personagens
  useEffect(()=>{
    console.log("ef ultPersAdic");
    if(!estado.ultimoPersonagemAdicionado.endereco)
      return;
    const pers = new Image();
    pers.src = estado.ultimoPersonagemAdicionado.endereco;
    estado.personagensNaTela?.push(pers);
    adicionarPersonagem2();
  }, [estado.ultimoPersonagemAdicionado])

  function adicionarPersonagem2(){
    const pers = estado.personagensNaTela[estado.personagensNaTela.length-1];
    if(pers){
      pers.style.position = "absolute";
      pers.style.height = "100%";
      pers.style.width = "auto";
      pers.style.left = estado.ultimoPersonagemAdicionado.posicao+"%";
      pers.style.top = "0";
    }
    if(pers && persRef.current){
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
    if(dialRef.current)
      dialRef.current.innerHTML = "";
  }

  async function exibirCaixaDeDialogo(){
    apagarMensagem();
    if(dialRef.current){
      if(!exibindoCaixaDeDialogo.current)
        await exibirElemento(dialRef.current);
      //exibirOcultarCaixaDeDialogo(true);
      exibindoCaixaDeDialogo.current = true;
    }
  }

  async function ocultarCaixaDeDialogo(){
    apagarMensagem();
    if(dialRef.current){
      //exibirOcultarCaixaDeDialogo(false);
      if(exibindoCaixaDeDialogo.current)
        await ocultarElemento(dialRef.current);
      exibindoCaixaDeDialogo.current = false;
    }
  }

  async function soletrarMensagem(texto: string){
    soletrando.current = true;
    apagarMensagem();
    let i = 0;
    while(i < texto.length && soletrando.current) {
      await new Promise((resolve)=>{setTimeout(() => {
        if(dialRef.current)
          dialRef.current.innerHTML += texto[i];
        i++;
        resolve("");
      }, 25)});
    }
    if(dialRef.current && i < texto.length)
      dialRef.current.innerHTML = texto;
    soletrando.current = false;
  }

  async function escreverMensagem(texto: string){
    if(!exibindoCaixaDeDialogo.current){
      await exibirCaixaDeDialogo();
    }
    await soletrarMensagem(texto);
  }

  function passarMensagem(){
    if(exibindoCaixaDeDialogo.current && soletrando.current)
      soletrando.current = false;
    else
      proximoEvento();
  }

  function capturarClique(event: React.MouseEvent) {
    let botao = event.button;
    if (botao == 0){
      //alert("capturou botão");
      console.log("capturou botão");
      passarMensagem();
    }
  }

  function capturarTeclaOnkeydown(event: React.KeyboardEvent) {
    let tecla = event.key;
    if (tecla == "Enter"){
      //alert("capturou tecla");
      console.log("capturou tecla");
      passarMensagem();
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
      case 0:
        return <TelaInicial/>
      case 1:
        return cenas.cena1;
      case 2:
        return cenas.cena2;
    
      default:
        throw new Error("Erro na seleção de cena, estado.cenaAtual="+estado.cenaAtual);
    }
  }

  //pra não passar as mensagens quando o som for desativado durante um diálogo
  function botaoDeSom() {
    alternarAudio();
  }

  return (
    //<div id="tela" onClick={(event)=>{capturarClique(event)}} onKeyDown={(event)=>{capturarTeclaOnkeydown(event)}} style={{
    <div id="tela" onClick={(event)=>{capturarClique(event)}} style={{
      position: "relative",
      maxWidth: "640px",
      maxHeight: "480px",
      backgroundColor: "black", //pros fade-outs das bgi's
      color: "white"
    }}>
      <img id="bgi" ref={bgiRef} style={{
        backgroundColor: "magenta", //nunca deve aparecer
        width: "100%",
        height: "100%",
        display: "block"
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
        height: "100%"
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
        fontSize: "2em",
        opacity: 0,
        // overflowWrap: "break-word",
        // wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        // display: "block",
      }}></pre>

      <contexto.Provider value={{estado, despachar, mudarImagemDeFundo,
          mudarMusica, mudarCena, tocarSom, adicionarPersonagem,
          removerPersonagem, removerTodosOsPersonagens, proximoEvento,
          irParaEvento, ocultarCaixaDeDialogo, escreverMensagem,
          passarMensagem, apagarMensagem}}>
        {selecionarCena()}
      </contexto.Provider>
      
      <audio ref={bgmRef} loop />
      
      <input
        type="button"
        value="♫"
        onClick={(ev)=>{ev.stopPropagation(); botaoDeSom();}}
        //onKeyDown={(event)=>{if(event.key=="Enter")botaoDeSom(event)}}
        style={{ position: "absolute", top: 0, right: 0 }}
      />
    </div>
  )
}
