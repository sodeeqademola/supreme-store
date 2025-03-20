"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { easeIn, motion } from "framer-motion";

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <motion.div
      className="embla"
      ref={emblaRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, ease: easeIn, duration: 0.5 }}
    >
      <div className="embla__container ">
        <div className="embla__slide">
          <Image
            src={"/slider3.jpg"}
            alt="banner1"
            width={1000}
            height={500}
            className="w-[90%] h-[370px] mx-auto rounded"
            style={{ objectFit: "fill" }}
          />
        </div>
        <div className="embla__slide">
          <Image
            src={"/sales.jpg"}
            alt="banner1"
            width={1000}
            height={500}
            className="w-[90%] h-[370px] mx-auto rounded"
            style={{ objectFit: "fill" }}
          />
        </div>
        <div className="embla__slide">
          <Image
            src={"/slider1.jpg"}
            alt="banner1"
            width={1000}
            height={500}
            className="w-[90%] h-[370px] mx-auto rounded"
            style={{ objectFit: "fill" }}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end mr-[5%] mt-2">
        <motion.span
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.4 }}
          className="rounded bg-[#249ea7] text-white text-sm  p-1 cursor-pointer"
          onClick={scrollPrev}
        >
          prev
        </motion.span>
        <motion.span
          whileHover={{ scale: 1.09 }}
          transition={{ duration: 0.4 }}
          className="rounded bg-[#249ea7] text-white text-sm  p-1 cursor-pointer"
          onClick={scrollNext}
        >
          next
        </motion.span>
      </div>
    </motion.div>
  );
}
