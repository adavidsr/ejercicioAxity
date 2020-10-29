import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { LaptopsService } from '../service/laptops.service';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {

  dataSource = [];
  displayedColumns=['marca','ram','pantalla','procesador','puertosUsb', 'actions'];

  constructor(
    private laptop: LaptopsService, 
    private data: DataService,
    private router: Router,
    private snack:MatSnackBar) { 

    this.loadData();
  }



  ngOnInit(): void {
  }


  edit(id:string):void{
    this.router.navigate(['laptop-detail/', id]);
  }

  delete(id: string):void{

    const confirm = this.snack.open('¿Estas seguro que quieres borrar?','Si',{

      duration:3000
    });

    confirm.onAction().subscribe(
      () =>{

        this.laptop.deleteLaptop(id).subscribe(
          res =>{

              console.log(res);
              this.data.setMessage('Objeto borrado correctamente');
              this.data.setLoading(false);
              this.loadData();
          },
          err =>{
            console.log(err);
            this.data.setLoading(false);
            this.data.setMessage('Lo sentimos no se pudo eliminar');
          }

        );
      }

    );
    
  }

  loadData(): void {​​
    this.data.setLoading(true);
    this.laptop.getLaptops().subscribe(res =>{​​
    this.dataSource =  res;
    this.data.setLoading(false);
    }​​, err =>

    {​​ 
      this.data.setMessage('Lo sentimos no se puede consultar la informacion.');
      this.data.setLoading(false);

    }​​);

  }​​

}
