import { FC } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'

import Heading from '@/components/ui/Heading'
import Loader from '@/components/ui/Loader'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import { getMediaSource } from '@/utils/getMediaSource'

import { useGetAllCategories } from './useGetAllCategories'

const Categories: FC = () => {
	const { categories, isLoading } = useGetAllCategories()

	const { navigate } = useTypedNavigation()

	return isLoading ? (
		<Loader />
	) : (
		<View className='flex flex-col mt-5 mb-4'>
			<Heading>Categories</Heading>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={true}
				className='mt-5'
				contentContainerStyle={{ paddingHorizontal: 4 }}
			>
				{categories?.map(category => (
					<Pressable
						onPress={() =>
							navigate('Category', { slug: category.slug })
						}
						key={category.id}
						className='rounded-xl bg-gray-100 p-5 mr-4 items-center'
						style={{ width: 90 }} 
					>
						<Image
							source={getMediaSource(category.image)}
							className='w-16 h-12 mb-1'
							style={{ resizeMode: 'contain' }}
						/>
						<Text className='font-normal text-xs text-center'>
							{category.name}
						</Text>
					</Pressable>
				))}
			</ScrollView>
		</View>
	)
}

export default Categories
