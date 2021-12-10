import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Order } from '../model/order.model';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let table: TableComponent;
  let ordersService: OrdersService;
  let authService: AuthService;
  let router: Router;
  // let fixture: ComponentFixture<TableComponent>;
  const orders = [
    {name: 'Order_test', category: 'Category_test', price: 22 }
  ];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers: [
        { provide: HttpClient, useValue: HttpClient }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    ordersService = jasmine.createSpyObj(['getAll']);
    authService = jasmine.createSpyObj(['logout']);
    router = jasmine.createSpyObj(['navigate']);
    table = new TableComponent(ordersService, authService);
    const observable: Observable<Order[]> = of(orders);
    ordersService.getAll = jasmine.createSpy().and.callFake(() => {
      return observable;
    });
    table.ngOnInit();
  });

  // checking if the table component is created
  it('should create', () => {
    expect(table).toBeTruthy();
  });

  // checking if the orders are displayed correctly
  it('should display received orders', () => {
      expect(table.orders).toEqual(orders);
  });
});
