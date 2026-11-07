import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PanelRender from "./PanelRender";



const Storefront = () => {
  const { slug } = useParams(); //grabs the slug and assigns it to a var
  const [store, setStore] = useState(undefined);

  useEffect(() => {
    fetch(`/api/stores/${slug}`).then((res) => { //takes the slug and fetches the store info from the database
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Store request failed: ${res.status}`);
      return res.json();
    }).then(setStore).catch(() => setStore(null)); //sets store to null if there is an error
  }, [slug]);

  if (store === undefined) return <p> Loading... </p>;
  if (store === null) return <p> This store doesn't exist.</p>;
  if (store.layout == null) return <p>This store is still being set up. Come back later.</p>;

  return <PanelRender node={Storefront.layout} />;
}

export default Storefront
