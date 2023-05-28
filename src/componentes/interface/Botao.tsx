import { useContext } from "react";
import { contexto } from "../sistema/Contexto";
import { sons } from "../mapeadores/Sons";
import { acoes } from "../sistema/Redutor";

export default function Botao(prop:{
  nome: string,
  func: ()=>void,
  som?: string | {endereco: string, volume: number},
  id?: string,
  title?: string,
  style?: object,
}){
  const sistema = useContext(contexto);

  return (
    <input id={prop.id}
      type="button"
      value={prop.nome}
      title={prop.title}
      onClick={(e)=>{
        e.stopPropagation();
        if(prop.som != undefined){
          let endereco = "";
          let volume = 100;
          if(typeof prop.som == "string")
            endereco = prop.som;
          else if(typeof prop.som == "object"){
            endereco = prop.som.endereco;
            volume = prop.som.volume;
          }
          sistema?.despachar({tipo: acoes.tocarSom, endereco: endereco, numero1: volume});
        } else
          sistema?.despachar({tipo: acoes.tocarSom, endereco: sons.bip});
        prop.func();
      }}
      style={prop.style}
    />
  )
}
