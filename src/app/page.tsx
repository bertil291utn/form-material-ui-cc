'use client';
import rangoData from '@/data/data.json';
import { useDispatch } from 'react-redux';
import { initialSetRangeForm } from '@/redux/Range.reducer';
import HomePage from '@/components/Home.page';
import { useEffect } from 'react';




export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialSetRangeForm(rangoData))
  }, [])


  return (
    <>
      <HomePage />
    </>
  )
}
