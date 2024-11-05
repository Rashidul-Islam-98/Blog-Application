import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const baseURL = process.env.REACT_APP_BASE_URL;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const { search } = useLocation();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const catParam = urlSearchParams.get("cat");

    const fetchPosts = async () => {
      let res;
      if (catParam) {
        res = await axios.get(`${baseURL}/api/posts/?page=${page}&cat=${catParam}`);
      } else {
        res = await axios.get(`${baseURL}/api/posts/?page=${page}`);
      }
      setPosts(res.data.result);
      setTotal(res.data.total);
    };

    fetchPosts();
  }, [page, search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
      <div className="paginationButton">
        {page > 1 && <button onClick={() => setPage((prevPage) => prevPage - 1)}>Prev</button>}
        <button>{page}</button>
        {page < Math.ceil(total / 4) && <button onClick={() => setPage((prevPage) => prevPage + 1)}>Next</button>}
      </div>
    </>
  );
}
