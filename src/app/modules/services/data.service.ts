import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import dataFile from '../../../assets/mock-metrics.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlDataFile = 'assets/mock-metrics.json';

  constructor(private httpClient: HttpClient) { }

  getDashboardDetails() {
    return this.httpClient.get(this.urlDataFile);
  }
}
