import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import logoImage from "@/assets/images/electric-guitar.png";
import googleLogo from "@/assets/images/google.webp";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import loginBackground from "@/assets/images/login-background.jpg";
const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(5, "Mật khẩu phải chứa ít nhất 5 ký tự"),
});
const LoginPage = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = () => {
    console.log("Remember me: " + rememberMe);
    navigate("/");
  };
  return (
    <div
      className="grid grid-cols-12"
      style={{ backgroundImage: `url(${loginBackground})`, backgroundSize: "cover" }}
    >
      <div className="col-span-6 h-screen overflow-auto rounded-e shadow-md bg-white">
        <div className="bg-white min-h-screen py-16 px-24">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <img src={logoImage} alt="" width={70} />
              <h2 className="text-4xl font-bold mt-5">Đăng Nhập</h2>
              <p className="py-2">Innovibe Order Management System</p>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập địa chỉ email"
                        type="email"
                        className="py-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel className="font-bold">
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Nhập mật khẩu"
                        className="py-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between mt-5">
                <div className="items-top flex space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(value) => {
                      setRememberMe(value == true);
                    }}
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ghi nhớ tài khoản này
                  </label>
                </div>
                <Link to="/recover-password" className="text-sm text-orange-500">
                  Quên mật khẩu?
                </Link>
              </div>
              <Button
                className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-bold p-6 focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Đăng Nhập
              </Button>
            </form>
          </Form>
          <div className="flex justify-between gap-5 items-center my-5">
            <hr className="border flex-1" />
            <p className="uppercase text-sm">Hoặc</p>
            <hr className="border flex-1" />
          </div>
          <Button className="w-full p-6" variant={"outline"}>
            <img src={googleLogo} alt="" width={30} />
            Đăng nhập bằng tài khoản Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
