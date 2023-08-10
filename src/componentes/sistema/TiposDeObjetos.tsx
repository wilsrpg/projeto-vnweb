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
  escolhas: {nome: string, valor: string}[],
}

class eventoEstrutura {
  esperarTempo?: number;
  esperarInteracao?: boolean;
  removerCenario?: boolean;
  mudarCenario?: string; //| {endereco: string, tempo?: number};
  pararMusica?: boolean;
  tocarMusica?: string | audio;
  tocarSom?: string | audio;
  removerPersonagem?: string;
  adicionarPersonagem?: {nome: string, endereco: string, posicao?: string, posX?: number, posY?: number, espelhado?: boolean};
  mudarSpritePersonagem?: {nome: string, endereco: string, espelhado?: boolean};
  moverPersonagem?: {nome: string, posicao?: string, posX?: number, posY?: number, espelhado?: boolean};
  virarSpritePersonagem?: string | {nome: string, espelhado?: boolean};
  escreverMensagem?: string;
  marcador?: string;
  irParaMarcador?: string;
  exibirAlternativas?: alternativas;
  seEscolha?: escolha;
  mudarRoteiro?: string;
}
class personagemEstrutura {
  nome: string = "";
  endereco: string = "";
  posicao?: string;
  posX: number = 0;
  posY: number = 0;
  espelhado: boolean = false;
  sprite?: HTMLImageElement;
}
class audioEstrutura {
  endereco: string = "";
  volume?: number;
}
class alternativasEstrutura {
  nome: string = "";
  titulo?: string;
  alternativas: alternativa[] = [];
  //guardar?: boolean;
}
class alternativaEstrutura {
  texto: string = "";
  valor: string = "";
}
class escolhaEstrutura {
  nome: string = ""; //do grupo de alternativas
  valor: string = ""; //da alternativa
}

export interface evento extends eventoEstrutura{};
export interface personagem extends personagemEstrutura{};
export interface audio extends audioEstrutura{};
export interface alternativas extends alternativasEstrutura{};
export interface alternativa extends alternativaEstrutura{};
export interface escolha extends escolhaEstrutura{};

export const propsEventos = Object.getOwnPropertyNames(new eventoEstrutura());
export const propsPersonagens = Object.getOwnPropertyNames(new personagemEstrutura());
export const propsAudios = Object.getOwnPropertyNames(new audioEstrutura());
export const propsAlternativas = Object.getOwnPropertyNames(new alternativasEstrutura());
export const propsAlternativa = Object.getOwnPropertyNames(new alternativaEstrutura());
export const propsEscolhas = Object.getOwnPropertyNames(new escolhaEstrutura());
