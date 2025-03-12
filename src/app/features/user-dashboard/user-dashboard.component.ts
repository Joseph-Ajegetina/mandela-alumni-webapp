// import { NgFor } from '@angular/common';
// import { Component } from '@angular/core';
// import { TuiDay } from '@taiga-ui/cdk';
// import { TuiCalendar, TuiMarkerHandler } from '@taiga-ui/core';

// @Component({
//   selector: 'app-user-dashboard',
//   imports: [TuiCalendar,NgFor,],
//   templateUrl: './user-dashboard.component.html',
//   styleUrl: './user-dashboard.component.less'
// })
// export class UserDashboardComponent {
//   selectedDays: TuiDay[] = [];
//   formattedDates: { day: number; month: string }[] = []; // Store formatted dates

//   // Function to handle clicked dates
//   onDayClick(day: TuiDay): void {
//     const index = this.selectedDays.findIndex(d => d.daySame(day));

//     if (index === -1) {
//       this.selectedDays.push(day);
//       this.formattedDates.push(this.formatDate(day));
//     } else {
//       this.selectedDays.splice(index, 1);
//       this.formattedDates.splice(index, 1);
//     }
//   }

//   // Function to format the date
//   formatDate(day: TuiDay): { day: number; month: string } {
//     const monthAbbreviations = [
//       'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
//       'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
//     ];
//     return { day: day.day, month: monthAbbreviations[day.month] };
//   }

//   // Highlight selected days
//   markerHandler: TuiMarkerHandler = (day: TuiDay) => {
//     return this.selectedDays.some(d => d.daySame(day)) ? ['var(--tui-primary)'] : [];
//   };

// }
