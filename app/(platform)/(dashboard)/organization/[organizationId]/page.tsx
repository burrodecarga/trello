import { create } from '@/actions/create-board'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()
  return (
    <div className='flex flex-col space-y-4'>
      <form action={create}>
        <input
          id='title'
          name='title'
          placeholder='Enter Board'
          className='border-black border p-1 rounded'
          required
        />
        <Button type='submit'>submit</Button>
      </form>
      <div className='space-y-2'>
        {boards.map((board) => (
          <div key={board.id}>board.title</div>
        ))}
      </div>
    </div>
  )
}

export default OrganizationIdPage
