import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li{
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  error: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  fuente: string = 'país';

  constructor(private paisService: PaisService) { }
  
  buscar(terminoArg: string){
    
    this.error = false;
    this.termino = terminoArg;

    //console.log("Enviado: " + terminoArg);

    this.paisService.buscarPaisPorNombre(terminoArg)
      .subscribe( (resp) => {
        this.paises = resp;
        console.log(resp);
      }, (err) => {
        this.error = true;
        this.paises = [];
      });
  }

  sugerencias( termino: string){
    
    if(termino.length === 0){
      this.paisesSugeridos = [];
      return;
    }

    this.termino = termino;

    console.log(termino);

    this.paisService.buscarPaisPorNombre(termino)
      .subscribe(paises =>{
        this.paisesSugeridos = paises.splice(0,3);
      }, err =>{
        this.paisesSugeridos = [];
      })
  }

  buscarSugerencia(termino: string){
    this.buscar(termino);
    this.paisesSugeridos = [];
  }

}
