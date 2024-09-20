import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ColorService } from '../../services/color.service';


@Component({
  selector: 'app-color-add',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,ToastrModule],
  templateUrl: './color-add.component.html',
  styleUrl: './color-add.component.css'
})
export class ColorAddComponent {

  colorAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private colorService:ColorService,private toastrService:ToastrService) {}

  ngOnInit():void{
    this.createColorAddForm();
  }
  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required],

    })
  }

  add(){
    if(this.colorAddForm.valid){
      let carModel = Object.assign({},this.colorAddForm.value) 
      this.colorService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Successful")
      },responseError=>{
        if(responseError.error.Errors.length>0)
        for (let i = 0; i < responseError.error.Errors.length; i++) {
         
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error")
        }
        
      })
      
    }
    else{
      this.toastrService.error("Invalid Form","Attention")
    }
   }


}
