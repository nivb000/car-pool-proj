import React from 'react'

const blogId = ({ params }: { params: { id: string } }) => {
  return <div>
    Hi from Blog ID {params.id}
  </div>
}

export default blogId