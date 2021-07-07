import { Injectable } from '@angular/core';
declare let gtag:Function;
import { Angulartics2 } from 'angulartics2';
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(
    public ga: Angulartics2
  ) { }

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null )
    {
      this.ga.eventTrack.next({
        action: eventAction,
        properties: {
          category: eventCategory,
          label: eventLabel,
          value: eventValue,
          name: eventName
        },
      });
    }
}
