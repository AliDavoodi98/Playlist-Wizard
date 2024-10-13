import { Fragment } from "react/jsx-runtime";
import {MouseEvent, useState} from "react";
import axios from "axios";

function ListGroup() {
  const items = ["Eminem", "Jay-z", "Playboi Carti"];
  const handleClick = (event: MouseEvent) => console.log(event);
  
  // Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Fragment>
      <h1>List</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
                selectedIndex === index ? "list-group-item active" : "list-group-item"
            }
            key={item}
            onClick={() => {setSelectedIndex(index); handleClick;}}
          >
            {item}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
