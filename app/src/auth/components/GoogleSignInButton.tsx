// GoogleSignInButton — wraps the design system's Button with the Google
// sign-in call, a loading state, and error surfacing via a caller-supplied
// callback (so it can reuse the app's existing Toast rather than owning UI
// for errors itself).
import React, { useState } from "react";
import { Button } from "../../design-system/components/core/index.js";
import { useAuth } from "../hooks/useAuth";

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

export function GoogleSignInButton({
  onError,
  fullWidth = true,
  size = "lg",
}: {
  onError?: (message: string) => void;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    // On success the browser navigates away to Google's OAuth screen, so
    // there's nothing further to do here; only the error path resolves
    // while this component is still mounted.
    if (error) {
      setLoading(false);
      onError?.(error);
    }
  };

  return (
    <Button
      variant="secondary"
      size={size}
      fullWidth={fullWidth}
      disabled={loading}
      iconLeft={<GoogleGlyph />}
      onClick={handleClick}
    >
      {loading ? "Connecting…" : "Continue with Google"}
    </Button>
  );
}
