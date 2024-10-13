import { Fragment } from "react/jsx-runtime";
import {MouseEvent, useDebugValue, useEffect, useState} from "react";
import axios from "axios";
import FetchSpotify from "./FetchSpotify";

const ListGroup = () => {
  const items = ["Eminem", "Jay-z", "Playboi Carti"];
  const handleClick = (event: MouseEvent) => console.log(event);
  const token = 'BQBKh6Ju7UdVlPxUokr72gYFg4U23BmH7TdtWJh9XCEKnAEJXvQ_fRAmifS0lPrU83nDqjqUfJXIcMabRj-3zbeTzkN6g2fJgHdL61-4gQ9hNR83m1bwr0X3TmB0RwTl4BGY9mUL--pqH2tmSOlW_qpPH0JEAxP57W77wU9HWmosnhgbuVQYrkbv-mQHeXsVlT-xDiQ6PxPIYB5JePbXZcewCcjH0PK_DJjvJ6-9wn5uWfFswZ-EGu6hLMgMi43DRiiCKvNVc-qPlq_o-23pmFlWqlgohVUP54qz';
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  let method = "GET";
  let body = null;
  let endpoint = 'v1/me/top/tracks';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method
          });
        const result = await response.json();
        setData(result.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Fragment>
      <h1>List</h1>
      {loading && <p>Loading...</p>}
      {!loading && data.length === 0 && <p>No item found</p>}
      {data.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {data.map((item, index) => (
          <li
            className={
                selectedIndex === index ? "list-group-item active" : "list-group-item"
            }
            key={item.id}
            onClick={() => {setSelectedIndex(index); handleClick;}}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
