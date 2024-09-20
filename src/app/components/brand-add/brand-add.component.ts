import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brand-add',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,ToastrModule],
  templateUrl: './brand-add.component.html',
  styleUrl: './brand-add.component.css'
})
export class BrandAddComponent {


  brandAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private brandService:BrandService,private toastrService:ToastrService) {}

  ngOnInit():void{
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:["",Validators.required],
    })
  }
  add(){
    if(this.brandAddForm.valid){
      let carModel = Object.assign({},this.brandAddForm.value) 
      this.brandService.add(carModel).subscribe(response=>{
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
