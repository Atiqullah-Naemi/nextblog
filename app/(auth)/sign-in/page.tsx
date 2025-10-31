import SignInForm from "@/components/signin-form";
import { requireNoAuth } from "@/lib/auth-utils";

export default async function SignInPage() {
  await requireNoAuth();
  return <SignInForm />;
}
