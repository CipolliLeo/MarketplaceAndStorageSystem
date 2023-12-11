import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrdersByUserEmail(userEmail: string): Observable<Order[]> {
    return this.http.get<Order[]>(`http://localhost:3000/orders?userEmail=${userEmail}`);
  }

  createOrder(order: Order) {
    return this.http.post(`http://localhost:3000/orders`, order);
  }
}
