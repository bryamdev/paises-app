import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino: string = '';
  error: boolean = false;
  paises: Country[] = [];
  fuente: string = 'país';

  constructor(private paisService: PaisService) { }
  
  buscar(terminoArg: string){
    
    this.error = false;
    this.termino = terminoArg;

    console.log("Enviado: " + terminoArg);

    this.paisService.buscarPaisPorNombre(terminoArg)
      .subscribe( (resp) => {
        this.paises = resp;
        console.log(resp);
      }, (err) => {
        this.error = true;
        this.paises = [];
      });
  }

  sugerencias( event: any){
    console.log(event);
  }

}
