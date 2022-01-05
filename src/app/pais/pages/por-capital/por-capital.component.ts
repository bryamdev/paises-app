import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  termino: string = '';
  error: boolean = false;
  paises: Country[] = [];
  fuente: string = 'capital';

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {
  }

  sugerencias( event: any ){
    console.log(event);
  }

  buscar( terminoArg: string ){

    this.error = false;
    this.termino = terminoArg;

    this.paisService.buscarPaisPorCapital(terminoArg)
      .subscribe( (resp) => {
        this.paises = resp;
      }, (err) => {
        this.error = true;
        this.paises = [];
      });
    
  }

}
