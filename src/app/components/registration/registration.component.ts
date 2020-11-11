import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {MustMatch} from '../../shared/utils/must-match.validator';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  loading = false;

  loginUrl = '/login';
  submitted = false;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  // getter for easy access to registration form fields
  get rF() {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(8)],
      passwordConfirmation: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'passwordConfirmation')
    });
  }

  switchToLoginPage(): void {
    this.router.navigate([this.loginUrl]);
  }

  onSubmitForm(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }
    this.loading = true;
    const userInformation = {};

    for (const [key, value] of Object.entries(this.registrationForm.controls)) {
      // @ts-ignore
      userInformation[key] = value.value;

    }
    this.authenticationService.callAuthApi(userInformation, 'register', false)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.switchToLoginPage();
        },
        error => {
          this.loading = false;
        });
  }

}
