import { evento } from "../Sistema";
import bgiVila from "../../midias/bgi-vila.png";
import bgmVila from "../../midias/bgm-titulo.ogg";
import bgiVilaDestruida from "../../midias/bgi-viladestruida.png";
import bgmIrmao from "../../midias/bgm-teste.ogg";
import plem from "../../midias/som-confirmar2.ogg";
import protagonista from "../../midias/p1tiny.png";
import irmao from "../../midias/p2tiny.png";

export const roteiro: evento[] = [
  {mudarCenario: bgiVila, mudarMusica: bgmVila, esperarTempo: 2000},
  {adicionarPersonagem: {nome: "protagonista", endereco: protagonista, posicao: "meio", espelhar: true}, esperarTempo: 1000},
  {escreverMensagem: "Clebim:\nAh, que lindo dia na cidade de Townsville!"},
  {escreverMensagem: "Clebim:\nSeria uma pena se algo acont-"},
  {tocarSom: plem, escreverMensagem: "KABOOOOOOOOOM!!!"},
  {mudarCenario: bgiVilaDestruida, mudarMusica: {endereco: bgmIrmao, volume: 70}, esperarTempo: 2000},
  {escreverMensagem: "Clebim:\nMinha nossa! O que aconteceu? Está tudo destruído!"},
  {moverPersonagem: {nome: "protagonista", posicao: "esquerda", espelhar: false}},
  {escreverMensagem: "Clebim:\nSó gente morta caída ao chão! Quem poderia ter feito isso?"},
  {moverPersonagem: {nome: "protagonista", posicao: "esquerda", espelhar: true}},
  {adicionarPersonagem: {nome: "irmão", endereco: irmao, posicao: "direita"}, esperarTempo: 1000},
  // {esperarInteracao: true},
  {escreverMensagem: "Clebim:\nCleitão?! O que você está fazendo aqui?"},
  {moverPersonagem: {nome: "irmão", espelhar: true}},
  {escreverMensagem: "Cleitão:\nHum?"},
  {escreverMensagem: "Testando tamanhos de fonte, da caixa de diálogo e do histórico:"},
  {escreverMensagem: "1. 123456789- 123456789- 123456789- 123456789- 123456789- 123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789- 123456789- 123456789- 123456789- 123456789- 123456789-"},
  {escreverMensagem: "2. 123456789- 123456789- 123456789- 123456789- 123456789- 123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789- 123456789- 123456789- 123456789- 123456789- 123456789-"},
  {escreverMensagem: "3. 123456789- 123456789- 123456789- 123456789- 123456789- 123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789- 123456789- 123456789- 123456789- 123456789- 123456789-"},
  {escreverMensagem: "4. 123456789- 123456789- 123456789- 123456789- 123456789- 123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789- 123456789- 123456789- 123456789- 123456789- 123456789-"},
  {removerPersonagem: "irmão"},
  {removerPersonagem: "protagonista"},
  {tocarSom: {endereco: plem, volume: 10}},
]