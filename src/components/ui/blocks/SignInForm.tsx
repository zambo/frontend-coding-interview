import { signInAction } from "@/lib/actions";
import { Input } from "@/components/ui/base/input";
import { SubmitButton } from "./SubmitButton";
import { cn } from "@/lib/utils";

export function SignInForm(props: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form action={signInAction} className={cn("space-y-8", props.className)}>
      <div className="grid gap-3">
        {/* TODO: extract label to a component DRY  */}
        <label htmlFor="username" className="text-sm font-bold">
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
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-bold">
            Password
          </label>
          <a
            href="/forgot-password"
            className="text-xs text-blue-600 hover:underline"
            tabIndex={0}
          >
            Forgot password?
          </a>
        </div>
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
