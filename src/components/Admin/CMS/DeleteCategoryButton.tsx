"use client"

import type React from "react"

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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import axios from "@/lib/axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface DeleteButtonDialogProps {
  categoryName: string
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

interface Category {
  name: string
  imageUrl: string
}

export default function DeleteCategoryButton({ categoryName, setCategories }: DeleteButtonDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/cms/categories/${categoryName}`)

      if (response.status === 200) {
        setCategories((prev) => prev.filter((category) => category.name !== categoryName))
        toast.success(`Category "${categoryName}" deleted successfully`, {
          position: "top-center",
          theme: "dark",
        })
        setOpen(false)
      }
    } catch (error: any) {
      console.error("Failed to delete category:", error)
      toast.error(error.message || "Failed to delete category", {
        position: "top-center",
        theme: "dark",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg border-destructive/20"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2">
            This action cannot be undone. This will permanently delete the category 
            <Badge variant="outline" className="mx-1 font-semibold">
              {categoryName}
            </Badge>
            and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel 
            disabled={isDeleting}
            className="rounded-lg"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90 rounded-lg"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
