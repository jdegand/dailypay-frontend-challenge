interface ModalProps {
  ballot: {},
  setBallot: Function,
  setOpenModal: Function
}

const Modal = (props: ModalProps) => {
  const handleClose = () => {
    props.setOpenModal(false);
    props.setBallot({
      "best-picture": undefined,
      "best-director": undefined,
      "best-actor": undefined,
      "best-actress": undefined,
      "best-supporting-actor": undefined,
      "best-supporting-actress": undefined,
      "best-visual-effects": undefined,
    });
  };

  function transformTextToTitleCase(string: string) {
    return string
      .split("-")
      .map((el: any) => el[0].toUpperCase() + el.substring(1).toLowerCase())
      .join(" ");
  }

  return (
    <div data-testid="modal" className="overlay">
      <div className="modalContainer">
        <button
          data-testid="modal-close"
          className="modal-close"
          type="button"
          onClick={handleClose}
        >
          X
        </button>
        <div>
          {Object.entries(props.ballot).map(([key, value]: any, i) => {
            return (
              <dl key={key}>
                <dt>{transformTextToTitleCase(key)} :</dt>
                <dd>{transformTextToTitleCase(value)}</dd>
              </dl>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
