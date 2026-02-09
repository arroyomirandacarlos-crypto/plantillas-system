import { supabase } from "../../lib/supabase";

export async function GET({ url }) {
  const q = url.searchParams.get("q") || "";

  const { data } = await supabase
    .from("plantillas")
    .select("*")
    .or(`
      aplicativo.ilike.%${q}%,
      solicitud.ilike.%${q}%,
      servicio.ilike.%${q}%,
      resumen.ilike.%${q}%,
      cierre.ilike.%${q}%,
      observacion.ilike.%${q}%
    `)
    .limit(50);

  return new Response(JSON.stringify(data), { status: 200 });
}
