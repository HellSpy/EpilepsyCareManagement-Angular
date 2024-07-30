// src/app/services/patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Patient {
  _id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  primaryCarePhysician: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  knownAllergies: string;
  previousSurgeries: string;
  comorbidities: string;
  epilepsyDetails: {
    diagnosisDate: Date;
    medication: string;
    medicationDosage: string;
    medicationSideEffects: string;
    lastSeizureDate: Date;
    seizureType: string;
    seizureTriggers: string;
    seizureFrequency: string;
    seizureDuration: string;
    seizureAura: string;
    responseToTreatment: string;
    notes: string;
    familyHistory: string;
    allergies: string;
    comorbidities: string;
    VNS: string;
  };
  lifestyle: {
    dietaryHabits: string;
    exerciseRoutine: string;
    sleepPatterns: string;
    smokingAlcoholUse: string;
  };
  supportResources: {
    supportGroups: string;
    educationalMaterials: string;
    carePlan: string;
  };
}

export interface Medication {
  _id: string;
  count: number;
}

export interface MedicationDetails {
  name: string;
  description: string;
  sideEffects: string;
  dosageInstructions: string;
  brandNames: string[];
  interactions: string;
  contraindications: string;
  commonUses: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log('PatientService initialized');
  }

  getPatients(): Observable<Patient[]> {
    console.log('getPatients called');
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`, { headers });
  }

  getPatientById(id: string): Observable<Patient> {
    console.log('getPatientById called with id:', id);
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Patient>(`${this.apiUrl}/patients/${id}`, { headers });
  }

  getMedications(): Observable<Medication[]> {
    console.log('getMedications called');
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Medication[]>(`${this.apiUrl}/medications`, { headers });
  }

  getMedicationDetails(name: string): Observable<MedicationDetails> {
    console.log('getMedicationDetails called with name:', name);
    const headers = this.authService.getAuthHeaders();
    return this.http.get<MedicationDetails>(`${this.apiUrl}/medications/${name}`, { headers });
  }
}
