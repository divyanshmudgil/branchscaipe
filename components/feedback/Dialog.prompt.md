Centered modal over a blurred scrim — merge confirmation, settings.

```jsx
<Dialog open={open} onClose={close} title="Merge chat to parent?"
  description="Closure will be merged into Hooks. You can continue the conversation after."
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button variant="brand">Merge</Button></>} />
```
