import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let http: HttpClient;

  beforeEach(() => {
    http = jasmine.createSpyObj(['http']);
    service = new OrdersService(http);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
