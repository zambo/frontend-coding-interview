import { signInAction } from "@/lib/actions";
import { Input } from "@/components/ui/base/input";
import { SubmitButton } from "./SubmitButton";

export function SignInForm() {
  return (
    <form action={signInAction} className="space-y-8">
      <div className="grid gap-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Input
          id="username"
          name="username"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}
