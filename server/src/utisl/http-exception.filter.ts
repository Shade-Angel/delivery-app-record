import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'
import { TokenExpiredError } from 'jsonwebtoken'

@Catch(TokenExpiredError)
export class TokenExpiredFilter implements ExceptionFilter {
	catch(exception: TokenExpiredError, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		response.status(401).json({
			statusCode: 401,
			message: 'jwt expired',
			error: 'Unauthorized'
		})
	}
}
