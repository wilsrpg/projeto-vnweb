import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
import { musicas } from "../mapeadores/Musicas";
import { sons } from "../mapeadores/Sons";
import { personagens } from "../mapeadores/Personagens";
import { evento } from "../sistema/TiposDeObjetos";

export let roteiro: evento[] = [
  {mudarCenario: imagensDeFundo.vilaDestruida, mudarMusica: musicas.teste, esperarTempo: 1000},
  {adicionarPersonagem: {nome: "irmão", endereco: personagens.irmao, posicao: "esquerda"}},
  {adicionarPersonagem: {nome: "protagonista", endereco: personagens.protagonista, posicao: "direita", espelhar: true}},
  {esperarTempo: 1000},
  {escreverMensagem: "Cleitão:\nEi, baitola."},
  {mudarSpritePersonagem: {nome: "protagonista", endereco: personagens.conceito_protagonista, espelhar: true}},
  {escreverMensagem: "Clebim:\nÉ o quê?!"},
  {escreverMensagem: "Cleitão:\nTu mermo, baitola."},
  {moverPersonagem: {nome: "protagonista", posicao: "meio"}},
  {escreverMensagem: "Clebim:\nOrsh!"},
  {mudarSpritePersonagem: {nome: "irmão", endereco: personagens.conceito_irmao}},
  {escreverMensagem: "Cleitão:\nOsh o quê?"},
  {moverPersonagem: {nome: "protagonista", espelhar: false}, esperarTempo: 600},
  {moverPersonagem: {nome: "protagonista", espelhar: true}, esperarTempo: 600},
  {moverPersonagem: {nome: "protagonista", espelhar: false}, esperarTempo: 600},
  {moverPersonagem: {nome: "protagonista", espelhar: true}, esperarTempo: 600},
  {tocarSom: sons.plem, escreverMensagem: "Clebim:\nComo cê percebeu que eu sou gay? ;)"},
  {removerPersonagem: "protagonista"},
  {removerPersonagem: "irmão"},
]
