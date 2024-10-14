import { Fragment } from "react/jsx-runtime";
import { MouseEvent, useEffect, useState } from "react";
import FetchSpotify from "./FetchSpotify";
import { RowsPhotoAlbum } from "react-photo-album";
import "./style.css"; // Import your CSS file

interface Props {
  token: string;
}

const ListGroup = ({ token }: Props) => {
  const handleClick = (event: MouseEvent) => console.log(event);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [imgs, setImg] = useState<any[]>([]);
  const [processedImages, setProcessedImages] = useState<any[]>([]);

  let method = "GET";
  let body = null;
  let endpoint = "v1/me/top/tracks?time_range=short_term&limit=50";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchSpotify({
          endpoint: endpoint,
          token: token,
          method: method,
        });
        setData(response.items);

        const sources = response.items
          .filter(
            (item: any) =>
              item.album.name !== "Inja Tehroone" &&
              item.artists.name !== "Alireza Gharaei Manesh" &&
              item.artists.name !== "¥$"
          )
          .map((item: any) => item.album.images[0]);

        setImg(sources);

        const processedImages = sources.map((image) => ({
          src: image.url,
          width: image.width,
          height: image.height,
          className: "photo-frame", // Apply the frame class
        }));

        setProcessedImages(processedImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, endpoint, method]);

  return (
    <Fragment>
      <h1>Your Top Tracks for the past month!</h1>
      {loading && <p>Loading...</p>}

      {!loading && data.length === 0 && <p>No item found</p>}

      {!loading && processedImages.length > 0 && (
        <RowsPhotoAlbum
          photos={processedImages}
          targetRowHeight={30}
          spacing={15}
          size={[{ width: 40, height: 30 }]}
          breakpoints={[340, 102]}
          className="rows-photo-album"
          skeleton={<div style={{ width: "100%", minHeight: 800 }} />}
        />
      )}
    </Fragment>
  );
};

export default ListGroup;
