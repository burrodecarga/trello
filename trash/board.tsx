import { deleteBoard } from '@/actions/update-board/index'
import { Button } from '@/components/ui/button'
import FormDelete from './form-delete'

interface BoardProps {
  title: string
  id: string
}

export const Board = ({ id, title }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id)
  return (
    <form
      action={deleteBoardWithId}
      className='flex items-center gap-x-2 justify-between'
    >
      <p>Board :{title}</p>
      <FormDelete />
    </form>
  )
}
