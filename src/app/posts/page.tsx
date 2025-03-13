import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axios-instance";

import { Post, PostTable } from "./components/post-table";

const fetchPosts = async (): Promise<[Post]> => {
  const { data } = await axiosInstance.get("/posts");
  return data as [Post];
};

export default async function Page() {
  const posts = await fetchPosts();

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4">
        <div className="flex-col items-center justify-between space-y-2 md:flex md:flex-row">
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
        </div>
        <div className="grid gap-4">
          <Card className="col-span-2 lg:col-span-3">
            <CardContent>
              <div className="space-y-8">
                <PostTable initialData={posts} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
