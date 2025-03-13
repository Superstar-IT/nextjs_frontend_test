import { Post, PostTable } from "@/app/posts/components/post-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios-instance";
import { formatAddress } from "@/lib/utils";

import { User } from "../components/user-table";

const fetchUserById = async (user_id: string): Promise<User> => {
  const { data } = await axiosInstance.get(`/users/${user_id}`); // Axios auto-parses JSON
  return data as User;
};
const fetchPostsByUserId = async (user_id: string): Promise<[Post]> => {
  const { data } = await axiosInstance.get(`/users/${user_id}/posts`); // Axios auto-parses JSON
  return data as [Post];
};

export default async function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await fetchUserById(id);
  const posts = await fetchPostsByUserId(id);

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4">
        <div className="flex-col items-center justify-between space-y-2 md:flex md:flex-row">
          <h2 className="text-3xl font-bold tracking-tight">{`${user.name ? `${user.name}'s` : ""} Posts`}</h2>
        </div>
        <div className="grid gap-4">
          <Card className="col-span-2 lg:col-span-3">
            {user && (
              <CardHeader>
                <CardTitle>
                  {user.name} ({user.username})
                </CardTitle>
                <CardDescription>
                  Email: {user.email} Phone: {user.phone} Site: {user.website}
                </CardDescription>
                <CardDescription>Address: {formatAddress(user.address)}</CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <div className="space-y-8">
                <PostTable initialData={posts} userId={id} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
