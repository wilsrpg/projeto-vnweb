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

export interface personagem {
  nome: string,
  endereco: string,
  posicao?: string,
  posX: number,
  posY: number,
  espelhado: boolean,
}

export interface salvo {
  dataDeInicio: number,
  ultimaVezQueSalvou: number,
  roteiroAtual: number,
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

export interface evento {
  escreverMensagem?: string,
  adicionarPersonagem?: {nome: string, endereco: string, posicao?: string, posX?: number, posY?: number, espelhar?: boolean},
  mudarSpritePersonagem?: {nome: string, endereco: string, espelhar?: boolean},
  moverPersonagem?: {nome: string, posicao?: string, posX?: number, posY?: number, espelhar?: boolean},
  //virarSprite?: {nome: string, espelhar: boolean},
  removerPersonagem?: string,
  mudarCenario?: string,
  mudarMusica?: string | {endereco: string, volume?: number},
  tocarSom?: string | {endereco: string, volume?: number},
  esperarTempo?: number,
  esperarInteracao?: boolean,
}
