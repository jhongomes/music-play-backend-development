import { ConfigService } from "@nestjs/config";

export class MongodbConfig {
    private scheme: string = 'mongodb';
	private url: string;
    private envVariables: ConfigService;

    public setVariables() {
		if (process.env.ENVIRONMENT === 'development') {
			this.url = this.envVariables.get('MONGODB_URL');

			return;
		}
	}

    public getUrl(): string {
		return this.url;
	}
}