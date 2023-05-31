import { Inter } from 'next/font/google'
import Todo from '@/Components/Todo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='bg-blue-200 min-h-screen w-full'>
      <Todo/>
      
    </div>
  )
}
