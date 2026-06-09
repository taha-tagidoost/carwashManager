"use client";

<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 6e0a88a (initial commit - car wash crm)
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

<<<<<<< HEAD
const CAR_BRANDS = [
  "Toyota",
  "Hyundai",
  "Kia",
  "Peugeot",
  "Renault",
  "BMW",
  "Mercedes",
  "Nissan",
];

const CAR_MODELS: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "RAV4", "Yaris", "Prius"],
  Hyundai: ["Elantra", "Tucson", "Sonata", "i10", "Accent"],
  Kia: ["Cerato", "Sportage", "Optima", "Picanto", "Rio"],
  Peugeot: ["206", "207", "308", "405", "2008"],
  Renault: ["Duster", "Sandero", "Clio", "Laguna", "Scenic"],
  BMW: ["3 Series", "5 Series", "7 Series", "X3", "X5"],
  Mercedes: ["C-Class", "E-Class", "S-Class", "GLE", "GLC"],
  Nissan: ["Altima", "Maxima", "Qashqai", "Pathfinder", "Rogue"],
};
=======
interface VehicleBrand {
  id: string;
  name: string;
}

interface VehicleModel {
  id: string;
  name: string;
}
>>>>>>> 6e0a88a (initial commit - car wash crm)

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [selectedBrand, setSelectedBrand] = useState("Toyota");
=======
  const [dataLoading, setDataLoading] = useState(true);
  const [brands, setBrands] = useState<VehicleBrand[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [customBrandInput, setCustomBrandInput] = useState("");
  const [customModelInput, setCustomModelInput] = useState("");
>>>>>>> 6e0a88a (initial commit - car wash crm)
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    license_plate: "",
<<<<<<< HEAD
    car_brand: "Toyota",
    car_model: "Corolla",
  });

