import { assets } from "@/assets/assets";
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
import { Button } from "../ui/button";
//   import { Button } from "@/components/ui/button"

interface DeleteButtonDialogProps {
  id: number;
  text: string;
  handleDelete: (id: number) => void;
  isDeleting: boolean;
}

export default function DeleteButtonDialog({
  id,
  handleDelete,
  isDeleting,
  text,
}: DeleteButtonDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
        <Button className="bg-red-50 border border-red-600 hover:bg-red-100 dark:bg-red-900/25 font-semibold text-red-700 flex items-center space-x-2 p-1.5 px-2.5 shadow-none rounded-xl ">
          <div className=" w-4 h-4  flex items-center  justify-center rounded-lg">
            <img src={assets.del} className="w-6" />
          </div>
          {!isDeleting ? text : "Deleting..."}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this product will permanently
            remove it from our system, and it cannot be restored. Are you sure
            you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => handleDelete(id)}
          >
            {!isDeleting ? "Continue" : "Deleting..."}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
