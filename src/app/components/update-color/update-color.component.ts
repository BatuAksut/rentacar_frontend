import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorService } from '../../services/color.service';
import { Color } from '../../models/color';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-color',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule,ToastrModule],
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.css']
})
export class UpdateColorComponent implements OnInit {
  colorUpdateForm: FormGroup;
  color :Color | null=null;
  colorId: number;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    public router: Router,
    private route:ActivatedRoute,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.route.params.subscribe(params => {
      const colorId = params['colorId'];
      this.getColorById(colorId); // colorId ile backend'den rengi getir
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [0],
      colorName: ['', Validators.required]
    });
  }

  getColorById(colorId: number) {
    this.colorService.getColorById(colorId).subscribe(response => {
      const color = response.data;
      this.colorUpdateForm.patchValue({
        colorId: color.colorId,
        colorName: color.colorName
      });
    });
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      const colorModel = this.colorUpdateForm.value;
      this.colorService.updateColor(colorModel).subscribe(
        response => {
          this.toastr.toastrConfig.positionClass="toast-bottom-right";
          this.toastr.success("Renk güncellendi","Başarılı")
      
        },
        error => {
          this.toastr.error("Renk güncellenemedi","Hata")
        }
      );
    }
  }
}
