// import bgiVila from "../../midias/bgi-vila.png";
// import bgmVila from "../../midias/bgm-titulo.ogg";
import bgiVilaDestruida from "../../midias/bgi-viladestruida.png";
import bgmIrmao from "../../midias/bgm-teste.ogg";
import { evento } from "../Diretor";
import { personagens } from "../mapeadores/Personagens";
import { sons } from "../mapeadores/Sons";
/*import roteiro from "./roteiroTeste.json";

let rot: evento[] = [];
roteiro.roteiro.map((e)=>{
  rot.push({});
  if(e.bgi) rot[rot.length-1].bgi = eval(e.bgi);
  if(e.bgm) rot[rot.length-1].bgm = eval(e.bgm);
  if(e.som) rot[rot.length-1].som = eval(e.som);
  if(e.sprite) rot[rot.length-1].sprite = eval(e.sprite);
});
// export const rotteste=roteiro.roteiro;
export const rotteste=rot;*/

export const roteiro1: evento[] = [
  {espera: 2000},
  {sprite: {endereco: personagens.irmao, posicao: 20}, espera: 1000},
  {texto: "Cleiton:\nAh, que lindo dia na cidade de Townsville!"},
  {texto: "Cleiton:\nSeria uma pena se algo acont-"},
  {som: sons.confirmar2, texto: "KABOOOOOOOOOM!!!"},
  {bgi: bgiVilaDestruida, bgm: bgmIrmao, espera: 2000},
  {texto: "Cleiton:\nMinha nossa! O que aconteceu? Está tudo destruído! :("},
  {texto: "Cleiton:\nSó gente morta caída ao chão! Quem poderia ter feito isso?"},
  {sprite: {endereco: personagens.protagonista, posicao: 60}, espera: 1000},
  {esperaBotao: true},
  {texto: "Cleiton:\nCléber?! O que você está fazendo aqui?"},
  {texto: "Cléber:\nHum?"},
  {sprite: {endereco: personagens.protagonista, posicao: -1}},
  {sprite: {endereco: personagens.irmao, posicao: -1}},
];
