"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("perfis")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!data || data.role !== "admin") {
        router.push("/");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) return <p>Verificando acesso...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>
      <p>Bem-vinda, administradora!</p>
    </div>
  );
}
