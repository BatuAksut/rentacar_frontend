import { Component } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Color } from '../../models/color';

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

  constructor(private colorService: ColorService) {}

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
}
