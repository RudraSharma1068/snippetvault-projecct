"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSignup = async () => {

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    setLoading(false);

    if(error){
      alert(error.message);
    } else {
      alert("Signup successful! Please login.");
      router.push("/login");
    }
  };

  return (

    <div style={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"#020617",
      fontFamily:"sans-serif"
    }}>

      <div style={{
        width:"380px",
        background:"#111827",
        padding:"35px",
        borderRadius:"10px",
        boxShadow:"0 10px 25px rgba(0,0,0,0.4)",
        color:"white"
      }}>

        <h2 style={{
          textAlign:"center",
          marginBottom:"25px"
        }}>
          Create SnippetVault Account
        </h2>

        {/* Email */}

        <div style={{marginBottom:"18px"}}>

          <label style={{
            display:"block",
            marginBottom:"6px",
            fontWeight:"500",
            color:"#9ca3af"
          }}>
            📧 Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              borderRadius:"6px",
              border:"1px solid #374151",
              background:"#020617",
              color:"white"
            }}
          />

        </div>

        {/* Password */}

        <div style={{marginBottom:"20px"}}>

          <label style={{
            display:"block",
            marginBottom:"6px",
            fontWeight:"500",
            color:"#9ca3af"
          }}>
            🔒 Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              borderRadius:"6px",
              border:"1px solid #374151",
              background:"#020617",
              color:"white"
            }}
          />

        </div>

        {/* Signup Button */}

        <button
          onClick={handleSignup}
          style={{
            width:"100%",
            padding:"12px",
            borderRadius:"6px",
            border:"none",
            background:"#2563eb",
            color:"white",
            fontWeight:"500",
            cursor:"pointer"
          }}
        >
          {loading ? "Creating account..." : "Signup"}
        </button>

        {/* Login Link */}

        <p style={{
          marginTop:"18px",
          textAlign:"center",
          fontSize:"14px",
          color:"#9ca3af"
        }}>
          Already have an account?{" "}
          <a href="/login" style={{color:"#3b82f6"}}>
            Login
          </a>
        </p>

      </div>

    </div>
  );
}