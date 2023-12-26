import React from 'react'
import Modal from '../../../../components/Modal/Modal'
import CreatePost from '../../../../components/Modals/CreatePost'
type Props = {}

function CreatePostPage({ }: Props) {
 console.log('CreatePostPage')
 return (
  <Modal>
   <CreatePost />
  </Modal>
 )
}

export default CreatePostPage