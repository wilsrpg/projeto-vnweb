import { useContext, useEffect, useRef } from "react";
import { acoes, contexto } from "./Sistema";

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
    if(sistema?.estado.audioHabilitado){
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
    if(sistema?.estado.musicaAtual?.volume)
      volumeMusica = sistema.estado.musicaAtual.volume;
    if(audioElem.current && sistema)
      audioElem.current.volume = volumeMusica/100 * sistema.estado.volumeGeral/100;
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef audio volumeGeral; vol audio="+audioElem.current?.volume+", vol geral="+sistema?.estado.volumeGeral);
    }, [sistema?.estado.volumeGeral])

  useEffect(()=>{
    if(!audioElem.current || !sistema?.estado.musicaAtual || !sistema?.estado.musicaAtual.endereco)
      return;
    audioElem.current.src = sistema?.estado.musicaAtual.endereco;
    new Promise(resolve=>
      audioElem.current?.addEventListener("loadeddata", ()=>resolve("")))
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
    somAudio.current.volume = sistema?.estado.somParaTocar.volume/100 * sistema?.estado.volumeGeral/100;
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef audio som="+somAudio.current.src);
    somAudio.current.play();
    sistema.despachar({tipo: acoes.tocarSom, opcao: false}); //faz com q sistema.estado.somParaTocar = null
  }, [sistema?.estado.somParaTocar])

  return (
    <audio id="música" ref={audioElem} loop />
  )
}