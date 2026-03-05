"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { Loader2, PackagePlus, X, Image as ImageIcon } from "lucide-react"

// Redux Imports
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store"
import { createProduct, resetProductState } from "@/features/product/productSlice"

// UI Components (Shadcn)
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Validation Schema
const formSchema = z.object({
  name: z.string().min(2, "Product ka naam thoda lamba rakho"),
  price: z.string().refine((val) => !isNaN(Number(val)), "Valid price dalo"),
  stock: z.string().refine((val) => !isNaN(Number(val)), "Stock number hona chahiye"),
  description: z.string().min(10, "Kam se kam 10 characters ki description dalo"),
  category: z.string().min(1, "Category select karna zaroori hai"),
})

const AddProductForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  
  // Redux States
  const { loading, success, error } = useSelector((state: RootState) => state.product)

  // Local States for Files and Previews
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", price: "", stock: "0", description: "", category: "" },
  })

  // Handle Image Selection & Preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles])

    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...filePreviews])
  }

  // Remove selected file
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
    setPreviews(previews.filter((_, i) => i !== index))
  }

  // Handle Success/Error
  useEffect(() => {
    if (success) {
      toast.success("Product successfully add ho gaya! ✨")
      dispatch(resetProductState())
      navigate('/seller/dashboard')
    }
    if (error) {
      toast.error(error)
      dispatch(resetProductState())
    }
  }, [success, error, dispatch, navigate])

  // Final Submit Logic
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (files.length === 0) {
      return toast.error("Bhai, kam se kam ek image toh dalo!")
    }

    const myForm = new FormData()
    myForm.append("name", values.name)
    myForm.append("price", values.price)
    myForm.append("stock", values.stock)
    myForm.append("description", values.description)
    myForm.append("category", values.category)

    // Key 'attachments' backend se match honi chahiye
    files.forEach((file) => {
      myForm.append("attachments", file)
    })

    dispatch(createProduct(myForm))
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto shadow-xl border-t-4 border-primary">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <PackagePlus className="w-8 h-8 text-primary" /> Naya Product List Karein
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Product Name */}
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl><Input placeholder="Ex: Gaming Laptop" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl><Input type="number" placeholder="0.00" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Stock */}
                <FormField control={form.control} name="stock" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Category */}
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl><Input placeholder="Electronics, Clothing, etc." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Description */}
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea rows={4} placeholder="Product ke baare mein vistar se batayein..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* File Upload Section */}
              <div className="space-y-4">
                <FormLabel className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Media Upload (Images/Videos)
                </FormLabel>
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 text-center hover:bg-muted/30 transition">
                  <Input 
                    type="file" 
                    multiple 
                    accept="image/*,video/*" 
                    onChange={handleFileChange}
                    className="hidden" 
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer text-sm text-primary font-medium">
                    Files select karne ke liye yahan click karein
                  </label>
                </div>

                {/* Image Previews */}
                {previews.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {previews.map((url, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img src={url} alt="preview" className="w-full h-full object-cover rounded-md border" />
                        <button 
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Uploading to Masterpiece...
                  </>
                ) : "Publish Masterpiece Product"}
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProductForm