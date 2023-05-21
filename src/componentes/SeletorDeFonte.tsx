import { useContext } from "react";
import { acoes, contexto } from "./Sistema";

export default function SeletorDeFonte(prop:{fontes: string[]}){
  const sistema = useContext(contexto);

  return (
    <div>
      {prop.fontes.map((fonte,i)=>(
        <div key={i}>
          <input type="radio" id={fonte} name="fonte" value={fonte}
            defaultChecked={sistema?.estado.fonte == fonte}
            onChange={(e)=>sistema?.despachar({tipo: acoes.mudarFonte, string: e.currentTarget.value})}
          />
          <label htmlFor={fonte} style={{fontFamily: fonte, color: sistema?.estado.corDaFonte}}>
            {fonte}
          </label>
        </div>
      ))}
    </div>
  )
}