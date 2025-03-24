import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import axios from "@/lib/axios";
import { clearUser, setUser } from "@/redux/slices/user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: user!.name,
      phone: user!.phone,
      gender: user!.gender || "Male",
      address: user!.address,
      answer: user!.answer,
    },
  });

  interface FormData {
    name: string;
    phone: string;
    gender: "Male" | "Female";
    address: string;
    answer: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    answer: string;
    gender: "Male" | "Female";
  }

  const onSubmit = (data: FormData) => { };

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  type FieldType = "name" | "address" | "phone" | "gender" | "answer";

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/${user!.id}`
      );
      if (response.status === 200) {
        dispatch(clearUser());
        navigate("/");
        toast.success(
          `${response.data?.user?.name}'s account deleted successfully`,
          { position: "top-center", theme: "dark" }
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async (field: FieldType) => {
    setEditingField(null);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/${user!.id}`,
        { [field]: watch(field as keyof FormData) }
      );

      if (response.status === 200) {
        dispatch(
          setUser({
            ...user!,
            [field]: response.data?.user[field],
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
    console.log(`Saving ${field}:`, watch(field as keyof FormData));
  };

  const renderField = (field: keyof FormData, label: string) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        {editingField === field ? (
          <div className="space-x-2">
            <Button
              variant="secondary"
              className="bg-blue-600 text-white hover:bg-blue-500"
              size="sm"
              onClick={() => handleSave(field)}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              className="bg-blue-600 text-white hover:bg-blue-500"
              size="sm"
              onClick={() => setEditingField("")}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="link"
            className="text-blue-600 h-auto p-0"
            onClick={() => handleEdit(field)}
          >
            Edit
          </Button>
        )}
      </div>
      <Input {...register(field)} disabled={editingField !== field} />
    </div>
  );

  return (
    <Card className="rounded-xl shadow-md">
      <Helmet>
        <title>{user?.name || `My Profile - Electrohub`}</title>
        <meta
          name="description"
          content="Manage your personal details, update shipping addresses, and customize your shopping experience at Electrohub."
        />
      </Helmet>

      <CardContent className="p-6">
        <h1 className="text-2xl font-semibold mb-8">Personal Information</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderField("name", "Name")}
            {renderField("phone", "Phone")}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Your Gender</Label>
                {editingField === "gender" ? (
                  <div className="space-x-2">
                    <Button
                      variant="secondary"
                      className="bg-blue-600 text-white hover:bg-blue-500"
                      size="sm"
                      onClick={() => handleSave("gender")}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      className="bg-blue-600 text-white hover:bg-blue-500"
                      size="sm"
                      onClick={() => setEditingField("")}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="link"
                    className="text-blue-600 h-auto p-0"
                    onClick={() => handleEdit("gender")}
                  >
                    Edit
                  </Button>
                )}
              </div>
              <RadioGroup
                defaultValue={watch("gender")}
                className="flex gap-4"
                disabled={editingField !== "gender"}
                onValueChange={(value: "Male" | "Female") =>
                  setValue("gender", value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="Male" />
                  <Label htmlFor="Male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="Female" />
                  <Label htmlFor="Female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {renderField("address", "Address")}
          </div>

          {renderField("answer", "Answer to security question")}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                className="w-full sm:w-auto"
              >
                {!isDeleting ? "Delete Account" : "Deleting..."}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white"
                  onClick={handleDelete}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
