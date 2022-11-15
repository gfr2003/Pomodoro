/* eslint-disable curly */
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('timer', { static: false }) timer: ElementRef;
  shortModeEnabled = true;
  longModeEnabled = false;
  focusModeEnabled = false;
  timerValue: string;
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.fillInitTimer();
  }
  changeMode(mode: string) {
    this.shortModeEnabled = false;
    this.longModeEnabled = false;
    this.focusModeEnabled = false;
    if (mode === 'short') {
      this.longModeEnabled = true;
    }
    if (mode === 'long') {
      this.focusModeEnabled = true;
    }
    if (mode === 'focus') {
      this.shortModeEnabled = true;
    }
    this.setTimerAccordingMode();
  }

  setTimerAccordingMode() {
    if (this.shortModeEnabled) {
      const text = this.renderer.createText('0500');
      this.renderer.setProperty(
        this.timer.nativeElement,
        'innerText',
        text.data
      );
      return (this.timerValue = '0500');
    }
    if (this.longModeEnabled) {
      const text = this.renderer.createText('1500');
      this.renderer.setProperty(
        this.timer.nativeElement,
        'innerText',
        text.data
      );
      return (this.timerValue = '1500');
    }
    if (this.focusModeEnabled) {
      const text = this.renderer.createText('2500');
      this.renderer.setProperty(
        this.timer.nativeElement,
        'innerText',
        text.data
      );
      return (this.timerValue = '2500');
    }
  }

  fillInitTimer() {
    const text = this.renderer.createText('0500');
    this.renderer.appendChild(this.timer.nativeElement, text);
  }
  // startTimer() {
  //   thistimer
  // }
}
