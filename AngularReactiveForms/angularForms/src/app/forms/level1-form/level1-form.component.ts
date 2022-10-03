import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-level1-form',
  templateUrl: './level1-form.component.html',
  styleUrls: ['./level1-form.component.css']
})
export class Level1FormComponent implements OnInit {

  level1_form: FormGroup;
  form_data: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.level1_form = this.formBuilder.group({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
      address: new FormControl(),
      contact: new FormControl(),
    });
  }

  onSubmit() {
    console.log(JSON.stringify(this.level1_form.value, null, 4));
    this.form_data = this.level1_form.value;
  }

  onClear() {
    this.level1_form.reset();
    this.form_data = null;
  }

}
