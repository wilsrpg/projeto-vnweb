import { evento } from "../Sistema";
import bgiVilaDestruida from "../../midias/bgi-viladestruida.png";
import bgmIrmao from "../../midias/bgm-teste.ogg";
import protagonista from "../../midias/p1tiny.png";
import irmao from "../../midias/p2tiny.png";
import protagonista2 from "../../midias/conceito-MCtiny.png";
import irmao2 from "../../midias/conceito-Villaintiny.png";

export const roteiro: evento[] = [
  {mudarCenario: bgiVilaDestruida, mudarMusica: bgmIrmao, esperarTempo: 1000},
  {adicionarPersonagem: {nome: "irmão", endereco: irmao, posicao: "esquerda"}},
  {adicionarPersonagem: {nome: "protagonista", endereco: protagonista, posicao: "direita", espelhar: true}},
  {esperarTempo: 1000},
  {escreverMensagem: "Cleitão:\nEi, baitola."},
  {mudarSpritePersonagem: {nome: "protagonista", endereco: protagonista2, espelhar: true}},
  {escreverMensagem: "Clebim:\nÉ o quê?!"},
  {escreverMensagem: "Cleitão:\nTu mermo, baitola."},
  {moverPersonagem: {nome: "protagonista", posicao: "meio"}},
  {escreverMensagem: "Clebim:\nOrsh!"},
  {mudarSpritePersonagem: {nome: "irmão", endereco: irmao2}},
  {escreverMensagem: "Cleitão:\nOsh o quê?"},
  {moverPersonagem: {nome: "protagonista", espelhar: false}, esperarTempo: 600},
  {moverPersonagem: {nome: "protagonista", espelhar: true}, esperarTempo: 600},
  {moverPersonagem: {nome: "protagonista", espelhar: false}, esperarTempo: 600},
  {moverPersonagem: {nome: "protagonista", espelhar: true}, esperarTempo: 600},
  {escreverMensagem: "Clebim:\nComo cê percebeu que eu sou gay? ;)"},
  {removerPersonagem: "protagonista"},
  {removerPersonagem: "irmão"},
]