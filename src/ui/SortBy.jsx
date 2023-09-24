// 3-TD PARTY MODULES
import { useSearchParams } from "react-router-dom";

// MY COMPONENTS
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={sortBy}
      type="white"
    />
  );
}

export default SortBy;
