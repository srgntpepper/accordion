import { useState } from "react";

import data from "./data";
import "./styles.css";
//single selection

//multiple selection

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMutiSelection(getCurrentId) {
    setMultiple((prevMultiple) => {
      const updatedSelection = [...prevMultiple];
      const indexOfId = updatedSelection.indexOf(getCurrentId);

      if (indexOfId === -1) updatedSelection.push(getCurrentId);
      else updatedSelection.splice(indexOfId, 1);

      return updatedSelection;
    });
  }

  return (
    <div className="wrapper">
      <button
        onClick={() => {
          setEnableMultiSelection((prevState) => !prevState);
          setSelected(null);
          setMultiple([]);
        }}
        className="multiselection"
      >
        {enableMultiSelection ? `Disable` : `Enable`} Multi-Selection
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMutiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="head"
              >
                <h3>{dataItem.head}</h3>
                <span>+</span>
              </div>
              {selected === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="paragraph">{dataItem.paragraph}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No data found </div>
        )}
      </div>
    </div>
  );
}
