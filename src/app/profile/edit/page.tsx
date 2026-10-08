
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import EditProfileForm from "./EditProfileForm";

export default async function EditProfilePage() {
  const auth = await getAuth();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin?callbackURL=%2Fprofile%2Fedit");
  }

  return (
    <EditProfileForm
      initialName={session.user.name}
      initialEmail={session.user.email}
      initialImage={session.user.image ?? ""}
    />
  );
}
