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

class audioEstrutura {
  endereco: string = "";
  volume?: number;
}
export interface personagem extends personagemEstrutura{};

class personagemEstrutura {
  nome: string = "";
  endereco: string = "";
  posicao?: string;
  posX: number = 0;
  posY: number = 0;
  espelhado: boolean = false;
}
export interface personagem extends personagemEstrutura{};

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
}
export interface evento extends eventoEstrutura{};

//type arrayDaEstruturaDosEventos = Array<keyof evento>;
//const arrayDasPropriedadesDosEventos: arrayDaEstruturaDosEventos =
//    Object.keys(new eventoEstrutura()) as arrayDaEstruturaDosEventos;
//type arrayDaEstruturaDosPersonagens = Array<keyof personagem>;
//const arrayDasPropriedadesDosPersonagens: arrayDaEstruturaDosPersonagens =
//    Object.keys(new personagemEstrutura()) as arrayDaEstruturaDosPersonagens;

export const propsEventos = Object.getOwnPropertyNames(new eventoEstrutura());
export const propsPersonagens = Object.getOwnPropertyNames(new personagemEstrutura());
export const propsAudios = Object.getOwnPropertyNames(new audioEstrutura());

export const propriedadesDosEventos = propsEventos.concat(propsPersonagens,propsAudios);

/*export interface evento {
  escreverMensagem?: string,
  adicionarPersonagem?: {nome: string, endereco: string, posicao?: string, posX?: number, posY?: number, espelhar?: boolean},
  mudarSpritePersonagem?: {nome: string, endereco: string, espelhar?: boolean},
  moverPersonagem?: {nome: string, posicao?: string, posX?: number, posY?: number, espelhar?: boolean},
  virarSpritePersonagem?: string | {nome: string, espelhar?: boolean},
  removerPersonagem?: string,
  mudarCenario?: string, //| {endereco: string, tempo?: number},
  removerCenario?: boolean,
  tocarMusica?: string | {endereco: string, volume?: number},
  pararMusica?: boolean,
  tocarSom?: string | {endereco: string, volume?: number},
  esperarTempo?: number,
  esperarInteracao?: boolean,
}*/
