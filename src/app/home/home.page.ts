/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable curly */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ToggleCustomEvent } from '@ionic/angular';

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
  lightMode = true;
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

  onToggleColorTheme(event: ToggleCustomEvent) {
    const toogleActivated = event.detail.checked;
    if (toogleActivated) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      this.lightMode = false;
    }
    if (!toogleActivated) {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
      this.lightMode = true;
    }
  }
  timers(start) {
    // get the number of seconds that have elapsed since
    // startTimer() was called
    const prepareMinutes =
      this.timer.nativeElement.innerText.substring(1, 2) * 60;
    console.log(Date.now());
    var diff, minutes, seconds;

    diff = prepareMinutes - (((Date.now() - start) / 1000) | 0);

    // does the same job as parseInt truncates the float
    minutes = (diff / 60) | 0;
    seconds = diff % 60 | 0;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const action = this.renderer.createText(minutes + seconds);
    this.renderer.setProperty(
      this.timer.nativeElement,
      'innerText',
      action.data
    );

    if (diff <= 0) {
      // add one second so that the count down starts at the full duration
      // example 05:00 not 04:59
      start = Date.now() + 1000;
    }
    console.log(this.timer.nativeElement.innerText);
  }
  startTimer() {
    const start = Date.now();
    // we don't want to wait a full second before the timer starts
    this.timers(start);
    setInterval(() => {
      this.timers(start);
    }, 1000);
  }
   CountDownTimer(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
  }
  
  CountDownTimer.prototype.start = () {
    if (this.running) {
      return;
    }
    this.running = true;
    var start = Date.now(),
        that = this,
        diff, obj;
  
    (function timer() {
      diff = that.duration - (((Date.now() - start) / 1000) | 0);
  
      if (diff > 0) {
        setTimeout(timer, that.granularity);
      } else {
        diff = 0;
        that.running = false;
      }
  
      obj = CountDownTimer.parse(diff);
      that.tickFtns.forEach(function(ftn) {
        ftn.call(this, obj.minutes, obj.seconds);
      }, that);
    }());
  };
  
  CountDownTimer.prototype.onTick = function(ftn) {
    if (typeof ftn === 'function') {
      this.tickFtns.push(ftn);
    }
    return this;
  };
  
  CountDownTimer.prototype.expired = function() {
    return !this.running;
  };
  
  CountDownTimer.parse = function(seconds) {
    return {
      'minutes': (seconds / 60) | 0,
      'seconds': (seconds % 60) | 0
    };
  };
}
