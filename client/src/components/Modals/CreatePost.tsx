'use client';
import React, { useState } from 'react';
import { useUser } from '../../app/provider';
import { EscapeIcon } from '../../ui/escape-icon';
import SelectCategory from '../helpers/Select';
import styles from './CreatePost.module.scss'
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';
type Props = {
  groupedOptions: any;
}

type CategoryResult = {
  id: string;
  name: string;
  followers: any;
}

type CategoryOption = {
  label: string;
  value: string;
}


function CreatePost({ groupedOptions }: Props) {
  const [isSearchingCategory, setIsSearchingCategory] = useState(false);
  const user = useUser();
  const [categoryOptions, setCategoryOptions] = useState<any[]>(groupedOptions);
  const handleDebouncedTerm = useDebouncedCallback((search: string) => {
    if (!search) return setCategoryOptions(groupedOptions);
    searchCharacters(search);
  }, 200);

  const searchCharacters = async (search: string) => {
    if (!search) return setCategoryOptions(groupedOptions);
    const followedCategories = await fetch(`http://localhost:3005/categories/search/${search}/${user?.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await followedCategories.json();

    //groupedOptions already has followed categories limited to 8

    const followedObjects = data.filter(obj => obj.followers.length > 0).map(obj => ({
      label: obj.name,
      value: obj.name,
    }));
    const otherObjects = data.filter(obj => obj.followers.length === 0).map(obj => ({
      label: obj.name,
      value: obj.name,
    }));

    setCategoryOptions(prevState => {
      const newState = [...prevState];
      // target first object
      const firstObject = newState[0];
      // add only non existing objects to the array
      const existingValues = new Set(firstObject.options.map(o => o.value));
      const updatedObjects = followedObjects.filter(obj => !existingValues.has(obj.value));
      // add only if there are new objects
      if (updatedObjects.length > 0) {
        const updatedSubObject = [...firstObject.options, ...updatedObjects];
        console.log('updatedSubObject', updatedSubObject)

        newState[0] = {
          ...firstObject,
          options: updatedSubObject
        }
      }
      // add other objects
      if (otherObjects.length > 0) {
        if (newState[1]) {
          newState[1] = {
            ...newState[1],
            options: otherObjects
          }
        } else {
          newState[1] = {
            label: "Other Categories",
            options: otherObjects
          }
        }
      }
      return newState
    });
    setIsSearchingCategory(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={user ? user.image : 'https://api.realworld.io/images/smiley-cyrus.jpeg'} alt="author image" className={styles.authorImage} />
        <p>{user ? user.name : 'Unknown'}</p>
      </div>
      <div className={styles.escape}>
        <EscapeIcon />
      </div>
      <SelectCategory
        options={categoryOptions}
        width={300}
        isLoading={isSearchingCategory}
        onInputChange={(value: string, meta: any) => {
          handleDebouncedTerm(value)
        }}
        placeholder="Select Category" />
    </div>
  )
}

export default CreatePost