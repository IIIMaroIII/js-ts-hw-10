import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
interface Refs {
	cal: HTMLInputElement | null;
	startBtn: HTMLButtonElement | null;
	days: HTMLSpanElement | null;
	hours: HTMLSpanElement | null;
	min: HTMLSpanElement | null;
	secs: HTMLSpanElement | null;
}

const refs: Refs = {
	cal: document.querySelector<HTMLInputElement>('[data-cal]') ?? null,
	startBtn: document.querySelector<HTMLButtonElement>('[data-startBtn]') ?? null,
	days: document.querySelector<HTMLSpanElement>('[data-days]') ?? null,
	hours: document.querySelector<HTMLSpanElement>('[data-hours]') ?? null,
	min: document.querySelector<HTMLSpanElement>('[data-minutes]') ?? null,
	secs: document.querySelector<HTMLSpanElement>('[data-seconds]') ?? null,
};

if (refs.cal) {
	const fp = flatpickr(refs.cal, {});
	console.log(fp);
}
