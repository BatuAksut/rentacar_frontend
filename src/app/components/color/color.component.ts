import { Component } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Color } from '../../models/color';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent {
  colors: Color[] = [];
  dataLoaded = false;
  currentColor: Color | null = null;

  constructor(private colorService: ColorService,private router:Router) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  getCurrentColorClass(color: Color) {
    return color === this.currentColor ? 'list-group-item active' : 'list-group-item';
  }

  getAllColorClass() {
    return !this.currentColor ? 'list-group-item active' : 'list-group-item';
  }

  clearCurrentColor() {
    this.currentColor = null;
  }

  navigateUpdateColor(color:Color) {
    this.router.navigate(['/colors/update', color.colorId]);
  }
}
