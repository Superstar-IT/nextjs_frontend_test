import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios-instance";

import { User, UserTable } from "./components/user-table";

const fetchUsers = async (): Promise<[User]> => {
  const { data } = await axiosInstance.get("/users");
  return data as [User];
};

export default async function PostDetailsPage() {
  const users = await fetchUsers();

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4">
        <div className="flex-col items-center justify-between space-y-2 md:flex md:flex-row">
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        </div>
        <div className="grid gap-4">
          <Card className="col-span-2 lg:col-span-3">
            <CardContent>
              <div className="space-y-8">
                <UserTable initialData={users} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
