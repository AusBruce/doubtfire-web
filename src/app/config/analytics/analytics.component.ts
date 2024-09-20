import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsConfigService {
  constructor(private angulartics2: Angulartics2) {}

  configureAnalytics(): void {
    // Disable virtual page views for analytics
    this.angulartics2.virtualPageviews(false);
  }
}
