import { NestFactory } from '@nestjs/core'
import { AppModule } from './utisl/app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.enableCors()
	await app.listen(4200)
}
bootstrap().catch(error => {
	console.error('Failed to start application:', error)
	process.exit(1)
})
