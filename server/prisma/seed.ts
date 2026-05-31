import * as fs from 'fs'
import * as path from 'path'

const envPath = path.join(__dirname, '..', '.env')
const envContent = fs.readFileSync(envPath, 'utf-8')
const match = envContent.match(/^DATABASE_URL=["']?(.+?)["']?$/m)
const dbUrl = match?.[1]?.trim()

if (!dbUrl || !dbUrl.startsWith('postgresql://')) {
	console.error('Ошибка DATABASE_URL:', dbUrl)
	process.exit(1)
}

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as argon2 from 'argon2'

const pool = new Pool({ connectionString: dbUrl })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const sanitize = (str: string) => str?.trim().replace(/\s+/g, ' ') || ''
const toSlug = (name: string) =>
	sanitize(name)
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9а-яё\s-]/gi, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.slice(0, 60)

async function main() {
	console.log('Начало работы')

	const categories = [
		{
			name: 'Баскеты',
			slug: 'buckets',
			image: '/uploads/images/categories/buckets.png'
		},
		{
			name: 'Бургеры',
			slug: 'burgers',
			image: '/uploads/images/categories/burgers.png'
		},
		{
			name: 'Снеки и гарниры',
			slug: 'sides',
			image: '/uploads/images/categories/sides.png'
		},
		{
			name: 'Напитки',
			slug: 'drinks',
			image: '/uploads/images/categories/drinks.png'
		},
		{
			name: 'Десерты',
			slug: 'desserts',
			image: '/uploads/images/categories/desserts.png'
		},
		{
			name: 'Комбо',
			slug: 'combos',
			image: '/uploads/images/categories/combos.png'
		}
	]

	const catMap: Record<string, string> = {}
	for (const c of categories) {
		const safeSlug = toSlug(c.name)
		const { id } = await prisma.category.upsert({
			where: { slug: safeSlug },
			update: {},
			create: { name: sanitize(c.name), slug: safeSlug, image: c.image }
		})
		catMap[c.slug] = id
	}

	const products = [
		{
			name: 'Баскет Дуэт',
			cat: 'buckets',
			desc: '8 стрипсов, 2 ножки, 2 крыла',
			price: 89900
		},
		{
			name: 'Баскет L',
			cat: 'buckets',
			desc: '16 кусочков курицы',
			price: 149900
		},
		{
			name: 'Шефбургер Оригинальный',
			cat: 'burgers',
			desc: 'Филе, овощи, соус',
			price: 34900
		},
		{
			name: 'Шефбургер Де Люкс',
			cat: 'burgers',
			desc: 'Двойное филе, бекон, чеддер',
			price: 39900
		},
		{
			name: 'Твистер',
			cat: 'burgers',
			desc: 'Стрипсы в лепёшке',
			price: 29900
		},
		{
			name: 'Картофель фри (Б)',
			cat: 'sides',
			desc: 'Золотистый картофель',
			price: 14900
		},
		{
			name: 'Кока-Кола 0.5 л',
			cat: 'drinks',
			desc: 'Классический вкус',
			price: 9900
		},
		{
			name: 'Мороженое Рожок',
			cat: 'desserts',
			desc: 'Ванильное в рожке',
			price: 7900
		},
		{
			name: 'Комбо 1',
			cat: 'combos',
			desc: 'Бургер + Фри + Напиток',
			price: 49900
		}
	]

	for (const p of products) {
		const safeSlug = toSlug(p.name)
		await prisma.product.upsert({
			where: { slug: safeSlug },
			update: {},
			create: {
				name: sanitize(p.name),
				slug: safeSlug,
				description: sanitize(p.desc),
				price: p.price,
				image: `/images/products/${safeSlug}.jpg`,
				categoryId: catMap[p.cat]
			}
		})
	}

	await prisma.user.upsert({
		where: { email: 'demo@delivery-app.com' },
		update: {},
		create: {
			email: 'demo@delivery-app.com',
			name: 'DemoUser',
			phone: '+79001234567',
			password: await argon2.hash('DemoPass123!')
		}
	})

	console.log('Завершенно')
}

main()
	.catch(e => {
		if (e instanceof Error) {
			console.error('Seed error:', e.message)
		} else {
			console.error('Seed error:', e)
		}
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
		await pool.end()
	})
