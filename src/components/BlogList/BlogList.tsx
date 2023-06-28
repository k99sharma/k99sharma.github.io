// importing components
import { useState, useEffect, useContext } from "react";

// helper functions
import { formatBlogDate } from "../../utils/helper";

// importing context
import ThemeContext from "../../context/ThemeContext";

// prop type
type blogListPropType = {
  count: number;
};

// blog info type
type blogType = {
  publishDate: string;
  title: string;
  url: string;
};

// blog list component
export default function BlogList({ count }: blogListPropType) {
  const [blogs, setBlogs] = useState<blogType[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        // variables and queries are required for fetching blogs
        const variables = { page: 0 };
        const query = `
                  query GetUserArticles($page: Int!){
                      user(username: "kalashsharma99"){
                          publication {
                              posts(page: $page){
                                  slug
                                  title
                                  brief
                                  coverImage
                                  dateAdded
                              }
                          }
                      }
                  }`;

        // fetching data from hashnode
        const data = await fetch("https://api.hashnode.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });

        let res = await data.json(); // parse data
        res = res.data.user.publication.posts; // blogs data array

        const blogs = res.map(
          (data: {
            brief: string;
            coverImage: string;
            dateAdded: string;
            slug: string;
            title: string;
          }) => {
            return {
              publishDate: formatBlogDate(data.dateAdded),
              title: data.title,
              url: `https://kalashsharma.hashnode.dev/${data.slug}`,
            };
          }
        );

        setBlogs(count >= 0 ? blogs.splice(0, count) : blogs); // set blogs
      } catch (e) {
        console.log("Unable to fetch blogs at the moment.");
        setBlogs([]); // set to empty array
      }
    }

    // invoke fetching
    fetchBlogs();
  }, [count]);

  return (
    <div className="blogList">
      <BlogView blogs={blogs} />
    </div>
  );
}

// blog view prop type
type blogViewPropType = {
  blogs: blogType[];
};

// blog view component
function BlogView({ blogs }: blogViewPropType) {
  // theme context
  const themeCtx = useContext(ThemeContext);
  const { theme } = themeCtx;

  return (
    <>
      {blogs.length !== 0 ? (
        <div className="blogView">
          {blogs.map((blog) => {
            return (
              <div key={blog.title} className="blog my-5">
                <div className="blog__button subheading mb-1 w-full">
                  <button
                    className={`hover:border-b-2 ${
                      theme === "dark"
                        ? "hover:border-red-600"
                        : "hover:border-cyan-700"
                    }`}
                    role="button"
                    type="button"
                  >
                    <a target="_blank" href={blog.url}>
                      <p className={theme === "dark" ? "text-zinc-200" : ""}>
                        {blog.title}
                      </p>
                    </a>
                  </button>
                </div>

                <div className="blog__date text-neutral-500 font-extralight text-sm">
                  {blog.publishDate}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className={`blogView__empty heading content text-md ${
            theme === "dark" ? "text-zinc-200" : ""
          }`}
        >
          No blogs to be found. Stay tuned for upcoming articles!
        </div>
      )}
    </>
  );
}
