import { useLoaderData } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { Helmet } from "react-helmet";

const BlogDetails = () => {
    const blog = useLoaderData();
    console.log(blog)
    const { blogImg, que, answer, writer, totalLikes, postDate } = blog
    return (
        <div className="max-w-2xl md:px-6 py-5 md:my-16 mx-auto space-y-12 shadow-2xl">
             <Helmet>
                <title>Blog Details | CareerPath</title>
            </Helmet>
            <article className="space-y-8">
                <div>
                    <img src={blogImg} alt="" />
                </div>
                <div className="space-y-6 px-2">
                    <h1 className="text-2xl font-bold md:tracking-tight md:text-3xl">{que}</h1>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <img src={writer.img} alt="" className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <p className="text-lg font-medium">{writer.name}</p>
                                <p className="">{postDate}</p>
                            </div>
                        </div>
                        <p className="text-xl">{totalLikes} Likes</p>
                    </div>
                </div>
                <div className="px-2 flex flex-wrap gap-2 border-t border-dashed dark:border-gray-600"></div>
                <div className="px-2">
                    <p className="text-justify">{answer}</p>
                </div>
            </article>
            <div className="flex border-t border-gray-600"></div>
            <div className="flex justify-end px-2">
                <button className="btn btn-active px-5 text-lg"><FaRegHeart />Like</button>
            </div>
        </div>
    );
};

export default BlogDetails;