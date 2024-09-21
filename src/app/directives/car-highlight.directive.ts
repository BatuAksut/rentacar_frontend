import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCarHighlight]',
  standalone:true
})
export class CarHighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('lightblue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
