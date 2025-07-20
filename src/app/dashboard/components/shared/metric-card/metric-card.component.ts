import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiIcon } from '@taiga-ui/core';
import { DashboardMetric } from '../../../services/dashboard.service';

@Component({
	selector: 'app-metric-card',
	standalone: true,
	imports: [CommonModule, TuiIcon],
	template: `
		<div class="metric-card card" [class]="metric.color + ' text-white'">
			<div class="metric-content flex-between">
				<div>
					<h3 class="text-2xl font-bold">{{ metric.value }}</h3>
					<p class="text-sm opacity-90">{{ metric.label }}</p>
				</div>
				<div class="metric-trend flex items-center gap-sm">
					<tui-icon [icon]="metric.icon" class="text-success" />
					<span class="text-xs">{{ metric.trend }}%</span>
				</div>
			</div>
			<p class="text-xs opacity-75 mt-sm">from last month</p>
		</div>
	`,
	styles: [
		`
			.metric-card {
				.metric-content {
					margin-bottom: 0.5rem;
				}

				.metric-trend {
					align-items: center;
				}
			}
		`,
	],
})
export class MetricCardComponent {
	@Input() metric!: DashboardMetric;
}
