import { personagens } from "./Personagens";
// import bgiVila from "../arquivos/bgi-vila.png";
// import bgmVila from "../arquivos/bgm-titulo.ogg";
import bgiVilaDestruida from "../arquivos/bgi-viladestruida.png";
import bgmIrmao from "../arquivos/bgm-teste.ogg";
import { sons } from "./Sons";

type evento = {
  texto?: string,
  sprite?: string,
  posicaoSprite?: number,
  espera?: number,
  esperaEPassa?: number,
  bgi?: string,
  bgm?: string,
  som?: string,
}

export const roteiro: evento[] = [
  {esperaEPassa: 2000},
  {sprite: personagens.irmao, posicaoSprite: 20, esperaEPassa: 1000},
  {texto: "Cleiton:\nAh, que lindo dia na cidade de Townsville!"},
  {texto: "Cleiton:\nSeria uma pena se algo acont-"},
  {som: sons.confirmar2, texto: "KABOOOOOOOOOM!!!", esperaEPassa: 2000},
  {bgi: bgiVilaDestruida, bgm: bgmIrmao, esperaEPassa: 2000},
  {texto: "Cleiton:\nMinha nossa! O que aconteceu? Está tudo destruído! :("},
  {texto: "Cleiton:\nQuanta gente morta! Quem poderia ter feito isso?"},
  {sprite: personagens.protagonista, posicaoSprite: 60, esperaEPassa: 1000},
  {texto: "Cleiton:\nCléber?! O que você está fazendo aqui?"},
  {texto: "Cléber:\nHum?"},
];
