import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../models/articles.model';

@Component({
  selector: 'app-feedsdisplay',
  templateUrl: './feedsdisplay.component.html',
  styleUrls: ['./feedsdisplay.component.css']
})
export class FeedsdisplayComponent implements OnInit {
  @Input() articles : Article;
  constructor() { 
    console.log(this.articles);
  }

  ngOnInit() {
  }

}
