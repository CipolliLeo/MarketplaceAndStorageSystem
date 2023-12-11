import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eletronic } from '../models/eletronic';

@Injectable({
  providedIn: 'root',
})
export class EletronicService {
  constructor(private http: HttpClient) {}

  getEletronics(): Observable<Eletronic[]> {
    return this.http.get<Eletronic[]>('http://localhost:3000/eletronics');
  }

  addEditEletronics(postData: Eletronic, selectedEletronic: Eletronic) {
    if (!selectedEletronic) {
      return this.http.post('http://localhost:3000/eletronics', postData);
    } else {
      return this.http.put(`http://localhost:3000/eletronics/${selectedEletronic.id}`, postData);
    }
  }

  deleteEletronic(eletronicId: number) {
    return this.http.delete(`http://localhost:3000/eletronics/${eletronicId}`);
  }

  getEletronicById(id: number): Observable<Eletronic> {
    return this.http.get<Eletronic>(`http://localhost:3000/eletronics/${id}`);
  }
}
