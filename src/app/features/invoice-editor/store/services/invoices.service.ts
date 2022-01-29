import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Invoice } from '../../../../model';

@Injectable()
export class InvoicesService {
  constructor(private http: HttpClient) {}

  loadInvoices() {
    return this.http.get<Invoice[]>(`${environment.BASE_API}/invoices`);
  }

  deleteInvoice(id: number) {
    return this.http.delete(`${environment.BASE_API}/invoices/${id}`);
  }

  addInvoice(invoice: Invoice) {
    return this.http.post<Invoice>(`${environment.BASE_API}/invoices`, invoice);
  }

  editInvoice(invoice: Partial<Invoice>) {
    return this.http.patch<Invoice>(`${environment.BASE_API}/invoices/${invoice.id}`, invoice);
  }

  loadInvoice(id: string) {
    return this.http.get(`${environment.BASE_API}/invoices/${id}`);
  }
}
