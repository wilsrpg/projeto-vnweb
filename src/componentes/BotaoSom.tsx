import { useContext, useEffect, useRef, useState } from "react";
import { contexto } from "./Sistema";

//export default function BotaoDeMenu(props: { desc: string; func: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null; }) {
export default function BotaoSom() {
  const sistema = useContext(contexto);
  //const audioHabilitado = useRef(true);
  const [audioHab, alternAudio] = useState(true);
  const bgmRef = useRef<HTMLAudioElement>(null);
  const somAudio = new Audio();
  let volumeGeral = 0.5;
  
  //mudar a música de fundo (bgm)
  useEffect(()=>{
    if(!bgmRef.current || !sistema?.estado.musica)
      return;
    if(sistema.estado.musica instanceof Object){
      bgmRef.current.src = sistema?.estado.musica.endereco;
      bgmRef.current.volume = sistema?.estado.musica.volume;
    } else {
      bgmRef.current.src = sistema?.estado.musica;
      bgmRef.current.volume = 1;
    }
    bgmRef.current.volume *= volumeGeral;
    console.log("ef audio (música="+bgmRef.current.src+")");
    //if (sistema?.estado.audioHabilitado){
    //if (audioHabilitado.current){
    if (audioHab){
      //bgmRef.current.load();
      bgmRef.current.play();
    } else {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
  }, [sistema?.estado.musica, audioHab])

  function alternarAudio(e: React.MouseEvent) {
    //pra não passar as mensagens quando o som for desativado durante um diálogo
    e.stopPropagation();
    //audioHabilitado.current = !audioHabilitado.current;
    //console.log("audio: "+audioHabilitado.current);
    alternAudio(!audioHab);
    console.log("audio: "+audioHab);
  }
  
  function tocarSom(som: string){
    if (audioHab) {
      //if (audioHabilitado.current) {
      somAudio.src = som;
      somAudio.play();
    }
  }

  return (
  <>
    <audio ref={bgmRef} loop />
    <input
        id="botaoSom"
        type="button"
        value="♫"
        onClick={(e)=>{alternarAudio(e);}}
        style={{ position: "absolute", top: 0, right: 0 }}
      />
      </>
  )
}