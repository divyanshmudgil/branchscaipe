Icon-only button — rails, toolbars, message-action bars. Always pass a `label` (used for tooltip + a11y).

```jsx
<IconButton icon={<Search size={20} />} label="Search" />
<IconButton icon={<Settings size={20} />} label="Settings" variant="soft" active />
```

Variants `ghost | soft | solid`, shapes `rounded | circle`, sizes `sm | md | lg`.
