Merge confirmation strip with a parent picker. `scope="chat"` merges the whole branch; `scope="response"` merges one response.

```jsx
<MergeBanner source="Closure" parent="Hooks" scope="chat" onConfirm={…} onCancel={…} onChooseParent={…} />
```
