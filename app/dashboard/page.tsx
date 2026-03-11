"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import * as htmlToImage from "html-to-image";

export default function Dashboard() {

  const [snippets,setSnippets] = useState<any[]>([]);
  const [title,setTitle] = useState("");
  const [language,setLanguage] = useState("");
  const [code,setCode] = useState("");

  const fetchSnippets = async () => {

    const { data, error } = await supabase
      .from("snippets")
      .select("*");

    if(!error){
      setSnippets(data || []);
    }

  };

  useEffect(()=>{
    fetchSnippets();
  },[]);

  const createSnippet = async () => {

    if(!title || !language || !code){
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("snippets")
      .insert([
        {
          title,
          language,
          code
        }
      ]);

    if(error){
      alert(error.message);
    } else {
      setTitle("");
      setLanguage("");
      setCode("");
      fetchSnippets();
    }

  };

  const deleteSnippet = async (id:number) => {

    const { error } = await supabase
      .from("snippets")
      .delete()
      .eq("id", id);

    if(!error){
      fetchSnippets();
    }

  };

  const copyLink = (id:number) => {

    const url = `${window.location.origin}/s/${id}`;

    navigator.clipboard.writeText(url);

    alert("Link copied!");
  };

  const exportImage = async (id:number) => {

    const element = document.getElementById(`snippet-${id}`);

    if(!element) return;

    const dataUrl = await htmlToImage.toPng(element);

    const link = document.createElement("a");
    link.download = "snippet.png";
    link.href = dataUrl;
    link.click();
  };

  return (

    <div style={{
      maxWidth:"900px",
      margin:"auto",
      padding:"40px",
      fontFamily:"sans-serif"
    }}>

      {/* Header */}

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:"30px"
      }}>

        <h1 style={{fontSize:"28px"}}>SnippetVault</h1>

        <button
          onClick={async ()=>{
          await supabase.auth.signOut();
            window.location.href="/login";
          }}
          style={{
            padding:"8px 16px",
            borderRadius:"6px",
            border:"none",
            background:"#ef4444",
            color:"white",
            cursor:"pointer"
          }}
        >
          Logout
        </button>

      </div>


      {/* Create snippet */}

      <h2>Create Snippet</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        style={{
          width:"100%",
          padding:"10px",
          marginTop:"10px",
          borderRadius:"6px",
          border:"1px solid #ccc"
        }}
      />

      <input
        placeholder="Language (javascript, python...)"
        value={language}
        onChange={(e)=>setLanguage(e.target.value)}
        style={{
          width:"100%",
          padding:"10px",
          marginTop:"10px",
          borderRadius:"6px",
          border:"1px solid #ccc"
        }}
      />

      <textarea
        placeholder="Write your code"
        value={code}
        onChange={(e)=>setCode(e.target.value)}
        rows={6}
        style={{
          width:"100%",
          padding:"10px",
          marginTop:"10px",
          borderRadius:"6px",
          border:"1px solid #ccc"
        }}
      />

      <button
        onClick={createSnippet}
        style={{
          marginTop:"10px",
          padding:"10px 18px",
          borderRadius:"6px",
          border:"none",
          background:"#2563eb",
          color:"white",
          cursor:"pointer"
        }}
      >
        Save Snippet
      </button>


      {/* Snippet list */}

      <h2 style={{marginTop:"40px"}}>Your Snippets</h2>

      {snippets.length === 0 ? (
        <p style={{color:"#6b7280"}}>
          No snippets yet. Create your first snippet 🚀
        </p>
      ) : (
        snippets.map((snippet)=>(
          <div
            id={`snippet-${snippet.id}`}
            key={snippet.id}
            style={{
              border:"1px solid #e5e7eb",
              borderRadius:"10px",
              padding:"20px",
              marginTop:"20px",
              background:"#111827",
              color:"white",
              boxShadow:"0 4px 10px rgba(0,0,0,0.2)"
            }}
          >

            <h3>{snippet.title}</h3>

            <p style={{opacity:0.7}}>
              Language: {snippet.language}
            </p>

            <SyntaxHighlighter
              language={snippet.language}
              style={oneDark}
            >
              {snippet.code}
            </SyntaxHighlighter>

            <div style={{marginTop:"10px"}}>

              <button
                onClick={()=>copyLink(snippet.id)}
                style={{
                  padding:"8px 14px",
                  marginRight:"10px",
                  borderRadius:"6px",
                  border:"none",
                  background:"#2563eb",
                  color:"white",
                  cursor:"pointer"
                }}
              >
                Share
              </button>

              <button
                onClick={()=>deleteSnippet(snippet.id)}
                style={{
                  padding:"8px 14px",
                  marginRight:"10px",
                  borderRadius:"6px",
                  border:"none",
                  background:"#dc2626",
                  color:"white",
                  cursor:"pointer"
                }}
              >
                Delete
              </button>

              <button
                onClick={()=>exportImage(snippet.id)}
                style={{
                  padding:"8px 14px",
                  borderRadius:"6px",
                  border:"none",
                  background:"#059669",
                  color:"white",
                  cursor:"pointer"
                }}
              >
                Export Image
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}