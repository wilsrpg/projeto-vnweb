import { createContext, Dispatch } from "react";

//variáveis do sistema
export interface IVariaveis {
  //sistemaOcupado: boolean,
  imagemDeFundo: string | undefined,
  musica: string | {endereco: string, volume: number} | undefined,
  musicas: object,
  sons: object,
  //audioHabilitado: boolean,
  cenaAtual: number,
  eventoAtual: number,
  // executandoCena: boolean,
  personagens: object,
  ultimoPersonagemAdicionado: {endereco: string, posicao: number, espelhado: boolean} | null,
  ultimoPersonagemRemovido: number | null,
  personagensNaTela: [HTMLImageElement | null],
  //exibindoCaixaDeDialogo: boolean,
  //soletrandoMensagem: boolean,
}
//funções para controlar as variáveis do sistema
export enum acoes {
  //ocuparSistema,
  //desocuparSistema,
  mudarImagemDeFundo,
  mudarMusica,
  //alternarAudio,
  mudarCena,
  mudarEvento,
  // executarCena,
  // pararCena,
  adicionarPersonagem,
  removerPersonagem,
  exibirOcultarCaixaDeDialogo,
  iniciarTerminarSoletracao,
};

export interface Acao {
  tipo: acoes,
  endereco: string,
  valor: number,
  opcao?: boolean
};

export enum lado {
  direito = 25,
  meio = 50,
  esquerdo = 75
};

interface Contexto {
  estado: IVariaveis,
  despachar: Dispatch<Acao>,
  //eventoAtual2: number,
  ocuparSistema: ()=>void,
  desocuparSistema: ()=>void,
  mudarImagemDeFundo: (endereco: string)=>void,
  mudarMusica: (endereco: string, volume?: number)=>void,
  mudarCena: (cena: number)=>void,
  tocarSom: (som: string, volume?: number)=>void,
  proximoEvento: ()=>void,
  irParaEvento: (cena: number)=>void,
  interagir: ()=>void,
  // executandoCena: boolean,
  adicionarPersonagem: (endereco: string, posicao: number | lado, espelhado?: boolean)=>void,
  removerPersonagem: (indice: number)=>void,
  removerTodosOsPersonagens: ()=>void,
  ocultarCaixaDeDialogo: ()=>Promise<void>,
  escreverMensagem: (texto: string)=>void,
  apagarMensagem: ()=>void,
}
export const contexto = createContext<Contexto | null>(null);

//interface ContextoAudio {
//  mudarMusica: (endereco: string)=>void,
//  tocarSom: (som: string)=>void,
//}
//export const contextoAudio = createContext<ContextoAudio | null>(null);
