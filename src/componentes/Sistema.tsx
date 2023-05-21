import { createContext, Dispatch } from "react";
// import { roteiros } from "./mapeadores/Roteiros";
// import { imagensDeFundo } from "./mapeadores/ImagensDeFundo";
// import { musicas } from "./mapeadores/Musicas";
// import { sons } from "./mapeadores/Sons";
// import { personagens } from "./mapeadores/Personagens";

let msgsConsoleGeral = false;

export const estadoInicial: iVariaveis = {
  msgsConsole: {
    renderizacoes: true && msgsConsoleGeral,
    redutor: true && msgsConsoleGeral,
    effects: true && msgsConsoleGeral,
    roteiro: true && msgsConsoleGeral,
    mouseTeclado: true && msgsConsoleGeral,
  },
  larguraTela: 640,
  alturaTela: 480,
  telaAtual: "apresentação",
  imagemDeFundoAtual: "",
  audioHabilitado: true,
  volumeGeral: 50,
  musicaAtual: null,
  somParaTocar: null,
  roteiroAtual: -1,
  eventoAtual: -1,
  jogoPausado: false,
  aceitandoInteracao: true,
  exibindoPainelInferior: false,
  personagensNaTelaImg: [],
  personagensNaTela: [],
  personagemParaAdicionar: null,
  personagemParaRemover: null,
  removendoTodosOsPersonagens: false,
  mensagemParaEscrever: "",
  digitandoMensagem: false,
  historicoDeMensagens: [],
  exibindoTelaDeOpcoes: false,
  exibindoTelaDoHistorico: false,
  fonte: "Times New Roman",
  corDaFonte: "#ffffff",
  arquivoSalvoPraCarregar: null,
  adicionandoPersonagensDoSalvo: false,
};

interface iVariaveis {
  msgsConsole: {
    renderizacoes: boolean,
    redutor: boolean,
    effects: boolean,
    roteiro: boolean,
    mouseTeclado: boolean,
  },
  larguraTela: number,
  alturaTela: number,
  telaAtual: string,
  roteiroAtual: number,
  eventoAtual: number,
  jogoPausado: boolean,
  aceitandoInteracao: boolean,
  imagemDeFundoAtual: string,
  audioHabilitado: boolean,
  volumeGeral: number,
  musicaAtual: {endereco: string, volume: number} | null,
  somParaTocar: {endereco: string, volume: number} | null,
  personagensNaTela: personagem[],
  personagensNaTelaImg: HTMLImageElement[],
  personagemParaAdicionar: personagem | null,
  personagemParaRemover: string | null,
  removendoTodosOsPersonagens: boolean,
  exibindoPainelInferior: boolean,
  mensagemParaEscrever: string,
  digitandoMensagem: boolean,
  historicoDeMensagens: string[],
  exibindoTelaDeOpcoes: boolean,
  exibindoTelaDoHistorico: boolean,
  fonte: string,
  corDaFonte: string,
  arquivoSalvoPraCarregar: salvo | null,
  adicionandoPersonagensDoSalvo: boolean,
}

export interface personagem {
  nome: string,
  endereco: string,
  posicao?: string,
  posX: number,
  posY: number,
  espelhado: boolean,
}

