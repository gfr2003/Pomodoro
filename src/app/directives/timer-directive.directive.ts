import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTimerDirective]',
})
export class TimerDirectiveDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngOnInit(): void {
    const timerTag = this.renderer.createElement('span');
    const textTag = this.renderer.createText('0500');
    this.renderer.appendChild(timerTag, textTag);
    this.renderer.appendChild(this.el.nativeElement, timerTag);
  }
}
