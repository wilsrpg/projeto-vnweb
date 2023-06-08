import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
import { musicas } from "../mapeadores/Musicas";
import { sons } from "../mapeadores/Sons";
import { personagens } from "../mapeadores/Personagens";
import { evento } from "../sistema/TiposDeObjetos";

export const roteiro: evento[] = [
  {mudarCenario: imagensDeFundo.vila, tocarMusica: musicas.titulo, esperarTempo: 2000},
  {adicionarPersonagem: {nome: "protagonista", endereco: personagens.protagonista, posicao: "meio", espelhado: true}, esperarTempo: 1000},
  {escreverMensagem: "Clebim:\nAh, que lindo dia na cidade de Townsville!"},
  {escreverMensagem: "Clebim:\nSeria uma pena se algo acont-"},
  {tocarSom: sons.plem, escreverMensagem: "KABOOOOOOOOOM!!!"},
  {mudarCenario: imagensDeFundo.vilaDestruida, tocarMusica: {endereco: musicas.teste, volume: 70}, esperarTempo: 2000},
  {escreverMensagem: "Clebim:\nMinha nossa! O que aconteceu? Está tudo destruído!"},
  {moverPersonagem: {nome: "protagonista", posicao: "esquerda", espelhado: false}},
  {escreverMensagem: "Clebim:\nSó gente morta caída ao chão! Quem poderia ter feito isso?"},
  {moverPersonagem: {nome: "protagonista", espelhado: true}},
  {adicionarPersonagem: {nome: "irmão", endereco: personagens.irmao, posicao: "direita"}, esperarTempo: 1000},
  {escreverMensagem: "Clebim:\nCleitão?! O que você está fazendo aqui?"},
  {moverPersonagem: {nome: "irmão", espelhado: true}},
  {escreverMensagem: "Cleitão:\nHum?"},
  {escreverMensagem: "Testando tamanhos de fonte, da caixa de diálogo e do histórico:"},
  {escreverMensagem: "1. 123456789- 123456789- 123456789- 123456789- 123456789- 123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789- 123456789- 123456789- 123456789- 123456789- 123456789-"},
  {escreverMensagem: "2. 123456789- 123456789- 123456789- 123456789- 123456789- 123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789- 123456789- 123456789- 123456789- 123456789- 123456789-"},
  {escreverMensagem: "3. 123456789- 123456789- 123456789- 123456789- 123456789- 123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789- 123456789- 123456789- 123456789- 123456789- 123456789-"},
  {escreverMensagem: "4. 123456789- 123456789- 123456789- 123456789- 123456789- 123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789- 123456789- 123456789- 123456789- 123456789- 123456789-"},
  {removerPersonagem: "irmão"},
  {removerPersonagem: "protagonista"},
  {tocarSom: {endereco: sons.plem, volume: 10}},
]