interface salvo {
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

interface Acao {
  tipo: acoes,
  endereco?: string,
  nome?: string,
  numero1?: number,
  numero2?: number,
  string?: string,
  opcao?: boolean
};

//funções para controlar as variáveis do sistema
export enum acoes {
  mudarTela = "mudarTela",
  mudarRoteiro = "mudarRoteiro",
  mudarEvento = "mudarEvento",
  proximoEvento = "proximoEvento",
  aceitarInteracao = "aceitarInteracao",
  pausarJogo = "pausarJogo",
  mudarImagemDeFundo = "mudarImagemDeFundo",
  alternarAudio = "alternarAudio",
  mudarVolume = "mudarVolume",
  mudarMusica = "mudarMusica",
  tocarSom = "tocarSom",
  adicionarPersonagem = "adicionarPersonagem",
  mudarSpritePersonagem = "mudarSprite",
  moverPersonagem = "moverPersonagem",
  removerPersonagem = "removerPersonagem",
  removerTodosOsPersonagens = "removerTodosOsPersonagens",
  exibirPainelInferior = "exibirPainelInferior",
  escreverMensagem = "escreverMensagem",
  digitarMensagem = "digitarMensagem",
  adicionarAoHistorico = "adicionarAoHistorico",
  limparHistorico = "limparHistorico",
  exibirTelaDoHistorico = "exibirTelaDoHistorico",
  exibirTelaDeOpcoes = "exibirTelaDeOpcoes",
  mudarFonte = "mudarFonte",
  mudarCorDaFonte = "mudarCorDaFonte",
  salvar = "salvar",
  carregar = "carregar",
  excluirSalvo = "excluirSalvo",
  adicionarPersonagensDoSalvo = "adicionarPersonagensDoSalvo",
};

//central de comando das funções do reducer; normalmente, cada comando atualiza
//uma variável que ativa um effect para executar as ações necessárias
export function redutor(estado: iVariaveis, acao: Acao) {
  if(estado.msgsConsole.redutor)
    console.log("[entrou redutor, ação="+acao.tipo+"]");
  switch (acao.tipo) {
    case acoes.mudarTela:
      return { ...estado, telaAtual: acao.string! };

      case acoes.mudarRoteiro:
        return { ...estado, roteiroAtual: acao.numero1! };

    case acoes.mudarEvento:
      return { ...estado, eventoAtual: acao.numero1! };
      
      case acoes.proximoEvento:
        return { ...estado, eventoAtual: estado.eventoAtual+1 };

    case acoes.aceitarInteracao:
      return { ...estado, aceitandoInteracao: acao.opcao! };
      
    case acoes.pausarJogo:
      return { ...estado, jogoPausado: acao.opcao! };
    
    case acoes.mudarImagemDeFundo:
      return { ...estado, imagemDeFundoAtual: acao.endereco! };

    case acoes.alternarAudio:
      return { ...estado, audioHabilitado: !estado.audioHabilitado };

    case acoes.mudarVolume:
      return { ...estado, volumeGeral: acao.numero1! };

    case acoes.mudarMusica:
      if(!acao.endereco)
        return { ...estado, musicaAtual: null };
      let volumeMusica = 100;
      if(acao.numero1 != undefined)
        volumeMusica = acao.numero1;
      return { ...estado, musicaAtual: {endereco: acao.endereco, volume: volumeMusica} };

    case acoes.tocarSom:
      if(!acao.endereco)
        return { ...estado, somParaTocar: null };
      let volumeSom = 100;
      if(acao.numero1 != undefined)
        volumeSom = acao.numero1;
      return { ...estado, somParaTocar: {endereco: acao.endereco, volume: volumeSom} };

    case acoes.adicionarPersonagem:
      if(!acao.nome || !acao.endereco || !acao.string && acao.numero1 == undefined)
        return { ...estado, personagemParaAdicionar: null };

      let posX = 0;
      if(acao.numero1 != undefined)
        posX = acao.numero1;
      //prioridade pra string
      if(acao.string == "esquerda")
        posX = estadoInicial.larguraTela*0.25;
      else if(acao.string == "meio")
        posX = estadoInicial.larguraTela*0.5;
      else if(acao.string == "direita")
        posX = estadoInicial.larguraTela*0.75;

      //let posY = estadoInicial.alturaTela;
      let posY = 0;
      if(acao.numero2 != undefined)
        posY = acao.numero2;
      
      let espelhar = false;
      if(acao.opcao)
        espelhar = true;

      const persAdi: personagem = {
        nome: acao.nome,
        endereco: acao.endereco,
        posicao: acao.string,
        posX: posX,
        posY: posY,
        espelhado: espelhar,
      };
      return { ...estado, personagemParaAdicionar: persAdi };

    case acoes.mudarSpritePersonagem:
      if(!acao.nome || !acao.endereco)
        return { ...estado };
      
      let persMud: personagem;
      let idMud = -1;
      estado.personagensNaTela.map((pers,i)=>{
        //console.log("redutor>mudarSpr>buscando id> pers["+i+"].nome="+pers.nome);
        if(acao.nome && pers.nome == acao.nome)
          idMud = i;
      })
      //console.log("mudando sprite do personagem "+acao.nome+", id="+idMud);
      //console.log("nome="+estado.personagensNaTela[idMud].nome);
      persMud = estado.personagensNaTela[idMud];
      persMud.endereco = acao.endereco;
      if(acao.opcao != undefined)
        persMud.espelhado = acao.opcao;
      return { ...estado, personagemParaRemover: persMud.nome, personagemParaAdicionar: persMud };

    case acoes.moverPersonagem:
      if(!acao.nome || !acao.string && acao.numero1 == undefined && acao.opcao == undefined)
        return { ...estado };
      
      let persMov: personagem;
      let idMov = -1;
      estado.personagensNaTela.map((pers,i)=>{
        //console.log("redutor>moverSpr>buscando id> pers["+i+"].nome="+pers.nome);
        if(acao.nome && pers.nome == acao.nome)
          idMov = i;
      })
      //console.log("movendo pers "+acao.nome+", id="+idMov);
      //console.log("nome="+estado.personagensNaTela[idMov].nome);
      persMov = estado.personagensNaTela[idMov];

      if(acao.numero1 != undefined)
        persMov.posX = acao.numero1;
      //prioridade pra string
      if(acao.string == "esquerda" || acao.string == "meio" || acao.string == "direita")
        persMov.posicao = acao.string;
      if(acao.string == "esquerda")
        persMov.posX = estadoInicial.larguraTela*0.25;
      else if(acao.string == "meio")
        persMov.posX = estadoInicial.larguraTela*0.5;
      else if(acao.string == "direita")
        persMov.posX = estadoInicial.larguraTela*0.75;

      if(acao.numero2 != undefined)
        persMov.posY = acao.numero2;
      
      if(acao.opcao != undefined)
        persMov.espelhado = acao.opcao;
      
      return { ...estado, personagemParaRemover: persMov.nome, personagemParaAdicionar: persMov };

    case acoes.removerPersonagem:
      if(!acao.nome)
        return { ...estado, personagemParaRemover: null };
      return { ...estado, personagemParaRemover: acao.nome };

    case acoes.removerTodosOsPersonagens:
      if(acao.opcao == undefined)
        return { ...estado, removendoTodosOsPersonagens: true };
      else
        return { ...estado, removendoTodosOsPersonagens: acao.opcao };

    case acoes.exibirPainelInferior:
      return { ...estado, exibindoPainelInferior: acao.opcao! };

    case acoes.escreverMensagem:
      return { ...estado, mensagemParaEscrever: acao.string! };

    case acoes.digitarMensagem:
      return { ...estado, digitandoMensagem: acao.opcao! };

    case acoes.adicionarAoHistorico:
      let qqtemaver = acao.string!;
      return { ...estado, historicoDeMensagens: [ ...estado.historicoDeMensagens, qqtemaver ] };

    case acoes.limparHistorico:
      return { ...estado, historicoDeMensagens: [] };
    
    case acoes.exibirTelaDoHistorico:
      return { ...estado, exibindoTelaDoHistorico: acao.opcao! };
  
    case acoes.exibirTelaDeOpcoes:
      return { ...estado, exibindoTelaDeOpcoes: acao.opcao! };

    case acoes.mudarFonte:
      return { ...estado, fonte: acao.string! };
  
    case acoes.mudarCorDaFonte:
      return { ...estado, corDaFonte: acao.string! };
    
    case acoes.salvar:
      let arquivo: salvo = {
        roteiroAtual: estado.roteiroAtual,
        eventoAtual: estado.eventoAtual,
        imagemDeFundoAtual: estado.imagemDeFundoAtual,
        audioHabilitado: estado.audioHabilitado,
        volumeGeral: estado.volumeGeral,
        musicaAtual: estado.musicaAtual,
        personagensNaTela: estado.personagensNaTela,
        mensagemParaEscrever: estado.mensagemParaEscrever,
        digitandoMensagem: estado.digitandoMensagem,
        historicoDeMensagens: estado.historicoDeMensagens,
        fonte: estado.fonte,
        corDaFonte: estado.corDaFonte,
      };
      localStorage.salvo = JSON.stringify(arquivo);
      //console.log(JSON.parse(localStorage.salvo));
      alert("O jogo foi salvo com sucesso.");
      return { ...estado };
      
    case acoes.carregar:
      if(acao.opcao == false)
        return { ...estado, arquivoSalvoPraCarregar: null }
      if (localStorage.length == 0){
        alert("Não há jogo salvo.");
        return { ...estado };
      } else {
        //console.log(JSON.parse(localStorage.salvo));
        return { ...estado, mensagemParaEscrever: "", arquivoSalvoPraCarregar: JSON.parse(localStorage.salvo) };
      }
  
    case acoes.excluirSalvo:
      localStorage.removeItem("salvo");
      alert("O jogo foi excluído com sucesso.");
      //console.log(localStorage);
      return { ...estado };
  
    case acoes.adicionarPersonagensDoSalvo:
      let op = false;
      if(acao.opcao)
        op = acao.opcao;
      return { ...estado, adicionandoPersonagensDoSalvo: op };
        
    default:
      // throw new Error("Opção '"+acao.tipo+"' não existe no redutor.\n");
      alert("Opção '"+acao.tipo+"' não existe no redutor.\n");
      return { ...estado };
  }
}

interface iContexto {
  estado: iVariaveis,
  despachar: Dispatch<Acao>,
  exibirElemento(elem: HTMLElement, tempo?: number, opacFinal?: number): Promise<Animation>,
  ocultarElemento(elem: HTMLElement, tempo?: number): Promise<Animation>,
  voltarParaTelaInicial(): void,
}

export const contexto = createContext<iContexto | null>(null);
