import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Client } from '../../../../model';

@Injectable()
export class ClientsService {
  constructor(private http: HttpClient) {}

  loadClients() {
    return this.http.get<Client[]>(`${environment.BASE_API}/clients`);
  }

  deleteClient(client: Client) {
    return this.http.delete<Client>(`${environment.BASE_API}/clients/${client.id}`);
  }

  addClient(client: Client) {
    return this.http.post<Client>(`${environment.BASE_API}/clients`, client);
  }

  editClient(client: Client) {
    return this.http.patch<Client>(`${environment.BASE_API}/clients/${client.id}`, client);
  }
}
