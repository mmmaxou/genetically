import {Directive, Input, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appParallax]',
})
export class ParallaxDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('ratio') parallaxRatio = 1;
  initialTop = 0;

  constructor(private eleRef: ElementRef) {
    this.initialTop = this.eleRef.nativeElement.getBoundingClientRect().top;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    this.eleRef.nativeElement.style.top =
      this.initialTop - window.scrollY * this.parallaxRatio + 'px';
  }
}
