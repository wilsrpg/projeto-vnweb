import bgiVila from "../../midias/bgi-vila.png";
import bgmVila from "../../midias/bgm-titulo.ogg";
import bgiVilaDestruida from "../../midias/bgi-viladestruida.png";
import bgmIrmao from "../../midias/bgm-teste.ogg";
import plim from "../../midias/som-confirmar2.ogg";
import protagonista from "../../midias/p1tiny.png";
import irmao from "../../midias/p2tiny.png";
import { lado } from "../Sistema";

export const roteiroTeste = [
  {bgi: bgiVila, bgm: bgmVila, espera: 2000},
  {sprite: {endereco: protagonista, posicao: lado.meio, espelhado: true}, espera: 1000},
  {texto: "Cleiton:\nAh, que lindo dia na cidade de Townsville!"},
  {texto: "Cleiton:\nSeria uma pena se algo acont-"},
  {som: plim, texto: "KABOOOOOOOOOM!!!"},
  {bgi: bgiVilaDestruida, bgm: bgmIrmao, espera: 2000},
  {texto: "Cleiton:\nMinha nossa! O que aconteceu? Está tudo destruído! :("},
  {sprite: {endereco: protagonista, posicao: -1}},
  {sprite: {endereco: protagonista, posicao: lado.direito}},
  {texto: "Cleiton:\nSó gente morta caída ao chão! Quem poderia ter feito isso?"},
  {sprite: {endereco: protagonista, posicao: -1}},
  {sprite: {endereco: protagonista, posicao: lado.direito, espelhado: true}},
  {sprite: {endereco: irmao, posicao: lado.esquerdo}, espera: 1000},
  {esperaBotao: true},
  {texto: "Cleiton:\nCléber?! O que você está fazendo aqui?"},
  {sprite: {endereco: irmao, posicao: -1}},
  {texto: "Cléber:\nHum?", sprite: {endereco: irmao, posicao: lado.esquerdo, espelhado: true}},
  {sprite: {endereco: protagonista, posicao: -1}},
  {sprite: {endereco: irmao, posicao: -1}},
]