'use client';
import React, { useState } from 'react';
import { useUser } from '../../app/provider';
import { EscapeIcon } from '../../ui/escape-icon';
import SelectCategory from '../helpers/Select';
import styles from './CreatePost.module.scss'
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';
import Link from 'next/link';
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
    setIsSearchingCategory(true);
    if (!search) {
      setIsSearchingCategory(false);
      return setCategoryOptions(groupedOptions);
    }
    searchCharacters(search);
  }, 200);

  const searchCharacters = async (search: string) => {
    if (!search) return setCategoryOptions(groupedOptions);
    try {
      const followedCategories = await fetch(`http://localhost:3005/categories/search/${search}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['search_categories'],
        },
      })
      const data = followedCategories ? await followedCategories.json() : [];

      const formattedCategories = data.map((category: CategoryResult) => ({
        label: category.name,
        value: category.name,
        followers: category.followers.length,
      }));

      if (formattedCategories.length === 0) {
        setIsSearchingCategory(false);
        return setCategoryOptions(groupedOptions)
      }
      const otherCategories = {
        label: 'Other Categories',
        options: formattedCategories
      }
      const newOptions = [...groupedOptions, otherCategories];
      setCategoryOptions(newOptions);
      setIsSearchingCategory(false);
    } catch (error) {
      console.log(error);
      setIsSearchingCategory(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={user ? user.image : 'https://api.realworld.io/images/smiley-cyrus.jpeg'} alt="author image" className={styles.authorImage} />
        <p>{user ? user.name : 'Unknown'}</p>
      </div>
      <Link className={styles.escape} href="/feed/posts">
        <EscapeIcon />
      </Link>
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