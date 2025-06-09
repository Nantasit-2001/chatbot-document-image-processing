// components/SwitchComponent.jsx
function SwitchComponent({ label = "switch", value, onChange }) {
  return (
    <div className="switch-row">
      <label className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
      <p className="switch-label">
        {label}
      </p>
    </div>
  );
}

export default SwitchComponent;
