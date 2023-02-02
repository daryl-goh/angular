import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SearchCriteria } from '../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  @Output()
  onSearch = new Subject<SearchCriteria>();

  giphyForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.giphyForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      search: this.fb.control<string>('', [Validators.required]),
      limit: this.fb.control<number>(5),
    });
  }

  processForm() {
    const searchCriteria: SearchCriteria = this.giphyForm.value
    searchCriteria.limit = parseInt(this.giphyForm.value.limit)
    this.onSearch.next(searchCriteria);
    this.giphyForm = this.createForm()

  }

}
