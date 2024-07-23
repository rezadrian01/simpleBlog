import { useEffect, useState } from "react";
import { fetchPosts } from "../http";
import PostCard from "./PostCard";

export default function Posts() {
  const [posts, setposts] = useState({
    posts: [],
    totalPost: 0,
    fetched: false,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true);
    async function fetchingPosts() {
      try {
        const resultPosts = await fetchPosts();
        setposts({
          posts: [...resultPosts.posts],
          totalPost: resultPosts.totalPost,
          fetched: true,
        });
      } catch (err) {
        setError({ message: err.message || "Failed to fetching posts" });
      }
      setIsFetching(false);
    }
    fetchingPosts();
  }, []);
  if (error) {
    return <p>An error occured</p>;
  }
  return (
    <>
      {posts.fetched && (
        <ol className="flex flex-col gap-4">
          {posts.posts.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
        </ol>
      )}
      {isFetching && (
        <p className="animate-pulse text-center">Fetching post...</p>
      )}
      <p>{!isFetching && posts.totalPost}</p>
    </>
  );
}
