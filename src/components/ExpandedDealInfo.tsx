// TODO: Component currently not in use - temporarily disabled
// Consider removing if not needed in future iterations
import React from "react";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from "@/components/ui/accordion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@radix-ui/react-separator";
// import { Badge } from "lucide-react";

// const ExpandedDealInfo = () => (
//   <Card className="w-full max-w-3xl mx-auto">
//     <CardHeader>
//       <CardTitle className="text-2xl font-bold">Deal Information</CardTitle>
//     </CardHeader>
//     <CardContent className="space-y-6">
//       <div className="grid grid-cols-2 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Deal Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <p>
//               <span className="font-semibold">Type:</span> Seed Round
//             </p>
//             <p>
//               <span className="font-semibold">Date:</span> 17-Jul-2019
//             </p>
//             <p>
//               <span className="font-semibold">Status:</span>{" "}
//               <Badge>Completed</Badge>
//             </p>
//             <p>
//               <span className="font-semibold">Financing:</span> Venture Capital
//             </p>
//             <p>
//               <span className="font-semibold">Stock Split:</span> 1:1
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Company Info</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <p>
//               <span className="font-semibold">Financing Status:</span> Venture
//               Capital-Backed
//             </p>
//             <p>
//               <span className="font-semibold">Business Status:</span> Generating
//               Revenue
//             </p>
//             <p>
//               <span className="font-semibold">CEO:</span> Michael Cessario
//             </p>
//             <p>
//               <span className="font-semibold">Location:</span> Santa Monica, CA
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <Separator />

//       <div className="grid grid-cols-2 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Capital Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <p>
//               <span className="font-semibold">Deal Amount:</span> £1.79M
//             </p>
//             <p>
//               <span className="font-semibold">Pre-Money Valuation:</span> £4.37M
//             </p>
//             <p>
//               <span className="font-semibold">Post Valuation:</span> £6.16M
//             </p>
//             <p>
//               <span className="font-semibold">Total Invested Capital:</span>{" "}
//               £1.79M
//             </p>
//             <p>
//               <span className="font-semibold">Raised to Date:</span> £1.79M
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Equity Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <p>
//               <span className="font-semibold">VC Round:</span> 1st Round
//             </p>
//             <p>
//               <span className="font-semibold">Percent Acquired:</span> 29.13%
//             </p>
//             <p>
//               <span className="font-semibold">Investor Ownership:</span> 29.13%
//             </p>
//             <p>
//               <span className="font-semibold">Total Invested Equity:</span>{" "}
//               £1.79M
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <Separator />

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Deal Synopsis</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>
//             The company raised $2.26 million of Seed funding in a deal led by
//             Science on July 17, 2019, putting the company's pre-money valuation
//             at $5.5 million. CPG investors, Gary Vaynerchuck, Michael Dubin, Biz
//             Stone, Jen Rubio, and other undisclosed investors also participated
//             in the round.
//           </p>
//         </CardContent>
//       </Card>

//       <Separator />

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Investors</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Accordion type="single" collapsible className="w-full">
//             {[
//               {
//                 name: "Biz Stone",
//                 status: "New Investor",
//                 leadSole: "No",
//                 comments: "Lead Partner: Biz Stone, Form of Payment: Cash",
//               },
//               {
//                 name: "CPG investors",
//                 status: "New Investor",
//                 leadSole: "No",
//                 comments: "Form of Payment: Cash",
//               },
//               {
//                 name: "Gary Vaynerchuck",
//                 status: "New Investor",
//                 leadSole: "No",
//                 comments: "Form of Payment: Cash",
//               },
//               {
//                 name: "Jennifer Rubio",
//                 status: "New Investor",
//                 leadSole: "No",
//                 comments: "Lead Partner: Jennifer Rubio, Form of Payment: Cash",
//               },
//               {
//                 name: "Michael Dubin",
//                 status: "New Investor",
//                 leadSole: "No",
//                 comments: "Form of Payment: Cash",
//               },
//               {
//                 name: "Science",
//                 status: "New Investor",
//                 leadSole: "Yes",
//                 comments: "Lead Partner: Michael Jones, Form of Payment: Cash",
//               },
//             ].map((investor, index) => (
//               <AccordionItem value={`item-${index}`} key={index}>
//                 <AccordionTrigger>{investor.name}</AccordionTrigger>
//                 <AccordionContent>
//                   <div className="space-y-2">
//                     <p>
//                       <span className="font-semibold">Status:</span>{" "}
//                       <Badge
//                         variant={
//                           investor.status === "New Investor"
//                             ? "default"
//                             : "secondary"
//                         }
//                       >
//                         {investor.status}
//                       </Badge>
//                     </p>
//                     <p>
//                       <span className="font-semibold">Lead/Sole:</span>{" "}
//                       {investor.leadSole}
//                     </p>
//                     <p>
//                       <span className="font-semibold">Comments:</span>{" "}
//                       {investor.comments}
//                     </p>
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </CardContent>
//       </Card>
//     </CardContent>
//   </Card>
// );

// export default ExpandedDealInfo;
