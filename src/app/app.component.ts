import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MenuController, ToggleCustomEvent } from '@ionic/angular';
import { IHistoryClock } from './models/history';
import { isoHours, isoToBrDate } from './utils/date.util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public history;
  constructor(private menu: MenuController, public renderer: Renderer2) {}
  ngOnInit(): void {
    this.onToggleColorTheme();
  }
  closeMenu() {
    this.menu.close('menuHistory');
  }
  public getHistoryData() {
    const historyData: IHistoryClock = JSON.parse(
      localStorage.getItem('action')
    );
    const formatDate = isoToBrDate(historyData.date);
    const formatHour = isoHours(historyData.date);

    const historyMessage = `${historyData.action}: ${formatDate}`;
    this.history = [
      { data: historyData, message: historyMessage, hours: formatHour },
    ];
  }
  public onToggleColorTheme(event?: ToggleCustomEvent) {
    if (!event) {
      return this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
    const toogleActivated = event.detail.checked;
    if (toogleActivated) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    }
    if (!toogleActivated) {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }
}
