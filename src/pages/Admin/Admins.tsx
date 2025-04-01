import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/Admin/data-table";
import { formatDate } from "@/lib/utils";
import { Admin } from "@/types/entityTypes";
import { toast } from "react-toastify";
import axios from "@/lib/axios";

const Admins = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/admins`
        );
        if (response.status === 200) {
          setAdmins(response.data);
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

  const tableHeaders = [
    { key: "srNo", label: "Sr.No" },
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Admin Since" },
  ];

  const tableData = admins.map((admin, index) => ({
    srNo: index + 1,
    id: admin.id,
    name: admin.name,
    email: (
      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
        {admin.email}
      </span>
    ),
    createdAt: formatDate(admin.createdAt),
  }));

  // const handleRowClick = (row: any) => {
  //   // Handle row click if needed
  //   console.log("Admin clicked:", row);
  // };

  return (
    <div className="p-4">
      <Card className="rounded-xl bg-primary/5 border-primary/75 dark:bg-gradient-to-br from-primary/10 via-slate-900/20 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Admin List
          </CardTitle>
          <CardDescription>Manage Admins on Electrohub</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {loading ? (
              <AdminTableSkeleton />
            ) : (
              <DataTable
                headers={tableHeaders}
                data={tableData}
                // type="admins"
                // onRowClick={handleRowClick}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminTableSkeleton = () => {
  return (
    <Card className="rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="w-full">
          <div className="min-w-[800px] rounded-xl overflow-hidden">
            {/* Skeleton Header */}
            <div className="bg-primary/75 flex p-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-1 min-w-32">
                  <Skeleton className="h-6 w-24 bg-primary/40" />
                </div>
              ))}
              <div className="w-[50px]"></div>
            </div>
            
            {/* Skeleton Rows */}
            <div className="bg-white dark:bg-black">
              {[1, 2, 3, 4].map((row) => (
                <div key={row} className="flex items-center p-3 border-b border-primary/25">
                  {[1, 2, 3, 4, 5].map((cell) => (
                    <div key={cell} className="flex-1 min-w-32">
                      <Skeleton className="h-5 w-full max-w-32 bg-primary/10" />
                    </div>
                  ))}
                  <div className="w-[50px] flex justify-center">
                    <Skeleton className="h-5 w-5 bg-primary/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Admins;