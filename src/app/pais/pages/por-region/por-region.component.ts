import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button{
      margin-right:5px;
    }
    
    `
  ]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = [ 'africa', 'americas', 'asia', 'europe', 'oceania' ];
  regionActiva: string = '';

  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  activarRegion( region: string){

    if(region === this.regionActiva){
      return;
    }

    this.regionActiva = region;
    this.paises = [];
    //console.log("region: " + region);

    this.paisService.buscarPaisPorRegion(region)
      .subscribe( resp =>{
        //console.log(resp);
        this.paises = resp;
      });    
  }

  getClaseCss( region: string){
      return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'; 
  }

}
