import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import imagePlaceholder from "@/assets/images/image-placeholder.webp";
import Lightbox from "yet-another-react-lightbox";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ProductImage } from "@/types/product";
const ImageGallery = ({ images }: { images: ProductImage[] }) => {
  const [imageIndex, setImageIndex] = useState(-1);
  const primaryImage = images[0];
  return (
    <>
      <div className="grid grid-cols-4 p-5">
        <ScrollArea
          className={`h-[500px] ${images.length > 1 ? "" : "hidden"}`}
        >
          <div className="flex flex-col gap-3 p-3">
            {images
              .filter((image) => image.position != 0)
              .map((image: any, index: number) => {
                return (
                  <AspectRatio ratio={1 / 1} key={index}>
                    <button
                      className={cn(
                        "overflow-hidden rounded-lg h-full w-full",
                        "hover:border-2 hover:border-orange-600"
                      )}
                      onClick={() => {
                        setImageIndex(index + 1);
                      }}
                    >
                      <img src={image.imageURL} alt="" />
                    </button>
                  </AspectRatio>
                );
              })}
          </div>
        </ScrollArea>
        <button
          className="col-span-3 p-3 h-[500px] flex justify-center items-center"
          onClick={() => {
            setImageIndex(0);
          }}
        >
          <img
            src={primaryImage?.imageURL ?? imagePlaceholder}
            alt=""
            className="w-full"
          />
        </button>
      </div>
      <Lightbox
        open={imageIndex > -1}
        close={() => setImageIndex(-1)}
        index={imageIndex}
        slides={[
          primaryImage,
          ...images.filter((image) => image.position != 0),
        ].map((image) => ({ src: image?.imageURL ?? "" }))}
      />
    </>
  );
};

export default ImageGallery;