import { ChartNoAxesCombined, Locate, TruckElectric } from "lucide-react";
import type { RegPgImgSecPropsType } from "@/shared/types";
import { cn } from "@/lib/utils";

/**
 * @component
 * @name RegisterPageImageSection
 * The image section of home page
 * @returns
 */
const AuthImageSection = ({ id, className, imgUrl }: RegPgImgSecPropsType) => {
  return (
    <section
      id={id}
      className={cn("hidden lg:flex lg:w-1/2 relative h-full", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700"></div>
      <img
        src={imgUrl ? imgUrl : "/delivery-image.jpg"}
        alt="Modern logistics Image"
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
      />
      <div className="relative z-10 flex flex-col justify-center px-16 text-white">
        <h1 className="text-5xl font-bold mb-6">SwiftMove</h1>
        <p className="text-xl mb-8 opacity-85">
          Streamline your logistics operations with our comprehensive management
          platform
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Locate className="size-6 text-primary-300" />
            <span>Real-time shipment tracking</span>
          </div>
          <div className="flex items-center space-x-3">
            <ChartNoAxesCombined className="size-6 text-primary-300" />
            <span>Advanced analytics and reporting</span>
          </div>
          <div className="flex items-center space-x-3">
            <TruckElectric className="size-6 text-primary-300 scale-x-[-1]" />
            <span>Driver and fleet management</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthImageSection;
