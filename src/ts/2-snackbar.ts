import type { IziToastSettings } from 'izitoast';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

interface IPromiseFactory {
	init(): void;
	getRef<T extends HTMLElement>(selector: string): T;
	makePromise(formData: FormData): Promise<string> | undefined;
}

interface IPromiseFactoryOptions {
	iziToastSettings: IziToastSettings;
}

class PromiseFactory implements IPromiseFactory {
	private refs: { form: HTMLFormElement; submitBtn: HTMLButtonElement };
	private iziToastSettings: IziToastSettings;
	private timeoutId: number;

	constructor({ iziToastSettings }: IPromiseFactoryOptions) {
		this.timeoutId = 0;
		this.iziToastSettings = iziToastSettings;
		this.refs = {
			form: this.getRef<HTMLFormElement>('[data-form]'),
			submitBtn: this.getRef<HTMLButtonElement>('button[type="submit"]'),
		};
	}
	init(): void {
		this.refs.form?.addEventListener('submit', this.onSubmit.bind(this));
	}
	getRef<T extends HTMLElement>(selector: string = ''): T | never {
		const el = document.querySelector<T>(selector);
		if (!el) {
			throw new Error(`Missing an element for selector ${selector}`);
		}
		return el;
	}

	private onSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (e.currentTarget instanceof HTMLFormElement) {
			const formData = new FormData(e.currentTarget);
			this.makePromise(formData)
				.then(res => iziToast.success({ ...this.iziToastSettings, message: res }))
				.catch(reason => iziToast.error({ ...this.iziToastSettings, message: reason }));
		}
	}
	makePromise(formData: FormData): Promise<string> | never {
		const delay = formData.get('delay');
		const state = formData.get('state');

		if (!delay || !state) throw new Error(`Values inside the formData are invalid`);

		return new Promise((resolve, reject) => {
			const FULFILLED = 'fulfilled';
			const REJECTED = 'rejected';
			setTimeout(() => {
				switch (state) {
					case FULFILLED:
						return resolve(`✅ Fulfilled promise in ${delay}ms`);
					case REJECTED:
						return reject(`❌ Rejected promise in ${delay}ms`);
					default:
						return reject(new Error(`Unkown state with ${state} value`));
				}
			}, Number(delay));
		});
	}
}

// Creating an instance of PromiseFactory

const iziToastSettings: IziToastSettings = {
	maxWidth: 300,
	closeOnEscape: true,
	closeOnClick: true,
	timeout: 3000,
};
const promiseFactoryOptions: IPromiseFactoryOptions = {
	iziToastSettings,
};
const pFactory = new PromiseFactory(promiseFactoryOptions);

pFactory.init();
