// import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
// import { format } from "date-fns";
// import Link from "next/link";
// import React from "react";
// import { ActionButtons } from "./ActionButtons";
// import { RouterOutput } from "@/types/router";
// import { Badge } from "@/components/ui/badge";
// type Props = {
//   member: RouterOutput["member"]["getMembers"][0];
// };

// const MemberCard = ({ member }: Props) => {
//   return (
//     <li
//       key={member.id}
//       className="relative flex items-center w-full gap-2 transition-colors duration-200 rounded-sm bg-background hover:bg-muted/80"
//     >
//       <Link
//         className="flex items-center w-full gap-3 px-3 py-3"
//         href={`/dashboard/members/${member.id}/edit`}
//       >
//         {member.image ? (
//           <div className="hidden md:block overflow-hidden min-w-[2.75rem] rounded-[5px]">
//             <img
//               className="object-cover rounded-full h-11 aspect-square"
//               src={member.image}
//             />
//           </div>
//         ) : (
//           <div className="hidden md:block overflow-hidden min-w-[2.75rem] rounded-[5px]">
//             <img
//               className="object-cover rounded-full h-11 aspect-square"
//               src={"/images/avatar.png"}
//             />
//           </div>
//         )}

//         <div className="flex flex-col flex-1 gap-0">
//           <h3 className="text-sm font-semibold line-clamp-1 md:text-base">
//             {member.name || "Untitled Member"}
//           </h3>
//           <div className="inline-flex text-xs tracking-wide gap-0.5 max-sm:flex max-sm:flex-col md:text-xs max-w-max text-muted-foreground">
//             <div>
//               <span className="font-semibold">{member.email}</span>
//             </div>
//           </div>
//         </div>
//       </Link>
//       <div className="relative hidden px-4 text-xs font-medium md:block md:text-sm min-w-fit">
//         <div>
//           Joined on{" "}
//           <span className="block lg:inline-block">
//             {format(new Date(member.createdAt), "dd MMM yyyy")}
//           </span>
//         </div>
//       </div>
//       <div className="relative md:w-24">
//         <Badge variant={member.role === "ADMIN" ? "success" : "outline"}>
//           {member.role === "ADMIN" ? "Admin" : "Member"}
//         </Badge>
//       </div>

//       <div className="pl-2 pr-3">
//         <ActionButtons member={member} />
//       </div>
//     </li>
//   );
// };

// export default MemberCard;
