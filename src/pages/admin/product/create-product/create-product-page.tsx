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
import useBrandStore from "@/stores/use-brand-store";
import useCategoryStore from "@/stores/use-category-store";
import { useEffect } from "react";
import Loader from "@/components/loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const CreateProductPage = () => {
  const brandStore = useBrandStore();
  const categoryStore = useCategoryStore();
  const ProductSchema = z.object({
    id: z.number().int(),
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    quantity: z.number().int().nonnegative("Stock quantity cannot be negative"),
    categoryId: z.number(),
    brandId: z.number(),
    status: z.enum([
      "In Stock",
      "Out of Stock",
      "Pending",
      "In Transit",
      "Discontinued",
    ]),
    image: z.array(z.object({ imageURL: z.string(), position: z.number() })),
  });
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof ProductSchema>) {
    console.log(values);
  }
  useEffect(() => {
    brandStore.fetchBrands();
    categoryStore.fetchCategories();
  }, []);

  if (brandStore.loading || categoryStore.loading) {
    return <Loader />;
  }

  const brandOptions = brandStore.brands.map((x) => ({
    label: x.name,
    value: x.brandId + "",
  }));

  const categoryOptions = categoryStore.categories.map((x) => ({
    label: x.name,
    value: x.categoryId + "",
  }));
  return (
    <div className="flex flex-col">
      <Header title="Sản phẩm" href="/product" currentPage="Tạo sản phẩm mới" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="col-span-2">
          <DropZone />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-1 grid grid-cols-2 gap-3"
          >
            <FormField
              control={form.control}
              name="name"
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
                    <Tiptap
                      value={field.value}
                      onChange={(value: string) =>
                        form.setValue("description", value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
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
                          Ngừng sản xuất
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <StatusInfo />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-2">Thương hiệu sản phẩm</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? brandOptions.find(
                                (brand) => brand.value === field.value + ""
                              )?.label
                            : "Chọn thương hiệu"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Tìm thương hiệu..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>
                            Không tìm thấy thương hiệu nào.
                          </CommandEmpty>
                          <CommandGroup>
                            {brandOptions.map((brand) => (
                              <CommandItem
                                value={brand.label}
                                key={brand.value}
                                onSelect={() => {
                                  form.setValue("brandId", +brand.value);
                                }}
                              >
                                {brand.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    brand.value === field.value + ""
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*  */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-2">Danh mục sản phẩm</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categoryOptions.find(
                                (category) =>
                                  category.value === field.value + ""
                              )?.label
                            : "Chọn danh mục"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Tìm kiếm danh mục..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>
                            Không tìm thấy danh mục nào.
                          </CommandEmpty>
                          <CommandGroup>
                            {categoryOptions.map((category) => (
                              <CommandItem
                                value={category.label}
                                key={category.value}
                                onSelect={() => {
                                  form.setValue("categoryId", +category.value);
                                }}
                              >
                                {category.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    category.value === field.value + ""
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
