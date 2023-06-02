import { useContext } from "react"
import { contexto, estadoInicial } from "../sistema/Contexto";
import { acoes } from "../sistema/Redutor";
import Botao from "../interface/Botao";
import SeletorDeFonte from "../interface/SeletorDeFonte";

export default function TelaDeOpcoes(){
  const sistema = useContext(contexto);
  const fontePadrao = estadoInicial.fonte;
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou tela de opções");

  function redefinir() {
    let corDaFonte = document.getElementById("cor da fonte");
    let fonteP = document.getElementById(fontePadrao);
    let velDaFonte = document.getElementById("velocidade normal");
    if(fonteP instanceof HTMLInputElement)
      fonteP.checked = true;
    if(corDaFonte instanceof HTMLInputElement)
      corDaFonte.value = estadoInicial.corDaFonte;
    if(velDaFonte instanceof HTMLInputElement)
      velDaFonte.checked = true;
    sistema?.despachar({tipo: acoes.mudarFonte, string: estadoInicial.fonte});
    sistema?.despachar({tipo: acoes.mudarCorDaFonte, string: estadoInicial.corDaFonte});
    sistema?.despachar({tipo: acoes.mudarVelocidadeDoTexto, numero1: estadoInicial.velocidadeDoTexto})
  }
  
  return (
    <div id="tela de opções"
      style={{
        backgroundColor: "darkslategray",
        position: "absolute",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: "5%",
        display: "flex",
        justifyContent: "center",
        fontFamily: sistema?.estado.fonte,
        color: sistema?.estado.corDaFonte,
      }}
    >
      <div id="quadro de opções"
        style={{
          width: "40%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div id="opções"
          style={{
            height: "100%",
            display: "grid",
            grid: "auto/100%",
            placeContent: "start center",
          }}
        >
          <div>
            <span style={{marginRight: "0.5em"}}>Som:</span>
            <input type="button"
              value={sistema?.estado.audioHabilitado ? "Desabilitar" : "Habilitar"}
              onClick={()=>sistema?.despachar({tipo: acoes.alternarAudio})}
            />
          </div>

          <span>Volume: {sistema?.estado.volumeGeral}</span>
          <input type="range"
            id="volume"
            min="0" max="100"
            defaultValue={sistema?.estado.volumeGeral}
            onChange={(e)=>sistema?.despachar({tipo: acoes.mudarVolume, numero1: parseInt(e.target.value)})}
          />
          
          <span>Estilo do texto:</span>
          <SeletorDeFonte fontes={[fontePadrao, "Arial Narrow", "Verdana", "Tahoma"]}/>

          <div><span style={{verticalAlign: "super", marginRight: "0.5em"}}>Cor da fonte:</span>
          <input type="color"
            id="cor da fonte"
            style={{width: "2em"}}
            defaultValue={sistema?.estado.corDaFonte}
            onChange={(e)=>sistema?.despachar({tipo: acoes.mudarCorDaFonte, string: e.target.value})}
          />
          </div>

          <span>Velocidade do texto:</span>
          <div id="velocidade do texto">
            <input type="radio" id="velocidade lenta" name="velocidade do texto" value="3"
              defaultChecked={sistema?.estado.velocidadeDoTexto == 3}
              onChange={(e)=>sistema?.despachar({tipo: acoes.mudarVelocidadeDoTexto, numero1: parseInt(e.currentTarget.value)})}
            />
            <label htmlFor="velocidade lenta" style={{fontFamily: sistema?.estado.fonte, color: sistema?.estado.corDaFonte}}>
              Lenta
            </label>
            <input type="radio" id="velocidade normal" name="velocidade do texto" value="2"
              defaultChecked={sistema?.estado.velocidadeDoTexto == 2}
              onChange={(e)=>sistema?.despachar({tipo: acoes.mudarVelocidadeDoTexto, numero1: parseInt(e.currentTarget.value)})}
            />
            <label htmlFor="velocidade normal" style={{fontFamily: sistema?.estado.fonte, color: sistema?.estado.corDaFonte}}>
              Normal
            </label>
            <input type="radio" id="velocidade rápida" name="velocidade do texto" value="1"
              defaultChecked={sistema?.estado.velocidadeDoTexto == 1}
              onChange={(e)=>sistema?.despachar({tipo: acoes.mudarVelocidadeDoTexto, numero1: parseInt(e.currentTarget.value)})}
            />
            <label htmlFor="velocidade rápida" style={{fontFamily: sistema?.estado.fonte, color: sistema?.estado.corDaFonte}}>
              Rápida
            </label>
          </div>

          <input type="button" value="Redefinir opções"
            style={{margin: "1% 0%"}}
            onClick={redefinir}
          />

          <input type="button" value="Excluir salvo"
            style={{margin: "1% 0%"}}
            onClick={()=>sistema?.despachar({tipo: acoes.excluirSalvo})}
          />
        </div>

        <Botao nome="Voltar"
          func={()=>{sistema?.despachar({tipo: acoes.exibirTelaDeOpcoes, opcao: false});}}
          style={{
            position: "absolute",
            right: "1%",
            bottom: "1%",
            padding: "1%",
          }}
        />
      </div>
    </div>
  )
}
