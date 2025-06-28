import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import type { Instance } from 'flatpickr/dist/types/instance';
import type { Options } from 'flatpickr/dist/types/options';
import iziToast, { type IziToast, type IziToastSettings } from 'izitoast';

type ToastMethods = 'success' | 'error' | 'warning' | 'info';
interface Refs {
	input: HTMLInputElement;
	startBtn: HTMLButtonElement;
	days: HTMLSpanElement;
	hours: HTMLSpanElement;
	minutes: HTMLSpanElement;
	seconds: HTMLSpanElement;
}

interface ITimer {
	init(): void;
}
interface FormattedDate {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

interface TimerOptions {
	fpOptions?: Options;
	iziSettings?: IziToastSettings;
}

class Timer implements ITimer {
	private timerID: number;
	private timeDiff: number;
	private fpOptions: Options;
	private iziSettings: IziToastSettings;
	private readonly refs: Refs;

	constructor({ fpOptions = {}, iziSettings = {} }: TimerOptions = {}) {
		this.timerID = 0;
		this.timeDiff = 0;
		this.fpOptions = fpOptions;
		this.iziSettings = iziSettings;
		this.refs = {
			input: this.getRef<HTMLInputElement>('[data-cal]'),
			startBtn: this.getRef<HTMLButtonElement>('[data-startBtn]'),
			days: this.getRef<HTMLSpanElement>('[data-days]'),
			hours: this.getRef<HTMLSpanElement>('[data-hours]'),
			minutes: this.getRef<HTMLSpanElement>('[data-minutes]'),
			seconds: this.getRef<HTMLSpanElement>('[data-seconds]'),
		};
	}
	init(): void {
		this.refs.startBtn.addEventListener('click', () => this.start());
		this.initFlatpickr(this.refs.input, this.fpOptions);
	}
	private start(): void {
		this.timerID = setInterval(() => {
			this.timeDiff -= 1000;
			if (this.timeDiff > 0) {
				this.updateUI(this.timeDiff);
			} else {
				this.stop();
			}
		}, 1000);
		this.setDisableElStatus(this.refs.input, true);
		this.setDisableElStatus(this.refs.startBtn, true);
	}
	private stop(): void {
		clearInterval(this.timerID);
		this.setDisableElStatus(this.refs.input, false);
	}
	private toast(method: ToastMethods, options?: IziToastSettings): void {
		iziToast[method]({ ...options });
	}
	private updateUI(ms: number): void {
		const { days, hours, minutes, seconds } = this.convertMS(ms);
		this.refs.days.textContent = String(days).padStart(2, '0');
		this.refs.hours.textContent = String(hours).padStart(2, '0');
		this.refs.minutes.textContent = String(minutes).padStart(2, '0');
		this.refs.seconds.textContent = String(seconds).padStart(2, '0');
	}
	private handleSelectedDates(dates: Date[]): void {
		this.setDisableElStatus(this.refs.startBtn, true);
		const ms = dates?.[0]?.getTime() ?? 0;
		this.timeDiff = ms - Date.now();
		this.validatePastTimeAndDisableBtn(this.timeDiff);
	}
	private getRef<T extends HTMLElement>(selector: string): T {
		const el = document.querySelector<T>(selector);
		if (!el) {
			throw new Error(`Missing the element with selector ${selector}`);
		}
		return el;
	}
	private initFlatpickr(el: HTMLElement, options?: Options): Instance {
		const fpOptions: Options = {
			enableTime: true,
			time_24hr: true,
			defaultDate: new Date(),
			minuteIncrement: 1,
			onClose: this.handleSelectedDates.bind(this),
			...options,
		};
		return flatpickr(el, fpOptions);
	}
	private validatePastTimeAndDisableBtn(time: number): Boolean {
		if (time < 0) {
			this.toast('error', {
				message: 'Choose the date in the future',
				messageColor: 'red',
				closeOnClick: true,
				closeOnEscape: true,
			});
			this.setDisableElStatus(this.refs.startBtn, true);
			return false;
		} else {
			this.setDisableElStatus(this.refs.startBtn, false);
			return true;
		}
	}
	private setDisableElStatus(el: HTMLInputElement | HTMLButtonElement, value: boolean) {
		if (el) {
			el.disabled = value;
		}
	}
	private convertMS(ms: number): FormattedDate {
		// Number of milliseconds per unit of time
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;

		// Remaining days
		const days = Math.floor(ms / day);
		// Remaining hours
		const hours = Math.floor((ms % day) / hour);
		// Remaining minutes
		const minutes = Math.floor(((ms % day) % hour) / minute);
		// Remaining seconds
		const seconds = Math.floor((((ms % day) % hour) % minute) / second);

		return { days, hours, minutes, seconds };
	}
}
const timerInstance = new Timer({});
timerInstance.init();
