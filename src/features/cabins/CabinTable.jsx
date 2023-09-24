// 3-TD PARTY MODULES
import { useSearchParams } from "react-router-dom";

// MY COMPONENTS
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

// MY HOOKS
import { useCabins } from "./useCabins.js";

// MY SERVICES

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  let filterBy = searchParams.get("discount");
  let filteredCabins;

  // filter
  switch (filterBy) {
    case "all":
      filteredCabins = cabins;
      break;

    case "no-discount":
      filteredCabins = cabins.filter((cabin) => !Boolean(cabin.discount));
      break;

    case "with-discount":
      filteredCabins = cabins.filter((cabin) => Boolean(cabin.discount));
      break;

    default:
      filteredCabins = cabins;
      break;
  }

  // sort
  let sortBy = searchParams.get("sortBy") || "startDate-asc";
  let [field, direction] = sortBy.split("-");
  let modifier = direction === "asc" ? 1 : -1;
  let sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
