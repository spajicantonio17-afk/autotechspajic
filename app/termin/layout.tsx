import { cookies } from "next/headers";
import { INTERN_COOKIE, isValidPassword } from "@/lib/auth";
import InternLogin from "@/components/InternLogin";

export const metadata = {
  title: "Autotech Spajic — Interni unos termina",
  robots: { index: false, follow: false },
};

export default async function TerminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authed = isValidPassword(cookieStore.get(INTERN_COOKIE)?.value);

  if (!authed) {
    return <InternLogin />;
  }

  return <>{children}</>;
}
