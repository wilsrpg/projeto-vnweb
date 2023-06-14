import { useContext, useEffect, useState } from "react";
import { roteiros } from "../roteiros/ListaDeRoteiros";
import { acoes } from "../sistema/Redutor";
import { contexto } from "../sistema/Contexto";
import Botao from "../interface/Botao";
import { alternativas, escolha } from "../sistema/TiposDeObjetos";

export default function EmJogo() {
  const sistema = useContext(contexto);
  const [roteiro, definirRoteiro] = useState(roteiros.capitulo1);
  const [grupoDeAlternativas, criarJanelaDeAlternativas] = useState<alternativas>();
  //const escolhasLocais = useRef<escolha[]>([]);
  //const marcadores = useRef<{nome: string, evento: number}[]>([]);
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou emJogo");

  //configurações iniciais
  useEffect(()=>{
    if(sistema)
      definirRoteiro(roteiros[sistema.estado.roteiroAtual as keyof typeof roteiros]);
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef emJogo [], roteiroAtual="+sistema.estado.roteiroAtual);
    sistema?.despachar({tipo: acoes.mudarEvento, numero1: 0});
    new Promise(r=>setTimeout(r,500))
    .then(()=>{
      sistema?.despachar({tipo: acoes.exibirPainelInferior, opcao: true});
    })

    return ()=>{
      const cxDialogo = document.getElementById("dialogo");
      if(cxDialogo instanceof HTMLPreElement)
        cxDialogo.style.display = "none";
      const controles = document.getElementById("controles");
      if(controles)
        sistema?.ocultarElemento(controles);
      new Promise(r=>setTimeout(r,500))
      .then(()=>{
        sistema?.despachar({tipo: acoes.exibirPainelInferior, opcao: false});
      })
    }
  }, [])

  useEffect(()=>{
    if(sistema?.estado.arquivoSalvoParaCarregar?.roteiroAtual != undefined){
      let roteiroAtual = sistema.estado.arquivoSalvoParaCarregar?.roteiroAtual;
      if(sistema.estado.msgsConsole.effects)
        console.log("ef emJogo salvo, carregando roteiro salvo="+roteiroAtual);
      definirRoteiro(roteiros[roteiroAtual as keyof typeof roteiros]);
      criarJanelaDeAlternativas(undefined);
    }
  }, [sistema?.estado.arquivoSalvoParaCarregar])

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef emJogo roteiroAtual="+sistema.estado.roteiroAtual);
    if(!sistema?.estado.arquivoSalvoParaCarregar)
      sistema?.despachar({tipo: acoes.mudarEvento, numero1: 0});
  }, [roteiro])

  //useEffect(()=>{
  //  if(sistema?.estado.msgsConsole.effects)
  //    console.log("ef emJogo roteiroAtual="+sistema.estado.roteiroAtual);
  //  definirRoteiro(roteiros[sistema?.estado.roteiroAtual as keyof typeof roteiros]);
  //  //sistema?.despachar({tipo: acoes.mudarEvento, numero1: 0});
  //}, [sistema?.estado.roteiroAtual])

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef emJogo evento, roteiroAtual="+sistema.estado.roteiroAtual+", eventoAtual="+sistema.estado.eventoAtual);
    executar();
  }, [sistema?.estado.eventoAtual])

  //execução do roteiro
  async function executar() {
    if(sistema?.estado.msgsConsole.roteiro)
      console.log("emjogo, executar");
    if(sistema?.estado.eventoAtual == undefined)
      return;

    let i = sistema.estado.eventoAtual;
    if(sistema.estado.msgsConsole.roteiro)
      console.log("emjogo, executar i="+i);
    if(i>=0 && roteiro[i]){
      if(sistema.estado.msgsConsole.roteiro)
        console.log("emjogo, lendo roteiroAtual="+sistema.estado.roteiroAtual);

      if(roteiro[i].marcador){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, definindo marcador="+roteiro[i].marcador+", para o evento="+i);
        //let nomeDoMarcador = roteiro[i].marcador;
        //if(nomeDoMarcador)
        //  marcadores.current.push({nome: nomeDoMarcador, evento: i});
      }

      if(roteiro[i].seEscolha){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, evento condicional: escolha="+roteiro[i].seEscolha?.nome+", valor="+roteiro[i].seEscolha?.valor);
        //evento condicional, só executa o resto do evento se o jogador tiver feito aquela escolha anteriormente
        //console.log("verificando escolhas");
        let achouEscolha: escolha | undefined;
        /*escolhasLocais.current.some((escolha,j)=>{
          //console.log("procurando escolha '"+roteiro[i].seEscolha?.nome+","+roteiro[i].seEscolha?.valor+"' nas escolhas locais="+j+" ("+escolha.nome+","+escolha.valor+")");
          if(escolha.nome == roteiro[i].seEscolha?.nome && escolha.valor == roteiro[i].seEscolha?.valor){
            //console.log("achou escolha local");
            achouEscolha = escolha;
          }
          return achouEscolha;
        })
        if(!achouEscolha)*/
          sistema.estado.escolhas.some((escolha,j)=>{
            //console.log("procurando escolha '"+roteiro[i].seEscolha?.nome+","+roteiro[i].seEscolha?.valor+"' nas escolhas salvas="+j+" ("+escolha.nome+","+escolha.valor+")");
            if(escolha.nome == roteiro[i].seEscolha?.nome && escolha.valor == roteiro[i].seEscolha?.valor){
              //console.log("achou escolha salva");
              achouEscolha = escolha;
            }
            return achouEscolha;
          })
        if(!achouEscolha){
          sistema.despachar({tipo: acoes.proximoEvento});
          return;
        }

        // if(!sistema.estado.escolhas.some((escolha,j)=>{
        //   //console.log("escolhas["+j+"]="+escolha.nome+","+escolha.valor);
        //   //console.log(escolha.nome == roteiro[i].seEscolha?.nome && escolha.valor == roteiro[i].seEscolha?.valor);
        //   return escolha == roteiro[i].seEscolha;
        //   return escolha.nome == roteiro[i].seEscolha?.nome && escolha.valor == roteiro[i].seEscolha?.valor;
        // })){
        //   sistema.despachar({tipo: acoes.proximoEvento});
        //   return;
        // }
      }
  
      if(roteiro[i].irParaMarcador){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, indo para marcador="+roteiro[i].irParaMarcador);
        //evento condicional, só executa o resto do evento se o jogador tiver feito aquela escolha anteriormente
        //console.log("verificando escolhas");
        let nomeDoMarcador = roteiro[i].irParaMarcador;
        let eventoDestino: number | undefined;
        //if(nomeDoMarcador)
        // marcadores.current.some((marcador)=>{
        //   if(marcador.nome == roteiro[i].irParaMarcador)
        //     eventoDestino = marcador.evento;
        //   return eventoDestino = marcador.evento;
        // })
        roteiro.some((evento,j)=>{
          //console.log("procurando marcador '"+nomeDoMarcador+"' no evento="+j+" ("+evento.marcador+")");
          if(evento.marcador == nomeDoMarcador){
            eventoDestino = j;
            //console.log("achou marcador '"+nomeDoMarcador+"' no evento "+j);
          }
          return eventoDestino == j;
        })
        if(eventoDestino != undefined){
          sistema.despachar({tipo: acoes.mudarEvento, numero1: eventoDestino});
          return;
        } else {
          alert("Na instrução irParaMarcador, marcador '"+nomeDoMarcador+"' não encontrado.");
          return;
        }
      }

      if(!roteiro[i].escreverMensagem && !roteiro[i].exibirAlternativas){ //se exibindo alternativas, não apaga a msg anterior
        sistema.despachar({tipo: acoes.escreverMensagem, string: ""});
      }

      if(roteiro[i].removerCenario){
        sistema.despachar({tipo: acoes.mudarImagemDeFundo, endereco: ""});
      }

      if(roteiro[i].mudarCenario){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, mudando bgi="+roteiro[i].mudarCenario);
        let bgi = roteiro[i].mudarCenario;
        sistema.despachar({tipo: acoes.mudarImagemDeFundo, endereco: bgi});
      }
      
      if(roteiro[i].pararMusica){
        sistema.despachar({tipo: acoes.tocarMusica, endereco: ""});
      }

      if(roteiro[i].tocarMusica){
        let bgm = roteiro[i].tocarMusica;
        if(sistema.estado.msgsConsole.roteiro){
          if(typeof bgm == "string")
            console.log("emjogo, mudando bgm="+bgm);
          else if(typeof bgm == "object")
            console.log("emjogo, mudando bgm="+bgm.endereco);
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
        sistema.despachar({tipo: acoes.tocarMusica, endereco: endereco, numero1: volume});
      }

      if(roteiro[i].tocarSom){
        let som = roteiro[i].tocarSom;
        if(sistema.estado.msgsConsole.roteiro){
          if(typeof som == "string")
            console.log("emjogo, tocando som="+som);
          else if(typeof som == "object")
            console.log("emjogo, tocando som="+som.endereco);
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
        sistema.despachar({tipo: acoes.tocarSom, endereco: endereco, numero1: volume});
      }
      
      if(roteiro[i].adicionarPersonagem){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, adicionando sprite="+roteiro[i].adicionarPersonagem?.nome+"="+roteiro[i].adicionarPersonagem?.endereco+", "+roteiro[i].adicionarPersonagem?.posicao);
        let nome = roteiro[i].adicionarPersonagem?.nome;
        let endereco = roteiro[i].adicionarPersonagem?.endereco;
        let posicao = roteiro[i].adicionarPersonagem?.posicao;
        let posX = roteiro[i].adicionarPersonagem?.posX;
        let posY = roteiro[i].adicionarPersonagem?.posY;
        let espelhar = roteiro[i].adicionarPersonagem?.espelhado;
        sistema.despachar({tipo: acoes.adicionarPersonagem, nome: nome, endereco: endereco, string: posicao, numero1: posX, numero2: posY, opcao: espelhar});
      }
      
      if(roteiro[i].mudarSpritePersonagem){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, mudando sprite do personagem "+roteiro[i].mudarSpritePersonagem?.nome+" para "+roteiro[i].mudarSpritePersonagem?.endereco);
        let nome = roteiro[i].mudarSpritePersonagem?.nome;
        let endereco = roteiro[i].mudarSpritePersonagem?.endereco;
        let espelhar = roteiro[i].mudarSpritePersonagem?.espelhado;
        sistema.despachar({tipo: acoes.mudarSpritePersonagem, nome: nome, endereco: endereco, opcao: espelhar});
      }

      if(roteiro[i].moverPersonagem){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, movendo personagem "+roteiro[i].moverPersonagem?.nome+" para "+roteiro[i].moverPersonagem?.posicao+", espelhar="+roteiro[i].moverPersonagem?.espelhado);
        let nome = roteiro[i].moverPersonagem?.nome;
        let posicao = roteiro[i].moverPersonagem?.posicao;
        let espelhar = roteiro[i].moverPersonagem?.espelhado;
        let posX = roteiro[i].moverPersonagem?.posX;
        let posY = roteiro[i].moverPersonagem?.posY;
        sistema.despachar({tipo: acoes.moverPersonagem, nome: nome, string: posicao, numero1: posX, numero2: posY, opcao: espelhar});
      }
      
      if(roteiro[i].virarSpritePersonagem){
        let pers = roteiro[i].virarSpritePersonagem;
        if(sistema.estado.msgsConsole.roteiro){
          if(typeof pers == "string")
            console.log("emjogo, virando personagem="+pers);
          else if(typeof pers == "object")
            console.log("emjogo, virando personagem="+pers.nome);
        }
        let nome = "";
        let espelhar: boolean | undefined;
        if(typeof pers == "string")
          nome = pers;
        else if(typeof pers == "object"){
          nome = pers.nome;
          espelhar = pers.espelhado;
        }
        sistema.despachar({tipo: acoes.virarPersonagem, nome: nome, opcao: espelhar});
      }

      if(roteiro[i].removerPersonagem){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, removendo personagem "+roteiro[i].removerPersonagem);
        sistema.despachar({tipo: acoes.removerPersonagem, nome: roteiro[i].removerPersonagem});
      }

      if(roteiro[i].esperarTempo){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, esperando="+roteiro[i].esperarTempo+"ms");
        let n = roteiro[i].esperarTempo;
        if(n != undefined){
          let ms = n;
          await new Promise(r=>setTimeout(r,ms));
          if(sistema.estado.msgsConsole.roteiro)
            console.log("emjogo, terminou d esperar");
        }
      }

      if(roteiro[i].esperarInteracao){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, esperando interação");
        sistema.despachar({tipo: acoes.aceitarInteracao, opcao: true});
      }

      if(roteiro[i].escreverMensagem){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, escrevendo="+roteiro[i].escreverMensagem);
        sistema.despachar({tipo: acoes.escreverMensagem, string: roteiro[i].escreverMensagem});
      }
      
      if(roteiro[i].exibirAlternativas){
        if(sistema.estado.msgsConsole.roteiro){
          let alternativas: string[] = [];
          roteiro[i].exibirAlternativas?.alternativas.map((alternativa)=>alternativas.push(alternativa.valor));
          console.log("emjogo, exibindo alternativas="+roteiro[i].exibirAlternativas?.nome+": "+alternativas.join());
        }
        criarJanelaDeAlternativas(roteiro[i].exibirAlternativas);
      }
      
      if(roteiro[i].mudarRoteiro){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, mudando roteiro para "+roteiro[i].mudarRoteiro);
        sistema.despachar({tipo: acoes.mudarRoteiro, string: roteiro[i].mudarRoteiro});
        definirRoteiro(roteiros[roteiro[i].mudarRoteiro as keyof typeof roteiros]);
        //sistema.estado.eventoAtual = -1; //se for por despache, o roteiro novo não atualiza a tempo e a execução começa no roteiro atual
        //sistema?.despachar({tipo: acoes.mudarEvento, numero1: -1});
      }

      if(!roteiro[i].escreverMensagem && !roteiro[i].esperarInteracao && !roteiro[i].mudarRoteiro
        && !roteiro[i].exibirAlternativas){
        if(sistema.estado.msgsConsole.roteiro)
          console.log("emjogo, evento "+sistema.estado.eventoAtual+" terminado; avançando para o próximo");
        sistema.despachar({tipo: acoes.proximoEvento});
      }

    } else if(roteiro && i >= roteiro.length) {
      sistema.despachar({tipo: acoes.escreverMensagem, string: ""});
      if(sistema.estado.msgsConsole.roteiro)
        console.log("emjogo, fim do roteiro");
    }
  }

  return (
    <>
    {grupoDeAlternativas &&
    //{()=>{
      //if(sistema?.estado.eventoAtual && roteiro[sistema?.estado.eventoAtual] && roteiro[sistema?.estado.eventoAtual].exibirAlternativas){
        //let alternativas = roteiro[sistema?.estado.eventoAtual].exibirAlternativas;
        //if(alternativas){
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "75%",
              display: "grid",
              placeItems: "center",
            }}>
            <div id="alternativas"
              style={{
                //position: "absolute",
                minWidth: "50%",
                minHeight: "20%",
                border: "solid 2px gray",
                backgroundColor: "black",
                padding: "1%",
                //display: "flex",
                //flexDirection: "column",
                display: "grid",
                placeItems: "center",
                //grid: "auto/max-content",
                //placeContent: "space-evenly center",
              }}
            >
              {grupoDeAlternativas.titulo &&
              <p style={{
                margin: "1%",
                color: sistema?.estado.corDaFonte,
                fontFamily: sistema?.estado.fonte,
                }}
              >
                {grupoDeAlternativas.titulo}
              </p>}
              {grupoDeAlternativas.alternativas.map((alternativa, i)=>
                <Botao key={i} nome={alternativa.texto}
                  style={{margin: "1%"}}
                  func={()=>{
                    let iEscolha: number | undefined;
                    /*if(!grupoDeAlternativas.guardar){
                      escolhasLocais.current.some((escolha,i)=>{
                        if(escolha.nome == grupoDeAlternativas.nome)
                          iEscolha = i;
                        return escolha.nome == grupoDeAlternativas.nome;
                      });
                      if(iEscolha != undefined)
                        escolhasLocais.current[iEscolha].valor = alternativa.valor;
                      else
                        escolhasLocais.current.push({nome: grupoDeAlternativas.nome, valor: alternativa.valor})
                      
                      //if(!escolhasLocais.current.some((escolha)=>{
                      //  if(escolha.nome == grupoDeAlternativas.nome)
                      //    escolha.valor = alternativa.valor;
                      //  return escolha.nome == grupoDeAlternativas.nome;
                      //}))
                      //  escolhasLocais.current.push({nome: grupoDeAlternativas.nome, valor: alternativa.valor})
                    } else */
                    if(sistema){
                      sistema.estado.escolhas.some((escolha,i)=>{
                        if(escolha.nome == grupoDeAlternativas.nome)
                          iEscolha = i;
                        return escolha.nome == grupoDeAlternativas.nome;
                      });
                      if(iEscolha != undefined)
                        sistema.estado.escolhas[iEscolha].valor = alternativa.valor;
                      else
                        sistema.estado.escolhas.push({nome: grupoDeAlternativas.nome, valor: alternativa.valor});
                    }
                    //console.log("escolhas.length="+sistema?.estado.escolhas.length+", escolha[0]="+sistema?.estado.escolhas[0].nome+","+sistema?.estado.escolhas[0].valor);
                    sistema?.despachar({tipo: acoes.proximoEvento});
                    criarJanelaDeAlternativas(undefined);
                  }}
                />
              )}
            </div>
          </div>
        //}
      //}
    //}
    }
    </>
  )
}
