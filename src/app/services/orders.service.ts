import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get('https://pnitfunctions.azurewebsites.net/api/GetOrders')
    .pipe(map((data: any[]) => data.map((order: any) => new Order(order.name, order.price, order.category))));
  }

}
