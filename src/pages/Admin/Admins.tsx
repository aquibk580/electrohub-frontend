import { useEffect, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Admin } from "@/types/entityTypes";
import { toast } from "react-toastify";
import axios from "@/lib/axios";

const Admins = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [admins, setAdmin] = useState<Admin[]>([]);

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/admins`
        );
        if (response.status === 200) {
          setAdmin(response.data);
        }
      } catch (error: any) {
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllAdmins();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Admin List
        </CardTitle>
        <CardDescription>Admins on Electrohub</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr.No</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead className="hidden md:table-cell">Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Admin Since
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading ? (
                  admins.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{user.id}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.name}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {user.email}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {formatDate(user.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10">
                      <div className="flex flex-col justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">
                          Loading Admin Details...
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Admins;
