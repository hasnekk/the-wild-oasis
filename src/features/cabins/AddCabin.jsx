// 3-TD PARTY MODULES

// MY COMPONENTS
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        <Modal.Open opens="table">
          <Button>Add new table</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setisOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setisOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setisOpenModal(false)}>
//           <CreateCabinForm onClose={() => setisOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
