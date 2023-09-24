// 3-TD PARTY MODULES
import styled from "styled-components";

// react-icon
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

// MY SERVICES
import { formatCurrency } from "../../utils/helpers.js";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { useCreateCabin } from "./useCreateCabin.js";

// MY COMPONENTS
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    images: image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      images: image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinID} />

            <Menus.List id={cabinID}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                disabled={isCreating}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinID)}
              />
            </Modal.Window>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
