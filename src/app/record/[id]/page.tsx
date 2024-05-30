import React from 'react'

const RecordDetails = ({ params }: { params: { id: string } }) => {
  return <div>
    Hi from Blog ID {params.id}
  </div>
}

export default RecordDetails