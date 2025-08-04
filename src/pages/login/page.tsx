import { IMAGES } from "@/constants/images";
import { GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";
import { LoginForm } from "./login-form";

export function Login() {
  return (
    <section className="grid min-h-svh lg:grid-cols-5">
      <div className="flex flex-col gap-4 p-6 md:p-10 lg:col-span-2">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/overview" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            NO Rules
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block lg:col-span-3">
        <img
          src={IMAGES.BackgroundTexture}
          alt="Imagem de textura"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  );
}
