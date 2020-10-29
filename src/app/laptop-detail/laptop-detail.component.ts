import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILaptop } from '../model/laptops.model';
import { DataService } from '../service/data.service';
import { LaptopsService } from '../service/laptops.service';

@Component({
  selector: 'app-laptop-detail',
  templateUrl: './laptop-detail.component.html',
  styleUrls: ['./laptop-detail.component.css']
})
export class LaptopDetailComponent implements OnInit {

  isNewLaptop : boolean;
  formCrearLaptop: FormGroup;
  public saveUsername:boolean;
  title: string;
  id;

  constructor(
    private formBuilder: FormBuilder, 
    private laptops:LaptopsService, 
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute) { 

    this.route.params.subscribe(
      p=>{
        
        if(p.id){
          this.id=p.id;
          console.log(p.id);
          console.log('Edicion');
          this.title = 'Editar Elemento'
          this.laptops.getLaptop(p.id).subscribe(
            res =>{
                  this.formCrearLaptop.patchValue(res);
            }
          );

        } else {
          this.title='Crear Elemento'
          console.log('ALTA');
        }

      }
    );

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

  OnChange($event){
    console.log($event); 
    this.isNewLaptop = $event.checked;
}


save(): void {​​    
  const dataLap = this.formCrearLaptop.value ;    
  if(this.id) {​​      //edicion      
    this.data.setLoading(true);      
    this.laptops.editLaptop(this.id, dataLap).subscribe(
      res => {​​          
        console.log(res);      
        this.data.setLoading(false);      
        this.data.setMessage('Los datos se actualizaron correctamente');      
        this.router.navigate(['laptop']);  }​​,        
      err => {​​        
          this.data.setLoading(false);        
          this.data.setMessage('Los siento ocurrio un error');        
          this.router.navigate(['laptop']);      }​​);    }​​ 
    else {​​      //creacion      
          this.data.setLoading(true);      
          this.laptops.createLaptop(dataLap).subscribe(
          
            res => {​​      console.log(res);      
            this.data.setLoading(false);      
            this.data.setMessage('Los datos se enviaron correctamente');      
            this.router.navigate(['laptop']);  }​​,      err => {​​        
            this.data.setLoading(false);        
            this.data.setMessage('Los siento ocurrio un error');        
            this.router.navigate(['laptop']);      
                }​​);    
           }​​

  }

}
