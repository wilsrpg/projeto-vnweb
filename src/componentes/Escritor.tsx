//ainda não tá sendo usado
export default class Escritor {
    static instancia: Escritor;
    sistema: any;

    static obterInstancia() {
      if (Escritor.instancia == undefined) {
          Escritor.instancia = new Escritor();
      }
      return this.instancia;
    };

    definirSistema(sist: any){
      this.sistema = sist;
    }

    escrever(s: string){
      this.sistema?.escreverMensagem(s);
    }
}
