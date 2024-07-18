import { Carousel } from "@material-tailwind/react";
import Cow_1 from "../../assets/Images/cow_1.jpg";
import Cow_2 from "../../assets/Images/cow_2.jpg";
import Cow_3 from "../../assets/Images/cow_3.jpg";
import Cow_4 from "../../assets/Images/cow_4.webp";

export function CarouselCustomNavigation() {
  return (
    <Carousel
      className="rounded-l-xl"
      autoplay={true}
      autoplayInterval={3000} // Adjust the interval as needed
      loop={true}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => {
                setActiveIndex(i);
              }}
            />
          ))}
        </div>
      )}
    >
      <img src={Cow_1} className="h-full w-full object-cover" alt="Cow 1" />
      <img src={Cow_2} className="h-full w-full object-cover" alt="Cow 2" />
      <img src={Cow_3} className="h-full w-full object-cover" alt="Cow 3" />
      <img src={Cow_4} className="h-full w-full object-cover" alt="Cow 4" />
    </Carousel>
  );
}
