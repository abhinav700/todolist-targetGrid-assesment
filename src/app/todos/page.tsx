"use client"
import Todos from '@/components/Todos';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
function page() {
  
  return (
    <>
      <Todos/>
    </>
  
    )
}

export default page