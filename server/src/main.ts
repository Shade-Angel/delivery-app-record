import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path' // 🔥 ДОБАВЬТЕ ЭТОТ ИМПОРТ
import { AppModule } from './utisl/app.module'
import { TokenExpiredFilter } from './utisl/http-exception.filter'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useStaticAssets(join(__dirname, '..', 'uploads'), {
		prefix: '/uploads/'
	})

	app.setGlobalPrefix('api')
	app.enableCors()

	app.useGlobalFilters(new TokenExpiredFilter())
	const port = process.env.PORT || 4200 // 🔥 ОБЪЯВИТЕ ПЕРЕМЕННУЮ
	await app.listen(port)

	console.log(`🚀 Server running on http://localhost:${port}`)
	console.log(`📁 Static files: http://localhost:${port}/uploads/`)
}

bootstrap().catch(error => {
	console.error('Failed to start application:', error)
	process.exit(1)
})
