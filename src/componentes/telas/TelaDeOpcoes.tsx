import { useContext, useEffect, useState } from "react"
import { contexto, estadoInicial } from "../sistema/Contexto";
import Botao from "../interface/Botao";
import SeletorDeFonte from "../interface/SeletorDeFonte";
//import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
//import { musicas } from "../mapeadores/Musicas";
//import { sons } from "../mapeadores/Sons";
//import { personagens } from "../mapeadores/Personagens";
import { acoes } from "../sistema/Redutor";
//import { roteiros } from "../mapeadores/Roteiros";

export default function TelaDeOpcoes(){
  const sistema = useContext(contexto);
  const fontePadrao = estadoInicial.fonte;
  //const leitor = new FileReader();
  //const [arquivo,definirArquivo] = useState<File>();
  //leitor.onload = ()=>carrArq;
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou tela de opções");

  //function obterEndereco(v: string){
  //  let tipo = v.slice(0, v.search("\\."));
  //  let arquivo = v.slice(v.search("\\.")+1);
  //  imagensDeFundo;sons;personagens;musicas; //se tirar algum desses e um arquivo referenciar ele, vai dar erro qd entrar no eval, n sei pq
  //  return eval(tipo+"."+arquivo);
  //}

  //useEffect(()=>{
  //  //console.log("ef arquivo="+arquivo);
  //  if(arquivo){
  //    leitor.readAsText(arquivo);
  //    new Promise((r)=>leitor.addEventListener("load",r))
  //    .then(carrArq);
  //  }
  //}, [arquivo]);

  //function carrArq() {
  //  //console.log("entrou carrArq, arquivo="+arquivo?.name+", tipo="+arquivo?.type);
    
  //  if(arquivo?.type == "application/json"){
  //    if(typeof leitor.result == "string"){
  //      let roteiroJson = JSON.parse(leitor.result,(chave,valor)=>{
  //          if(chave == "mudarCenario" || chave == "endereco" || chave == "mudarMusica" && typeof valor == "string"
  //             || chave == "tocarSom" && typeof valor == "string")
  //            valor = obterEndereco(valor);
  //          return valor;
  //      });
  //      console.log("Roteiro JSON para teste carregado.");
  //      console.log(roteiroJson);
  //      roteiros[0] = roteiroJson.roteiro;
  //    }
  //  }
    /*if(arquivo?.type == "video/ogg"){
      //console.log("entrou áudio");
      let audio = new Audio();
      audio.autoplay = true;
      if(leitor.result && typeof leitor.result == "string")
        audio.src = leitor.result;
      //new Promise((r)=>audio.addEventListener("load",r))
      //.then(()=>{audio.play();});
      //await new Promise((resolve)=>{audio.addEventListener("load",()=>resolve(""));});
      audio.play();
      //sistema?.despachar({tipo: acoes.mudarMusica, endereco: leitor.result})
      //❚❚ ►
    }
    if(arquivo?.type == "image/png" || arquivo?.type == "image/jpeg"){
      //console.log("entrou imagem");
      let imagem = new Image();
      //if(leitor.result && typeof leitor.result == "string")
      //  imagem.src = leitor.result;
      //new Promise((r)=>imagem.addEventListener("load",r))
      //.then(()=>{
      //  sistema?.despachar({tipo: acoes.mudarImagemDeFundo, endereco: imagem.src});
      //})
      if(leitor.result && typeof leitor.result == "string")
        sistema?.despachar({tipo: acoes.mudarImagemDeFundo, endereco: leitor.result});
    }*/
  //}
  
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
            //color: sistema?.estado.corDaFonte,
            //fontFamily: sistema?.estado.fonte,
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
            <input type="radio" id="velocidade lenta" name="velocidade do texto" value="5"
              defaultChecked={sistema?.estado.velocidadeDoTexto == 5}
              onChange={(e)=>sistema?.despachar({tipo: acoes.mudarVelocidadeDoTexto, numero1: parseInt(e.currentTarget.value)})}
            />
            <label htmlFor="velocidade lenta" style={{fontFamily: sistema?.estado.fonte, color: sistema?.estado.corDaFonte}}>
              Lenta
            </label>
            <input type="radio" id="velocidade normal" name="velocidade do texto" value="3"
              defaultChecked={sistema?.estado.velocidadeDoTexto == 3}
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

          {/*<input type="file"
            //accept=".json"
            //multiple
            id="arquivo"
            onChange={()=>{
              let arquivo = document.getElementById("arquivo");
              if(arquivo && arquivo instanceof HTMLInputElement && arquivo.files)
                definirArquivo(arquivo.files[0]);
            }}
          />*/}

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
