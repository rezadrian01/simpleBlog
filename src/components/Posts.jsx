import { useEffect, useState, useContext } from "react";
import { fetchPosts } from "../http";
import PostCard from "./PostCard";
import { PostContext } from "../store/Post-Context";

export default function Posts() {
  const { fetchingPosts, postContextState } = useContext(PostContext);
  const [error, setError] = useState(false);
  // console.log(error);
  useEffect(() => {
    async function fetchPosts() {
      const result = await fetchingPosts();
      if (!result) {
        setError(true);
      } else {
        setError(false);
      }
      return;
    }
    fetchPosts();
  }, [fetchingPosts]);

  if (error) {
    return (
      <div className="text-center">
        <h3 className="text-xl">An error occured</h3>
        <p>Something went wrong please comeback later.</p>
      </div>
    );
  }
  return (
    <>
      {!postContextState.isLoading && (
        <ol className="flex flex-col gap-4">
          {postContextState.posts.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
        </ol>
      )}
      {postContextState.isLoading && (
        <p className="animate-pulse text-center">Fetching post...</p>
      )}
      <p className="text-center font-thin mt-8 text-slate-500">
        {!postContextState.isLoading &&
          "Total Posts: " + postContextState.totalPosts}
      </p>
    </>
  );
}
