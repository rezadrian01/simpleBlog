import { useEffect, useState } from "react";
import { deletePost, getUserPost } from "../http";
import PostCard from "./PostCard";

export default function MyPost({ onEditing }) {
  const [data, setData] = useState({
    userPosts: [],
    totalPost: 0,
    error: false,
    isFetching: false,
  });
  async function handleDeletePost(postId) {
    try {
      const resData = await deletePost(postId);
      console.log(resData);
    } catch (err) {
      setData((prevData) => {
        return {
          ...prevData,
          error: err.message || "Failed to delete post.",
        };
      });
      console.log(err);
    }
    setData((prevData) => {
      return {
        ...prevData,
        userPosts: [
          ...prevData.userPosts.filter((post) => post._id !== postId),
        ],
      };
    });
  }
  useEffect(() => {
    async function fetchingUserPost() {
      setData((prevData) => {
        return {
          ...prevData,
          isFetching: true,
        };
      });
      try {
        const resData = await getUserPost();
        // console.log(resData);
        setData((prevData) => {
          return {
            ...prevData,
            userPosts: [...resData.posts],
            totalPost: resData.totalPosts,
          };
        });
      } catch (err) {
        setData((prevData) => {
          return {
            ...prevData,
            error: err.message || "Failed to fetching user posts",
          };
        });
        console.log(err);
      }
      setData((prevData) => {
        return {
          ...prevData,
          isFetching: false,
        };
      });
    }
    fetchingUserPost();
  }, []);
  return (
    <section>
      {data.isFetching && (
        <p className="text-center animate-pulse">Fetching user post...</p>
      )}
      {!data.error && data.userPosts?.length > 0 && (
        <ol className="flex flex-col gap-4">
          {data.userPosts?.map((post) => {
            return (
              <PostCard
                key={post._id.toString()}
                post={post}
                isMyPost={true}
                onEditing={onEditing}
                onDelete={handleDeletePost}
              />
            );
          })}
        </ol>
      )}
      {!data.error && !data.isFetching && data.userPosts?.length === 0 && (
        <p className="text-center">You dont have any post yet.</p>
      )}
    </section>
  );
}
