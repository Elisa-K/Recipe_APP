export default function FilterCheckbox({ value, title, onChange }) {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        value={value}
        id={value}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={value}>
        {title}
      </label>
    </div>
  )
}
