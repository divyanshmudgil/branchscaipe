Tiny pill badge for status, counts, and the "NEW" flag.

```jsx
<Badge tone="new" soft={false}>NEW</Badge>
<Badge tone="success" dot>Merged</Badge>
<Badge tone="brand">3 branches</Badge>
```

`tone`: neutral | brand | success | warning | error | info | new. `soft` (default) = tinted; `soft={false}` = solid. `dot` adds a leading status dot.
