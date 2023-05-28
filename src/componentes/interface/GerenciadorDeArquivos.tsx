import { useContext, useEffect, useRef, useState } from "react"
import { contexto } from "../sistema/Contexto";
import Botao from "./Botao";
import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
import { musicas } from "../mapeadores/Musicas";
import { sons } from "../mapeadores/Sons";
import { personagens } from "../mapeadores/Personagens";
import { acoes } from "../sistema/Redutor";

export default function GerenciadorDeArquivos(prop:{
  titulo: string,
  tipo: string,
  accept: string,
  //arrayDosArquivos: Record<string, string>,
  nomeDoObjetoDestinoDosArquivos: string,
  acaoDoDespache?: acoes,
}){
  const sistema = useContext(contexto);
  const leitorDeArquivos = new FileReader();
  const [arquivos,definirArquivos] = useState<FileList>();
  const [arquivosPraAdicionarStt,definirArquivosPraAdicionarStt] = useState<{nome:string, endereco:string}[]>([]);
  const arquivosPraAdicionarRef = useRef<{nome:string, endereco:string}[]>([]);
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou gerenciador de arquivos");
  imagensDeFundo;sons;personagens;musicas; //se tirar algum desses e um arquivo referenciar ele, vai dar erro qd entrar no eval, n sei pq
  const arrayArqs: Record<string,string> = eval(prop.nomeDoObjetoDestinoDosArquivos);

  useEffect(()=>{
    //console.log("ef arquivos");
    if(arquivos?.length){
      //console.log("ef arquivos, length="+arquivos?.length);
      add();
      //addArqs(arquivos)
      //.then(()=>{
      //  definirArquivosPraAdicionarStt(arquivosPraAdicionarRef.current);
      //  definirArquivos(undefined);
      //})
    }
  }, [arquivos]);

  async function add() {
    //console.log("entrou add");
    await addArqs(arquivos);
    //console.log("em add, terminou addArqs, spa2 ref length="+arquivosPraAdicionarRef.current.length);
    definirArquivosPraAdicionarStt(arquivosPraAdicionarRef.current);
    definirArquivos(undefined);
  }

  async function addArqs(listaArqs: FileList | undefined, i = 0) {
    if(listaArqs){
      leitorDeArquivos.readAsDataURL(listaArqs[i]);
      await new Promise((r)=>leitorDeArquivos.addEventListener("load",r))
      if(typeof leitorDeArquivos.result == "string")
        arquivosPraAdicionarRef.current.push({nome:listaArqs[i].name, endereco:leitorDeArquivos.result});
      i++;
      if(i < listaArqs?.length)
        await addArqs(listaArqs,i);
    }
  }

  function passarPraLowerCamelCaseAlfanumerico(s: string) {
    let ss = s.split(RegExp("\\W","g"));
    ss.map((palavra,i)=>{
      if(i>0)
        ss[i] = palavra[0].toUpperCase()+palavra.slice(1);
    });
    return ss.join("");
  }

  return (
    <>
    <h3 style={{margin: "1%"}}>
      {prop.titulo}
      <Botao nome="Adicionar"
        style={{marginLeft: "1%"}}
        func={()=>{
          let arqElem = document.getElementById("adicionar "+prop.nomeDoObjetoDestinoDosArquivos);
          if(arqElem)
            arqElem.click();
        }}
      />
    </h3>
    <input type="file"
      accept={prop.accept}
      multiple
      id={"adicionar "+prop.nomeDoObjetoDestinoDosArquivos}
      style={{display: "none"}}
      onChange={(e)=>{
        //console.log("file onchange");
        //let arqElem = document.getElementById("adicionar "+prop.nomeDoArrayDosArquivos);
        //if(arqElem && arqElem instanceof HTMLInputElement && arqElem.files){
        //  console.log("definiu arquivos, length="+arqElem.files.length);
        //  definirArquivos(arqElem.files);
        //}
        if(e.target.files)
          definirArquivos(e.target.files);
      }}
    />
    {Object.entries(arrayArqs).map(([nome,endereco],k)=>
    <div key={k*2}>
      {prop.tipo == "imagem" &&
        <img src={endereco} height="20" style={{marginRight: "1%", border: "solid 1px white"}}/>
      }
      {prop.tipo == "áudio" &&
        <Botao nome="►"
          som=""
          style={{marginRight: "1%"}}
          func={()=>{
            if(prop.acaoDoDespache)
              sistema?.despachar({tipo: prop.acaoDoDespache, endereco: endereco})
          }}
        />
      }
      <span>{prop.nomeDoObjetoDestinoDosArquivos}.{nome}</span>
      <Botao nome="×"
        som=""
        style={{marginLeft: "1%"}}
        func={()=>{
          delete arrayArqs[nome];
        }}
      />
    </div>
    )}
    {arquivosPraAdicionarStt.map(({nome,endereco},k)=>
    <div key={k*2+1}>
      {prop.tipo == "imagem" &&
        <img src={endereco} height="20" style={{marginRight: "1%", border: "solid 1px white"}}/>
      }
      {prop.tipo == "áudio" &&
        <Botao nome="►"
          som=""
          style={{marginRight: "1%"}}
          func={()=>{
            if(prop.acaoDoDespache)
              sistema?.despachar({tipo: prop.acaoDoDespache, endereco: endereco})
          }}
        />
      }
      <span>{prop.nomeDoObjetoDestinoDosArquivos}.</span>
      <input type="text" pattern="\\w*"
        id={"nome"+k}
        className="nome"
        defaultValue={(passarPraLowerCamelCaseAlfanumerico(nome.slice(0,nome.lastIndexOf("."))))} //remove extensão ants d chamar a função
        style={{border: "solid 1px white"}}
        onChange={(e)=>e.target.style.borderColor = "white"}
      />
      <Botao nome="✓"
        som=""
        style={{marginLeft: "1%"}}
        func={()=>{
          let nomeArq = passarPraLowerCamelCaseAlfanumerico(nome.slice(0,nome.lastIndexOf(".")));
          let campo = document.getElementById("nome"+k);
          if(campo && campo instanceof HTMLInputElement)
            nomeArq = campo.value;
          let jaExiste = false;
          let nomes = Object.keys(arrayArqs);
          //if(prop.arrayDosArquivos instanceof Object)
            //Object.keys(prop.arrayDosArquivos);
          nomes.map((n)=>{
            if(n == nomeArq){
              jaExiste = true;
              return;
            }
          });
          if(jaExiste){
            if(campo) campo.style.borderColor = "red";
          } else {
            //console.log(musicas);
            //if(campo) campo.style.borderColor = "white";
            arrayArqs[nomeArq] = arquivosPraAdicionarRef.current[k].endereco;
            
            for(let i=k; i<arquivosPraAdicionarStt.length-1; i++){ //do próximo ao penúltimo
              let campos = document.getElementsByClassName("nome");
              let campoAtual = campos[i];
              let proximoCampo = campos[i+1];
              if(campoAtual instanceof HTMLInputElement && proximoCampo instanceof HTMLInputElement)
                campoAtual.value = proximoCampo.value;
            }
            arquivosPraAdicionarRef.current = arquivosPraAdicionarRef.current.filter((v,i)=>{return i!=k});
            definirArquivosPraAdicionarStt(arquivosPraAdicionarRef.current);
          }
        }}
      />
      <Botao nome="×"
        som=""
        style={{marginLeft: "1%"}}
        func={()=>{
          for(let i=k; i<arquivosPraAdicionarStt.length-1; i++){ //do próximo ao penúltimo
            let campos = document.getElementsByClassName("nome");
            let campoAtual = campos[i];
            let proximoCampo = campos[i+1];
            if(campoAtual instanceof HTMLInputElement && proximoCampo instanceof HTMLInputElement)
              campoAtual.value = proximoCampo.value;
          }
          arquivosPraAdicionarRef.current = arquivosPraAdicionarRef.current.filter((v,i)=>{return i!=k});
          definirArquivosPraAdicionarStt(arquivosPraAdicionarRef.current);
        }}
      />
    </div>
  )}
  </>
  )
}