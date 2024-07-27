// frontend/src/app/services/patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Patient {
  name: string;
  epilepsyDetails: {
    diagnosisDate: Date;
    medication: string;
    lastSeizureDate: Date;
    notes: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/api/patients';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }
}
