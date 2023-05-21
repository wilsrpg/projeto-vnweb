import { useContext } from "react"
import { acoes, contexto, estadoInicial } from "./Sistema";
import Botao from "./Botao";
import SeletorDeFonte from "./SeletorDeFonte";

export default function TelaDeOpcoes(){
  const sistema = useContext(contexto);
  let a=["0","1"];
  const fontePadrao = estadoInicial.fonte;
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou TelaDeOpcoes");

  function redefinir() {
    const corDaFonte = document.getElementById("cor da fonte");
    const fonteP = document.getElementById(fontePadrao);
    if(fonteP instanceof HTMLInputElement)
      fonteP.checked = true;
    if(corDaFonte instanceof HTMLInputElement)
      corDaFonte.value = estadoInicial.corDaFonte;
    sistema?.despachar({tipo: acoes.mudarFonte, string: estadoInicial.fonte});
    sistema?.despachar({tipo: acoes.mudarCorDaFonte, string: estadoInicial.corDaFonte});
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
      }}
    >
      <div style={{
        width: "fit-content",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      >
        <form style={{
          height: "100%",
          display: "grid",
          placeContent: "start center",
          color: sistema?.estado.corDaFonte,
          fontFamily: sistema?.estado.fonte,
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
          
          <SeletorDeFonte fontes={[fontePadrao, "Arial Narrow", "Verdana", "Tahoma"]}/>

          <div><span style={{verticalAlign: "super", marginRight: "0.5em"}}>Cor da fonte:</span>
          <input type="color"
            id="cor da fonte"
            style={{width: "2em"}}
            defaultValue={sistema?.estado.corDaFonte}
            onChange={(e)=>sistema?.despachar({tipo: acoes.mudarCorDaFonte, string: e.target.value})}
          />
          </div>

          <input type="button" value="Redefinir"
            onClick={redefinir}
          />

          <input type="button" value="Excluir salvo"
            onClick={()=>sistema?.despachar({tipo: acoes.excluirSalvo})}
          />
        </form>

        <Botao nome="Voltar"
          func={()=>sistema?.despachar({tipo: acoes.exibirTelaDeOpcoes, opcao: false})}
          style={{
            bottom: 0,
          }}
        />
      </div>
    </div>
  )
}