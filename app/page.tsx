"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  
  useEffect(()=>{
    router.push("/login");
  },[router]);

  return <p style={{padding:"40px"}}>Redirecting...</p>;
}