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
  {exibirAlternativas: {nome: "teste", alternativas: [
    {texto: "Olhar para ver com quem a pessoa está falando", valor: "normal"},
    {texto: "Reagir agressivamente", valor: "agressivo"},
    {texto: "Ignorar", valor: "ignorou"}]}
  },
  //{seEscolha: {nome: "teste", valor: "normal"}, virarSpritePersonagem: {nome: "protagonista"}},
  {seEscolha: {nome: "teste", valor: "normal"}, moverPersonagem: {nome: "protagonista", espelhado: false}},
  {seEscolha: {nome: "teste", valor: "normal"}, escreverMensagem: "Clebim:\nHum?"},
  {seEscolha: {nome: "teste", valor: "normal"}, escreverMensagem: "Cleitão:\nAlém de viado, é mouco?"},
  {seEscolha: {nome: "teste", valor: "normal"}, mudarSpritePersonagem: {nome: "protagonista", endereco: personagens.conceito_protagonista, espelhado: true}, esperarTempo: 550},

  {seEscolha: {nome: "teste", valor: "agressivo"}, mudarSpritePersonagem: {nome: "protagonista", endereco: personagens.conceito_protagonista, espelhado: true}},
  {seEscolha: {nome: "teste", valor: "agressivo"}, escreverMensagem: "Clebim:\nÉ o quê?!"},
  {seEscolha: {nome: "teste", valor: "agressivo"}, escreverMensagem: "Cleitão:\nTu mermo, baitola."},

  {seEscolha: {nome: "teste", valor: "ignorou"}, escreverMensagem: "Clebim:\n..."},
  {seEscolha: {nome: "teste", valor: "ignorou"}, escreverMensagem: "Cleitão:\nAlém de viado, é mouco?"},
  {seEscolha: {nome: "teste", valor: "ignorou"}, mudarSpritePersonagem: {nome: "protagonista", endereco: personagens.conceito_protagonista, espelhado: true}, esperarTempo: 550},

  {moverPersonagem: {nome: "protagonista", posicao: "meio"}},
  {escreverMensagem: "Clebim:\nOrsh!"},
  {mudarSpritePersonagem: {nome: "irmão", endereco: personagens.conceito_irmao}},
  {escreverMensagem: "Cleitão:\nOsh o quê?"},
  {moverPersonagem: {nome: "protagonista", espelhado: false}, esperarTempo: 550},
  {moverPersonagem: {nome: "protagonista", espelhado: true}, esperarTempo: 550},
  {moverPersonagem: {nome: "protagonista", espelhado: false}, esperarTempo: 550},
  {moverPersonagem: {nome: "protagonista", espelhado: true}, esperarTempo: 550},
  {tocarSom: sons.plem, escreverMensagem: "Clebim:\nComo cê percebeu que eu sou gay? ;)"},
  {removerPersonagem: "protagonista"},
  {removerPersonagem: "irmão"},
  {mudarRoteiro: "capitulo1"},
]
