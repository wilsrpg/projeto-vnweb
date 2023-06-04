import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
import { musicas } from "../mapeadores/Musicas";
import { sons } from "../mapeadores/Sons";
import { personagens } from "../mapeadores/Personagens";
import { evento } from "../sistema/TiposDeObjetos";
import { roteiros } from "./ListaDeRoteiros";

export let roteiro: evento[] = [
  {mudarCenario: imagensDeFundo.vilaDestruida, tocarMusica: musicas.teste, esperarTempo: 1000},
  {adicionarPersonagem: {nome: "irmão", endereco: personagens.irmao, posicao: "esquerda"}},
  {adicionarPersonagem: {nome: "protagonista", endereco: personagens.protagonista, posicao: "direita", espelhado: true}},
  {esperarTempo: 1000},
  {escreverMensagem: "Cleitão:\nEi, baitola."},
  {mudarSpritePersonagem: {nome: "protagonista", endereco: personagens.conceito_protagonista, espelhado: true}},
  {escreverMensagem: "Clebim:\nÉ o quê?!"},
  {escreverMensagem: "Cleitão:\nTu mermo, baitola."},
  {moverPersonagem: {nome: "protagonista", posicao: "meio"}},
  {escreverMensagem: "Clebim:\nOrsh!"},
  {mudarSpritePersonagem: {nome: "irmão", endereco: personagens.conceito_irmao}},
  {escreverMensagem: "Cleitão:\nOsh o quê?"},
  {moverPersonagem: {nome: "protagonista", espelhado: false}, esperarTempo: 600},
  {moverPersonagem: {nome: "protagonista", espelhado: true}, esperarTempo: 600},
  {moverPersonagem: {nome: "protagonista", espelhado: false}, esperarTempo: 600},
  {moverPersonagem: {nome: "protagonista", espelhado: true}, esperarTempo: 600},
  {tocarSom: sons.plem, escreverMensagem: "Clebim:\nComo cê percebeu que eu sou gay? ;)"},
  {removerPersonagem: "protagonista"},
  {removerPersonagem: "irmão"},
  {mudarRoteiro: "capitulo1"},
]
