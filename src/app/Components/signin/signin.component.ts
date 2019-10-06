import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SigninService } from 'src/app/Services/signin.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private signinServices: SigninService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const user = this.signinForm.value;
    this.signinServices.signInUser(user.email, user.password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMsg = error;
        alert(this.errorMsg);
    });
  }

}
