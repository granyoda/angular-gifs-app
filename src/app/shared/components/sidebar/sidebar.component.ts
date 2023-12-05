import { Component, Input } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){}

  // @Input()
  // public tags: string[] = this.gifsService.tagsHistory;

  get tags(){
    return this.gifsService.tagsHistory;
  }

  public mostrarTag(tag: string): void{
    this.gifsService.searchTag(tag);
  }
}
