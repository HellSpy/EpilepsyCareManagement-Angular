// src/app/services/patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Patient {
  _id: string;
  name: string;
  email: string;
  epilepsyDetails: {
    diagnosisDate: Date;
    medication: string;
    lastSeizureDate: Date;
    notes: string;
    seizureFrequency: string;
    familyHistory: string;
    allergies: string;
    comorbidities: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/api/patients';

  constructor(private http: HttpClient) {
    console.log('PatientService initialized');
  }

  getPatients(): Observable<Patient[]> {
    console.log('getPatients called');
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatientById(id: string): Observable<Patient> {
    console.log('getPatientById called with id:', id);
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }
}
