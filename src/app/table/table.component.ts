import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order.model';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  orders: Order[];
  showModal: boolean;
  constructor(private orderService: OrdersService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.orderService.getAll().subscribe((orders: Order[]) => this.orders = orders);
  }

  tableLogout(): void {
    this.authService.logout();
  }

}
