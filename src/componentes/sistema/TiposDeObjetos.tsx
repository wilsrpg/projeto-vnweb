import { acoes } from "./Redutor";

export interface Acao {
  tipo: acoes,
  endereco?: string,
  nome?: string,
  numero1?: number,
  numero2?: number,
  string?: string,
  opcao?: boolean
};

export interface salvo {
  dataDeInicio: number,
  tempoDeJogo: number,
  ultimaVezQueSalvou: number,
  roteiroAtual: string,
  eventoAtual: number,
  imagemDeFundoAtual: string,
  audioHabilitado: boolean,
  volumeGeral: number,
  musicaAtual: {endereco: string, volume: number} | null,
  personagensNaTela: personagem[],
  mensagemParaEscrever: string,
  digitandoMensagem: boolean,
  historicoDeMensagens: string[],
  fonte: string,
  corDaFonte: string,
  velocidadeDoTexto: number,
}

class eventoEstrutura {
  escreverMensagem?: string;
  esperarTempo?: number;
  mudarCenario?: string; //| {endereco: string, tempo?: number};
  tocarMusica?: string | {endereco: string, volume?: number};
  tocarSom?: string | {endereco: string, volume?: number};
  adicionarPersonagem?: {nome: string, endereco: string, posicao?: string, posX?: number, posY?: number, espelhado?: boolean};
  mudarSpritePersonagem?: {nome: string, endereco: string, espelhado?: boolean};
  moverPersonagem?: {nome: string, posicao?: string, posX?: number, posY?: number, espelhado?: boolean};
  virarSpritePersonagem?: string | {nome: string, espelhado?: boolean};
  removerPersonagem?: string;
  removerCenario?: boolean;
  pararMusica?: boolean;
  esperarInteracao?: boolean;
  mudarRoteiro?: string;
}
class personagemEstrutura {
  nome: string = "";
  endereco: string = "";
  posicao?: string;
  posX: number = 0;
  posY: number = 0;
  espelhado: boolean = false;
}
class audioEstrutura {
  endereco: string = "";
  volume?: number;
}

export interface evento extends eventoEstrutura{};
export interface personagem extends personagemEstrutura{};
export interface audio extends audioEstrutura{};

export const propsEventos = Object.getOwnPropertyNames(new eventoEstrutura());
export const propsPersonagens = Object.getOwnPropertyNames(new personagemEstrutura());
export const propsAudios = Object.getOwnPropertyNames(new audioEstrutura());
