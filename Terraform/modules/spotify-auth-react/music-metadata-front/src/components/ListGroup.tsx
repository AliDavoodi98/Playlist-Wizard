import { Fragment } from "react/jsx-runtime";
import {MouseEvent, useDebugValue, useEffect, useState} from "react";
import axios from "axios";
import FetchSpotify from "./FetchSpotify";

interface Props {
  token: string;
}

const ListGroup = ({token}: Props) => {
  const handleClick = (event: MouseEvent) => console.log(event);
  const logimage = ((image: JSON) => console.log(image));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  let method = "GET";
  let body = null;
  let endpoint = 'v1/me/top/tracks';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchSpotify({endpoint: endpoint,token: token, method: method});
        //const result = await response.json();
        setData(response.items);
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
            onClick={() => {setSelectedIndex(index); handleClick; logimage(item);}}
          >
            <span className="pull-left">
              <img src={item.album.images[0].url} className="img-responsive img-rounded" />
            </span>
            {item.name}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
