import { useContext, useEffect, useState } from "react";
import { roteiros } from "../roteiros/ListaDeRoteiros";
import { acoes } from "../sistema/Redutor";
import { contexto } from "../sistema/Contexto";

export default function EmJogo() {
  const sistema = useContext(contexto);
  const [roteiro, definirRoteiro] = useState(roteiros[0]);
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou emJogo");

  //configurações iniciais
  useEffect(()=>{
    if(sistema)
      definirRoteiro(roteiros[sistema?.estado.roteiroAtual]);
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef emJogo [], roteiroAtual="+sistema?.estado.roteiroAtual);
    sistema?.despachar({tipo: acoes.mudarEvento, numero1: 0});
  }, [])

  useEffect(()=>{
    if(sistema?.estado.arquivoSalvoPraCarregar?.roteiroAtual != undefined){
      if(sistema?.estado.msgsConsole.effects)
        console.log("ef emJogo salvo, carregando roteiro salvo="+sistema?.estado.arquivoSalvoPraCarregar.roteiroAtual);
      definirRoteiro(roteiros[sistema?.estado.arquivoSalvoPraCarregar.roteiroAtual]);
    }
  }, [sistema?.estado.arquivoSalvoPraCarregar])

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef emJogo evento, roteiroAtual="+sistema?.estado.roteiroAtual+", eventoAtual="+sistema?.estado.eventoAtual);
    executar();
  }, [sistema?.estado.eventoAtual])

  //execução do roteiro
  async function executar() {
    if(sistema?.estado.msgsConsole.roteiro)
      console.log("executar");
    if(sistema?.estado.eventoAtual == undefined)
      return;

    let i = sistema?.estado.eventoAtual;
    if(sistema?.estado.msgsConsole.roteiro)
      console.log("executar i="+i);
    if(i>=0 && roteiro && roteiro[i]){
      if(sistema?.estado.msgsConsole.roteiro)
        console.log("lendo roteiroAtual="+sistema.estado.roteiroAtual);

      //sem isso, ao executar 2 eventos de sprite, em algumas vezes só o 1o tava sendo executado
      if(!roteiro[i].esperarTempo){
        roteiro[i].esperarTempo = 1;
      }

      if(!roteiro[i].escreverMensagem){
        sistema?.despachar({tipo: acoes.escreverMensagem, string: ""});
      }

      if(roteiro[i].mudarCenario){
        if(sistema?.estado.msgsConsole.roteiro)
          console.log("mudando bgi="+roteiro[i].mudarCenario);
        let bgi = roteiro[i].mudarCenario;
        sistema?.despachar({tipo: acoes.mudarImagemDeFundo, endereco: bgi});
      }
      
      if(roteiro[i].removerCenario){
        sistema?.despachar({tipo: acoes.mudarImagemDeFundo, endereco: ""});
      }

      if(roteiro[i].mudarMusica){
        let bgm = roteiro[i].mudarMusica;
        if(sistema?.estado.msgsConsole.roteiro){
          if(typeof bgm == "string")
            console.log("mudando bgm="+bgm);
          else if(typeof bgm == "object")
            console.log("mudando bgm="+bgm.endereco);
        }
        let endereco = "";
        let volume = 100;
        if(typeof bgm == "string")
          endereco = bgm;
        else if(typeof bgm == "object"){
          endereco = bgm.endereco;
          if(bgm.volume)
            volume = bgm.volume;
        }
        sistema?.despachar({tipo: acoes.mudarMusica, endereco: endereco, numero1: volume});
      }

      if(roteiro[i].pararMusica){
        sistema?.despachar({tipo: acoes.mudarMusica, endereco: ""});
      }

      if(roteiro[i].tocarSom){
        let som = roteiro[i].tocarSom;
        if(sistema?.estado.msgsConsole.roteiro){
          if(typeof som == "string")
            console.log("tocando som="+som);
          else if(typeof som == "object")
            console.log("tocando som="+som.endereco);
        }
        let endereco = "";
        let volume = 100;
        if(typeof som == "string")
          endereco = som;
        else if(typeof som == "object"){
          endereco = som.endereco;
          if(som.volume)
            volume = som.volume;
        }
        sistema?.despachar({tipo: acoes.tocarSom, endereco: endereco, numero1: volume});
      }
      
      if(roteiro[i].adicionarPersonagem){
        if(sistema?.estado.msgsConsole.roteiro)
          console.log("adicionando sprite="+roteiro[i].adicionarPersonagem?.nome+"="+roteiro[i].adicionarPersonagem?.endereco+", "+roteiro[i].adicionarPersonagem?.posicao);
        let nome = roteiro[i].adicionarPersonagem?.nome;
        let endereco = roteiro[i].adicionarPersonagem?.endereco;
        let posicao = roteiro[i].adicionarPersonagem?.posicao;
        let posX = roteiro[i].adicionarPersonagem?.posX;
        let posY = roteiro[i].adicionarPersonagem?.posY;
        let espelhar = roteiro[i].adicionarPersonagem?.espelhar;
        sistema.despachar({tipo: acoes.adicionarPersonagem, nome: nome, endereco: endereco, string: posicao, numero1: posX, numero2: posY, opcao: espelhar});
      }
      
      if(roteiro[i].mudarSpritePersonagem){
        if(sistema?.estado.msgsConsole.roteiro)
          console.log("mudando sprite do personagem "+roteiro[i].mudarSpritePersonagem?.nome+" para "+roteiro[i].mudarSpritePersonagem?.endereco);
        let nome = roteiro[i].mudarSpritePersonagem?.nome;
        let endereco = roteiro[i].mudarSpritePersonagem?.endereco;
        let espelhar = roteiro[i].mudarSpritePersonagem?.espelhar;
        sistema.despachar({tipo: acoes.mudarSpritePersonagem, nome: nome, endereco: endereco, opcao: espelhar});
      }

      if(roteiro[i].moverPersonagem){
        if(sistema?.estado.msgsConsole.roteiro)
          console.log("movendo personagem "+roteiro[i].moverPersonagem?.nome+" para "+roteiro[i].moverPersonagem?.posicao+", espelhar="+roteiro[i].moverPersonagem?.espelhar);
        let nome = roteiro[i].moverPersonagem?.nome;
        let posicao = roteiro[i].moverPersonagem?.posicao;
        let espelhar = roteiro[i].moverPersonagem?.espelhar;
        let posX = roteiro[i].moverPersonagem?.posX;
        let posY = roteiro[i].moverPersonagem?.posY;
        sistema.despachar({tipo: acoes.moverPersonagem, nome: nome, string: posicao, numero1: posX, numero2: posY, opcao: espelhar});
      }
      
      if(roteiro[i].virarSpritePersonagem){
        let pers = roteiro[i].virarSpritePersonagem;
        if(sistema?.estado.msgsConsole.roteiro){
          if(typeof pers == "string")
            console.log("virando personagem="+pers);
          else if(typeof pers == "object")
            console.log("virando personagem="+pers.nome);
        }
        let nome = "";
        let espelhar: boolean | undefined;
        if(typeof pers == "string")
          nome = pers;
        else if(typeof pers == "object"){
          nome = pers.nome;
          espelhar = pers.espelhar;
        }
        sistema?.despachar({tipo: acoes.virarPersonagem, nome: nome, opcao: espelhar});
      }

      if(roteiro[i].removerPersonagem){
        if(sistema?.estado.msgsConsole.roteiro)
          console.log("removendo personagem "+roteiro[i].removerPersonagem);
        sistema.despachar({tipo: acoes.removerPersonagem, nome: roteiro[i].removerPersonagem});
      }

      if(roteiro[i].esperarTempo){
        if(sistema?.estado.msgsConsole.roteiro)
          console.log("esperando="+roteiro[i].esperarTempo+"ms");
        let n = roteiro[i].esperarTempo;
        if(n != undefined){
          let ms = n;
          await new Promise((resolve) => setTimeout(() => resolve(""), ms));
          if(sistema?.estado.msgsConsole.roteiro)
            console.log("terminou d esperar");
        }
      }

      if(roteiro[i].escreverMensagem){
        if(sistema?.estado.msgsConsole.roteiro)
          console.log("escrevendo="+roteiro[i].escreverMensagem);
        sistema?.despachar({tipo: acoes.escreverMensagem, string: roteiro[i].escreverMensagem});
      }
      if(roteiro[i].esperarInteracao){
        if(sistema?.estado.msgsConsole.roteiro)
          console.log("esperando interação");
        sistema?.despachar({tipo: acoes.aceitarInteracao, opcao: true});
      }
      
      if(!roteiro[i].escreverMensagem && !roteiro[i].esperarInteracao){
        if(sistema?.estado.msgsConsole.roteiro)
          console.log("evento "+sistema.estado.eventoAtual+"; avançando para o próximo");
        sistema.despachar({tipo: acoes.proximoEvento});
      }

    } else if(roteiro && i >= roteiro.length) {
      sistema?.despachar({tipo: acoes.escreverMensagem, string: ""});
      if(sistema?.estado.msgsConsole.roteiro)
        console.log("fim do roteiro");
    }
  }

  return (
    <></>
  )
}
