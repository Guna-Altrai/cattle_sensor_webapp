// import React from "react";
// import Cow from "../../assets/CardIcons/cow.png";
// import Ox from "../../assets/CardIcons/ox.png";
// import Buffalo from "../../assets/CardIcons/buffalo.png";
// import BarChart from "../Charts/BarChart";

// const CattleCard = [
//   {
//     title: "Cattle Count",
//     count: "140",
//     unit: "nos",
//     categories: [
//       { name: "Cow", count: "68" },
//       { name: "Ox", count: "68" },
//       { name: "Buffalo", count: "68" },
//     ],
//     backgroundColor: "#6a3eff",
//     gradient: "#7851f9",
//   },
//   {
//     title: "Expense",
//     count: "$18,000",
//     unit: "Rs",
//     categories: [
//       { name: "Food", count: "8,000" },
//       { name: "Medical", count: "6,000" },
//       { name: "Labour", count: "2000" },
//     ],
//     backgroundColor: "#004f53",
//     gradient: "#056165",
//   },
//   {
//     title: "Milk",
//     count: "1,200",
//     unit: "Litre",
//     categories: [
//       { name: "Per Litre", count: "32 rs" },
//       { name: "Profit", count: "38,400" },
//       { name: "Last Month", count: "40,000" },
//     ],
//     backgroundColor: "#1975d1",
//     gradient: "#468dd4",
//   },
// ];

// const CattleDetails = () => {
//   return (
//     <section className="text-gray-600 body-font w-full">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {CattleCard.map((member, index) => (
//             <div
//               key={index}
//               className={`w-full relative flex-col p-3 py-5 justify-evenly  flex rounded-md`}
//               style={{ backgroundColor: member.backgroundColor }}
//             >
//               <div
//                 style={{
//                   background: `linear-gradient(to bottom, ${member.gradient} , transparent)`,
//                 }}
//                 className="absolute top-0 right-0 w-1/3 bottom-0 rounded-r-md"
//               ></div>

//               <div className="flex items-center rounded-lg">
//                 <div className="">
//                   <p className="text-white text-sm opacity-90 font-medium">
//                     {member.title}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex flex-row gap-1 mb-2">
//                 <h1 className="text-2xl font-bold text-white opacity-90 tracking-wider">
//                   {member.count}
//                 </h1>
//                 <p className="self-end flex text-white ">{member.unit}</p>
//               </div>
//               <div className="flex flex-col space-y-3">
//                 {member.categories.map((category, idx) => (
//                   <div
//                     key={idx}
//                     className="text-white flex-row flex items-center p-1 px-4 font-semibold text-sm opacity-80 border-white border-[1px] rounded-md border-opacity-15"
//                   >
//                     <img
//                       alt="team"
//                       className="w-auto h-6 mr-2"
//                       src={
//                         category.name === "Cow"
//                           ? Cow
//                           : category.name === "Ox"
//                           ? Ox
//                           : Buffalo
//                       }
//                     />
//                     <p className="">{category.name}</p>
//                     <p
//                       className="ml-auto pl-2"
//                       style={{
//                         borderLeft: "2px solid rgba(255, 255, 255, 0.1)",
//                       }}
//                     >
//                       {category.count}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//           <BarChart />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CattleDetails;

import React from "react";
import Cow from "../../assets/CardIcons/cow.png";
import Ox from "../../assets/CardIcons/ox.png";
import Buffalo from "../../assets/CardIcons/buffalo.png";

const CattleDetails = ({ cattleData }) => {
  return (
    <section className="text-gray-600 body-font w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cattleData.map((member, index) => (
            <div
              key={index}
              className={`w-full relative flex-col p-3 py-5 justify-evenly  flex rounded-md`}
              style={{ backgroundColor: member.backgroundColor }}
            >
              <div
                style={{
                  background: `linear-gradient(to bottom, ${member.gradient} , transparent)`,
                }}
                className="absolute top-0 right-0 w-1/3 bottom-0 rounded-r-md"
              ></div>

              <div className="flex items-center rounded-lg">
                <div className="">
                  <p className="text-white text-sm opacity-90 font-medium">
                    {member.title}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-1 mb-2">
                <h1 className="text-2xl font-bold text-white opacity-90 tracking-wider">
                  {member.count}
                </h1>
                <p className="self-end flex text-white ">{member.unit}</p>
              </div>
              <div className="flex flex-col space-y-3">
                {member.categories.map((category, idx) => (
                  <div
                    key={idx}
                    className="text-white flex-row flex items-center p-1 px-4 font-semibold text-sm opacity-80 border-white border-[1px] rounded-md border-opacity-15"
                  >
                    <img
                      alt="team"
                      className="w-auto h-6 mr-2"
                      src={
                        category.name === "Cow"
                          ? Cow
                          : category.name === "Ox"
                          ? Ox
                          : Buffalo
                      }
                    />
                    <p className="">{category.name}</p>
                    <p
                      className="ml-auto pl-2"
                      style={{
                        borderLeft: "2px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {category.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CattleDetails;
