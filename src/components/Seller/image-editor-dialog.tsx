"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import * as bodyPix from "@tensorflow-models/body-pix"
import * as tf from "@tensorflow/tfjs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CloudUpload, Trash2, ChevronDown, Layers, ImageIcon, Code } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Import the background removal libraries
// Note: These would need to be installed in your project
// npm install @imgly/background-removal
// npm install bgremove

interface ImageEditorDialogProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onSave: (editedImage: File) => void
  onDelete: () => void
}

const backgroundColors = [
  "#FFFFFF", // White
  "#000000", // Black
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "transparent", // Transparent
]

type RemovalMethod = "tensorflow" | "imgly" | "bgremove"

export default function ImageEditorDialog({ isOpen, onClose, imageUrl, onSave, onDelete }: ImageEditorDialogProps) {
  const [activeTab, setActiveTab] = useState("edit") // Start with edit tab active
  const [isProcessing, setIsProcessing] = useState(false)
  const [model, setModel] = useState<bodyPix.BodyPix | null>(null)
  const [selectedBgColor, setSelectedBgColor] = useState("#FFFFFF")
  const [segmentation, setSegmentation] = useState<bodyPix.SemanticPersonSegmentation | null>(null)
  const [editedImageUrl, setEditedImageUrl] = useState<string>(imageUrl)
  const [threshold, setThreshold] = useState(0.7)
  const [removalMethod, setRemovalMethod] = useState<RemovalMethod>("tensorflow")

  const originalCanvasRef = useRef<HTMLCanvasElement>(null)
  const outputCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null)

  // Load TensorFlow model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Load the model
        await tf.ready()
        const loadedModel = await bodyPix.load({
          architecture: "MobileNetV1",
          outputStride: 16,
          multiplier: 0.75,
          quantBytes: 2,
        })
        setModel(loadedModel)
      } catch (error) {
        console.error("Failed to load BodyPix model:", error)
      }
    }

    loadModel()
  }, [])

  // Draw the original image on canvas when it changes or dialog opens
  useEffect(() => {
    if (!imageUrl || !isOpen) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      if (originalCanvasRef.current && outputCanvasRef.current) {
        // Set canvas dimensions to match image
        originalCanvasRef.current.width = img.width
        originalCanvasRef.current.height = img.height
        outputCanvasRef.current.width = img.width
        outputCanvasRef.current.height = img.height

        // Draw original image
        const ctx = originalCanvasRef.current.getContext("2d")
        if (ctx) {
          ctx.clearRect(0, 0, img.width, img.height)
          ctx.drawImage(img, 0, 0)
        }

        // Also draw on output canvas initially
        const outCtx = outputCanvasRef.current.getContext("2d")
        if (outCtx) {
          outCtx.clearRect(0, 0, img.width, img.height)
          outCtx.drawImage(img, 0, 0)
        }

        setEditedImageUrl(outputCanvasRef.current.toDataURL("image/png"))
      }
    }
  }, [imageUrl, isOpen])

  // Apply background color when segmentation or color changes
  useEffect(() => {
    if (segmentation && outputCanvasRef.current) {
      applyBackgroundColor(selectedBgColor)
    }
  }, [segmentation, selectedBgColor])

  // Setup drag and drop event listeners
  useEffect(() => {
    const dropArea = dropAreaRef.current
    if (!dropArea) return

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      dropArea.classList.add("border-primary")
    }

    const handleDragLeave = () => {
      dropArea.classList.remove("border-primary")
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      dropArea.classList.remove("border-primary")

      if (e.dataTransfer) {
        const items = e.dataTransfer.items
        let file: File | null = null

        for (const item of items) {
          if (item.kind === "file") {
            file = item.getAsFile()
            break
          } else if (item.kind === "string") {
            // Handle image dragged from a website (URL)
            item.getAsString(async (url) => {
              if (url.startsWith("http")) {
                try {
                  const response = await fetch(url)
                  const blob = await response.blob()
                  const newFile = new File([blob], "dropped-image.jpg", { type: blob.type })
                  handleNewImage(newFile)
                } catch (error) {
                  console.error("Failed to download image:", error)
                }
              }
            })
            return
          }
        }

        if (file) {
          handleNewImage(file)
        }
      }
    }

    dropArea.addEventListener("dragover", handleDragOver)
    dropArea.addEventListener("dragleave", handleDragLeave)
    dropArea.addEventListener("drop", handleDrop)

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver)
      dropArea.removeEventListener("dragleave", handleDragLeave)
      dropArea.removeEventListener("drop", handleDrop)
    }
  }, [])

  const handleNewImage = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = event.target.result as string

        img.onload = () => {
          if (originalCanvasRef.current && outputCanvasRef.current) {
            // Reset canvas dimensions
            originalCanvasRef.current.width = img.width
            originalCanvasRef.current.height = img.height
            outputCanvasRef.current.width = img.width
            outputCanvasRef.current.height = img.height

            // Draw new image
            const ctx = originalCanvasRef.current.getContext("2d")
            if (ctx) {
              ctx.clearRect(0, 0, img.width, img.height)
              ctx.drawImage(img, 0, 0)
            }

            const outCtx = outputCanvasRef.current.getContext("2d")
            if (outCtx) {
              outCtx.clearRect(0, 0, img.width, img.height)
              outCtx.drawImage(img, 0, 0)
            }

            setEditedImageUrl(outputCanvasRef.current.toDataURL("image/png"))
            setSegmentation(null) // Reset segmentation
          }
        }
      }
    }
    reader.readAsDataURL(file)
  }

  const removeBackground = async () => {
    if (!originalCanvasRef.current || !outputCanvasRef.current) return

    setIsProcessing(true)

    try {
      switch (removalMethod) {
        case "tensorflow":
          await removeBgWithTensorflow()
          break
        case "imgly":
          await removeBgWithImgly()
          break
        case "bgremove":
          await removeBgWithBgRemove()
          break
        default:
          await removeBgWithTensorflow()
      }
    } catch (error) {
      console.error(`Error during background removal with ${removalMethod}:`, error)
      // If removal fails, keep the original image
      const outCtx = outputCanvasRef.current.getContext("2d")
      if (outCtx && originalCanvasRef.current) {
        outCtx.clearRect(0, 0, outputCanvasRef.current.width, outputCanvasRef.current.height)
        outCtx.drawImage(originalCanvasRef.current, 0, 0)
        setEditedImageUrl(outputCanvasRef.current.toDataURL("image/png"))
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const removeBgWithTensorflow = async () => {
    if (!model || !originalCanvasRef.current || !outputCanvasRef.current) return

    const ctx = originalCanvasRef.current.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, originalCanvasRef.current.width, originalCanvasRef.current.height)

    // Perform segmentation with improved parameters
    const personSegmentation = await model.segmentPerson(imageData, {
      flipHorizontal: false,
      internalResolution: "high", // Use higher resolution for better results
      segmentationThreshold: threshold,
      maxDetections: 1, // Focus on the main subject
      scoreThreshold: 0.3, // Lower threshold to detect more of the subject
    })

    setSegmentation(personSegmentation)
    applyBackgroundColor(selectedBgColor)
  }

  const removeBgWithImgly = async () => {
    if (!originalCanvasRef.current || !outputCanvasRef.current) return

    try {
      // In a real implementation, you would use the @imgly/background-removal library
      // This is a placeholder implementation
      const imglyModule = await import("@imgly/background-removal")


      // Get the image data from the canvas
      const imageDataUrl = originalCanvasRef.current.toDataURL("image/png")

      // Remove background using imgly
      const resultBlob = await imglyModule.removeBackground(imageDataUrl, {
        publicPath: "/assets/imgly/",
        model: "isnet", // or 'isnet_fp16' or 'isnet_quint8'
      })

      // Convert blob to image and draw on canvas
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = URL.createObjectURL(resultBlob)

      img.onload = () => {
        if (outputCanvasRef.current) {
          const outCtx = outputCanvasRef.current.getContext("2d")
          if (outCtx) {
            outCtx.clearRect(0, 0, outputCanvasRef.current.width, outputCanvasRef.current.height)

            // If background color is not transparent, fill with background color first
            if (selectedBgColor !== "transparent") {
              outCtx.fillStyle = selectedBgColor
              outCtx.fillRect(0, 0, outputCanvasRef.current.width, outputCanvasRef.current.height)
            }

            outCtx.drawImage(img, 0, 0)
            setEditedImageUrl(outputCanvasRef.current.toDataURL("image/png"))
          }
        }
        URL.revokeObjectURL(img.src)
      }
    } catch (error) {
      console.error("Error with imgly background removal:", error)
      throw error
    }
  }

  const removeBgWithBgRemove = async () => {
    if (!originalCanvasRef.current || !outputCanvasRef.current) return

    // try {
    //   // In a real implementation, you would use the bgremove.js library
    //   // This is a placeholder implementation
    //   const bgremoveModule = await import("bgremove")

    //   // Get the image data from the canvas
    //   const imageDataUrl = originalCanvasRef.current.toDataURL("image/png")

    //   // Remove background using bgremove
    //   const resultImageUrl = await bgremoveModule.removeBackground(imageDataUrl, {
    //     apiKey: "your-api-key", // You would need an API key for the actual service
    //     format: "png",
    //   })

    //   // Load the result image and draw on canvas
    //   const img = new Image()
    //   img.crossOrigin = "anonymous"
    //   img.src = resultImageUrl

    //   img.onload = () => {
    //     if (outputCanvasRef.current) {
    //       const outCtx = outputCanvasRef.current.getContext("2d")
    //       if (outCtx) {
    //         outCtx.clearRect(0, 0, outputCanvasRef.current.width, outputCanvasRef.current.height)

    //         // If background color is not transparent, fill with background color first
    //         if (selectedBgColor !== "transparent") {
    //           outCtx.fillStyle = selectedBgColor
    //           outCtx.fillRect(0, 0, outputCanvasRef.current.width, outputCanvasRef.current.height)
    //         }

    //         outCtx.drawImage(img, 0, 0)
    //         setEditedImageUrl(outputCanvasRef.current.toDataURL("image/png"))
    //       }
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error with bgremove background removal:", error)
    //   throw error
    // }
  }

  const applyBackgroundColor = (color: string) => {
    if (!segmentation || !originalCanvasRef.current || !outputCanvasRef.current) return

    const ctx = originalCanvasRef.current.getContext("2d")
    const outCtx = outputCanvasRef.current.getContext("2d")

    if (!ctx || !outCtx) return

    const imageData = ctx.getImageData(0, 0, originalCanvasRef.current.width, originalCanvasRef.current.height)

    const newImageData = outCtx.createImageData(outputCanvasRef.current.width, outputCanvasRef.current.height)

    // Copy pixel data with improved handling
    let hasPersonPixels = false
    for (let i = 0; i < imageData.data.length; i += 4) {
      const pixelIndex = i / 4

      // If pixel is part of a person
      if (segmentation.data[pixelIndex] === 1) {
        hasPersonPixels = true
        newImageData.data[i] = imageData.data[i] // R
        newImageData.data[i + 1] = imageData.data[i + 1] // G
        newImageData.data[i + 2] = imageData.data[i + 2] // B
        newImageData.data[i + 3] = imageData.data[i + 3] // A
      } else {
        // Apply background color
        if (color === "transparent") {
          newImageData.data[i] = 0
          newImageData.data[i + 1] = 0
          newImageData.data[i + 2] = 0
          newImageData.data[i + 3] = 0
        } else {
          const r = Number.parseInt(color.slice(1, 3), 16)
          const g = Number.parseInt(color.slice(3, 5), 16)
          const b = Number.parseInt(color.slice(5, 7), 16)

          newImageData.data[i] = r
          newImageData.data[i + 1] = g
          newImageData.data[i + 2] = b
          newImageData.data[i + 3] = 255
        }
      }
    }

    // If no person pixels were detected, keep the original image
    if (!hasPersonPixels) {
      outCtx.clearRect(0, 0, outputCanvasRef.current.width, outputCanvasRef.current.height)
      outCtx.drawImage(originalCanvasRef.current, 0, 0)
    } else {
      outCtx.putImageData(newImageData, 0, 0)
    }

    setEditedImageUrl(outputCanvasRef.current.toDataURL("image/png"))
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    handleNewImage(file)
  }

  const handleSave = () => {
    if (!outputCanvasRef.current) return

    outputCanvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "edited-image.png", { type: "image/png" })
        onSave(file)
        onClose()
      }
    }, "image/png")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex justify-center">
            <div className="relative">
              <img src={editedImageUrl || imageUrl} alt="Preview" className="max-h-[60vh] object-contain rounded-md" />
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <div
              ref={dropAreaRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-dashed border-muted p-4 rounded-lg transition-colors duration-200"
            >
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <canvas
                    ref={originalCanvasRef}
                    className="hidden" // Hidden, used for processing only
                  />
                  <canvas ref={outputCanvasRef} className="max-h-[40vh] object-contain border rounded-md" />
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <CloudUpload className="h-4 w-4" />
                    Change Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                    className="hidden"
                  />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button disabled={isProcessing} variant="outline" className="flex items-center gap-2">
                        {isProcessing ? "Processing..." : "Remove Background"}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setRemovalMethod("tensorflow")
                          removeBackground()
                        }}
                        className="flex items-center gap-2"
                      >
                        <Layers className="h-4 w-4" />
                        <span>TensorFlow</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setRemovalMethod("imgly")
                          removeBackground()
                        }}
                        className="flex items-center gap-2"
                      >
                        <ImageIcon className="h-4 w-4" />
                        <span>IMG.LY</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setRemovalMethod("bgremove")
                          removeBackground()
                        }}
                        className="flex items-center gap-2"
                      >
                        <Code className="h-4 w-4" />
                        <span>BGRemove</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="threshold">Segmentation Threshold: {threshold}</Label>
                  <Slider
                    id="threshold"
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    value={[threshold]}
                    onValueChange={(value) => setThreshold(value[0])}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {backgroundColors.map((color) => (
                      <div
                        key={color}
                        className={`h-10 rounded-md cursor-pointer border-2 ${
                          selectedBgColor === color ? "border-primary" : "border-transparent"
                        }`}
                        style={{
                          backgroundColor: color,
                          backgroundImage:
                            color === "transparent"
                              ? "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)"
                              : undefined,
                          backgroundSize: color === "transparent" ? "10px 10px, 10px 10px" : undefined,
                          backgroundPosition: color === "transparent" ? "0 0, 5px 5px" : undefined,
                        }}
                        onClick={() => setSelectedBgColor(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customColor">Custom Color</Label>
                  <Input
                    id="customColor"
                    type="color"
                    value={selectedBgColor !== "transparent" ? selectedBgColor : "#FFFFFF"}
                    onChange={(e) => setSelectedBgColor(e.target.value)}
                    className="h-10 p-1"
                  />
                </div>

                <div className="pt-4 text-center text-sm text-muted-foreground">
                  Drag and drop an image from anywhere to replace
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-4">
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

