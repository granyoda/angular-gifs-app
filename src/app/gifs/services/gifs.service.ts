import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { JsonPipe } from '@angular/common';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] =[];
  private apiKey: string = '6AakRv1VE70h6c7DnU6aLQaRmrkRPGi8';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory];
    // para crear una copia de los valores de tags (por seguridad)
  }

  private organizarHistirial( tag : string){
    tag = tag.toLowerCase();

    // busca si ya existe el valor en el arreglo y en caso de encontrarlo lo borra
    if( this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
    }

    // inserta el nuevo valor
    this._tagsHistory.unshift( tag );
    // me quedo con los diez primeros valores del arreglo
    this._tagsHistory = this._tagsHistory.splice(0,10);

    this.saveLocalStorage();

  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }
  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if( this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0]);
  }


  searchTag( tag: string ): void{
    // si se presiona enter entoces se entra en la condicional y no hace nada
    if(tag.length == 0) return;
    this.organizarHistirial(tag);

    /*fetch('https://api.giphy.com/v1/gifs/search?api_key=6AakRv1VE70h6c7DnU6aLQaRmrkRPGi8&q=lol&limit=10')
      .then( resp => resp.json() )
      .then( data => console.log(data) );
    */

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);
    this.http.get<SearchResponse>(`${ this.serviceURL }/search`,{ params })
      .subscribe( resp => {

        this.gifList= resp.data;

        console.log({gifs: this.gifList})
        // console.log(resp);
      });
    // console.log(this.tagsHistory);
  }



}
