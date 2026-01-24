'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { useBlogIndex } from '@/hooks/use-blog-index'
import { useConfigStore } from '@/app/(home)/stores/config-store'

export default function Page() {
	const { items, loading } = useBlogIndex()
	const { siteContent } = useConfigStore()

	// 筛选出分类为"软件"的文章
	const softwareArticles = items.filter(item => item.category === '软件')

	if (loading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='text-secondary text-sm'>加载中...</div>
			</div>
		)
	}

	return (
		<div className='container mx-auto px-4 py-16'>
			<div className='mb-12 text-center'>
				<h1 className='text-4xl font-bold mb-4'>宝藏软件</h1>
				<p className='text-secondary'>精选软件推荐与评测</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{softwareArticles.map((article) => (
					<motion.div
							key={article.slug}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							whileHover={{ 
								scale: 1.02,
								rotate: [0, -1, 1, -1, 0],
								transition: { 
									duration: 0.5,
									ease: "easeInOut"
								}
							}}
							className='card overflow-hidden w-[300px] h-[100px]'
						>
						<Link href={`/blog/${article.slug}`} className='block h-full flex items-center p-3'>
								{article.cover && (
									<div className='w-[85px] h-[85px] overflow-hidden rounded-lg mr-3 ml-[-30px]'>
										<Image
											src={article.cover}
											alt={article.title}
											width={85}
											height={85}
											className='object-cover transition-transform duration-500'
										/>
									</div>
								)}
								<div className='flex-1 flex flex-col pt-[15px]'>
									<h2 className='text-sm font-bold mb-1 transition-colors hover:text-brand line-clamp-1'>
										{article.title}
									</h2>
									{article.summary && (
										<p className='text-secondary text-xs line-clamp-2 mb-1'>
											{article.summary}
										</p>
									)}
									<div className='text-xs text-secondary text-right mt-[30px]'>
																										{new Date(article.date).toLocaleDateString('zh-CN')}
																									</div>
								</div>
							</Link>
					</motion.div>
				))}
			</div>

			{softwareArticles.length === 0 && (
				<div className='text-center py-16'>
					<div className='text-secondary text-sm'>暂无软件分类的文章</div>
				</div>
			)}
		</div>
	)
}
