export default function PagintationButtons({
  selectedPage,
  setSelectedPage,
  maxPage,
}: {
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
}) {
  function handleBackButtonClick() {
    if (selectedPage === 1) return;
    setSelectedPage((prevPage) => prevPage - 1);
  }

  function handleNextButtonClick() {
    setSelectedPage((prevPage) => prevPage + 1);
  }

  const button1 =
    selectedPage === 1
      ? 1
      : selectedPage === maxPage
        ? selectedPage - 2
        : selectedPage - 1;
  const button2 =
    selectedPage === 1
      ? selectedPage + 1
      : selectedPage === maxPage
        ? selectedPage - 1
        : selectedPage;
  const button3 =
    selectedPage === 1
      ? selectedPage + 2
      : selectedPage + 1 > maxPage
        ? maxPage
        : selectedPage + 1;

  return (
    <div className="join">
      <button
        className="btn join-item"
        disabled={selectedPage === 1}
        onClick={() => setSelectedPage(1)}
      >
        «
      </button>
      <button
        className="btn join-item"
        disabled={selectedPage === 1}
        onClick={handleBackButtonClick}
      >
        ‹
      </button>
      <button
        className={"btn join-item" + (selectedPage === 1 && " btn-active")}
        onClick={() => setSelectedPage(button1)}
      >
        {button1}
      </button>
      <button
        className={
          "btn join-item" +
          (selectedPage !== 1 && selectedPage !== maxPage && " btn-active")
        }
        onClick={() => setSelectedPage(button2)}
      >
        {button2}
      </button>
      <button
        className={
          "btn join-item" + (selectedPage === maxPage && " btn-active")
        }
        onClick={() => setSelectedPage(button3)}
      >
        {button3}
      </button>
      <button
        className="btn join-item"
        disabled={selectedPage === maxPage}
        onClick={handleNextButtonClick}
      >
        ›
      </button>
      <button
        className="btn join-item"
        disabled={selectedPage === maxPage}
        onClick={() => setSelectedPage(maxPage)}
      >
        »
      </button>
    </div>
  );
}
