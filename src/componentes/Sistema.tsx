import { createContext, Dispatch } from "react";

//variáveis do sistema
export interface IVariaveis {
  imagemDeFundo: string | undefined,
  musica: string | undefined,
  musicas: object,
  sons: object,
  audioHabilitado: boolean,
  cenaAtual: number,
  eventoAtual: number,
  personagens: object,
  ultimoPersonagemAdicionado: { endereco: string, posicao: number },
  ultimoPersonagemRemovido: number | null,
  personagensNaTela: [HTMLImageElement | null],
  //exibindoCaixaDeDialogo: boolean,
  //soletrandoMensagem: boolean,
}
//funções para controlar as variáveis do sistema
export enum acoes {
  mudarImagemDeFundo,
  mudarMusica,
  alternarAudio,
  mudarCena,
  mudarEvento,
  adicionarPersonagem,
  removerPersonagem,
  exibirOcultarCaixaDeDialogo,
  iniciarTerminarSoletracao,
};

export interface Acao {
  tipo: acoes,
  endereco: string,
  valor: number
};
interface Contexto {
  estado: IVariaveis,
  despachar: Dispatch<Acao>,
  mudarImagemDeFundo: (endereco: string)=>void,
  mudarMusica: (endereco: string)=>void,
  mudarCena: (cena: number)=>void,
  tocarSom: (som: string)=>void,
  proximoEvento: ()=>void,
  irParaEvento: (cena: number)=>void,
  adicionarPersonagem: (endereco: string, posicao: number)=>void,
  removerPersonagem: (indice: number)=>void,
  removerTodosOsPersonagens: ()=>void,
  ocultarCaixaDeDialogo: ()=>Promise<void>,
  escreverMensagem: (texto: string)=>void,
  //passarMensagem: ()=>void,
  passarMensagem: ()=>void,
  apagarMensagem: ()=>void,
}

export const contexto = createContext<Contexto | null>(null);
