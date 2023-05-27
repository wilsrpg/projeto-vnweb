import somConfirmar from "../../midias/som-confirmar.ogg";
import somConfirmar2 from "../../midias/som-confirmar2.ogg";

//todas os sons devem constar neste objeto para serem acessíveis a todas
//as cenas
export const sons: Record<string, string> = {
  bip: somConfirmar,
  plem: somConfirmar2
}
