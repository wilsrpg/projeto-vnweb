//import { useContext, useEffect } from "react";
import Escritor from "./Escritor";
//import { contexto } from "./Sistema";

export type evento = {
  texto?: string,
  sprite?: string,
  posicaoSprite?: number,
  bgi?: string,
  bgm?: string,
  som?: string,
  espera?: number,
  esperaBotao?: any,
}

//ainda não tá sendo usado
export default class Diretor {
  static instancia: Diretor;
  sistema: any;
  audio: any;
  roteiro: any;

  static obterInstancia() {
    if (Diretor.instancia == undefined) {
        Diretor.instancia = new Diretor();
    }
    return this.instancia;
  };

  definirSistema(sist: any){
    this.sistema = sist;
  }

  definirAudio(aud: any){
    this.audio = aud;
  }

  definirRoteiro(rot: evento[]){
    this.roteiro = rot;
  }

  escrever(s: string){
    this.sistema?.escreverMensagem(s);
  }
  
  ocupar() {
    this.sistema?.ocuparSistema();
    console.log("fun ocupar: dps d ocupar");
  }
  async executar() {
    console.log("executar");
    let i: number;
    if(this.sistema?.estado.eventoAtual !== undefined) {
      i = this.sistema?.estado.eventoAtual;
      console.log("executar i="+i);
      //if(i !== undefined)
      if(i>=0 && this.roteiro[i]) {
        //if(i < roteiro.length) {
        console.log("executando");

        //sistema?.ocuparSistema();
        //let ocupado = true;
        this.ocupar();
        //ocupado.current = true;
        console.log("executar: dps d ocupar");

        if(!this.roteiro[i].texto){console.log("ocultando cx d txt");
        this.sistema.ocultarCaixaDeDialogo();
        }

        if(this.roteiro[i].bgi){
          let bgi = this.roteiro[i].bgi;
          if(bgi)
          this.sistema?.mudarImagemDeFundo(bgi);
        }
        
        if(this.roteiro[i].bgm){
          let bgm = this.roteiro[i].bgm;
          if(bgm)
          this.sistema?.mudarMusica(bgm);
        }
        
        if(this.roteiro[i].som){
          let som = this.roteiro[i].som;
          if(som)
          this.sistema?.tocarSom(som);
        }
        
        // if('sprite' in roteiro[i] && roteiro[i].hasOwnProperty("posicaoSprite"))
        if(this.roteiro[i].sprite && this.roteiro[i].posicaoSprite){
          let spr = document.URL + this.roteiro[i].sprite?.toString();
          let n = this.roteiro[i].posicaoSprite;
          //let posSpr: number;
          if(n !== undefined){
            let posSpr = n;
          // sistema?.adicionarPersonagem(roteiro[i].sprite, roteiro[i].posicaoSprite);
          //if(spr && posSpr !== undefined)
            if(posSpr>=0)
            this.sistema?.adicionarPersonagem(spr, posSpr);
            else {
              this.sistema?.estado.personagensNaTela.map((pers: {src: string}, i: number)=>{
                // alert("i="+i+", pers="+pers?.src+", spr:"+spr);
                if(pers?.src == spr){
                  // alert("achou");
                  this.sistema?.removerPersonagem(i);
                }
              })
              // sistema?.removerPersonagem(-ps);
            }
          }
        }
        
        if(this.roteiro[i].espera){
          let n = this.roteiro[i].espera;
          if(n !== undefined){
            let ms = n;
            //sistema?.apagarMensagem();
            await new Promise((resolve) => setTimeout(() => resolve(""), ms));
            //ocupar(false);
          }
        }

        //if(roteiro[i].texto) {
        // let fala = roteiro[i].texto;
        // if(typeof roteiro[i].texto == "string")
        // if(typeof roteiro[i].texto !== "undefined"){
        if(this.roteiro[i].texto){
          let texto = this.roteiro[i].texto?.toString();
          if(texto)
            //sistema?.escreverMensagem(texto);
           Escritor.obterInstancia().escrever(texto);
        //}
        } else {
          this.sistema?.ocultarCaixaDeDialogo();
        }

        //desocupar();
        //ocupado.current = false;
        //console.log("executar: dps d desocupar");

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
        if(!this.roteiro[i].texto && !this.roteiro[i].esperaBotao){
          this.sistema?.proximoEvento();
        }

        //sistema?.desocuparSistema();

        //} else
        //  sistema?.ocultarCaixaDeDialogo();
      } else if(i >= this.roteiro.length) {
        //sistema?.ocultarCaixaDeDialogo();
        //sistema?.ocuparSistema();
        //console.log("ocupar problemático");
        this.ocupar();
      }
    }
  }
}

/*export default function Diretor() {
  const sistema = useContext(contexto);
  let roteiro: evento[];

  //configurações iniciais
  useEffect(()=>{
    //sistema?.ocuparSistema();
    console.log("ef diretor []");
    Escritor.obterInstancia().definirSistema(sistema);
  }, [])

  function ocupar() {
    sistema?.ocuparSistema();
    console.log("fun ocupar: dps d ocupar");
  }
  async function executar() {
    console.log("executar");
    let i: number;
    if(sistema?.estado.eventoAtual !== undefined) {
      i = sistema?.estado.eventoAtual;
      console.log("executar i="+i);
      //if(i !== undefined)
      if(i>=0 && roteiro[i]) {
        //if(i < roteiro.length) {
        console.log("executando");

        //sistema?.ocuparSistema();
        //let ocupado = true;
        ocupar();
        //ocupado.current = true;
        console.log("executar: dps d ocupar");

        if(!roteiro[i].texto){console.log("ocultando cx d txt");
          sistema.ocultarCaixaDeDialogo();
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
          let n = roteiro[i].posicaoSprite;
          //let posSpr: number;
          if(n !== undefined){
            let posSpr = n;
          // sistema?.adicionarPersonagem(roteiro[i].sprite, roteiro[i].posicaoSprite);
          //if(spr && posSpr !== undefined)
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
        }
        
        if(roteiro[i].espera){
          let n = roteiro[i].espera;
          if(n !== undefined){
            let ms = n;
            //sistema?.apagarMensagem();
            await new Promise((resolve) => setTimeout(() => resolve(""), ms));
            //ocupar(false);
          }
        }

        //if(roteiro[i].texto) {
        // let fala = roteiro[i].texto;
        // if(typeof roteiro[i].texto == "string")
        // if(typeof roteiro[i].texto !== "undefined"){
        if(roteiro[i].texto){
          let texto = roteiro[i].texto?.toString();
          if(texto)
            //sistema?.escreverMensagem(texto);
           Escritor.obterInstancia().escrever(texto);
        //}
        } else {
          sistema?.ocultarCaixaDeDialogo();
        }

        //desocupar();
        //ocupado.current = false;
        //console.log("executar: dps d desocupar");

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
        if(!roteiro[i].texto && !roteiro[i].esperaBotao){
          sistema?.proximoEvento();
        }

        //sistema?.desocuparSistema();

        //} else
        //  sistema?.ocultarCaixaDeDialogo();
      } else if(i >= roteiro.length) {
        //sistema?.ocultarCaixaDeDialogo();
        //sistema?.ocuparSistema();
        //console.log("ocupar problemático");
        ocupar();
      }
    }
  }
}*/