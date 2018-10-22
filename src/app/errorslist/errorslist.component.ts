import { Component, OnInit, Input } from '@angular/core';
import { Errors} from '../models/errors.model';
@Component({
  selector: 'app-errorslist',
  templateUrl: './errorslist.component.html',
  styleUrls: ['./errorslist.component.css']
})
export class ErrorslistComponent implements OnInit {

  formattedErrors: Array<string> = [];

  ngOnInit(){}

  @Input()
  set errors(errorList: Errors) {
    //console.log(errorList);
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(key => `${key} ${errorList.errors[key]}`);
  }

  get errorList() { 
    //console.log(this.formattedErrors);
    return this.formattedErrors; 
  }
}
