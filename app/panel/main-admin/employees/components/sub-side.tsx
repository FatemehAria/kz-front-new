// "use client";
// // import { changeHomeSidebarOptions } from "@/lib/data";
// import React, { useState } from "react";
// import ChangeHome from "../../change-site/change-home";

// const SubSide = () => {
//   const [subSelect, setSubSelect] = useState<number | null>(null);
//   const [subStep, setSubStep] = useState(0);
//   const handleSubsideClick = (itemStep: number) => {
//     if (subSelect === itemStep) {
//       setSubSelect(null);
//     } else {
//       setSubSelect(itemStep);
//     }
//     setSubStep(itemStep);
//   };
//   return (
//     <div>
//       {/* home */}
//       {
//         <div className="px-[10%]">
//           {changeHomeSidebarOptions.map((side) => (
//             <div
//               key={side.id}
//               onClick={() => handleSubsideClick(side.step)}
//               className={`flex ${
//                 subSelect === side.step
//                   ? "bg-gradient-to-l from-indigo-200"
//                   : ""
//               }`}
//             >
//               <p>{side.title}</p>
//             </div>
//           ))}
//           <ChangeHome subStep={subStep} />
//         </div>
//       }
//     </div>
//   );
// };

// export default SubSide;
