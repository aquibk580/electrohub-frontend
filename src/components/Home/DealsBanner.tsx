// import React from 'react'
import { Card } from '../ui/card'
import { assets } from '@/assets/assets'

const DealsBanner = () => {
    return (
        <div className='space-y-6'>
        <div className='space-y-1.5 '>
        <h1 className='text-3xl font-bold'>Best Products For You</h1>
        <p className='text-accent-foreground/80'>Experience the joy of effortless shopping with a handpicked selection of top-quality products, perfectly curated to match your lifestyle and needs.</p>
        </div>
            <div className='grid gap-3'>
                <div className='grid  grid-cols-1 md:grid-cols-2  gap-3 '>
                    <Card className='bg-muted/70  dark:bg-transparent dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none cursor-pointer rounded-2xl flex justify-between h-56 md:h-60  lg:h-72 px-2 '>
                        <div className='h-full  w-3/4  flex flex-col items-start pl-4 lg:pl-8 space-y-6 justify-center  '>
                            <div className='space-y-1 lg:space-y-2.5'>
                                <h1 className='text-4xl lg:text-5xl text-accent-foreground font-bold'>Samsung </h1>
                                <p className=' text-xl lg:text-2xl text-accent-foreground/85 font-light'>Samsung S25 Ultra 12GB</p>
                            </div>

                            <div>
                                <span className='text-lg text-accent-foreground/85'>Starting at</span>
                                <h2 className='text-3xl text-primary/95 font-bold'>₹<span className='text-2xl'>80,XXX</span></h2>
                            </div>
                        </div>
                        <div className=' flex items-center justify-center'>
                            <img className='h-full w-full object-contain' src={assets.mobile} alt="" />
                        </div>
                    </Card>
                    <Card className='bg-muted/70  dark:bg-transparent dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none cursor-pointer rounded-2xl flex justify-between h-56 md:h-60  lg:h-72 px-2 '>
                        <div className='h-full  w-3/4  flex flex-col items-start pl-4 lg:pl-8 space-y-6 justify-center  '>
                            <div className='space-y-1 lg:space-y-2.5'>
                                <h1 className='text-4xl lg:text-5xl text-accent-foreground font-bold'>Samsung </h1>
                                <p className=' text-xl lg:text-2xl text-accent-foreground/85 font-light'>Samsung S25 Ultra 12GB</p>
                            </div>

                            <div>
                                <span className='text-lg text-accent-foreground/85'>Starting at</span>
                                <h2 className='text-3xl text-primary/95 font-bold'>₹<span className='text-2xl'>80,XXX</span></h2>
                            </div>
                        </div>
                        <div className=' flex items-center justify-center'>
                            <img className='h-full w-full object-contain' src={assets.mobile} alt="" />
                        </div>
                    </Card>
                    
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3  gap-3'>
                    <Card className='bg-muted/70 dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none cursor-pointer rounded-2xl flex h-40 lg:h-60 px-2 '>
                        <div className='text-black dark:text-slate-50 h-full  flex flex-col items-start pl-2 lg:pl-4 space-y-2 lg:space-y-6 justify-center  '>
                            <div className=' lg:space-y-2'>
                                <h1 className='text-lg md:text-xl lg:text-3xl font-bold'>Samsung </h1>
                                <p className=' text-xs md:text-md lg:text-xl font-light'>Samsung S25 Ultra 12GB</p>
                            </div>

                            <div>
                                <span className='text-xs md:text-sm lg:text-lg'>Starting at</span>
                                <h2 className='text-md  lg:text-2xl text-primary/95 font-bold'>₹<span className='text-sm md:text-md lg:text-xl'>80,XXX</span></h2>
                            </div>
                        </div>
                        <div className=' flex items-center justify-center'>
                            <img className='h-full w-full object-contain' src={assets.laptop} alt="" />
                        </div>
                    </Card>
                    <Card className='bg-muted/70 dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none cursor-pointer rounded-2xl flex h-40 lg:h-60 px-2 '>
                        <div className='text-black dark:text-slate-50 h-full  flex flex-col items-start pl-2 lg:pl-4 space-y-2 lg:space-y-6 justify-center  '>
                            <div className=' lg:space-y-2'>
                                <h1 className='text-lg md:text-xl lg:text-3xl font-bold'>Samsung </h1>
                                <p className=' text-xs md:text-md lg:text-xl font-light'>Samsung S25 Ultra 12GB</p>
                            </div>

                            <div>
                                <span className='text-xs md:text-sm lg:text-lg'>Starting at</span>
                                <h2 className='text-md  lg:text-2xl text-primary/95 font-bold'>₹<span className='text-sm md:text-md lg:text-xl'>80,XXX</span></h2>
                            </div>
                        </div>
                        <div className=' flex items-center justify-center'>
                            <img className='h-full w-full object-contain' src={assets.laptop} alt="" />
                        </div>
                    </Card>
                    <Card className='bg-muted/70 dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black/60 shadow-none border-slate-400 dark:border-none cursor-pointer rounded-2xl flex h-40 lg:h-60 px-2 '>
                        <div className='text-black dark:text-slate-50 h-full  flex flex-col items-start pl-2 lg:pl-4 space-y-2 lg:space-y-6 justify-center  '>
                            <div className=' lg:space-y-2'>
                                <h1 className='text-lg md:text-xl lg:text-3xl font-bold'>Samsung </h1>
                                <p className=' text-xs md:text-md lg:text-xl font-light'>Samsung S25 Ultra 12GB</p>
                            </div>

                            <div>
                                <span className='text-xs md:text-sm lg:text-lg'>Starting at</span>
                                <h2 className='text-md  lg:text-2xl text-primary/95 font-bold'>₹<span className='text-sm md:text-md lg:text-xl'>80,XXX</span></h2>
                            </div>
                        </div>
                        <div className=' flex items-center justify-center'>
                            <img className='h-full w-full object-contain' src={assets.laptop} alt="" />
                        </div>
                    </Card>
                   
                </div>
            </div>
        </div>
    )
}

export default DealsBanner
