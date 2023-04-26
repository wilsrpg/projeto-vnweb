export default class Escritor {

    static instancia: Escritor;
    sistema: any;
    roteiro: string = "";

    static getInstance() {
      if (Escritor.instancia == undefined) {
          Escritor.instancia = new Escritor();
      }
      return this.instancia;
    };

    definirSistema(sist: any){
      this.sistema = sist;
    }

    escrever(s: string){
      console.log(this.roteiro);
      this.sistema?.escreverMensagem(s);
      
    }
}
