import { redirect } from "next/navigation";

export default function SdcEventosPublicRedirect() {
  redirect("/admin/sdc/eventos");
}
