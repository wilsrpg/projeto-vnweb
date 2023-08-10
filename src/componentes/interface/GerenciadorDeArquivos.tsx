import { useContext, useEffect, useRef, useState } from "react"
import { contexto } from "../sistema/Contexto";
import { acoes } from "../sistema/Redutor";
import Botao from "./Botao";
import { imagensDeFundo } from "../mapeadores/ImagensDeFundo";
import { personagens } from "../mapeadores/Personagens";
import { musicas } from "../mapeadores/Musicas";
import { sons } from "../mapeadores/Sons";

export default function GerenciadorDeArquivos(prop:{
  titulo: string,
  tipo: string,
  accept: string,
  nomeDoObjetoDestinoDosArquivos: string,
  acaoDoDespache?: acoes,
}){
  const sistema = useContext(contexto);
  const leitorDeArquivos = new FileReader();
  const [arquivos,definirArquivos] = useState<FileList>();
  const [arquivosParaAdicionarStt,definirarquivosParaAdicionarStt] = useState<{nome:string, endereco:string}[]>([]);
  const arquivosParaAdicionarRef = useRef<{nome:string, endereco:string}[]>([]);
  let arrays = {imagensDeFundo,personagens,musicas,sons};
  let array = prop.nomeDoObjetoDestinoDosArquivos as keyof typeof arrays;
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou gerenciador de arquivos");

  useEffect(()=>{
    if(sistema?.estado.msgsConsole.effects)
      console.log("ef gerenciador de arquivos");
    if(arquivos?.length){
      adicionarArquivos(arquivos)
      .then(()=>{
        definirarquivosParaAdicionarStt(arquivosParaAdicionarRef.current);
        definirArquivos(undefined);})
    }
  }, [arquivos]);

  async function adicionarArquivos(listaArqs: FileList | undefined, i = 0) {
    if(listaArqs){
      leitorDeArquivos.readAsDataURL(listaArqs[i]);
      await new Promise(r=>leitorDeArquivos.addEventListener("load",r,{once: true}))
      if(typeof leitorDeArquivos.result == "string")
        arquivosParaAdicionarRef.current.push({nome:listaArqs[i].name, endereco:leitorDeArquivos.result});
      i++;
      if(i < listaArqs?.length)
        await adicionarArquivos(listaArqs,i);
    }
  }

  function passarParaLowerCamelCaseAlfanumerico(s: string) {
    let ss = s.split(RegExp("\\W","g"));
    ss.map((palavra,i)=>{
      if(i>0 && palavra.length>0)
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
        if(e.target.files)
          definirArquivos(e.target.files);
      }}
    />
    {Object.entries(arrays[array]).map(([nome,endereco],k)=>
    <div key={k*2}>
      {prop.tipo == "imagem" &&
        <img src={endereco} height="20"
          style={{
            marginRight: "1%",
            //border: "solid 1px white",
            cursor: "pointer",
          }}
          onClick={()=>{
            let previa = document.getElementById("imagem ampliada");
            if(previa)
              previa.style.display = "block";
            let imagem = document.getElementById("imagem ampliada imagem");
            if(imagem instanceof HTMLImageElement)
              imagem.src = endereco;
            let legenda = document.getElementById("imagem ampliada legenda");
            if(legenda)
              legenda.innerText = prop.nomeDoObjetoDestinoDosArquivos+"."+nome;
          }}
        />
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
          delete arrays[array][nome];
        }}
      />
    </div>
    )}
    {arquivosParaAdicionarStt.map(({nome,endereco},k)=>
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
      <input type="text"// pattern="\\w*"
        id={"nome"+k}
        className="nome"
        maxLength={32}
        defaultValue={(passarParaLowerCamelCaseAlfanumerico(nome.slice(0,nome.lastIndexOf(".")))).slice(0,32)} //remove extensão ants d chamar a função
        style={{border: "solid 1px white"}}
        onChange={(e)=>e.target.style.borderColor = "white"}
      />
      <Botao nome="✓"
        som=""
        style={{marginLeft: "1%"}}
        func={()=>{
          let nomeArq = "";
          let nomeInvalido = false;
          let campo = document.getElementById("nome"+k);
          if(campo && campo instanceof HTMLInputElement){
            if(!campo.value){
              nomeInvalido = true;
              alert("Digite um nome para o arquivo.");
            } else {
              let caracInvalido = campo.value.search("\\W");
              if(caracInvalido>=0){
                nomeInvalido = true;
                console.log("caractere inválido na posição "+caracInvalido+": "+campo.value[caracInvalido]);
                alert("O nome do arquivo só pode conter letras maiúsculas e minúsculas, números e sublinhado.");
              } else
                nomeArq = campo.value;
            }
          }
          if(!nomeArq){
            nomeInvalido = true;
          } else {
            let nomes = Object.keys(arrays[array]);
            nomes.map((n)=>{
              if(n == nomeArq){
                nomeInvalido = true;
                alert("Já existe um arquivo com este nome. Digite um nome diferente.");
                return;
              }
            });
          }
          if(nomeInvalido){
            if(campo){
              campo.style.borderColor = "red";
              campo.focus();
            }
          } else {
            arrays[array][nomeArq] = arquivosParaAdicionarRef.current[k].endereco;
            for(let i=k; i<arquivosParaAdicionarStt.length-1; i++){
              let campos = document.getElementsByClassName("nome");
              let campoAtual = campos[i];
              let proximoCampo = campos[i+1];
              if(campoAtual instanceof HTMLInputElement && proximoCampo instanceof HTMLInputElement)
                campoAtual.value = proximoCampo.value;
            }
            arquivosParaAdicionarRef.current = arquivosParaAdicionarRef.current.filter((v,i)=>{return i != k});
            definirarquivosParaAdicionarStt(arquivosParaAdicionarRef.current);
          }
        }}
      />
      <Botao nome="×"
        som=""
        style={{marginLeft: "1%"}}
        func={()=>{
          for(let i=k; i<arquivosParaAdicionarStt.length-1; i++){
            let campos = document.getElementsByClassName("nome");
            let campoAtual = campos[i];
            let proximoCampo = campos[i+1];
            if(campoAtual instanceof HTMLInputElement && proximoCampo instanceof HTMLInputElement)
              campoAtual.value = proximoCampo.value;
          }
          arquivosParaAdicionarRef.current = arquivosParaAdicionarRef.current.filter((v,i)=>{return i!=k});
          definirarquivosParaAdicionarStt(arquivosParaAdicionarRef.current);
        }}
      />
    </div>
  )}
  </>
  )
}
