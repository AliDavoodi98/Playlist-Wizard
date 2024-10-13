import { Fragment } from "react/jsx-runtime";
import axios from "axios";


function ListGroup() {
  const items = [
    'Eminem',
    'Jay-z',
    'Playboi Carti'
  ]

  return (
    <Fragment>
        <h1>List</h1>
        <ul className="list-group">
        {items.map((item) =>(
            <li>{item}</li>
        ))}
        </ul>
    </Fragment>
  );
}

export default ListGroup;
