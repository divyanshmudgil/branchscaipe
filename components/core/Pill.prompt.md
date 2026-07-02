Rounded interactive chip — tool toggles, filters, suggested prompts, branch chips.

```jsx
<Pill iconLeft={<Sliders size={14} />} selected>Tools</Pill>
<Pill removable onRemove={…}>main</Pill>
```

`selected` gives the iris-tinted active state. `removable` adds a × affordance.
