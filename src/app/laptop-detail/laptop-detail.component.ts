import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILaptop } from '../model/laptops.model';

@Component({
  selector: 'app-laptop-detail',
  templateUrl: './laptop-detail.component.html',
  styleUrls: ['./laptop-detail.component.css']
})
export class LaptopDetailComponent implements OnInit {

  isNewLaptop : boolean;
  formCrearLaptop: FormGroup;
  public saveUsername:boolean;

  constructor(private formBuilder: FormBuilder) { 

    this.isNewLaptop=false;
    this.formCrearLaptop = this.formBuilder.group(
      {
        marca: ['', [Validators.required]],
        ram:['', [Validators.required]],
        pantalla:['', [Validators.required]],
        procesador:['', [Validators.required]],
        puertosUsb:['', [Validators.required]]

      }
    );

  }

  ngOnInit(): void {
  }


  crearLaptop():void{


    const crearLaptop = {

      marca: this.formCrearLaptop.get('marca').value,
      ram: this.formCrearLaptop.get('ram').value,
      pantalla: this.formCrearLaptop.get('pantalla').value,
      procesador: this.formCrearLaptop.get('procesador').value,
      puertosUsb: this.formCrearLaptop.get('puertosUsb').value,
      isNueva: this.isNewLaptop
  
    } as ILaptop;

    console.log('Se ha creado la laptop');
    console.log(crearLaptop);
  
  }

  OnChange($event){
    console.log($event); 
    this.isNewLaptop = $event.checked;
}


}
