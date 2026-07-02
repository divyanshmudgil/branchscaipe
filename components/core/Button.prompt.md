Soft, rounded action button — use for any primary or secondary action across the product.

```jsx
<Button variant="brand" size="lg" iconLeft={<GitBranch size={18} />}>Branch from here</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" size="sm">Retry</Button>
```

Variants: `primary` (iris fill), `brand` (aurora gradient CTA — use sparingly), `secondary` (recessed surface), `ghost` (text only), `danger`. Sizes `sm | md | lg`. Pass `iconLeft` / `iconRight` as Lucide nodes. Hover lifts, press settles to `scale(0.98)`.
