import { useEffect, useState, useContext } from "react";
import { deletePost } from "../http";
import PostCard from "./PostCard";

//context
import { PostContext } from "../store/Post-Context";
import { MenuContext } from "../store/Menu-Context";

import Loading from "./Loading";
import Error from "./Error";

export default function MyPost() {
  const { fetchingUserPosts, deletingPost, postContextState, resetState } =
    useContext(PostContext);
  const [data, setData] = useState({
    error: false,
    isLoading: false,
    posts: [],
    totalPosts: 0,
  });
  async function handleDeletePost(postId) {
    setData((prevData) => ({
      ...prevData,
      posts: prevData.posts.filter((post) => post._id !== postId),
    }));
    const result = await deletingPost(postId);
    if (!result) {
      setData((prevData) => ({ ...prevData, error: true }));
      return;
    }
    return;
  }

  useEffect(() => {
    async function fetchUserPost() {
      if (!data.isLoading) {
        setData((prevData) => ({ ...prevData, isLoading: true }));
      }
      const result = await fetchingUserPosts();
      if (!data.isLoading && data.error) {
        setData((prevData) => ({
          ...prevData,
          isLoading: false,
          error: true,
        }));
        return;
      }
      setData((prevData) => ({
        ...prevData,
        posts: result.posts,
        totalPosts: result.totalPosts,
        isLoading: false,
        error: false,
      }));
      return;
    }
    fetchUserPost();
  }, [fetchingUserPosts]);
  return (
    <section>
      {data.error && <Error />}
      {data.isLoading && <Loading />}
      {!data.error && !data.isLoading && data.posts?.length > 0 && (
        <ol className="flex flex-col gap-4">
          {data.posts?.map((post) => {
            return (
              <PostCard
                key={post._id.toString()}
                post={post}
                isMyPost={true}
                onDelete={handleDeletePost}
              />
            );
          })}
        </ol>
      )}
      {!data.error && !data.isLoading && data.posts?.length === 0 && (
        <p className="text-center">You dont have any post yet.</p>
      )}
    </section>
  );
}