=======
    car_brand: "",
    car_model: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/api/vehicle-brands");
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
        if (data.length > 0) {
          setSelectedBrand(data[0].id);
          setFormData((prev) => ({
            ...prev,
            car_brand: data[0].name,
          }));
          fetchModelsByBrand(data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchModelsByBrand = async (brandId: string) => {
    try {
      const response = await fetch(`/api/vehicle-models?brand_id=${brandId}`);
      if (response.ok) {
        const data = await response.json();
        setModels(data);
        if (data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            car_model: data[0].name,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

>>>>>>> 6e0a88a (initial commit - car wash crm)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.phone || !formData.license_plate) {
      alert("لطفاً تمام فیلدهای الزامی را پر کنید");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const customer = await response.json();
        router.push(`/customers/${customer.id}`);
      } else {
        alert("خطا در ایجاد مشتری");
      }
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("خطا در ایجاد مشتری");
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setFormData({
      ...formData,
      car_brand: brand,
      car_model: CAR_MODELS[brand][0],
=======
  const handleBrandChange = (brandId: string) => {
    if (brandId === "other") {
      setSelectedBrand("other");
      setFormData({
        ...formData,
        car_brand: customBrandInput,
        car_model: customModelInput,
      });
    } else {
      setSelectedBrand(brandId);
      const selected = brands.find((b) => b.id === brandId);
      if (selected) {
        setFormData({
          ...formData,
          car_brand: selected.name,
          car_model: "",
        });
        fetchModelsByBrand(brandId);
        setCustomBrandInput("");
        setCustomModelInput("");
      }
    }
  };

  const handleCustomBrandChange = (value: string) => {
    setCustomBrandInput(value);
    setFormData({
      ...formData,
      car_brand: value,
    });
  };

  const handleCustomModelChange = (value: string) => {
    setCustomModelInput(value);
    setFormData({
      ...formData,
      car_model: value,
    });
  };

  const handleModelChange = (modelName: string) => {
    setFormData({
      ...formData,
      car_model: modelName,
>>>>>>> 6e0a88a (initial commit - car wash crm)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0714] via-[#140D26] to-[#1A1035]">
      {/* Header */}
      <div className="border-b border-[#3D246C]/50 bg-gradient-to-r from-[#16102E] to-[#24154A] shadow-lg backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#E9D5FF] hover:bg-[#2A1D52]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              -<h1 className="text-3xl font-bold text-white">مشتری جدید</h1>
              <p className="text-[#C4B5FD]">افزودن مشتری جدید به سیستم</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="p-8 bg-[#1A1333]/70 border-[#3B2A66]/60 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#E9D5FF] mb-2">
                نام و نام خانوادگی *
              </label>
              <Input
                type="text"
                placeholder="نام کامل"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                required
                className="
               bg-[#1C1638]
               border-[#3B2A66]
               text-white
               placeholder:text-[#8B78C7]
               focus:border-[#8B5CF6]
               focus:ring-[#8B5CF6]
                "
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#E9D5FF] mb-2">
                شماره تلفن *
              </label>
              <Input
                type="tel"
                placeholder="09xxxxxxxxx"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="
               bg-[#1C1638]
               border-[#3B2A66]
               text-white
               placeholder:text-[#8B78C7]
               focus:border-[#8B5CF6]
               focus:ring-[#8B5CF6]
                "
              />
            </div>

            {/* License Plate */}
            <div>
              <label className="block text-sm font-medium text-[#E9D5FF] mb-2">
                پلاک خودرو *
              </label>
              <Input
                type="text"
                placeholder="مثال: 123 الف 456"
                value={formData.license_plate}
                onChange={(e) =>
                  setFormData({ ...formData, license_plate: e.target.value })
                }
                required
                className="
               bg-[#1C1638]
               border-[#3B2A66]
               text-white
               placeholder:text-[#8B78C7]
               focus:border-[#8B5CF6]
               focus:ring-[#8B5CF6]
                "
              />
            </div>

            {/* Car Brand */}
            <div>
              <label className="block text-sm font-medium text-[#E9D5FF] mb-2">
                برند خودرو
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
<<<<<<< HEAD
=======
                disabled={dataLoading}
>>>>>>> 6e0a88a (initial commit - car wash crm)
                className="
                w-full
                rounded-md
                border
                border-[#3B2A66]
                bg-[#1C1638]
                px-3
                py-2
                text-white
                focus:border-[#8B5CF6]
                focus:outline-none
                focus:ring-1
                focus:ring-[#8B5CF6]
<<<<<<< HEAD
                "
              >
                {CAR_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

=======
                disabled:opacity-50
                "
              >
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
                <option value="other">سایر</option>
              </select>
            </div>

            {/* Custom Brand Input (if Other is selected) */}
            {selectedBrand === "other" && (
              <div>
                <label className="block text-sm font-medium text-[#E9D5FF] mb-2">
                  برند خودرو (دیگر) *
                </label>
                <Input
                  type="text"
                  placeholder="نام برند را وارد کنید"
                  value={customBrandInput}
                  onChange={(e) => handleCustomBrandChange(e.target.value)}
                  className="
                   bg-[#1C1638]
                   border-[#3B2A66]
                   text-white
                   placeholder:text-[#8B78C7]
                   focus:border-[#8B5CF6]
                   focus:ring-[#8B5CF6]
                  "
                />
              </div>
            )}

>>>>>>> 6e0a88a (initial commit - car wash crm)
            {/* Car Model */}
            <div>
              <label className="block text-sm font-medium text-[#E9D5FF] mb-2">
                مدل خودرو
              </label>
<<<<<<< HEAD
              <select
                value={formData.car_model}
                onChange={(e) =>
                  setFormData({ ...formData, car_model: e.target.value })
                }
                className="
                w-full
                rounded-md
                border
                border-[#3B2A66]
                bg-[#1C1638]
                px-3
                py-2
                text-white
                focus:border-[#8B5CF6]
                focus:outline-none
                focus:ring-1
                focus:ring-[#8B5CF6]
                "
              >
                {CAR_MODELS[selectedBrand].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
=======
              {selectedBrand === "other" ? (
                <Input
                  type="text"
                  placeholder="نام مدل را وارد کنید"
                  value={customModelInput}
                  onChange={(e) => handleCustomModelChange(e.target.value)}
                  className="
                   bg-[#1C1638]
                   border-[#3B2A66]
                   text-white
                   placeholder:text-[#8B78C7]
                   focus:border-[#8B5CF6]
                   focus:ring-[#8B5CF6]
                  "
                />
              ) : (
                <select
                  value={formData.car_model}
                  onChange={(e) => handleModelChange(e.target.value)}
                  disabled={dataLoading || models.length === 0}
                  className="
                  w-full
                  rounded-md
                  border
                  border-[#3B2A66]
                  bg-[#1C1638]
                  px-3
                  py-2
                  text-white
                  focus:border-[#8B5CF6]
                  focus:outline-none
                  focus:ring-1
                  focus:ring-[#8B5CF6]
                  disabled:opacity-50
                  "
                >
                  <option value="">انتخاب مدل</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.name}>
                      {model.name}
                    </option>
                  ))}
                </select>
              )}
>>>>>>> 6e0a88a (initial commit - car wash crm)
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="
                flex-1
                gap-2
                bg-gradient-to-r
                from-[#7C3AED]
                to-[#A855F7]
                hover:from-[#8B5CF6]
                hover:to-[#C084FC]
                "
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    در حال ذخیره...
                  </>
                ) : (
                  "ثبت مشتری"
                )}
              </Button>
              <Link href="/" className="flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  type="button"
                  className="w-full bg-black text-white"
                >
                  لغو
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
