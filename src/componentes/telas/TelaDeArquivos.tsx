import { useContext } from "react"
import { contexto } from "../sistema/Contexto";
import { musicas } from "../mapeadores/Musicas";
import { acoes } from "../sistema/Redutor";
import Botao from "../interface/Botao";
import GerenciadorDeArquivos from "../interface/GerenciadorDeArquivos";

export default function TelaDeArquivos(){
  const sistema = useContext(contexto);
  if(sistema?.estado.msgsConsole.renderizacoes)
    console.log("renderizou tela de arquivos");

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
        fontFamily: sistema?.estado.fonte,
        color: sistema?.estado.corDaFonte,
      }}
    >
      <div id="div arquivos"
        style={{
          height: "92%",
          overflowY: "auto",
          wordBreak: "break-word",
        }}
      >
        <GerenciadorDeArquivos
          titulo="Imagens de fundo"
          tipo="imagem"
          accept="image/*"
          nomeDoObjetoDestinoDosArquivos="imagensDeFundo"
        />
        <GerenciadorDeArquivos
          titulo="Personagens e sprites"
          tipo="imagem"
          accept="image/*"
          nomeDoObjetoDestinoDosArquivos="personagens"
        />
        <GerenciadorDeArquivos
          titulo="Músicas"
          tipo="áudio"
          accept=".ogg"
          nomeDoObjetoDestinoDosArquivos="musicas"
          acaoDoDespache={acoes.mudarMusica}
        />
        <GerenciadorDeArquivos
          titulo="Efeitos de som"
          tipo="áudio"
          accept=".ogg"
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
    </div>
  )
}
