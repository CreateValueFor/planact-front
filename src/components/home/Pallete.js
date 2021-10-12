import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

const colorList = [
  "#55EFC4",
  "#81ECEC",
  "#74B9FF",
  "#A29BFE",
  "#DFE6E9",
  "#00B894",
  "#00CEC9",
  "#0984E3",
  "#6C5CE7",
  "#B2BEC3",
  "#FFEAA7",
  "#FAB1A0",
  "#FF7675",
  "#FD79A8",
  "#636E72",
  "#FDCB6E",
  "#E17055",
  "#D63031",
  "#E84393",
  "#2D3436",
];

function Pallete() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="filter-item"
        style={{ cursor: "pointer" }}
      >
        컬러
      </div>
      <Collapse in={open}>
        <div
          id="example-collapse-text"
          style={{
            display: open ? "flex" : "none",
            flexWrap: "wrap",
            height: 180,
          }}
        >
          {colorList.map((color) => (
            <div style={{ width: "20%", maginBottom: "20px", height: 48 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: color,
                  borderRadius: "50%",
                }}
              />
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
}

export default Pallete;
