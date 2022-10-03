import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-level3-form',
  templateUrl: './level3-form.component.html',
  styleUrls: ['./level3-form.component.css']
})
export class Level3FormComponent implements OnInit {

  level3_form: FormGroup;
  form_data: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.level3_form = this.formBuilder.group({
      students: new FormArray([])
    })
  }

  getStudentsArray() {
    return this.level3_form.get('students') as FormArray;
  }

  student() {
    return this.formBuilder.group({
      firstname: new FormControl(),
      lastname: new FormControl(),
      class: new FormControl(),
      result: new FormArray([]),
    })
  }

  addStudent() {
    this.getStudentsArray().push(this.student());
  }

  removeStudent(studentIndex) {
    this.getStudentsArray().removeAt(studentIndex);
  }


  getResultArray(studentIndex) {
    return this.getStudentsArray().at(studentIndex).get('result') as FormArray;
  }

  subject() {
    return this.formBuilder.group({
      subject: new FormControl(),
      marks: new FormControl()
    })
  }

  addSubjectToResultArray(index) {
    this.getResultArray(index).push(this.subject());
  }

  deleteSubjectFromResultArray(studentIndex, resultIndex) {
    this.getResultArray(studentIndex).removeAt(resultIndex);
  }

  onSubmit() {
    console.log(JSON.stringify(this.level3_form.value, null, 4));
    this.form_data = this.level3_form.value;
  }

  onClear() {
    this.level3_form.reset();
    this.form_data = null;
  }

}
