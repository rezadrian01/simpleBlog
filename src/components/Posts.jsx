import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../store/post-slice";

import PostCard from "./PostCard";

import Loading from "./Loading";
import Error from "./Error";

export default function Posts() {
  const dispatch = useDispatch();
  const { hasError, isLoading } = useSelector((state) => state.ui);
  const [data, setData] = useState({
    posts: [],
    totalPosts: 0,
  });
  useEffect(() => {
    const fetch = async () => {
      const resData = await dispatch(fetchPosts());
      if (resData) {
        setData((prevData) => ({
          ...prevData,
          posts: resData.posts,
          totalPosts: resData.totalPosts,
        }));
      }
    };
    fetch();
  }, []);

  return (
    <>
      {hasError && <Error />}
      {isLoading && <Loading />}
      {!isLoading && !hasError && (
        <ol className="flex flex-col gap-4">
          {data.posts.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
        </ol>
      )}
      {!isLoading && !hasError && (
        <p className="text-center font-thin mt-8 text-slate-500">
          Total Posts: {data.totalPosts}
        </p>
      )}
    </>
  );
}
