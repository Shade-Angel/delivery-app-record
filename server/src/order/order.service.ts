import { Injectable } from '@nestjs/common';
import { returnProductObject } from 'src/product/return-product.object';
import { PrismaService } from 'src/utisl/prisma.service';
import { Stripe } from 'stripe';
import { OrderDto } from './dto/order.dto';
import { create } from 'domain';

@Injectable()
export class OrderService {
	private stripe: Stripe

	constructor(private prisma: PrismaService) {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
	}

	async getAll() {
		return this.prisma.order.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				items: {
					include: {
						product: {
							select: returnProductObject
						}
					}
				}
			}
		})
	}

	async getByUserId(userId: string) {
		return this.prisma.order.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
			include: {
				items: {
					include: {
						product: {
							select: returnProductObject
						}
					}
				}
			}
		})
	}

	async placeOrder(dto: OrderDto, userId: string) {
		const total = dto.items.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		)

		if (total < 0.5) {
			throw new Error('Amount must be at least $0.50 usd')
		}

        const order = await this.prisma.order.create({
			data: {
				items: {
					create: dto.items
				},
				total,
				user: {
					connect: { id: userId }
				}
			}
		})
	}
}
