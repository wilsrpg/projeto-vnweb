import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
import { musicas } from "../mapeadores/Musicas";
import { sons } from "../mapeadores/Sons";
import { personagens } from "../mapeadores/Personagens";
import { evento } from "../sistema/TiposDeObjetos";

export const roteiro: evento[] = [
  {mudarCenario: imagensDeFundo.vilaDestruida, tocarMusica: musicas.teste, esperarTempo: 1000},
  {adicionarPersonagem: {nome: "irmão", endereco: personagens.irmao, posicao: "esquerda"}},
  {adicionarPersonagem: {nome: "protagonista", endereco: personagens.protagonista, posicao: "direita", espelhado: true}},
  {esperarTempo: 1000},
  {escreverMensagem: "Cleitão:\nEi, baitola."},
  {exibirAlternativas: {nome: "reação ao xingamento", alternativas: [
    {texto: "Olhar para ver com quem a pessoa está falando", valor: "normal"},
    {texto: "Reagir agressivamente", valor: "agressivo"},
    {texto: "Ignorar", valor: "ignorou"}]}
  },
  {seEscolha: {nome: "reação ao xingamento", valor: "normal"}, virarSpritePersonagem: "protagonista"},
  //{seEscolha: {nome: "reação ao xingamento", valor: "normal"}, moverPersonagem: {nome: "protagonista", espelhado: false}},
  {seEscolha: {nome: "reação ao xingamento", valor: "normal"}, escreverMensagem: "Clebim:\nHum?"},
  {seEscolha: {nome: "reação ao xingamento", valor: "normal"}, escreverMensagem: "Cleitão:\nKkkkkkkkkkkk bicho é gay mermo."},
  {seEscolha: {nome: "reação ao xingamento", valor: "normal"}, mudarSpritePersonagem: {nome: "protagonista", endereco: personagens.conceito_protagonista, espelhado: true}, esperarTempo: 550},

  {seEscolha: {nome: "reação ao xingamento", valor: "agressivo"}, mudarSpritePersonagem: {nome: "protagonista", endereco: personagens.conceito_protagonista, espelhado: true}},
  {seEscolha: {nome: "reação ao xingamento", valor: "agressivo"}, escreverMensagem: "Clebim:\nÉ o quê?!"},
  {seEscolha: {nome: "reação ao xingamento", valor: "agressivo"}, escreverMensagem: "Cleitão:\nTu mermo, baitola."},

  {seEscolha: {nome: "reação ao xingamento", valor: "ignorou"}, escreverMensagem: "Clebim:\n..."},
  {seEscolha: {nome: "reação ao xingamento", valor: "ignorou"}, escreverMensagem: "Cleitão:\nAlém de viado, é mouco?"},
  {seEscolha: {nome: "reação ao xingamento", valor: "ignorou"}, mudarSpritePersonagem: {nome: "protagonista", endereco: personagens.conceito_protagonista, espelhado: true}, esperarTempo: 550},

  {moverPersonagem: {nome: "protagonista", posicao: "meio"}, esperarTempo: 500},
  {escreverMensagem: "Clebim:\nOrsh!"},
  {mudarSpritePersonagem: {nome: "irmão", endereco: personagens.conceito_irmao}},
  {escreverMensagem: "Cleitão:\nOsh o quê?"},
  {virarSpritePersonagem: "protagonista"},
  {escreverMensagem: "Clebim:\n(Vish, ele é maior que eu e tá armado! E agora?)"},
  {virarSpritePersonagem: "protagonista", esperarTempo: 550},
  {virarSpritePersonagem: "protagonista", esperarTempo: 550},
  {virarSpritePersonagem: "protagonista", esperarTempo: 550},
  {tocarSom: sons.plem, escreverMensagem: "Clebim:\nNuossa, como cê percebeu que eu sou gay? ;)"},
  {removerPersonagem: "protagonista"},
  {removerPersonagem: "irmão"},
  {mudarRoteiro: "capitulo1"},
]
