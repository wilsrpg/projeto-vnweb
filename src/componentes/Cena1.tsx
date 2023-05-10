import { useContext, useEffect, useRef } from "react";
import { contexto } from "./Sistema";
import bgi from "../midias/bgi-vila.png";
import bgm from "../midias/bgm-titulo.ogg";
// import { roteiro1 } from "./roteiros/Roteiro1";
import { roteiroTeste as roteiro1 } from "./roteiros/roteiroTeste";
// import { rotteste as roteiro1 } from "./roteiros/Roteiro1";
//import Escritor from "./Escritor";

export default function Cena1() {
  const sistema = useContext(contexto);
  //const [ocupado,ocupar] = useState(false);
  //const ocupado = useRef(false);
  //let ocupado = false;
  // const executandoCena = useRef(false);
  console.log("renderizou cena1");

  //configurações iniciais
  useEffect(()=>{
    //sistema?.ocuparSistema();
    console.log("ef cena1 []");
    sistema?.mudarImagemDeFundo(bgi);
    sistema?.mudarMusica(bgm);
    //Escritor.obterInstancia().definirSistema(sistema);
    // if(sistema)
    //   sistema.executandoCena = true;
    // console.log(">"+sistema?.executandoCena);
    sistema?.desocuparSistema();
    sistema?.irParaEvento(0);
    // sistema?.proximoEvento();
    // executandoCena.current = true;
  }, [])

  //execução do roteiro
  useEffect(()=>{
    console.log("ef cena1 eventoAtual="+sistema?.estado.eventoAtual);
    //console.log("ef cena1 eventoAtual="+sistema?.eventoAtual2);
    executar();
  }, [sistema?.estado.eventoAtual])
  //}, [sistema?.eventoAtual2])

  //useEffect(()=>{
  //  if(ocupado.current)
  //    console.log("ocupou");
  //  else
  //    console.log("desocupou");
  //}, [ocupado.current])

  //useEffect(()=>{
  //  if(ocupado){
  //    console.log("ef ocupou");
  //    sistema?.ocuparSistema();
  //  } else {
  //    console.log("ef desocupou");
  //    sistema?.desocuparSistema();
  //  }
  //}, [ocupado])

  // function ocupar() {
  //     sistema?.ocuparSistema();
  //     //console.log("fun ocupar: dps d ocupar");
  // }
  // function desocupar() {
  //   sistema?.desocuparSistema();
  //   //console.log("fun desocupar: dps d desocupar");
  // }

  async function executar() {
    // console.log("executandoCena="+executandoCena.current);
    // console.log("executandoCena="+sistema?.executandoCena);
    console.log("executar");
    let i: number;
    if(sistema?.estado.eventoAtual !== undefined) {
      i = sistema?.estado.eventoAtual;
    //if(sistema?.eventoAtual2 !== undefined) {
    //  i = sistema?.eventoAtual2;
      console.log("executar i="+i);
      //if(i !== undefined)
      if(i>=0 && roteiro1[i]) {
        //if(i < roteiro.length) {
        console.log("lendo roteiro");

        //sistema?.ocuparSistema();
        //let ocupado = true;
        //ocupar();
        //ocupado.current = true;
        //console.log("executar: dps d ocupar");

        if(!roteiro1[i].texto){
          console.log("ocultando cx d txt");
          sistema.ocultarCaixaDeDialogo();
        }

        if(roteiro1[i].bgi){
          console.log("mudando bgi");
          let bgi = roteiro1[i].bgi;
          if(bgi)
            sistema?.mudarImagemDeFundo(bgi);
        }
        
        if(roteiro1[i].bgm){
          console.log("mudando bgm");
          let bgm = roteiro1[i].bgm;
          if(bgm)
            sistema?.mudarMusica(bgm);
        }
        
        if(roteiro1[i].som){
          console.log("tocando som");
          let som = roteiro1[i].som;
          if(som)
            sistema?.tocarSom(som);
        }
        
        // if('sprite' in roteiro[i] && roteiro[i].hasOwnProperty("posicaoSprite"))
        if(roteiro1[i].sprite){
          console.log("mostrando sprite");
          let spr = document.URL + roteiro1[i].sprite?.endereco.toString();
          let posSpr;
            //let posSpr: number;
          if(roteiro1[i].sprite?.posicao)
            posSpr = roteiro1[i].sprite?.posicao;
          let esp=false;
          let espelhado=roteiro1[i].sprite?.espelhado;
          if(espelhado !== undefined)
            esp = espelhado;
          if(posSpr !== undefined){
            // let posSpr = n;
          // sistema?.adicionarPersonagem(roteiro[i].sprite, roteiro[i].posicaoSprite);
          //if(spr && posSpr !== undefined)
            if(posSpr>=0)
              sistema?.adicionarPersonagem(spr, posSpr, esp);
            else {
              sistema?.estado.personagensNaTela.map((pers,i)=>{
                // alert("i="+i+", pers="+pers?.src+", spr:"+spr);
                if(pers?.src == spr){
                  // alert("achou");
                  sistema?.removerPersonagem(i);
                }
              })
              // sistema?.removerPersonagem(-ps);
            }
            // let esperaPadrao = 1000; //n eh legal pq impede d 2 personagens aparecem ao msm tempo
            // await new Promise((resolve) => setTimeout(() => resolve(""), esperaPadrao));
          }
        }
        if(!roteiro1[i].espera)
          roteiro1[i].espera = 10; //sem isso, ao remover 2 personagens seguidos, só o 1o tava sendo removido
        if(roteiro1[i].espera){
          console.log("esperando");
          let n = roteiro1[i].espera;
          if(n !== undefined){
            let ms = n;
            //sistema?.apagarMensagem();
            await new Promise((resolve) => setTimeout(() => resolve(""), ms));
            //ocupar(false);
            console.log("terminou d esperar");
          }
        }

        //if(roteiro[i].texto) {
        // let fala = roteiro[i].texto;
        // if(typeof roteiro[i].texto == "string")
        // if(typeof roteiro[i].texto !== "undefined"){
        if(roteiro1[i].texto){
          console.log("escrevendo");
          let texto = roteiro1[i].texto?.toString();
          if(texto)
            sistema?.escreverMensagem(texto);
          // Escritor.obterInstancia().escrever(texto);
        //}
        }
        // else {
          //sistema?.ocultarCaixaDeDialogo();
        // }

        //desocupar();
        //ocupado.current = false;
        //console.log("executar: dps d desocupar");

        if(roteiro1[i].esperaBotao)
          sistema.desocuparSistema();
        
        //if(roteiro[i].esperaEPassa){
        //  let esp = roteiro[i].esperaEPassa;
        //  if(esp !== undefined && !sistema?.estado.sistemaOcupado){
        //    let ms = esp;
        //    //sistema?.apagarMensagem();
        //    await new Promise((resolve) => setTimeout(() => resolve(""), ms));
        //    //sistema?.desocuparSistema();
        //    sistema?.interagir();
        //  }
        //}
        // console.log("="+sistema.executandoCena)
        // if(!roteiro1[i].texto && !roteiro1[i].esperaBotao && executandoCena.current){
        // if(!roteiro1[i].texto && !roteiro1[i].esperaBotao && sistema.executandoCena){
        // if(!roteiro1[i].texto && !roteiro1[i].esperaBotao && sistema.estado.cenaAtual == 1){
        if(!roteiro1[i].texto && !roteiro1[i].esperaBotao){
          console.log("autoProxEvento do evento "+sistema.estado.eventoAtual);
          sistema?.proximoEvento();
        }

        //sistema?.desocuparSistema();

        //} else
        //  sistema?.ocultarCaixaDeDialogo();
      } else if(i >= roteiro1.length) {
        // executandoCena.current = false;
        // if(sistema)
        //   sistema.executandoCena = false;
        console.log("fim do roteiro");
        //sistema?.ocultarCaixaDeDialogo();
        //sistema?.ocuparSistema();
        //console.log("ocupar problemático");
        //ocupar();
      }
    }
  }

  function voltar() {
    // executandoCena.current = false;
    // if(sistema)
    //   sistema.executandoCena = false;
    // sistema?.interagir();
    //sistema?.apagarMensagem();
    sistema?.ocultarCaixaDeDialogo();
    // sistema?.removerPersonagem(0);
    sistema?.removerTodosOsPersonagens();
    // sistema?.interagir();
    sistema?.mudarCena(0);
    //sistema?.desocuparSistema();
  }

  return (
    <>
    <button onClick={voltar} style={{position: "relative"}}>Voltar</button>
    </>
  )
}
