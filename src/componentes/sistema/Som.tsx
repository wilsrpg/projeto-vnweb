import { useContext, useEffect, useRef } from "react";
import { contexto } from "./Contexto";
import { acoes } from "./Redutor";

export default function Som() {
  const sistema = useContext(contexto);
  const audioElem = useRef<HTMLAudioElement>(null);
  const somAudio = useRef<HTMLAudioElement>(new Audio);
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou reprodutor de áudio");

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef áudio []");
  }, [])

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef áudio habilitado="+sistema?.estado.audioHabilitado);
    if(sistema?.estado.audioHabilitado && sistema.estado.musicaAtual?.endereco){
      audioElem.current?.play();
    } else {
      somAudio.current.pause();
      if(audioElem.current){
        audioElem.current.pause();
        audioElem.current.currentTime = 0;
      }
    }
  }, [sistema?.estado.audioHabilitado])

  useEffect(()=>{
    let volumeMusica = 100;
    if(sistema?.estado.musicaAtual?.volume != undefined)
      volumeMusica = sistema.estado.musicaAtual.volume;
    if(audioElem.current && sistema)
      audioElem.current.volume = volumeMusica/100 * sistema.estado.volumeGeral/100;
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef audio volumeGeral; vol audio="+audioElem.current?.volume+", vol geral="+sistema?.estado.volumeGeral);
    }, [sistema?.estado.volumeGeral])

  useEffect(()=>{
    if(!audioElem.current)
      return;
    if(!sistema?.estado.musicaAtual || !sistema?.estado.musicaAtual.endereco){
      audioElem.current.pause();
      audioElem.current.currentTime = 0;
    }
    if(sistema?.estado.musicaAtual?.endereco != undefined)
      audioElem.current.src = sistema?.estado.musicaAtual?.endereco;
    new Promise(r=>audioElem.current?.addEventListener("loadeddata",r,{once: true}))
    .then(()=>{
      if(audioElem.current && sistema?.estado.musicaAtual){
        audioElem.current.volume = sistema?.estado.musicaAtual.volume/100 * sistema?.estado.volumeGeral/100;
        if(sistema?.estado.msgsConsole.effects)
          console.log("ef audio música="+audioElem.current.src);
        if (sistema?.estado.audioHabilitado){
          audioElem.current.play();
        } else {
          audioElem.current.pause();
          audioElem.current.currentTime = 0;
          somAudio.current.pause();
        }
      }
    })
  }, [sistema?.estado.musicaAtual])

  useEffect(()=>{
    if(!sistema?.estado.audioHabilitado || !sistema?.estado.somParaTocar || !sistema?.estado.somParaTocar.endereco)
      return;
    somAudio.current.src = sistema?.estado.somParaTocar.endereco;
    new Promise(r=>{
      somAudio.current.addEventListener("loadeddata",r,{once: true})
    })
    .then(()=>{
      if(sistema?.estado.msgsConsole.effects)
        console.log("ef audio som="+somAudio.current.src);
      if(sistema.estado.somParaTocar)
        somAudio.current.volume = sistema?.estado.somParaTocar.volume/100 * sistema?.estado.volumeGeral/100;
      somAudio.current.play();
      sistema.despachar({tipo: acoes.tocarSom, opcao: false}); //faz com q sistema.estado.somParaTocar = null
    //}).catch(()=>{
    //  sistema.despachar({tipo: acoes.tocarSom, opcao: false}); //faz com q sistema.estado.somParaTocar = null
    })
    //.catch(); //n tou sabendo tirar akela msg d erro dos dois sons da apresentação...
    //o.o sumiu, n sei como kk
  }, [sistema?.estado.somParaTocar])

  return (
    <audio id="música" ref={audioElem} loop />
  )
}
