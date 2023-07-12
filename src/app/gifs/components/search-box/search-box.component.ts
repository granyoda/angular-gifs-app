import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template:
  `
    <h5>Buscar</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      #txtTagInput
      (keyup.enter)="searchTag()"
      >
  `
})
// #txtTagInput: es un referencia local que solo funciona en el template

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  // ViewChild toma una referencia local
  // ViewChildren regresa todas las referencias lcales en un arreglo

  constructor( private gifsService: GifsService ) { }

  searchTag(): void{
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
