import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const PersonalInfo = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "Raihan Shaikh",
      phone: "9090909090",
      gender: "male",
      address: "Mumbra, Kausa",
      securityAnswer: "Gold",
    },
  });

  interface FormData {
    name: string;
    phone: string;
    gender: string;
    address: string;
    securityAnswer: string;
  }

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Card className="rounded-lg shadow-md">
      <CardContent className="p-6">
        <h1 className="text-2xl font-semibold mb-8">Personal Information</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Name</Label>
                <Button variant="link" className="text-blue-600 h-auto p-0">
                  Edit
                </Button>
              </div>
              <Input {...register("name")} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Phone</Label>
                <Button variant="link" className="text-blue-600 h-auto p-0">
                  Edit
                </Button>
              </div>
              <Input {...register("phone")} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Your Gender</Label>
                <Button variant="link" className="text-blue-600 h-auto p-0">
                  Edit
                </Button>
              </div>
              <RadioGroup defaultValue="male" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Address</Label>
                <Button variant="link" className="text-blue-600 h-auto p-0">
                  Edit
                </Button>
              </div>
              <Input {...register("address")} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Answer to security question</Label>
              <Button variant="link" className="text-blue-600 h-auto p-0">
                Edit
              </Button>
            </div>
            <Input {...register("securityAnswer")} />
          </div>

          <Button
            type="button"
            variant="destructive"
            className="w-full sm:w-auto"
          >
            Delete Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
