// BscIcon — lucide wrapper for the UI kit. Exposes window.BscIcon.
function BscIcon({ name, size = 20, sw = 1.75, color = "currentColor", style = {} }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        attrs: { width: size, height: size, "stroke-width": sw, stroke: color },
        nameAttr: "data-lucide",
      });
    }
  }, [name, size, sw, color]);
  return <span ref={ref} style={{ display: "inline-flex", alignItems: "center", ...style }} />;
}
window.BscIcon = BscIcon;
