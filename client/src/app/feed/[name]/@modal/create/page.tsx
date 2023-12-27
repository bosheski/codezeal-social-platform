import React from 'react'
import Modal from '../../../../../components/Modal/Modal'
import CreatePost from '../../../../../components/Modals/CreatePost'
import { fetchFollowedCategories } from '../../../../actions'

type Props = {}

async function CreatePostModal({ }: Props) {
 const params = {
  offset: 0,
  limit: 8,
 }
 const followedCategories = await fetchFollowedCategories(params);
 const formattedCategories = followedCategories ? followedCategories.map(category => ({
  label: category.name,
  value: category.name,
  followers: category.followers.length,
 })) : [];
 const groupedOptions = [
  {
   label: 'Your Categories',
   options: formattedCategories
  },
 ]
 return (
  <Modal>
   <CreatePost groupedOptions={groupedOptions} />
  </Modal>
 )
}

export default CreatePostModal