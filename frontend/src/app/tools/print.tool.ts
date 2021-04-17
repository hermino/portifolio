export class Print {
	public info(value: string) {
		console.log('%cINFO', 'background-color: #0288D1; border-radius: 25px; padding: 2px 10px', `${value}`);
	}
	public sucess(value: string) {
		console.log('%cSUCESS', 'background-color: #689F38; border-radius: 25px; padding: 2px 10px', `${value}`);
	}
	public error(value: string) {
		console.log('%cDANGER', 'background-color: #D32F2F; border-radius: 25px; padding: 2px 10px', `${value}`);
	}
	public warning(value: string) {
		console.log('%cWARNING', 'background-color: #FBC02D; border-radius: 25px; padding: 2px 10px', `${value}`);
	}
	public note(value: string) {
		console.log('%cNOTE', 'background-color: #9C27B0; border-radius: 25px; padding: 2px 10px', `${value}`);
	}
	public common(value: string) {
		console.log('%cCOMMON', 'background-color: #607D8B; border-radius: 25px; padding: 2px 10px', `${value}`,);
	}
	public debug(value: string) {
		console.log('%cDEBUG', 'background-color: #E0430B; border-radius: 25px; padding: 2px 10px', `${value}`);
	}
}
