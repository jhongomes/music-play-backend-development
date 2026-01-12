import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { version, description } from 'package.json';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService);

	const swaggerApiOptions = new DocumentBuilder()
		.setTitle('Music Play API Documentation')
		.setDescription(description)
		.setVersion(version)
		.build();

	const swaggerApiDocument: OpenAPIObject = SwaggerModule.createDocument(app, swaggerApiOptions);
	SwaggerModule.setup('api/docs', app, swaggerApiDocument);

	await app.listen(configService.get('PORT'));
}

bootstrap();