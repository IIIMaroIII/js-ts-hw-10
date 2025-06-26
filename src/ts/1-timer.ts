import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface ITimer {
	readonly refs: Refs;
	timerId: number | null;

	init(): void;
	convertMs(ms: number): TimerUI;
	initFlatpickr(): void;
}

type Refs = {
	input: HTMLInputElement | null;
	startBtn: HTMLButtonElement | null;
	days: HTMLSpanElement | null;
	hours: HTMLSpanElement | null;
	min: HTMLSpanElement | null;
	sec: HTMLSpanElement | null;
};
type TimerUI = {
	days: number;
	hours: number;
	min: number;
	sec: number;
};
type TimerOptions = {
	rootSelector: HTMLElement | null;
};

export default class Timer implements ITimer {
	refs: Refs;
	timerId: number | null;

	constructor({ rootSelector }: TimerOptions) {
		this.refs = {
			input: rootSelector?.querySelector<HTMLInputElement>('[data-cal]') ?? null,
			startBtn: rootSelector?.querySelector<HTMLButtonElement>('[data-startBtn]') ?? null,
			days: rootSelector?.querySelector<HTMLSpanElement>('[data-days]') ?? null,
			hours: rootSelector?.querySelector<HTMLSpanElement>('[data-hours]') ?? null,
			min: rootSelector?.querySelector<HTMLSpanElement>('[data-minutes]') ?? null,
			sec: rootSelector?.querySelector<HTMLSpanElement>('[data-seconds]') ?? null,
		};
		this.timerId = null;
	}
	init(): void {}
	convertMs(ms: number): TimerUI {}
	initFlatpickr(): void {}
}
