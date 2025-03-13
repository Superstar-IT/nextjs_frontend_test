import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios-instance";

import { Post } from "../components/post-table";

import { Comment, CommentTable } from "./components/comment-table";

const fetchCommentByPostId = async (post_id: string): Promise<[Comment]> => {
  const { data } = await axiosInstance.get(`/posts/${post_id}/comments`);
  return data as [Comment];
};

const fetchPostById = async (post_id: string): Promise<Post> => {
  const { data } = await axiosInstance.get(`/posts/${post_id}`);
  return data as Post;
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const posts = await fetchCommentByPostId(id);
  const post = await fetchPostById(id);

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4">
        <div className="flex-col items-center justify-between space-y-2 md:flex md:flex-row">
          <h2 className="text-3xl font-bold tracking-tight">Comments on Post - {id}</h2>
        </div>
        <div className="grid gap-4">
          <Card className="col-span-2 lg:col-span-3">
            {post && (
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.body}</CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <div className="space-y-8">
                <CommentTable initialData={posts} postId={id} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
