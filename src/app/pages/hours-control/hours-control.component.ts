import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HoursService } from '../../services/hours.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hours-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hours-control.component.html',
  styleUrl: './hours-control.component.scss',
})
export class HoursControlComponent implements OnInit {
  protected entryTime!: string;
  protected exitTime!: string;
  
  
  protected result: { worked: string; extra: string } | null = null;

  protected bankHours = '0h 0min';


  constructor(private hoursService: HoursService) {}

  ngOnInit(): void {
    this.bankHours = this.hoursService.minutesToTime(
      this.hoursService.getBankMinutes()
    );
  }

  calculate() {
    const entry = this.timeToMinutes(this.entryTime);
    const exit = this.timeToMinutes(this.exitTime);

    const intervalMinutes = 2 * 60; // 2 hours lunch
    const dailyWorkMinutes = 8 * 60; // 8 hours workday

    const totalMinutes = exit - entry;
    const workedMinutes = totalMinutes - intervalMinutes;

    const extraMinutes = Math.max(0, workedMinutes - dailyWorkMinutes);

    if (extraMinutes > 0) {
      this.hoursService.save({
        date: new Date().toLocaleDateString(),
        entry: this.entryTime,
        exit: this.exitTime,
        extraMinutes
      });
    }

    this.hoursService.save({
      date: new Date().toLocaleDateString(),
      entry: this.entryTime,
      exit: this.exitTime,
      extraMinutes
    });

    this.bankHours = this.hoursService.minutesToTime(
      this.hoursService.getBankMinutes()
    );

    this.result = {
      worked: this.minutesToTime(workedMinutes),
      extra: this.minutesToTime(extraMinutes),
    };
  }

  timeToMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}min`;
  }
}
