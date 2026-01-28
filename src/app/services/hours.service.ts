import { Injectable } from '@angular/core';

export interface WorkDay {
  date: string;
  entry: string;
  exit: string;
  extraMinutes: number;
}

@Injectable({
  providedIn: 'root',
})
export class HoursService {
  private key = 'workDays';

  getAll(): WorkDay[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getBankMinutes(): number {
    const days = this.getAll();
    return days.reduce((total, day) => total + day.extraMinutes, 0);
  }

  minutesToTime(minutes: number): string {
    const sign = minutes < 0 ? '-' : '';
    const absMinutes = Math.abs(minutes);

    const h = Math.floor(absMinutes / 60);
    const m = absMinutes % 60;
    
    return `${sign}${h}h ${m}min`;
  
  }
  save(day: WorkDay) {
    const data = this.getAll();
    data.push(day);
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  constructor() {}
}
