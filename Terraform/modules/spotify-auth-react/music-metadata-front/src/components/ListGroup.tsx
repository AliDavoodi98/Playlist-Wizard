import { Fragment } from "react/jsx-runtime";
import {MouseEvent, useDebugValue, useEffect, useState} from "react";
import axios from "axios";
import FetchSpotify from "./FetchSpotify";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { UnstableSSR as SSR } from "react-photo-album/ssr";
import { UnstableServerPhotoAlbum as ServerPhotoAlbum } from "react-photo-album/server";



interface Props {
  token: string;
}

const ListGroup = ({token}: Props) => {
  const handleClick = (event: MouseEvent) => console.log(event);
  const logimage = ((image: any[]) => console.log(image));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [imgs, setImg] = useState<any[]>([]);
  const [processedImages, setProcessedImages] = useState<any[]>([]);

  let method = "GET";
  let body = null;
  let endpoint = 'v1/me/top/tracks';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchSpotify({endpoint: endpoint,token: token, method: method});
        //const result = await response.json();
        setData(response.items);

        const sources = response.items.map(
          (item: any) => item.album.images[0]
        );

        setImg(sources);
        
        const processedImages = imgs.map(image => ({
          src: image.url,
          width: image.width,
          height: image.height,
        }));
        
        setProcessedImages( processedImages);
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
      <RowsPhotoAlbum 
        photos={processedImages}     // Ensures row-based layout
        targetRowHeight={30}       // Adjust row height to make it proportional
        spacing={15}                // Space between images
        size={[
          { width: 40, height: 30 },  // Adjust sizes for responsiveness
          { width: 30, height: 20 },
        ]}
        breakpoints={[340, 102]}   // Adjust behavior for different screen sizes
        skeleton={<div style={{ width: "100%", minHeight: 800 }} />}
      />


    </Fragment>
  );
}

export default ListGroup;
