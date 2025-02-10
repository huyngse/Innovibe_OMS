import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import StatusInfo from "../status-info";
import DropZone from "./drop-zone";
import Tiptap from "@/components/tiptap/Tiptap";

const CreateProductPage = () => {
  const ProductImageSchema = z.object({
    url: z.string().url(),
    altText: z.string().optional(),
  });
  const ProductSchema = z.object({
    id: z.number().int(),
    productName: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    stockQuantity: z
      .number()
      .int()
      .nonnegative("Stock quantity cannot be negative"),
    categoryId: z.number(),
    brandId: z.number(),
    productImages: z
      .array(ProductImageSchema)
      .nonempty("At least one product image is required"),
    status: z.enum([
      "In Stock",
      "Out of Stock",
      "Pending",
      "In Transit",
      "Discontinued",
    ]),
  });
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof ProductSchema>) {
    console.log(values);
  }
  return (
    <div className="flex flex-col">
      <Header title="Sản phẩm" href="/product" currentPage="Tạo sản phẩm mới" />
      <div className="p-5 flex-1 overflow-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-1 grid grid-cols-2 gap-3"
          >
            <div className="col-span-2">
              <DropZone />
            </div>
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên sản phẩm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá sản phẩm</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Giá sản phẩm"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Mô tả sản phẩm</FormLabel>
                  <FormControl>
                    <Tiptap value={field.value} onChange={(value: string) => form.setValue('description', value)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng tồn kho</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập số lượng tồn kho"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thương hiệu</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thương hiệu của sản phẩm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Fender</SelectItem>
                      <SelectItem value="2">Gibson</SelectItem>
                      <SelectItem value="3">Yamaha</SelectItem>
                      <SelectItem value="4">Ibanez</SelectItem>
                      <SelectItem value="5">Martin</SelectItem>
                      <SelectItem value="6">Taylor</SelectItem>
                      <SelectItem value="7">PRS</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục sản phẩm</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn doanh mục sản phẩm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Electric Guitars</SelectItem>
                      <SelectItem value="2">Acoustic Guitars</SelectItem>
                      <SelectItem value="3">Bass Guitars</SelectItem>
                      <SelectItem value="4">Classical Guitars</SelectItem>
                      <SelectItem value="5">Jazz Guitars</SelectItem>
                      <SelectItem value="6">Công cụ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái sản phẩm</FormLabel>
                  <div className="flex">
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái sản phẩm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="In Stock">Còn hàng</SelectItem>
                        <SelectItem value="Out of Stock">Hết hàng</SelectItem>
                        <SelectItem value="Pending">Đang chờ</SelectItem>
                        <SelectItem value="In Transit">
                          Đang vận chuyển
                        </SelectItem>
                        <SelectItem value="Discontinued">
                          gừng sản xuất
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <StatusInfo />
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="col-span-2">
              Tạo
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProductPage;
