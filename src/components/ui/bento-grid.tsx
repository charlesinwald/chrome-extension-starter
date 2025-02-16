import React, { ReactNode, useEffect, useState } from "react";

import { Button } from "./button";
import { cn } from "../../lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Label } from "./label";
import { Input } from "./input";
import { useId } from "react";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { FocusCards } from "./focus-cards";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div className="grid w-full auto-rows-auto grid-cols-3 gap-4">
      {children}
    </div>
  );
};

interface BentoCardProps {
  name: string;
  className?: string;
  background: ReactNode;
  // Icon: any;
  description: string;
  href: string;
  cta: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
  name,
  className,
  background,
  // Icon,
  description,
  href: initialHref,
  cta,
}) => {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [suffix, setSuffix] = useState(".com");
  const [href, setHref] = useState(initialHref);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<{ src: string; title: string }[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load the saved input value and suffix from local storage when the component mounts
  useEffect(() => {
    const savedValue = localStorage.getItem(`input-${name}`);
    const savedSuffix = localStorage.getItem(`suffix-${name}`);
    if (savedValue) {
      setInputValue(savedValue);
    }
    if (savedSuffix) {
      setSuffix(savedSuffix);
    }
  }, [name]);

  // Save the input value and suffix to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(`input-${name}`, inputValue);
    localStorage.setItem(`suffix-${name}`, suffix);
  }, [inputValue, suffix, name]);

  // Update the href when the submit button is clicked
  const handleSubmit = () => {
    setHref(`https://${inputValue}${suffix}`);
  };

  // Dynamically import all images from the aoe3_icons directory
  useEffect(() => {
    const imagesImport = import.meta.glob(
      "../aoe3_icons/*.{png,jpg,jpeg,svg,webp}",
      {
        eager: true,
      }
    );

    const imagePaths = Object.keys(imagesImport).map((path) => {
      const mod = imagesImport[path];
      const src = mod.default || mod;
      const filename = path.split("/").pop()?.split(".")[0] || "Unknown";
      return { src, title: filename };
    });

    setImages(imagePaths);
  }, []);

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between",
        "overflow-visible",
        "rounded-xl border border-amber-800",
        "bg-[url('src/chrome-extension/public/wood.jpg')] bg-cover",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.3),0_12px_24px_rgba(0,0,0,0.25)]",
        "transform-gpu dark:bg-black/50 dark:[border:1px_solid_rgba(255,255,255,0.1)] dark:[box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.12)_inset]",
        "bg-yellow-200 opacity-90",
        "p-2",
        "h-full",
        "transition-transform duration-300 ease-in-out",
        className
      )}
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="relative">
        <img className="absolute -right-20 -top-20 opacity-60" />
      </div>
      <div
        className="z-10 flex transform-gpu flex-col gap-1 p-4 transition-all duration-300 group-hover:-translate-y-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Render images */}
        {/* <div className="flex flex-wrap">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Icon ${index}`}
              className="w-16 h-16 m-2"
            />
          ))} */}
        {/* </div> */}
        {/* Uncomment and adjust if you want to use an icon */}
        {/* <Icon className="h-12 w-12 origin-left transform-gpu text-amber-300 transition-all duration-300 ease-in-out group-hover:scale-75" /> */}

        <h3 className="text-xl font-semibold text-amber-100 font-cinzel">
          {name}
          <div className="space-y-2 min-w-[300px]">
            <div className="flex rounded-lg shadow-sm shadow-black/5">
              <Input
                id={id}
                className={cn(
                  "-me-px rounded-e-none text-lg p-2", // keep your existing layout/shape classes
                  // AoE-style color scheme
                  "bg-[#6d3f1f] text-[#f0d78c] border-2 border-[#b19768]",
                  // Subtle shadow for an embossed look
                  "shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
                  // Focus ring for accessibility + theming
                  "focus:outline-none focus:ring-2 focus:ring-[#e4c98d]"
                )}
                placeholder="google"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="relative inline-flex">
                <select
                  className={cn(
                    "peer inline-flex h-full appearance-none items-center rounded-none rounded-e-lg px-3 text-lg",
                    // AoE-style color scheme
                    "bg-[#6d3f1f] text-[#f0d78c] border-2 border-[#b19768]",
                    // Match the input's shadow and border
                    "shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
                    // Hover/focus states
                    "hover:bg-[#82502d] focus:outline-none focus:ring-2 focus:ring-[#e4c98d]",
                    // Keep or tweak additional classes for your layout
                    "transition-shadow"
                  )}
                  aria-label="Domain suffix"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                >
                  <option>.com</option>
                  <option>.org</option>
                  <option>.net</option>
                  <option>.io</option>
                  <option>.co</option>
                  <option>.us</option>
                  <option>.info</option>
                  <option>.biz</option>
                  <option>.me</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 end-0 z-10 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    role="img"
                  />
                </span>
              </div>
              <Button
                // Keep your existing props
                size="sm"
                onClick={handleSubmit}
                className={cn(
                  "ml-3 pointer-events-auto px-4 py-2 font-semibold rounded opacity-100",
                  // AoE-style color scheme:
                  "bg-[#6d3f1f] text-[#f0d78c] border-2 border-[#b19768]",
                  // Subtle shadow to give a slight embossed effect:
                  "shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
                  // Hover & focus states to brighten the button:
                  "hover:bg-[#82502d] hover:border-[#e4c98d] focus:outline-none focus:ring-2 focus:ring-[#e4c98d]"
                )}
              >
                Submit
              </Button>
            </div>
          </div>
        </h3>
        <p className="max-w-lg text-amber-200 font-cinzel">{description}</p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="mt-4"
              onClick={() => setIsDialogOpen(true)}
            >
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogContent
            className="!fixed !inset-0 w-full h-full overflow-y-auto"
            style={{
              backgroundImage: "url('src/chrome-extension/public/wood.jpg')",
              backgroundSize: "cover",
            }}
          >
            <div className="w-full h-full p-4">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="fixed top-4 right-4 z-50 bg-[#6d3f1f] text-[#f0d78c] p-2 rounded-full shadow-lg hover:bg-[#82502d] transition-transform transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
              <div className="fixed top-0 left-0 right-0 p-4 z-40">
                <input
                  type="text"
                  placeholder="Search by filename"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[80vw] p-2 rounded-lg bg-[#f0d78c] text-black text-3xl border-2 border-[#b19768] focus:outline-none focus:ring-2 focus:ring-[#e4c98d]"
                />
              </div>
              <div className="mt-16">
                <FocusCards cards={filteredImages} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export { BentoCard, BentoGrid };
