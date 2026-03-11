"use client";

import { useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function TestPage() {

  useEffect(() => {

    const testConnection = async () => {
      const { data, error } = await supabase
        .from("snippets")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    };

    testConnection();

  }, []);

  return <div>Supabase Test Page - Check Console</div>;
}