import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { NavigationPanelComponent } from '../shared/navigation-panel/navigation-panel.component';

@Component({
  standalone: true,
  selector: 'app-reports-and-analytics',
  templateUrl: './reports-and-analytics.component.html',
  styleUrls: ['./reports-and-analytics.component.scss'],
  imports: [RouterModule, CommonModule, NavigationPanelComponent]
})
export class ReportsAndAnalyticsComponent implements OnInit {
  userCount: number = 0;
  seizureLogCount: number = 0;
  medicationCount: number = 0;
  userRoles: any[] = [];
  seizureTypes: any[] = [];
  medicationUsage: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    Chart.register(...registerables); // Register the required components
  }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    const headers = this.authService.getAuthHeaders();
    this.http.get<any>('http://localhost:3000/api/analytics/counts', { headers }).subscribe(
      data => {
        this.userCount = data.userCount;
        this.seizureLogCount = data.seizureLogCount;
        this.medicationCount = data.medicationCount;
      },
      error => {
        console.error('Error fetching counts:', error);
      }
    );

    this.http.get<any>('http://localhost:3000/api/analytics/user-roles', { headers }).subscribe(
      data => {
        this.userRoles = data;
        this.loadUserRolesChart();
      },
      error => {
        console.error('Error fetching user roles:', error);
      }
    );

    this.http.get<any>('http://localhost:3000/api/analytics/seizure-types', { headers }).subscribe(
      data => {
        this.seizureTypes = data;
        this.loadSeizureTypesChart();
      },
      error => {
        console.error('Error fetching seizure types:', error);
      }
    );

    this.http.get<any>('http://localhost:3000/api/analytics/medication-usage', { headers }).subscribe(
      data => {
        this.medicationUsage = data;
        this.loadMedicationUsageChart();
      },
      error => {
        console.error('Error fetching medication usage:', error);
      }
    );
  }

  loadUserRolesChart(): void {
    const ctx = document.getElementById('userRolesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.userRoles.map(role => role._id),
        datasets: [{
          label: 'User Roles',
          data: this.userRoles.map(role => role.count),
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      }
    });
  }

  loadSeizureTypesChart(): void {
    const ctx = document.getElementById('seizureTypesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.seizureTypes.map(type => type._id),
        datasets: [{
          label: 'Seizure Types',
          data: this.seizureTypes.map(type => type.count),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  loadMedicationUsageChart(): void {
    const ctx = document.getElementById('medicationUsageChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.medicationUsage.map(med => med._id),
        datasets: [{
          label: 'Medication Usage',
          data: this.medicationUsage.map(med => med.count),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
