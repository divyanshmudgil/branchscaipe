// Landing — shown when there is no authenticated session and the visitor
// hasn't chosen Guest mode yet. Two ways in: Google (Supabase Auth) or
// Guest (no account, nothing persisted — see auth/services/authService.ts).
import React from "react";
import { Button } from "./design-system/components/core/index.js";
import { LandingBackground } from "./LandingBackground";
import { GoogleSignInButton } from "./auth/components/GoogleSignInButton";
import { useAuth } from "./auth/hooks/useAuth";

export function Landing({ onToast }: { onToast: (toast: { tone: string; icon: string; title: string; desc?: string | null }) => void }) {
  const { continueAsGuest } = useAuth();

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        background: "var(--bg)",
        overflow: "hidden",
        padding: 24,
      }}
    >
      <LandingBackground />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          width: "100%",
          maxWidth: 380,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          <div
            className="bsc-wordmark"
            style={{
              fontSize: 40,
              display: "inline-flex",
              alignItems: "baseline",
              letterSpacing: "0.08em",
              fontWeight: 700,
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>BRANCHSC</span>
            <span
              style={{
                background: "var(--gradient-brand)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              AI
            </span>
            <span style={{ color: "var(--text-primary)" }}>PE</span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--fs-body)",
              color: "var(--text-muted)",
              maxWidth: 320,
              lineHeight: 1.6,
            }}
          >
            Branch any answer, explore a different path, and merge it back — without ever losing your place.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          <GoogleSignInButton
            onError={(message) =>
              onToast({ tone: "error", icon: "alert-triangle", title: "Couldn't sign in with Google", desc: message })
            }
          />
          <Button variant="ghost" size="lg" fullWidth onClick={continueAsGuest}>
            Continue as Guest
          </Button>
        </div>

        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-micro)",
            color: "var(--text-muted)",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Guest conversations stay on this device for this session only.
        </div>
      </div>
    </div>
  );
}
