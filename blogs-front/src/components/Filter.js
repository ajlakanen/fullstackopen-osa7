export const Filter = ({ value, onChange }) => {
  return (
    <p>
      Filter shown with{" "}
      <input
        value={value}
        name="filter"
        aria-labelledby="filter blogs by"
        onChange={onChange}
      />
    </p>
  );
};
