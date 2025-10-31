import SignUpForm from "@/components/signup-form";
import { requireNoAuth } from "@/lib/auth-utils";

export default async function SignInPage() {
  await requireNoAuth();

  return <SignUpForm />;
}
