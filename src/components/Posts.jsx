import { useEffect, useState } from "react";
import { fetchPosts } from "../http";

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
            const date = new Date(post.createdAt);
            const formatedDate = date.toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <li
                className="bg-slate-900 p-4 rounded-lg shadow-lg w-5/6 sm:w-4/6 md:w-1/2 lg:w-1/3 mx-auto"
                key={post._id}
              >
                <div>
                  <div className="flex w-full justify-between items-center">
                    <h1 className="font-bold text-xl mb-2">
                      {post.creator.username}
                    </h1>
                    <h2 className="font-semibold text-sm text-slate-500">
                      {formatedDate}
                    </h2>
                  </div>
                  <div>
                    <h3 className="font-bold">{post.title}</h3>
                  </div>
                  <p className="font-thin">{post.content}</p>
                </div>
              </li>
            );
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
