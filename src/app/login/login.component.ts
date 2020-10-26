import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor( private formBuilder:FormBuilder ) {

    this.formLogin = this.formBuilder.group(
      {
        usuario: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
        password:['', [Validators.required]]
      }
    );
   }

  ngOnInit(): void {
  }

  ingresar(): void{

    console.log('Ingresaste correctamente');

  }

}
