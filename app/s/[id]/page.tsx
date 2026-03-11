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
}

export default function SnippetPage() {

  const params = useParams();
  const id = params.id;

  const [snippet, setSnippet] = useState<Snippet | null>(null);

  useEffect(()=>{

    const fetchSnippet = async ()=>{

      const { data, error } = await supabase
        .from("snippets")
        .select("*")
        .eq("id", id)
        .single();

      if(!error){
        setSnippet(data);
      }

    };

    fetchSnippet();

  },[id]);

  if(!snippet){
    return <p style={{padding:"40px"}}>Loading...</p>
  }

  return(

    <div style={{padding:"40px"}}>

      <h1>{snippet.title}</h1>

      <p><b>Language:</b> {snippet.language}</p>

      <SyntaxHighlighter language={snippet.language} style={oneDark}>
        {snippet.code}
      </SyntaxHighlighter>

    </div>

  );
}