import { ConfigService } from "@nestjs/config";

export class MongodbConfig {
	private scheme: string = 'mongodb';
	private url: string;
	private envVariables: ConfigService;

	constructor() {
		this.envVariables = new ConfigService();
		this.setVariables();
	}

    public setVariables() {
		if (this.envVariables.get('ENVIRONMENT') === 'development') {
			this.url = this.envVariables.get('URL_MONGODB');
			return;
		}
	}

	public getUrl(): string {
		return this.url;
	}
}