// import bgiVila from "../../midias/bgi-vila.png";
// import bgmVila from "../../midias/bgm-titulo.ogg";
import bgiVilaDestruida from "../../midias/bgi-viladestruida.png";
import bgmIrmao from "../../midias/bgm-teste.ogg";
import { evento } from "../Diretor";
import { personagens } from "../mapeadores/Personagens";
import { sons } from "../mapeadores/Sons";

export const roteiro1: evento[] = [
  {espera: 2000},
  {sprite: personagens.irmao, posicaoSprite: 20, espera: 1000},
  {texto: "Cleiton:\nAh, que lindo dia na cidade de Townsville!"},
  {texto: "Cleiton:\nSeria uma pena se algo acont-"},
  {som: sons.confirmar2, texto: "KABOOOOOOOOOM!!!"},
  {bgi: bgiVilaDestruida, bgm: bgmIrmao, espera: 2000},
  {texto: "Cleiton:\nMinha nossa! O que aconteceu? Está tudo destruído! :("},
  {texto: "Cleiton:\nSó gente morta caída ao chão! Quem poderia ter feito isso?"},
  {sprite: personagens.protagonista, posicaoSprite: 60, espera: 1000},
  {texto: "Cleiton:\nCléber?! O que você está fazendo aqui?"},
  {texto: "Cléber:\nHum?"},
  {sprite: personagens.protagonista, posicaoSprite: -1, espera: 1},
  {sprite: personagens.irmao, posicaoSprite: -1, espera: 1},
];
