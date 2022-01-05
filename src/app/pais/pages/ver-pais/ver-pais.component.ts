import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators'

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService) { }

    
  ngOnInit(): void {

    //Pipe permite especificar operadores que trabajaran con el producto del observable
    //SwitchMap: operador de transformacion, recibe un observable y retorna otro observable y en 
    //... en el suscribe recibe el nuevo observable.
    //Tap: operador que ejecuta un efecto secundario
    this.activatedRoute.params
      .pipe(
        switchMap( (param) => this.paisService.buscarPaisPorCodigo( param['id']) ),
        tap(console.log)
      )
      .subscribe( resp =>{

        let pais: Country = resp[0];
        this.pais = pais;

        //console.log(this.pais);
        
      });

    /*
    //Otra forma de obtener llos parametros de la url
    this.activatedRoute.params
      .subscribe( param => {
        let id = param['id'];
        console.log(id);
        
        this.paisService.buscarPaisPorCodigo( id )
          .subscribe( pais => {
            console.log(pais[0]);
          });

      });
    */

  }

}
