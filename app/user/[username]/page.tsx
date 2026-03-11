"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useParams } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  username: string;
}

export default function UserProfile(){

  const params = useParams();
  const username = params.username;

  const [snippets,setSnippets] = useState<Snippet[]>([]);

  useEffect(()=>{

    const fetchSnippets = async ()=>{

      const { data, error } = await supabase
        .from("snippets")
        .select("*")
        .eq("username", username);

      if(!error){
        setSnippets(data || []);
      }

    };

    fetchSnippets();

  },[username]);

  return(

    <div style={{padding:"40px"}}>

      <h1>{username}&apos;s Snippets</h1>

      {snippets.length === 0 ? (
        <p>No public snippets</p>
      ) : (
        snippets.map((snippet)=>(
          <div
            key={snippet.id}
            style={{
              border:"1px solid gray",
              padding:"15px",
              margin:"15px 0"
            }}
          >

            <h3>{snippet.title}</h3>

            <p><b>Language:</b> {snippet.language}</p>

            <SyntaxHighlighter
              language={snippet.language}
              style={oneDark}
            >
              {snippet.code}
            </SyntaxHighlighter>

          </div>
        ))
      )}

    </div>
  );
}