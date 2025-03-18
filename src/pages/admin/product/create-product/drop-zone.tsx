import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownToLine, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  imageURL: z.string().url().min(2).max(50),
  position: z.number(),
});
const DropZone = () => {
  const [imagePreviews, setImagePreviews] = useState<any>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPreviews = acceptedFiles.map((file) => {
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });
    setImagePreviews((prevPreviews: any) => [...prevPreviews, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prevPreviews: any) =>
      prevPreviews.filter((_: any, i: number) => i !== index)
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageURL: "",
      position: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h5 className="font-bold text-center mb-3">Hình ảnh sản phẩm</h5>
      <div className="grid grid-cols-2 gap-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="imageURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL hình ảnh</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập URL" {...field} />
                  </FormControl>
                  <FormDescription>Nhập URL hình ảnh hoặc tải lên ảnh sản phẩm</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Plus />
            </Button>
          </form>
        </Form>
        <div className="flex flex-col items-center justify-center">
          <div
            {...getRootProps()}
            className={`flex-col gap-3 p-5 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer ${
              isDragActive ? "border-blue-500" : "border-gray-500"
            }`}
          >
            <ArrowDownToLine className="size-20 text-gray-500" />
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-500">Thả hình ảnh vào đây...</p>
            ) : (
              <p className="text-gray-500 text-sm">
                Kéo và thả hình ảnh hoặc nhấp để chọn (cho phép nhiều hình ảnh)
              </p>
            )}
          </div>
        </div>

        {imagePreviews.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imagePreviews.map((file: any, index: number) => (
              <div key={index} className="relative">
                <img
                  src={file.preview}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;
