'use client';

import React, { useCallback } from 'react'
import styles from './CategoriesFilter.module.scss';
import { LayoutGroup } from 'framer-motion';
import { Toggle } from './Toggle';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Props = {}

function CategoriesFilter({ }: Props) {
 const searchParams = useSearchParams();
 const pathname = usePathname();
 const toggleFollowed = () => {
  const params = new URLSearchParams(searchParams);
  params.set('cat', 'followed');
  return params.toString();
 }
 const toggleAll = () => {
  const params = new URLSearchParams(searchParams);
  params.set('cat', 'all');
  return params.toString();
 }

 const isFollowedOn = searchParams.get('cat') === 'followed' || !searchParams.has('cat');
 const isAllOn = searchParams.get('cat') === 'all';
 return (
  <LayoutGroup>
   <div className={styles.outer}>
    <Link href={pathname + '?' + toggleFollowed()}
     className={styles.container} type="button">
     <Toggle text="Followed Categories" isOn={isFollowedOn} />
    </Link>
    <Link href={pathname + '?' + toggleAll()}
     className={styles.container} type="button">
     <Toggle text="All Categories" isOn={isAllOn} />
    </Link>
   </div>
  </LayoutGroup >
 )
}

export default CategoriesFilter