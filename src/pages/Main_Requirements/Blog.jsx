import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";

const Blog = () => {
    const requests = async () => {
        const { data } = await axios(`https://job-seeking-flax.vercel.app/blogs`, { withCredentials: true })
        return data;
    }
    // get 
    const { data: blogs = [], isLoading, isError, error } = useQuery({
        queryFn: () => requests(),
        queryKey: ['blogs']
    })

    if (isLoading) return <Loader></Loader>
    if (isError || error) {
        return console.log(isError, error)
    }
    return (
        <div className="py-5 md:py-10">
             <Helmet>
                <title>Blog | CareerPath</title>
            </Helmet>
            <h1 className="text-2xl font-semibold">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 mb-14">
                {blogs.map(blog =>
                    <Link to={`/blog/${blog._id}`} key={blog._id} className="text-black shadow-md hover:shadow-xl hover:scale-[1.025] transition-all rounded-lg bg-[url('https://i.ibb.co/hch8Kbm/ix-GTl1715763309.png')]">
                        <figure><img className="rounded-t-lg" src={blog.blogImg}/></figure>
                        <div className="px-3 py-8 space-y-3">
                            <h2 className="card-title">{blog.que}</h2>
                            <p>{blog.answer.slice(0, 100)}...</p>
                            <div className="flex justify-between">
                                <p className="text-[17px] font-semibold ">{blog.writer.name}</p>
                                <p className="text-[17px] font-semibold text-end">{blog.postDate}</p>
                            </div>
                        </div>
                    </Link>)}
            </div>
        </div>
    );
};

export default Blog;