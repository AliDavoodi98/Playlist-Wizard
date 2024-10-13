import { Fragment } from "react/jsx-runtime";
import {MouseEvent, useDebugValue, useEffect, useState} from "react";
import axios from "axios";
import FetchSpotify from "./FetchSpotify";

const ListGroup = () => {
  const items = ["Eminem", "Jay-z", "Playboi Carti"];
  const handleClick = (event: MouseEvent) => console.log(event);
  const token = 'BQAjsTw948KEz7XgZGe_iF0vLTTKtI6q-yq88k_jkGzpnZXyrPJZsVVUG9LBYRVDCVDlxnlSAg9ztmOZ_aMUvEDVmM7_fOzs27T9CKcLZxhYank9aINt78Fng9Hd9S7MBsgwYe3OfTRPxOcYjS5R91qfxjfqUSyx6TLqoZhU3vrlgHkb7Duy8fF41LOik9ec2uHut86PihF9k3EfxcRn4KGppWXLNY0Uie7GmIPckMTVBZs3NmcOHh7iSqyer_bCR9shCoCI5e8lyzUp54tHYoVemXSdbH2WY0bN';
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  let method = "GET";
  let body = null;
  let endpoint = 'v1/me/top/tracks?time_range=long_term&limit=5';

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
