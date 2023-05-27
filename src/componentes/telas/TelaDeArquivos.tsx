import { useContext, useEffect, useRef, useState } from "react"
import { contexto } from "../sistema/Contexto";
import Botao from "../interface/Botao";
import { imagensDeFundo } from "../mapeadoresDeArquivos/ImagensDeFundo";
import { musicas } from "../mapeadoresDeArquivos/Musicas";
import { sons } from "../mapeadoresDeArquivos/Sons";
import { personagens } from "../mapeadoresDeArquivos/Personagens";
import { acoes } from "../sistema/Redutor";
import { roteiros } from "../roteiros/ListaDeRoteiros";
import GerenciadorDeArquivos from "../interface/GerenciadorDeArquivos";

export default function TelaDeArquivos(){
  const sistema = useContext(contexto);
  const leitorDeArquivos = new FileReader();
  const [arqRoteiro,definirArqRoteiro] = useState<File>();
  const [arqsImgFundo,definirArqsImgFundo] = useState<FileList>();
  const [arqsPers,definirArqsPers] = useState<FileList>();
  const [arqsMusica,definirArqsMusica] = useState<FileList>();
  const [arqsSom,definirArqsSom] = useState<FileList>();
  const [sonsPraAdicionarStt,definirSonsPraAdicionarStt] = useState<{nome:string, endereco:string}[]>([]);
  const sonsPraAdicionarRef = useRef<{nome:string, endereco:string}[]>([]);
  //leitor.onload = ()=>carrArq;
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou tela de arquivos");

    useEffect(()=>{
      if(sonsPraAdicionarStt.length){
        console.log("ef spa state:");
        //console.log(sonsPraAdicionar);
        //sonsPraAdicionar2.current = [];
        //definirArqsSom(undefined);
        //definirSonsPraAdicionar([]);
  
        const conteúdo = document.getElementById("div arquivos");
        conteúdo?.scrollTo(0,conteúdo.scrollHeight);
      }
    }, [sonsPraAdicionarStt]);
  
  useEffect(()=>{
    //console.log("ef arqsSom");
    if(arqsSom?.length){
      console.log("ef arqsSom, length="+arqsSom?.length);
      add();
      //addArqs(arqsSom)
      //.then(()=>{
      //  definirSonsPraAdicionarStt(sonsPraAdicionarRef.current);
      //  definirArqsSom(undefined);
      //})
    }
  }, [arqsSom]);

  async function add() {
    console.log("entrou add");
    await addArqs(arqsSom);
    console.log("em add, terminou addsom, spa2 ref length="+sonsPraAdicionarRef.current.length);
    //console.log("em add, spa2 ref:");
    //console.log(sonsPraAdicionar2.current);
    //const a = sonsPraAdicionarRef.current;
    //definirSonsPraAdicionarStt(a);
    definirSonsPraAdicionarStt(sonsPraAdicionarRef.current);
    //console.log("em add, definindo spa state com spa2 ref");
    definirArqsSom(undefined);

  }

  async function addArqs(listaArqs: FileList | undefined, i = 0) {
    //console.log("entrou addsom, i="+i);
    if(listaArqs){
      leitorDeArquivos.readAsDataURL(listaArqs[i]);
      await
      new Promise((r)=>leitorDeArquivos.addEventListener("load",r))
      //.then(()=>{
        if(typeof leitorDeArquivos.result == "string")
          sonsPraAdicionarRef.current.push({nome:listaArqs[i].name, endereco:leitorDeArquivos.result});
        i++;
        //console.log("em addsom, deu push, spa2 ref length="+sonsPraAdicionar2.current.length);
        if(i < listaArqs?.length)
          await addArqs(listaArqs,i);
      //});
    }
  }


  useEffect(()=>{
    //console.log("ef arquivo="+arquivo);
    if(arqRoteiro){
      leitorDeArquivos.readAsText(arqRoteiro);
      new Promise((r)=>leitorDeArquivos.addEventListener("load",r))
      .then(carrArq);
    }
  }, [arqRoteiro]);

  function carrArq() {
    //console.log("entrou carrArq, arquivo="+arquivo?.name+", tipo="+arquivo?.type);
    
    if(arqRoteiro?.type == "application/json"){
      if(typeof leitorDeArquivos.result == "string"){
        let roteiroJson = JSON.parse(leitorDeArquivos.result,(chave,valor)=>{
            if(chave == "mudarCenario" || chave == "endereco" || chave == "mudarMusica" && typeof valor == "string"
               || chave == "tocarSom" && typeof valor == "string")
              valor = obterEndereco(valor);
            return valor;
        });
        console.log("Roteiro JSON para teste carregado.");
        console.log(roteiroJson);
        roteiros[0] = roteiroJson.roteiro;
      }
    }
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
  }
  
  function obterEndereco(v: string){
    let tipo = v.slice(0, v.search("\\."));
    let midia = v.slice(v.search("\\.")+1);
    imagensDeFundo;sons;personagens;musicas; //se tirar algum desses e um arquivo referenciar ele, vai dar erro qd entrar no eval, n sei pq
    return eval(tipo+"."+midia);
  }

  function camelCaseAlfanumerico(s: string) {
    let ss = s.split(RegExp("\\W","g"));
    ss.map((palavra,i)=>{
      if(i>0)
        ss[i] = palavra[0].toUpperCase()+palavra.slice(1);
    });
    return ss.join("");
  }

  return (
    <div id="tela de arquivos"
      style={{
        backgroundColor: "cadetblue",
        position: "absolute",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: "1%",
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        fontFamily: sistema?.estado.fonte,
        color: sistema?.estado.corDaFonte,
      }}
    >
      {/*<div id="quadro de arquivos"
        style={{
          width: "40%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >*/}
        <div id="div arquivos"
          style={{
            height: "92%",
            //display: "grid",
            //placeContent: "start center",
            //color: sistema?.estado.corDaFonte,
            //fontFamily: sistema?.estado.fonte,
            overflowY: "auto",
            wordBreak: "break-word",
          }}
        >
          <input type="file"
            accept=".json"
            id="adicionar roteiro"
            style={{display: "none"}}
            onChange={()=>{
              let arqElem = document.getElementById("adicionar roteiro");
              if(arqElem && arqElem instanceof HTMLInputElement && arqElem.files)
                definirArqRoteiro(arqElem.files[0]);
            }}
          />
          <Botao nome="Importar roteiro para teste" func={()=>{
              let arqElem = document.getElementById("adicionar roteiro");
              if(arqElem)
                arqElem.click();
            }}
            title="Antes de importar o roteiro, certifique-se de ter importado todos os arquivos que são utilizados nele."
          />
          
          <GerenciadorDeArquivos
            titulo="Imagens de fundo"
            tipo="imagem"
            accept="image/*"
            //arrayDosArquivos={imagensDeFundo}
            nomeDoObjetoDestinoDosArquivos="imagensDeFundo"
          />
          <GerenciadorDeArquivos
            titulo="Personagens e sprites"
            tipo="imagem"
            accept="image/*"
            //arrayDosArquivos={personagens}
            nomeDoObjetoDestinoDosArquivos="personagens"
          />
          <GerenciadorDeArquivos
            titulo="Músicas"
            tipo="áudio"
            accept=".ogg"
            //arrayDosArquivos={musicas}
            nomeDoObjetoDestinoDosArquivos="musicas"
            acaoDoDespache={acoes.mudarMusica}
          />
          <GerenciadorDeArquivos
            titulo="Efeitos de som"
            tipo="áudio"
            accept=".ogg"
            //arrayDosArquivos={sons}
            nomeDoObjetoDestinoDosArquivos="sons"
            acaoDoDespache={acoes.tocarSom}
          />
        </div>

        <Botao nome="Parar música" func={()=>sistema?.despachar({tipo: acoes.mudarMusica, endereco: ""})}
          style={{
            position: "absolute",
            left: "1%",
            bottom: "1%",
            padding: "1%",
          }}
        />

        <Botao nome="Voltar"
          func={()=>{
            sistema?.despachar({tipo: acoes.exibirTelaDeArquivos, opcao: false});
            if(sistema?.estado.musicaAtual?.endereco != musicas.idk && sistema?.estado.musicaAtual?.volume != 50)
              sistema?.despachar({tipo: acoes.mudarMusica, endereco: musicas.idk, numero1: 50});
          }}
          style={{
            position: "absolute",
            right: "1%",
            bottom: "1%",
            padding: "1%",
          }}
        />
      {/*</div>*/}
    </div>
  )
}
