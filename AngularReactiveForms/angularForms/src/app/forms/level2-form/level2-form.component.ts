import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-level2-form',
  templateUrl: './level2-form.component.html',
  styleUrls: ['./level2-form.component.css'],
})
export class Level2FormComponent implements OnInit {
  level2_form: FormGroup;
  form_data: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.level2_form = this.formBuilder.group({
      firstname: new FormControl(),
      lastname: new FormControl(),
      class: new FormControl(),
      result: new FormArray([]),
    });
  }

  getResultArray() {
    return this.level2_form.get('result') as FormArray;
  }

  addSubjectToResultArray() {
    this.getResultArray().push(this.subject());
  }

  deleteSubjectFromResultArray(index) {
    this.getResultArray().removeAt(index);
  }

  subject() {
    return this.formBuilder.group({
      subject: new FormControl(),
      marks: new FormControl(),
    });
  }

  onSubmit() {
    console.log(JSON.stringify(this.level2_form.value, null, 4));
    this.form_data = this.level2_form.value;
  }

  onClear() {
    this.level2_form.reset();
    this.form_data = null;
  }
}
