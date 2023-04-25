import { useContext, useEffect } from "react";
import { contexto } from "./Sistema";
import bgi from "../arquivos/bgi-vila.png";
//import bgm from "../arquivos/bgm-idk.ogg";
import bgm from "../arquivos/bgm-titulo.ogg";
// import { personagens } from "./Personagens";
import { roteiro } from "./Roteiro1";

/*type evento = {
  texto?: string,
  sprite?: string,
  posicaoSprite?: number,
  espera?: number,
  esperaEPassa?: number,
  bgi?: string,
  bgm?: string,
  som?: string,
}

let roteiro: evento[] = [
  {esperaEPassa: 1000},
  {texto: "11111110\n1111111 11111110111111"},
  {sprite: personagens.irmao, posicaoSprite: 20, esperaEPassa: 1000},
  {texto: "222222202222222 22222220222222"},
  {texto: "333333303333333 33333330333333"},
  {sprite: personagens.protagonista, posicaoSprite: 70, esperaEPassa: 1000},
  {texto: "444444404444444 44444440444444"},
  {sprite: personagens.protagonista, posicaoSprite: -1, esperaEPassa: 1000},
  {texto: "555555505555555 55555550555555"},
  {sprite: personagens.irmao, posicaoSprite: -1, esperaEPassa: 500},
];*/

export default function Cena1() {
  const sistema = useContext(contexto);

  //configurações iniciais
  useEffect(()=>{
    console.log("ef cena1 []");
    sistema?.mudarImagemDeFundo(bgi);
    sistema?.mudarMusica(bgm);
    sistema?.irParaEvento(0);
  }, [])

  //execução do roteiro
  useEffect(()=>{
    console.log("ef cena2 eventoAtual");
    executar();
  }, [sistema?.estado.eventoAtual])

  async function executar() {
    console.log("executar");
    let i = sistema?.estado.eventoAtual;
    console.log("executar i="+i);
    if(i !== undefined)
    if(i>=0 && roteiro[i]) {
      console.log("executando");
      if(i < roteiro.length) {

        if(roteiro[i].espera){
          let ms = roteiro[i].espera;
          if(ms !== undefined){
            sistema?.apagarMensagem();
            await new Promise((resolve) => setTimeout(() => resolve(""), ms));
          }
        }

        if(roteiro[i].bgi){
          let bgi = roteiro[i].bgi;
          if(bgi)
            sistema?.mudarImagemDeFundo(bgi);
        }
        
        if(roteiro[i].bgm){
          let bgm = roteiro[i].bgm;
          if(bgm)
            sistema?.mudarMusica(bgm);
        }
        
        if(roteiro[i].som){
          let som = roteiro[i].som;
          if(som)
            sistema?.tocarSom(som);
        }
        
        // if('sprite' in roteiro[i] && roteiro[i].hasOwnProperty("posicaoSprite"))
        if(roteiro[i].sprite && roteiro[i].posicaoSprite){
          let spr = document.URL + roteiro[i].sprite?.toString();
          let n = roteiro[i].posicaoSprite?.toString();
          let posSpr;
          if(n) posSpr = parseInt(n);
          // sistema?.adicionarPersonagem(roteiro[i].sprite, roteiro[i].posicaoSprite);
          if(spr && posSpr !== undefined)
            if(posSpr>=0)
              sistema?.adicionarPersonagem(spr, posSpr);
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
        }

        if(roteiro[i].texto) {
        // let fala = roteiro[i].texto;
        // if(typeof roteiro[i].texto == "string")
        // if(typeof roteiro[i].texto !== "undefined"){
        if(roteiro[i].texto){
          let tt = roteiro[i].texto?.toString();
          // Escritor.getInstance().escrever(roteiro[i].texto);
          if(tt)
          sistema?.escreverMensagem(tt);
        }
        } else
          sistema?.apagarMensagem();

          if(roteiro[i].esperaEPassa){
            let ms = roteiro[i].esperaEPassa;
            if(ms !== undefined){
              sistema?.apagarMensagem();
              await new Promise((resolve) => setTimeout(() => resolve(""), ms));
              sistema?.passarMensagem();
            }
          }
  
      } else
      sistema?.ocultarCaixaDeDialogo();
    } else
    sistema?.ocultarCaixaDeDialogo();
  }

  function voltar() {
    // sistema?.passarMensagem();
    sistema?.apagarMensagem();
    sistema?.ocultarCaixaDeDialogo();
    // sistema?.removerPersonagem(0);
    sistema?.removerTodosOsPersonagens();
    // sistema?.passarMensagem();
    sistema?.mudarCena(0);
  }

  return (
    <>
    <button onClick={voltar}>Voltar</button>
    </>
  )
}
