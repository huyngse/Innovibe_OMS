import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import useDashboardStore from "@/stores/use-dashboard-store";
import { Link } from "react-router-dom";

const BestSelling = () => {
  const dashboardStore = useDashboardStore();
  if (!dashboardStore.dashboardData) {
    return;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sản phẩm bán chạy</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          {dashboardStore.dashboardData.bestSelling.map(
            (product, index: number) => {
              return (
                <div className="grid grid-cols-5 mb-5 gap-3" key={index}>
                  <AspectRatio
                    ratio={1}
                    className="rounded-lg overflow-hidden drop-shadow"
                  >
                    <img src={product.product.images[0]?.imageURL} alt="" />
                  </AspectRatio>
                  <div className="col-span-4 text-sm flex flex-col justify-between">
                    <Link to={`/product/${product.product.productId}`}>
                      <h4 className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                        {product.product.name}
                      </h4>
                    </Link>

                    <div className="flex justify-between">
                      <p className="text-zinc-500">
                        Số đơn: {product.numOfOrder}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </ScrollArea>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};

export default BestSelling;
