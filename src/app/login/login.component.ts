import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {ILoginReq} from '../model/security.model';
import {DataService} from '../service/data.service';
import {SecurityService} from '../service/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              private security: SecurityService, private router: Router,
              private snack: MatSnackBar, private data: DataService
  ) {

    this.formLogin = this.formBuilder.group(
      {
        usuario: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
        password: ['', [Validators.required]]
      }
    );


    this.data.getLoading().subscribe(loading => {
      this.isLoading = loading;
    });

  }


  ngOnInit(): void {
  }

  ingresar(): void {

    this.data.setLoading(true);

    const loginData = {

      email: this.formLogin.get('usuario').value,
      password: this.formLogin.get('password').value

    } as ILoginReq;

    this.security.login(loginData).subscribe(
      res => {
        console.log(res);
        this.data.setToken(res.token);
        this.router.navigate(['home']);
        this.data.setLoading(false);

      },

      err => {
        this.data.setMessage(err.error.error);
        this.data.setLoading(false);
      }
    );

  }

}
